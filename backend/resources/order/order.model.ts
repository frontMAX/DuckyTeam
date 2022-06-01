import mongoose, { Schema } from "mongoose";
import { User } from "../user/user.model";
import { Product, productSchema } from "../product/product.model";
import { timeStamp } from "console";
import { Delivery } from "../delivery/delivery.model";
import { Address } from "cluster";

export interface Order {
  id: string;
  orderNumber: string;

  // should be virtual product  !!!! IMPORTANT TO FIX
  products: Product[];

  // shipping adress
  shipping: Address;
  createdAt: Date;
  updatedAt: Date;
  user: User;

  // delivery method
  delivery: Delivery;

  // the total for all products and shipping   !!!! IMPORTANT TO FIX
  orderTotal: number;
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

    // All products ordered, virtual schema   !!!! IMPORTANT TO FIX
    products: { type: [productSchema], required: true },

    // shipping adress
    shipping: { type: AddressSchema, required: true },

    user: { type: Schema.Types.ObjectId, ref: "user", required: true },

    // delivery method
    delivery: { type: Schema.Types.ObjectId, ref: "delivery", require: true },

    // total for the full order, products and shipping included !!!! IMPORTANT TO FIX
    orderTotal: { type: Number, required: true }
  }, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
}
);

export const OrderModel = mongoose.model("order", OrderSchema);
