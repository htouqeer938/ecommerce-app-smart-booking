"use client";

import { Order } from "@/types/Order";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.body.orders))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      {orders?.length === 0 ? (
        <Typography variant="h6">No orders placed yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {orders?.map((order) => (
            <Grid item xs={12} md={6} key={order.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{order?.customerName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {order?.customerName}
                  </Typography>
                  <Typography variant="body2">
                    Address: {order?.customerAddress}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Total: ${order.totalPrice}
                  </Typography>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Items:
                  </Typography>
                  {order?.products?.map((item, index) => (
                    <Typography key={index} variant="body2">
                      {item.productId.name} x {item.quantity} - $
                      {item.productId.price * item.quantity}
                    </Typography>
                  ))}
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Status: {order?.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default OrdersPage;
