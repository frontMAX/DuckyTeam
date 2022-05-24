import { Schema, Types, model } from "mongoose";

/** Remember this is used clientside as well, update both of needed. */
export interface Product {
  id: Number;
  name: string;
  price: number;
  quantity: number;
  details: string;
  category: string;
  imageId: Types.ObjectId;
  imageUrl: string;
  orderedQuantity?: Number;
}

export const productSchema = new Schema<Product>(
  {
    id: { type: Number },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    details: { type: String, required: true },
    category: { type: String, required: true },
    imageId: { type: Schema.Types.ObjectId, required: true },
    orderedQuantity: { type: Number }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("product-copy").get(function () {
  return this.name + " " + this.price + this.orderedQuantity;
});

productSchema.virtual("imageUrl").get(function () {
  return "/api/media/" + this.imageId;
});

export const ProductModel = model("product", productSchema);
