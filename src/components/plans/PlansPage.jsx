import { useEffect, useState } from 'react';

import Plan from './Plan';
import Alert from '../util/Alert';
import axios from 'axios';
import './PlansPage.css';

const plansUrl = process.env.REACT_APP_PLANS_URL;

const PlansPage = () => {
  const [plans, setPlans] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      axios.get(plansUrl).then((res) => {
        setPlans(res.data);
      });
    } catch (err) {
      setError('You are already enrolled in a plan');
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   setPlans([
  //     { id: 1, name: 'AT Bronze', cost: 19999, deductible: 600000 },
  //     { id: 2, name: 'AT Silver', cost: 24999, deductible: 540000 },
  //     { id: 3, name: 'AT Gold', cost: 29999, deductible: 480000 },
  //     { id: 4, name: 'AT Platinum', cost: 34999, deductible: 400000 },
  //   ]);
  //   setLoading(false);
  // }, []);

  return (
    <div id='plans-page'>
      <div id='plans-header'>
        <h1 id='plans-title'>Plans</h1>
        {error && <Alert type='error' message={error} />}
        {loading && <div>Loading...</div>}
      </div>
      {plans && (
        <div id='plan-list'>
          {plans.map((plan) => (
            <Plan key={plan.id} plan={plan} setError={setError} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlansPage;
