"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProducts } from "@/app/api/products";
import { Product } from "@/types/Product";
import {
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent
} from "@mui/material";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const data = await fetchProducts();
    const foundProduct = data.body.products.find((p: any) => p.id === id);
    setProduct(foundProduct);
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="h6" color="textSecondary">
            ${product.price}
          </Typography>
          <Typography>{product.description}</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
