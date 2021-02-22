import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { AuthContext } from '../../contexts/AuthContext';
import useQuery from '../../hooks/useQuery';
import axios from 'axios';
import './PaymentForm.css';

const plansUrl = process.env.REACT_APP_PLANS_URL;
const enrollmentUrl = process.env.REACT_APP_ENROLLMENT_URL;

const CARD_OPTIONS = {
  hidePostalCode: true,
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#8080ff',
      color: '#fff',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#fff' },
    },
    invalid: {
      iconColor: '#f00',
      color: '#f00',
      backgroundColor: '#f00',
    },
  },
};

const PaymentForm = ({ setError }) => {
  const { currentUser } = useContext(AuthContext);

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  const query = useQuery();
  const history = useHistory();

  const planId = query.get('plan');

  // useEffect(() => {
  //   setPlan({ id: 1, name: 'AT Bronze', cost: 19999, deductible: 600000 });
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(plansUrl + planId)
      .then((res) => {
        setPlan(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('There was an error retrieving the selected plan');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [planId, setError]);

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

    try {
      setLoading(true);
      await axios.post(enrollmentUrl + 'create', paymentDetails);
      history.push({
        pathname: '/dashboard',
        state: {
          alert: { type: 'success', message: 'Plan enrollment successful' },
        },
      });
    } catch (err) {
      setError('There was an error processing the transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='payment-component'>
      {plan && (
        <>
          <div id='payment-card'>
            <h3 id='payment-header'>{plan.name}</h3>
            <p>Pricing: ${plan.cost / 100}/mo</p>
            <p>Deductible: ${plan.deductible / 100}.00</p>
          </div>
          <form id='payment-form' onSubmit={handleSubmit}>
            <CardElement id='stripe-element' options={CARD_OPTIONS} />
            <button id='payment-button' type='submit' disabled={loading}>
              Pay
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PaymentForm;
