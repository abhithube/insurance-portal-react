import { useContext, useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Redirect, useHistory } from 'react-router-dom';

import Plan from '../plans/Plan';
import { AuthContext } from '../../contexts/AuthContext';
import useQuery from '../../hooks/useQuery';
import './PaymentForm.css';
import useFetch from '../../hooks/useFetch';

const plansUrl = process.env.REACT_APP_PLANS_URL;
const enrollmentUrl = process.env.REACT_APP_ENROLLMENT_URL;

const PaymentForm = () => {
  const { currentUser } = useContext(AuthContext);

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();
  const query = useQuery();
  const planId = query.get('plan');

  const { get, post } = useFetch();

  useEffect(() => {
    setPlan({ id: 1, name: 'AT Bronze', cost: 19999, deductible: 600000 });
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   get(plansUrl + planId).then((res) => {
  //     setPlan(res);
  //     setLoading(false);
  //   });
  // }, [get, planId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { err, source } = await stripe.createSource(
      elements.getElement(CardElement)
    );

    if (err) return;

    const paymentDetails = {
      sourceId: source.id,
      username: currentUser,
      plan,
    };

    await post(enrollmentUrl, paymentDetails);
    if (success) setSuccess(true);
    else history.push('/payment?invalid=true');
  };

  return (
    <div id='payment-component'>
      {loading ? (
        <div>Loading...</div>
      ) : plan ? (
        <>
          <Plan plan={plan} />
          <form id='payment-form' onSubmit={handleSubmit}>
            <CardElement />
            <button type='submit' disabled={!stripe}>
              Pay
            </button>
          </form>
        </>
      ) : (
        <div>
          There was an error retrieving the selected plan. Try again later.
        </div>
      )}
      {success && <Redirect push to='dashboard?enrolled=true' />}
    </div>
  );
};

export default PaymentForm;
