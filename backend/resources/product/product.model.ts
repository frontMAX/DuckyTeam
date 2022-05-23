import mongoose from "mongoose";

export interface Product {
  id: Number;
  name: string;
  price: number;
  quantity: number;
  details: string;
  category: string;
  images: string;
  orderedQuantity?: Number;
}

export const productSchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    details: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: String, required: true },
    orderedQuantity: { type: Number }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("product-copy").get(function (this: Product) {
  return this.name + " " + this.price + this.orderedQuantity;
});

export const ProductModel = mongoose.model<Product>("product", productSchema);
