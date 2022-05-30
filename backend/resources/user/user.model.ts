import { ObjectId } from "mongoose";
import mongoose from "mongoose";
//import { Address, addressSchema } from "./address.schema";
// import { userInfo } from "os";

export interface User {
  email: string;
  /** Virtual */ fullname: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  token: string;
  _id: string;
  //address: Address;
}

const userSchema = new mongoose.Schema(
  {
    //_id: { type: String },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true, select: false, minlength: 8 },

    isAdmin: { type: Boolean, required: true, default: false },
    //address: { type: addressSchema, required: true },

    token: {
      type: String, // not uing this
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

//userSchema.plugin(passportlocalMongoose);
// userSchema.virtual("fullname").get(function (this: User) {
//   return this.firstname + " " + this.lastname;
// });

//  userSchema.pre("save", encryptPassword)
//  userSchema.pre("updateOne", encryptPassword)

// async function encryptPassword(this: User, next: Function) {
//   const passwordCrypted = bcrypt.hashSync("pa$$w0rd", 10);
//   this.passwordCrypted = passwordCrypted;
//   this.password = bcrypt.hashSync("pa$$w0rd", 10);
//   // saving this function for later to compare hashed with password
//   const verified = bcrypt.compareSync("pa$$w0rd", passwordCrypted);

//   next();

// function for hashing password
//let passwordCrypted = bcrypt.hashSync("pa$$w0rd", 10);
//verifying hashed password
// saving this function for later to compare hashed with password
// const verified = bcrypt.compareSync("pa$$w0rd", passwordCrypted);
//hashed password
// this.passwordCrypted = bcrypt.hashSync(this.password, 10);
//this.password = bcrypt.hashSync("pa$$w0rd", 10);
// }

export const UserModel = mongoose.model<User>("user", userSchema);
