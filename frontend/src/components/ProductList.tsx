"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/api/products";
import { Product } from "../types/Product";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box
} from "@mui/material";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data.body.products);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Available Products
      </Typography>
      <Grid container spacing={3}>
        {products?.length > 0 &&
          products?.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <Link href={`/products/${product.id}`} passHref>
                  <CardMedia
                    component="img"
                    sx={{ height: 300, width: 500 }}
                    image={product.image}
                    alt={product.name}
                  />
                </Link>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography color="textSecondary">
                    ${product.price}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <Link href={`/products/${product.id}`} passHref>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1 }}
                      >
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 1 }}
                      onClick={() => addToCart(product as any)}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
