const express = require("express");
const admin = require("firebase-admin");
const bcrypt = require("bcryptjs");

const serviceAccount = require("/etc/secrets/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.json());

const db = admin.firestore();

app.get("/", (req, res) => {
  res.send("StarData Backend + Firebase is running!");
});

app.get("/test", async (req, res) => {
  res.json({
    success: true,
    message: "Firebase connected successfully"
  });
});

app.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and password are required."
      });
    }

    const user = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
    });

    const passwordHash = await bcrypt.hash(password, 10);

    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      fullName,
      email,
      phone: phone || "",
      passwordHash,
      wallet: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({
      success: true,
      message: "Registration successful",
      uid: user.uid,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
