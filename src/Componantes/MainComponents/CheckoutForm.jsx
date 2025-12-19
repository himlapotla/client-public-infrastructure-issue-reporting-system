import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AllContext } from "../Provider/AuthProvider";

const CheckoutForm = ({ issueId, clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AllContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {

      await axios.post(`${import.meta.env.VITE_API_URL}/save-payment`, {
        email: user.email,
        amount: paymentIntent.amount, 
        type: "issue",
        issueId,
        transactionId: paymentIntent.id
      });

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/reports/boost/${issueId}`
      );

      toast.success("Payment successful!");
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="p-3 border rounded" />
      <button className="btn bg-green-600 mt-4 w-full">
        Pay 100tk
      </button>
    </form>
  );
};

export default CheckoutForm;
