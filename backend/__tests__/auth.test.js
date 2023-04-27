const request = require("supertest");
const app = "http://localhost:5000/api";

describe("POST /api/login", () => {
  it("should log in a user", async () => {
    const res = await request(app).post("/login").send({
      person: "admin",
      password: "1234",
    });
    expect(res.statusCode).toBe(200);
  });

  it("should not log in a user with wrong password or name", async () => {
    const res = await request(app).post("/login").send({
      person: "admin",
      password: "123456",
    });
    expect(res.statusCode).toBe(404);
  });
});
