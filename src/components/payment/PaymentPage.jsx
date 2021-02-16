import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentForm from './PaymentForm';
import './PaymentPage.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const PaymentPage = () => {
  return (
    <div id='payment-page'>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default PaymentPage;
