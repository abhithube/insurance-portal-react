import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../contexts/AuthContext';
import './ProfilePage.css';

const membersUrl = process.env.REACT_APP_MEMBERS_URL;
const enrollmentUrl = process.env.REACT_APP_ENROLLMENT_URL;

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      try {
        const res = await axios.get(membersUrl + currentUser);
        if (res.status === 200) setMember(res.data);
      } catch (err) {
        setError('There was an error fetching your profile');
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [currentUser]);

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await axios.post(enrollmentUrl + 'cancel', member.username, {
        headers: { 'Content-Type': 'text/plain' },
      });
      if (res.status === 200) {
      }
      setLoading(false);
    } catch (err) {
      setError('There was an error cancelling your membership');
      setLoading(false);
    }
  };

  return (
    <div id='profile-page'>
      {!loading && (
        <>
          <h1>Profile</h1>
          <div>
            <h3>Member Details</h3>
            <div>
              <p>Username: {member.username}</p>
              <p>Password: ******</p>
              <p>Email: {member.email}</p>
            </div>
          </div>
          <div>
            <h3>Plan</h3>
            <div>
              {!member.plan ? (
                <p>
                  No plan selected. Click <Link to='/plans'>here</Link> to
                  browse plans.
                </p>
              ) : (
                <div>
                  <div>
                    <div>{member.plan.name}</div>
                    <div>
                      <p>
                        Member since:
                        {member.memberSince * 1000}
                      </p>
                      <p>
                        Next Payment:
                        {member.nextPaymentDate * 1000}
                      </p>
                    </div>
                  </div>
                  <button type='button' onClick={handleClick}>
                    Drop Plan
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <h3>Billing History</h3>
            {member.payments &&
              (member.payments.length === 0 ? (
                <p>No billing history.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Plan</th>
                      <th>Amount</th>
                      <th>Transaction ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {member.payments.map((payment) => {
                      return (
                        <tr key={payment.id}>
                          <td>{payment.createdAt * 1000}</td>
                          <td>{payment.plan}</td>
                          <td>{payment.amount / 100}</td>
                          <td>{payment.id}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
