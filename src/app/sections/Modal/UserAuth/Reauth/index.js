import React, { useState } from 'react';
import { useReauth } from './context'; // Adjust the path as necessary
import { getAuth, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useModal } from '../../Parent/context';
import MKBox from 'components/MKBox';
import { InputBase, TextField, Typography } from '@mui/material';
import MKTypography from 'components/MKTypography';
import MKButton from 'components/MKButton';

const ReauthComponent = ({description}) => {
  const { completeReauth, failReauth } = useReauth();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('')
  const {closeModal} = useModal();

  const handleReauth = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && password) {

        const credential = EmailAuthProvider.credential(user.email, password);
        closeModal();

        try {
            await reauthenticateWithCredential(
                user, 
                credential
            ).then(res => {
                completeReauth(credential);
            }).catch(err => {
                if (err.message === 'Firebase: Error (auth/invalid-credential).') {
                    setPasswordError('Wrong password entered')
                }
            });
        } catch (err) {
            failReauth(err);
        }
    } 
  };

  return (
    <MKBox 
        sx={{
            width:'100%',
        }}  
    >
        <form onSubmit={handleReauth}>
            <MKBox
            >
                <Typography
                >
                    {description}
                </Typography>
                <TextField
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{
                        my:2,
                        borderRadius:2,
                    }}
                    fullWidth
                />
                <Typography
                    sx={{
                        color:'#f00',
                        mt:-.5,
                        mb:1,
                        fontSize:{xs:'.5rem',lg:'.75rem'}
                    }}
                >
                    {passwordError}
                </Typography>
                <MKButton
                    color='info'
                    type="submit"
                    fullWidth
                    sx={{
                        fontWeight:500,
                        fontSize:'1.2rem',
                    }}
                >
                    Authenticate
                </MKButton>
            </MKBox>
        </form>
    </MKBox>
  );
};

export default ReauthComponent;