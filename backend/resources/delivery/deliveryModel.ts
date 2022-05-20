import mongoose from "mongoose";

export interface Delivery {
  name: string;
  price: number;
  time: number;
}

const deliverySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    time: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const DeliveryModel = mongoose.model<Delivery>(
  "delivery",
  deliverySchema
);
