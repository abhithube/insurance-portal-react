import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

import PaymentForm from './PaymentForm';
import './PaymentPage.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const PaymentPage = () => {
  const [error, setError] = useState(false);

  return (
    <div id='payment-page'>
      <div id='payment-alert'>
        {error && <alert type='error' message={error} />}
      </div>
      <Elements stripe={stripePromise}>
        <PaymentForm setError={setError} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
