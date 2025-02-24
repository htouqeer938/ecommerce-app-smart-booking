"use client";
import { useCart } from "@/context/CartContext";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!customerName || !customerEmail || !customerAddress) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    const orderData = {
      customerName,
      customerEmail,
      customerAddress,
      products: cart.map(({ id, quantity }) => ({
        productId: id,
        quantity
      })),
      totalPrice: cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      status: "Pending"
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(orderData)
        }
      );

      if (response.ok) {
        clearCart();
        alert("Order placed successfully!");
        router.push("/orders");
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6">
          Your cart is empty. Add items first!
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Full Name"
                fullWidth
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Address"
                fullWidth
                multiline
                rows={3}
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCheckout}
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? "Processing..." : "Place Order"}
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6">Order Summary</Typography>
              {cart.map((item) => (
                <Card key={item.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="body1">
                      {item.name} x {item.quantity}
                    </Typography>
                    <Typography variant="body2">
                      Price: ${item.price * item.quantity}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total: $
                {cart.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                )}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
