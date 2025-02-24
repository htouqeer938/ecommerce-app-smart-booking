import request from "supertest";
import app from "../server"; // Import your Express app

describe("Authentication API Tests", () => {
  let token: string;

  test("Should sign up a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123"
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  test("Should log in the user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123"
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  test("Should fail login with wrong credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "wronguser@example.com",
      password: "wrongpassword"
    });

    expect(res.status).toBe(401);
  });
});
