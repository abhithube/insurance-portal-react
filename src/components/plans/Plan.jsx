import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import useFetch from '../../hooks/useFetch';
import './Plan.css';

const membersUrl = process.env.REACT_APP_MEMBERS_URL;

const Plan = ({ plan, setError }) => {
  const { currentUser } = useContext(AuthContext);

  const [redirect, setRedirect] = useState(false);

  const { get } = useFetch();

  const handleClick = async (id) => {
    // get(membersUrl + currentUser).then((res) => {
    //   if (res.plan) setError('You are already enrolled in a plan');
    //   else setRedirect(true);
    // });
    setRedirect(true);
  };

  return (
    <div className='plan-component'>
      <div className='card'>
        <h3 className='card-header plan-header'>{plan.name}</h3>
        <div className='card-body plan-details'>
          <div className='plan-pricing'>
            <p>Pricing: ${plan.cost / 100}/mo</p>
            <p>Deductible: ${plan.deductible / 100}.00</p>
          </div>
          <div className='plan-benefits'>
            <p>Benefits: </p>
            <ul className='benefits-list'>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ul>
          </div>
          <button
            className='button plan-select'
            onClick={() => handleClick(plan.id)}
          >
            Select
          </button>
        </div>
      </div>
      {redirect && <Redirect push to={`/payment?plan=${plan.id}`} />}
    </div>
  );
};

export default Plan;
