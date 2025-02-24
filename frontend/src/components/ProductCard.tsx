"use client";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function ProductCard({ product }: { product: { id: number; name: string; price: string; image: string } }) {
  return (
    <Card className="shadow-lg">
      <CardMedia component="img" height="140" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography color="textSecondary">{product.price}</Typography>
        <Button variant="contained" color="primary" component={Link} href={`/products/${product.id}`}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
