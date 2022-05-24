import mongoose, { Schema } from "mongoose";
import { User } from "../user/user.model";
import { Product, productSchema } from "../product/product.model";
import { timeStamp } from "console";
import { Address } from "cluster";

export interface Order {
  orderNumber: string;
  products: Product[];
  shipping: Address;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  // delivery: Delivery;
}

const AddressSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    postCode: { type: Number, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const OrderSchema = new mongoose.Schema<Order>(
  {
    orderNumber: { type: String, required: true },
    products: { type: [productSchema], required: false },
    shipping: AddressSchema,
    user: { type: Schema.Types.ObjectId, ref: "user", required: false },
    // delivery: { type: Delivery}
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const OrderModel = mongoose.model("order", OrderSchema);
