import { NextFunction, Request, Response } from "express";
import { UserModel, User } from "./user.model";

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
    const user = new UserModel(req.body);
    await user.save();
    console.log(user.fullname);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await UserModel.findById(req.params.id).select("+password");
  console.log(user);
  res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  let selectedUser = await UserModel.findById({ _id: req.params.id });
  if (!selectedUser) {
   res.status(404).json("user does not exist")
  
  }
  if (selectedUser) {
    let deleteUser = await UserModel.findByIdAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json("user is deleted!! "))
      .catch((err) => res.status(404).json("error: " + err));
  }
};
