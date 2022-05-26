import { NextFunction, Request, Response, Express } from "express";
import { Session, SessionData } from "express-session";
import { UserModel, User } from "./user.model";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { userInfo } from "os";
// import { request } from "http";
let uuid = uuidv4;
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

  if (!checkPassword) {
    return res.status(401).json("you typed in wrong password or name");
  }

  session = req.session;
  //console.log(req.session.user);
  if (req.session.user) {
    console.log(req.session.user);
    return res.json("you only need to log in once");
  }
  console.log("yay, you logged in!");
  session = req.session;
  session.userid = req.body.email;
  console.log(req.session);

  // req.session.user = user;
  // //req.session.id = uuidv4();
  // req.session.logindate = new Date();
  // req.session.role = user.isAdmin;
  // console.log(req.session.user);
  // delete user.password;
  // return res.status(200).json(req.session.user);
};

//sees if user is logged in or not
export const testlogin = async (req: Request, res: Response) => {
  if (req.session.user) {
    return res.json("you only need to log in once");
  }
  if (!req.session.user) {
    return res.json(req.session);
  }
};

export const logOut = async (req: Request<SessionData>, res: Response) => {
  if (req.session.user) {
    req.session.destroy;
    res.json("logged out").redirect("/login");
  }
  res.status(400).json("unable to log out");
  if (!req.session.user) {
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
