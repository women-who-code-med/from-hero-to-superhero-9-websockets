const { Router } = require("express");
const path = require("path");

const { healthCheck, welcomePage } = require("../controllers/appController");
const router = Router();

router
  .get("/", welcomePage)
  .get("/health", healthCheck)
  .use("/auth", require("./authRoutes"))
  .use("/v1/users", require("./userRoutes"));

if (process.env.NODE_ENV !== "production") {
  router.get("/login", (req, res) => {
    res.sendFile(path.resolve("src/views/login.html"));
  });
  router.get("/playground", (req, res) => {
    res.sendFile(path.resolve("src/views/playground.html"));
  });
}
module.exports = router;