const app = require("../app");
const request = require("supertest");
const { User } = require("../models");

const user1 = {
    company: "bamz",
    email: "bambang1@mail.com",
    password: "bamz1234",
    companyLabel: "LAS",
    checkPassword:"bamz1234"
}

afterAll(done => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true})
    .then(_ => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe("User Routes Test", () => {
  describe("POST /register - create new user", () => {
    
    test("201 Success register - should create new User", (done) => {
      request(app)
        .post("/register")
        .send(user1)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          console.log(res.status);

          expect(status).toBe(201);
          expect(body).toHaveProperty("id", expect.any(Number));
          expect(body).toHaveProperty("email", user1.email);
          return done();
        });
    });

    test("400 Failed register - should return error if email is null", (done) => {
      request(app)
        .post("/register")
        .send({
          password: "qweqwe",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Username is Required", "Email is Required");
          return done();
        });
    });

    test("400 Failed register - should return error if email is already exists", (done) => {
      request(app)
        .post("/register")
        .send(user1)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message","email is already exists");
          return done();
        });
    });

    test("400 Failed register - should return error if wrong email format", (done) => {
      request(app)
        .post("/register")
        .send({
          email: "random",
          name: "Sample User",
          password: "qweqwe",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Username is Required", "Email is Invalid");
          return done();
        });
    });
  });

  describe("POST /login - user login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
        .post("/login")
        .send(user1)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(200);
          expect(body).toHaveProperty("access_token", expect.any(String));
          return done();
        });
    });

    test("401 Failed login - should return error", (done) => {
      request(app)
        .post("/login")
        .send({
          email: "hello@mail.com",
          password: "salahpassword",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Email or Username and Password is Invalid");
          return done();
        });
    });

    test("400 Failed login - should return error if email is null", (done) => {
        request(app)
          .post("/login")
          .send({
            password: "bamz1234",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Email / Pass is wrong");
            return done();
          });
      });
  });
});




