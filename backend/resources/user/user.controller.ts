import { NextFunction, Request, Response, Express } from "express";
import { UserModel, User } from "./user.model";
import bcrypt from "bcrypt";
import mongoose, { ObjectId } from "mongoose";

export const getUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  res.status(200).json(users);
};

export const addUser = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  // TODO: How do we handle errors in async middlewares?
  try {
    const { email, password, isAdmin } = req.body;

    if (!email || !password) {
      // fill in all fields
      return;
    }
    const userExist = await UserModel.findOne({ email: req.body.email });
    if (userExist) {
      res.json("user already exist, pick another.").status(409);
      return;
    } // encryption of password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await UserModel.create({
      email: req.body.email,
      password: encryptedPassword,
      isAdmin,
      id: mongoose.Types.ObjectId,
    });
    // const user = new UserModel(req.body);
    // user.password = encryptedPassworr
    // await user.save();
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const userToUpdate = await UserModel.findById({ _id: req.params.id });

  if (!userToUpdate) {
    res.status(404).json("cant update user because user does not exist");
  }
  if (userToUpdate) {
    await UserModel.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(() => res.status(200).json("user is updated "))
      .catch((err) => res.status(400).json("error: " + err));
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  let user = await UserModel.findById(req.params.id, req.body);
  if (!user) {
    res.status(404).json("user does not exist");
  }

  if (user) {
    await UserModel.findByIdAndDelete({ _id: req.params.id })
      .then(() => res.status(200).json("user is deleted!! "))
      .catch((err) => res.status(404).json("error: " + err));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session) {
    throw new Error("Session object not initialized");
  }

  const user = await UserModel.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (req.session?.user) {
    return res.json(req.session.user);
  }
  // No user found, can't log in.
  if (!user) {
    return res.status(401).json("you typed in wrong password or name");
  }
  const checkPassword = await bcrypt.compare(req.body.password, user.password);
  //passwork check failed, wrong password
  if (!checkPassword) {
    return res.status(401).json("you typed in wrong password or name");
  }

  //passwordceck worked, right password
  if (checkPassword) {
    const userID = await UserModel.findById(req.params.id);
    console.log(checkPassword + " check");
    // setting up user session
    req.session.user = user;
    console.log(req.session.id + " the sessionID");
    console.log(req.session.cookie);
    console.log(req.session.userid);
    console.log(req.session.isLoggedin);
    return res.status(201).json(user);
  }
  //if user is logged in send them a message ans show they are logged in already
};

// export const getCurrentUser = async (req: Request, res: Response) => {
//   try {
//     const loggedInUser = await UserModel.findById(req.session.user);
//     res.json(loggedInUser);
//   } catch (err) {
//     console.log(err);
//     res.json("Other error...");
//   }
// };

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.session = null;
  return res.json("logged out");
};

// export const logOut = async (req: Request<SessionData>, res: Response) => {
//   req.session.destroy((err) => {
//     if (err) {
//       res.status(400).json("unable to log out");
//     }
//     res.json("logged out").redirect("/login");
//   });
//   if (!req.session.user) {
//     return res.status(404).json("you have to login to logout");
//   }
//   res.json("other error");
// };

//sees if user is logged in or not
// export const testlogin = async (req: Request, res: Response) => {
//   if (req.session.user) {
//     return res.json("you only need to log in once");
//   }
//   if (!req.session.user) {
//     return res.json(session.user);
//   }
// };
