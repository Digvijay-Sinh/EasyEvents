import axios from "axios";
import { Button } from "flowbite-react";

const PaymentPage = () => {
  const checkoutHandler = async (amount: number) => {
    const {
      data: { key },
    } = await axios.get("http://www.localhost:5000/api/v1/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:5000/api/v1/payment/checkout", {
      amount,
    });

    console.log(order);

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "easyevents",
      description: "Tutorial of RazorPay",
      image: "https://avatars.githubusercontent.com/u/25058652?v=4",
      order_id: order.id,
      callback_url: "http://localhost:5000/api/v1/payment/paymentverification",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="mt-10 text-white">
      <Button
        onClick={() => {
          checkoutHandler(500);
        }}
      >
        Pay 500
      </Button>
    </div>
  );
};

export default PaymentPage;
