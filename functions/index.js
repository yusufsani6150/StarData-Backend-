const express = require("express");
const admin = require("firebase-admin");

const serviceAccount = require("/etc/secrets/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("StarData Backend + Firebase is running!");
});

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Firebase connected successfully"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
