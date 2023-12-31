import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { logout, reset } from '../features/auth/authSlice';

function UserDashboard() {
  const { carWashId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [washHistory, setWashHistory] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      // If the user is not logged in, redirect them to the login page
      navigate(`/${carWashId}/dashboard`);
    } else {
      // Fetch user information and wash history from the server
      fetchUserData(user._id); // Assuming the user object has an _id property
    }
  }, [user, navigate, carWashId]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`https://shufti-production.up.railway.app/api/users/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setUserInfo(data);
        setWashHistory(data.washHistory || []); // Ensure it's an array
      } else {
        setError(data.message || 'Error fetching user data.');
      }
    } catch (error) {
      setError('Error fetching user data.');
      console.error('Error:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate(`/${carWashId}/dashboard`);
  };

  return (
    <Container maxWidth="sm">


      {userInfo ? (
        <div>

          <Typography variant="h5" gutterBottom style={{ color: '#4682B4', marginTop: '30px', marginBottom: '60px' }}>
            UPCOMING DISCOUNTS
          </Typography>


          {washHistory.length > 0 ? (
            <List>
              {washHistory.map((wash, index) => (
                <ListItem key={wash._id} style={{ color: '#12F329' }} >
                  <Grid container alignItems="center" spacing={0}>
                    <Grid item xs={6}>
                      <ListItemText primary={formatDate(wash.date)} />
                    </Grid>
                    <Grid item xs={2}>
                      <div style={{ position: 'relative', display: 'inline-block', backgroundColor: '#12F329', borderRadius: '50%', width: '40px', height: '40px', }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', backgroundColor: '#12F329', transform: 'translate(-50%, -50%)' }}>
                          <span style={{ fontWeight: 'bold', backgroundColor: '#12F329', color: 'white' }}>{index + 1}</span>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItemText primary="WASHED" align="right" />
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">No wash history available.</Typography>
          )}
        
        </div>
      ) : (
        <Typography variant="body1">{error ? error : 'Loading user information...'}</Typography>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px',  }}>
        <button className="btn btn-block" onClick={onLogout}>
          EXIT
        </button>
      </div>

    </Container>
  );
}

export default UserDashboard;




