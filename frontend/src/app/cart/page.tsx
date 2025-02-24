"use client";
import { useCart } from "@/context/CartContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from "@mui/material";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      ${item.price} x {item.quantity}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" sx={{ mt: 3 }}>
            Total: ${totalPrice.toFixed(2)}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="error"
              onClick={clearCart}
              sx={{ mt: 2 }}
            >
              Clear Cart
            </Button>
            {cart.length > 0 && (
              <Link href="/checkout">
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Proceed to Checkout
                </Button>
              </Link>
            )}
          </Box>
        </>
      )}
    </Container>
  );
}
