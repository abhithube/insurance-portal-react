import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import './Plan.css';

const Plan = (props) => {
  const { isAuthenticated } = useContext(AuthContext);

  const { plan } = props;

  const history = useHistory();

  const selectPlan = (id) => {
    if (isAuthenticated) history.replace(`/payment?plan=${id}`);
    else history.push('/plans?unauthenticated=true');
  };

  return (
    <div id='plan-component'>
      <div className='card'>
        <h3 className='card-header'>{plan.name}</h3>
        <div id='plan-details' className='card-body'>
          <p>Cost: ${plan.cost / 100}/mo</p>
          <p>Deductible: ${plan.deductible / 100}.00</p>
          <p>Benefits</p>
          <ul id='plan-benefits'>
            <li>Benefit 1</li>
            <li>Benefit 2</li>
            <li>Benefit 3</li>
          </ul>
          <button className='button' onClick={() => selectPlan(plan.id)}>
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plan;
