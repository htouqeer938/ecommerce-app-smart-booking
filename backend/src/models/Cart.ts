import mongoose, { Document, Schema } from "mongoose";

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  products: { productId: mongoose.Types.ObjectId; quantity: number }[];
}

const CartSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 }
    }
  ]
});

export default mongoose.model<ICart>("Cart", CartSchema);
