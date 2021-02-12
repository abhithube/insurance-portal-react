import { Fragment, useEffect, useState } from 'react';

import Plan from './Plan';
import './PlansPage.css';

const PlansPage = () => {
  const baseUrl = 'https://app.at-insurance.com/plan-details-service/plans/';

  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl)
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setPlans(data);
            setLoading(false);
          });
        } else setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
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
      {loading ? (
        <p>Loading...</p>
      ) : plans ? (
        <div id='plan-list'>
          {plans.map((plan) => {
            return (
              <Fragment key={plan.id}>
                <Plan plan={plan} />
              </Fragment>
            );
          })}
        </div>
      ) : (
        <p>There was an error fetching our available plans. Try again later.</p>
      )}
    </div>
  );
};

export default PlansPage;
