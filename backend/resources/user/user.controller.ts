import { NextFunction, Request, Response } from "express";
import { UserModel, User } from "./user.model";
import bcrypt from "bcrypt";

// get all users
export const getUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  res.status(200).json(users);
};

// Get a single user by id
export const getUser = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  res.status(200).json(user);
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
      res.json({ msg: "Incorrent inputs." });
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
      email: email,
      password: encryptedPassword,
    });

    if (!user) {
      res.json("cant create user");
    }

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

  // aldready a session, can't log in
  if (req.session.user) {
    delete req.session.user.password;
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

    delete user.password;
    // setting up user session
    req.session.user = user;
    return res.status(201).json(user);
  }
  //if user is logged in send them a message ans show they are logged in already
};

// Get current logged in user
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedInUser = req.session?.user;

  if (!loggedInUser) {
    res.status(403);
    res.send({ message: "You are not currently logged in." });
    return;
  }
  res.json(loggedInUser);
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(!req.session){
    return res.status(401).json("No session. Can't log out");
  }

  if(!req.session.user){
    return res.status(401).json("No session-user. Can't log out");
  }

  req.session = null;

  return res.json("logged out");
};