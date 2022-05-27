import { NextFunction, Request, Response, Express } from "express";
import { Session, SessionData } from "express-session";
import { UserModel, User } from "./user.model";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
//import { v4 as uuidv4 } from "uuid";
//let uuid = uuidv4;
declare module "express-session" {
  interface SessionData {
    user: User;
    email: string;
    role: Boolean;
    logindate: Date;
    userid: string;
  }
}

let session: Session & Partial<SessionData>;

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
      // user already exist bla bla bla
      return;
    }

    // encryption of password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await UserModel.create({
      email: req.body.email,
      password: encryptedPassword,
      isAdmin,
    });

    // const user = new UserModel(req.body);

    // user.password = encryptedPassword

    // await user.save();

    console.log(user);
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
  const user = await UserModel.findOne({ email: req.body.email }).select(
    "+password"
  );
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
    console.log(checkPassword + " check");
    // setting up user session
    session = req.session;
    session.user = user;
    session.email = req.body.email;
    session.userid = user.email;
    console.log(req.session.id + " the sessionID");
    console.log(req.session.cookie);
    return res.status(201).json(session);
  }
  //if user is logged in send them a message ans show they are logged in already
  if (req.session.user) {
    console.log(session.user);
    res.json("you only need to log in once");
  }
};

export const logout = async (
  req: Request<mongoose.Schema.Types.ObjectId>,
  res: Response
) => {
  if (req.session.userid) {
    session.destroy;
    res.json("logged out");
  }
  res.status(400).json("unable to log out");
  if (!req.session.userid) {
    return res.status(404).json("you have to login to logout");
  }
  res.json("other error");
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
