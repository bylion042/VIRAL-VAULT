const express = require("express");
const router = express.Router();
const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(process.env.FLUTTERWAVE_PUBLIC_KEY, process.env.FLUTTERWAVE_SECRET_KEY);

router.post("/monetize", async (req, res) => {
  try {
    const payload = {
      tx_ref: "TX-" + Date.now(),
      amount: 50,
      currency: "USD",
      payment_options: "card",
      redirect_url: "http://localhost:3000/payment-success", // change to your success page
      customer: {
        email: "userEmail", // You can dynamically replace this
      },
      customizations: {
        title: "Viral Vault",
        description: "Purchase premium access",
        logo: "https://yourdomain.com/logo.png", // optional
      },
    };

    const response = await flw.PaymentInitiation.create(payload);
    return res.json({ link: response.data.link });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Payment initiation failed" });
  }
});

module.exports = router;
