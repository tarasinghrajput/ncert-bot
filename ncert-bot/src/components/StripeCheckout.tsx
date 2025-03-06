import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51PPelvSDfEhmeIXthofTBkrWoCSbX4nypxYdgnHEnYXy77iB3ZCW4W0J4Q27ab7MxZTRuz7GkvYPrNsGFrbYcHcH009uRb25Qf"); // Replace with actual Stripe Public Key

const StripeCheckout: React.FC = () => {
  useEffect(() => {
    const redirectToCheckout = async () => {
      const stripe = await stripePromise; // Load Stripe
      if (!stripe) return; // Ensure Stripe is loaded

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: "price_1QynilSDfEhmeIXtbZieFlSx", quantity: 1 }], // Replace with actual Stripe Price ID
        mode: "subscription",
        successUrl: "http://localhost:5173/success",
        cancelUrl: "http://localhost:5173/cancel",
      });

      if (error) {
        console.error("Stripe Checkout error:", error);
      }
    };

    redirectToCheckout(); // Call function when component loads
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Redirecting to Payment...</h2>
    </div>
  );
};

export default StripeCheckout;