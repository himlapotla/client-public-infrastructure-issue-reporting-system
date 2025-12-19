import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

const CheckOut = ({ clientSecret, userEmail, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      }
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // ✅ make user premium
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/premium`,
        { email: userEmail }
      );

      toast.success("Subscription successful 🎉");
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="p-3 border rounded" />
      <button className="btn bg-green-600 mt-4 w-full">
        Pay 1000tk
      </button>
    </form>
  );
};

export default CheckOut
