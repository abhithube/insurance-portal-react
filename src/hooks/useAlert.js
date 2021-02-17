import { useLocation } from 'react-router-dom';

const useAlert = () => {
  const location = useLocation();
  return location.state ? location.state : {};
};

export default useAlert;
