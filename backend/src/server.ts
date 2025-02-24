import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db";
import adminRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/orders.routes";
import productRoutes from "./routes/product.routes";
import { PORT } from "./config/env";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("updateStock", (productId, stock) => {
    io.emit("stockUpdated", { productId, stock });
  });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
