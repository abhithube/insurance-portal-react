import { useContext, useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';

import Plan from '../plans/Plan';
import { AuthContext } from '../../contexts/AuthContext';
import useQuery from '../../hooks/useQuery';
import './PaymentForm.css';

const planUrl = process.env.REACT_APP_PLANS_URL;
const enrollmentUrl = process.env.REACT_APP_ENROLLMENT_URLl;

const PaymentForm = () => {
  const { currentUser } = useContext(AuthContext);

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();
  const query = useQuery();
  const planId = query.get('plan');

  // useEffect(() => {
  //   fetch(planUrl + planId)
  //     .then((res) => {
  //       if (res.ok) {
  //         res.json().then((data) => {
  //           setPlan(data);
  //           setLoading(false);
  //         });
  //       } else setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //     });
  // }, [currentUser, planId]);

  useEffect(() => {
    setPlan({ id: 1, name: 'AT Bronze', cost: 19999, deductible: 600000 });
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { err, source } = await stripe.createSource(
      elements.getElement(CardElement)
    );

    if (err) console.log(err);
    else {
      const paymentDetails = {
        sourceId: source.id,
        username: currentUser,
        plan,
      };

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentDetails),
      };

      try {
        const res = await fetch(enrollmentUrl, requestOptions);
        if (res.ok) history.replace('/dashboard?enrolled=true');
      } catch (err) {
        history.push('/payment?invalid=true');
      }
    }
  };

  return (
    <div id='payment-component'>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Plan plan={plan} />
          <form id='payment-form' onSubmit={handleSubmit}>
            <CardElement />
            <button type='submit' disabled={!stripe}>
              Pay
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PaymentForm;
