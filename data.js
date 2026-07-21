import { auth, db } from "./firebase.js";

const buyDataBtn = document.getElementById("buyDataBtn");

if (buyDataBtn) {
  buyDataBtn.addEventListener("click", async () => {

    const network = document.getElementById("network").value;
    const phone = document.getElementById("phone").value.trim();
    const plan = document.getElementById("plan").value;

    if (!network || !phone || !plan) {
      alert("Please fill all fields.");
      return;
    }

    if (phone.length !== 11) {
      alert("Enter a valid 11-digit phone number.");
      return;
    }

    buyDataBtn.disabled = true;
    buyDataBtn.innerText = "Processing...";

    setTimeout(() => {
      alert(
        "Demo Mode\n\nNetwork: " + network +
        "\nPhone: " + phone +
        "\nPlan: " + plan +
        "\n\nVTU API will be connected next."
      );

      buyDataBtn.disabled = false;
      buyDataBtn.innerText = "Buy Data";
    }, 1500);

  });
}