import mongoose, { Schema } from "mongoose";
import { User } from "../user/user.model";
import { Product, productSchema } from "../product/product.model";
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
  delivery: {
    name: string;
    price: number;
    logoUrl: string;
    };
  // the total for all products and shipping   !!!! IMPORTANT TO FIX
  orderTotal: number;
}

const orderProductySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: false },
  qty: { type: Number, required: true }
})

const orderDeliverySchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    price: {type: Number, required: true},
    logoUrl: {type: String, required: true},
    }
)


const AddressSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    postCode: { type: Number, required: true },
    city: { type: String, required: true },
    streetAdress: { type: String, required: true },
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
    products: { type: [orderProductySchema], required: true },

    // shipping adress
    shipping: { type: AddressSchema, required: true },

    //  REMEMBER TO FIX THIS ONCE WE GOT USER!!!
    // REMEMBER TO FIX THIS ONCE WE GOT USER!!!
    // REMEMBER TO FIX THIS ONCE WE GOT USER!!!
    // REMEMBER TO FIX THIS ONCE WE GOT USER!!!
    // REMEMBER TO FIX THIS ONCE WE GOT USER!!!
    user: { type: Schema.Types.ObjectId, ref: "user", required: false },

    // delivery method
    delivery: { type: orderDeliverySchema, require: true },

    // total for the full order, products and shipping included !!!! IMPORTANT TO FIX
    orderTotal: { type: Number, required: true }
  }, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
}
);

export const OrderModel = mongoose.model("order", OrderSchema);
