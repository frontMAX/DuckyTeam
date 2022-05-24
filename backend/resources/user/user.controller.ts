import { NextFunction, Request, Response } from "express";
import { UserModel, User } from "./user.model";
import bcrypt from "bcrypt";
// import { request } from "http";

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

// can change to mail too, or id. vad vi vill kan vi ändra till sen, men kör på username så länge!
//export const loginUser = async( req: Request, res: response ) => {
//console.log(req.body.firstname)

export const loginUser = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ email: req.body.email }).select(
    "+password"
  );

  // No user found, can't log in.
  if (!user) {
    return res.status(401).json("you typed in wrong password or name");
  }
  const checkPassword = await bcrypt.compare(req.body.password, user.password);

  if (!checkPassword) {
    return res.status(401).json("you typed in wrong password or name");
  }

  delete user.password;
  console.log("yay, you logged in!");
  return res.status(200).json(user);
};
