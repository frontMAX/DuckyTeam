import mongoose, { Schema, Types } from "mongoose";

export interface Delivery {
  id: number;
  name: string;
  altText: string;
  shippingTime: number;
  price: number;
  logoId: Schema.Types.ObjectId;
  logoUrl: string;
}

const deliverySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    shippingTime: { type: Number, required: true },
    altText: { type: String, required: true },
    logoId: { type: Schema.Types.ObjectId, required: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

deliverySchema.virtual("logoUrl").get(function () {
  return "api/media/" + this.logoId;
});

export const DeliveryModel = mongoose.model<Delivery>(
  "delivery",
  deliverySchema
);
