import './Plan.css';

const Plan = (props) => {
  const { plan } = props;

  return (
    <div className='plan-component'>
      <div className='card'>
        <h3 className='card-header plan-header'>{plan.name}</h3>
        <div className='card-body plan-details'>
          <div className='plan-pricing'>
            <p>Pricing: ${plan.cost / 100}/mo</p>
            <p>Deductible: ${plan.deductible / 100}.00</p>
          </div>
          <p>Benefits: </p>
          <ul className='benefits-list'>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
              repellat!
            </li>
            <li>Lorem ipsum dolor, sit amet consectetur adipisicing.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Plan;
