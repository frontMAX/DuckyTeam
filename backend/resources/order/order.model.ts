import mongoose, { Schema } from "mongoose";
import { User } from "../user/user.model"
import { Product, productSchema } from "../product/product.model"
import { timeStamp } from "console";

export interface Order {
    id: string;
    orderNumber: string;
    products: Product[];
    // shipping: Address;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    // delivery: Delivery;
}

const OrderSchema = new mongoose.Schema<Order>({
    orderNumber: { type: String, required: true },
    products: { type: [productSchema], required: false },
    // shipping: { type: addressSchema },
    user: { type: Schema.Types.ObjectId, ref: "user", required: false },
    // delivery: { type: Delivery}
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

export const OrderModel = mongoose.model("order", OrderSchema);

// schema med stora bokstäver