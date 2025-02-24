"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  Collapse,
  Box
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Order } from "@/types/Order";

// Order Row Component with Collapsible Products
const OrderRow = ({ order }: { order: Order }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell>{order.customerName || "N/A"}</TableCell>
        <TableCell>{order.customerEmail || "N/A"}</TableCell>
        <TableCell>{order.customerAddress || "N/A"}</TableCell>
        <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
        <TableCell>{order.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ padding: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom>
                Ordered Products
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.productId.name}</TableCell>
                      <TableCell>{item.productId.category}</TableCell>
                      <TableCell>${item.productId.price.toFixed(2)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        ${(item.productId.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.body.orders))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <AdminGuard>
      <Container>
        <Typography variant="h4" gutterBottom>
          Order Management
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </AdminGuard>
  );
}
