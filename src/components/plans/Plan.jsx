import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import useAxios from '../../hooks/useAxios';
import './Plan.css';

const membersUrl = process.env.REACT_APP_MEMBERS_URL;

const Plan = ({ plan, setError }) => {
  const { currentUser, isAuthenticated } = useContext(AuthContext);

  const { get } = useAxios();
  const history = useHistory();

  const handleClick = async (id) => {
    if (!isAuthenticated) {
      setError('You must be logged in enroll in a plan');
      return;
    }

    get(membersUrl + currentUser).then((res) => {
      if (res.plan) setError('You are already enrolled in a plan');
      else history.push(`/payment?plan=${id}`);
    });
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
    </div>
  );
};

export default Plan;
