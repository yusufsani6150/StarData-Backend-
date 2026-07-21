import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    document.getElementById("fullname").innerText = data.fullname;
    document.getElementById("balance").innerText = "₦" + data.balance;
  } else {
    document.getElementById("fullname").innerText = "User";
    document.getElementById("balance").innerText = "₦0.00";
    alert("User data not found in Firestore.");
  }

});