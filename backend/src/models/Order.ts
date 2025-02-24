import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  userId: mongoose.Types.ObjectId;
  products: { productId: mongoose.Types.ObjectId; quantity: number }[];
  totalPrice: number;
  createdAt: Date;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}

const OrderSchema: Schema = new Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerAddress: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true }
      }
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
