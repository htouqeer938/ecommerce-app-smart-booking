export interface Order {
  id: string;
  customerName: string | null;
  customerEmail: string | null;
  customerAddress: string | null;
  products: {
    productId: {
      _id: string;
      category: string;
      name: string;
      description: string;
      price: number;
      stock: number;
    };
    quantity: number;
  }[];
  userId: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  totalPrice: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}
