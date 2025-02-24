import request from "supertest";
import app from "../server";

describe("Cart API Tests", () => {
  let token: string;
  let productId: string;

  beforeAll(async () => {
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123"
    });

    token = loginRes.body.token;

    const productRes = await request(app).get("/api/products");
    productId = productRes.body[0].id;
  });

  test("Should add a product to the cart", async () => {
    const res = await request(app)
      .post("/api/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId,
        quantity: 2
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Product added to cart");
  });

  test("Should get user's cart", async () => {
    const res = await request(app)
      .get("/api/cart")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("items");
    expect(Array.isArray(res.body.items)).toBe(true);
  });
});
