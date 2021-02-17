import './Alert.css';

const Alert = ({ type, message }) => {
  return <span className={`alert alert-${type}`}>{message}</span>;
};

export default Alert;
