import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import TextSplitter from "app/sections/Extra/Display/TextSplit";
import FrontHousePic from 'assets/images/FrontHousePic.webp'
import SignupLogo from 'assets/logos/SignupLogo.png'
import colors from "assets/theme/base/colors";
import MKButton from "components/MKButton";
import { useState } from "react";
import GoogleLogo from 'assets/images/GoogleLogo.webp'
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { browserLocalPersistence, browserSessionPersistence, getAuth, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import { signInWithGoogle } from "app/backend/fb_cfg";
import Hr from "app/utils/Hr";
import { isMobile } from "react-device-detect";
import conditionalNavigation from "conditionalNavigation";

const SignIn = () => {
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('rd')
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [gload, setGLoad] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [loadingForgotPw, setLoadingForgotPw] = useState(false);
    const [rememberUserLogin, setRememberUserLogin] = useState(true);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email:'',
        password:'',
    })

    const handleFormChange = (e) => {
        if (loginError) {
            setLoginError('');
        }
        const {name, value} = e.target;
        setLoginData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        const persistence = rememberUserLogin ? browserLocalPersistence : browserSessionPersistence;
        setPersistence(
            getAuth(), 
            persistence
        ).then(res => {
            signInWithEmailAndPassword(
                getAuth(), 
                loginData.email, 
                loginData.password
            ).then(res => {
                setLoading(false);
                if (redirect) {
                    conditionalNavigation(navigate, redirect);
                }
                else {
                    if (window.location.href.endsWith('/login')) {
                        window.location.href = '/account'
                    }
                    else {
                        window.location.reload();
                    }
                }
            }).catch(err => {
                setLoading(false);
                setLoginError('Invalid email or password entered.');
            })
        }).catch(err => {
            setLoginError(`Error signing in: ${err.message}`)
        })
    }

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setLoginError('')
        setLoadingForgotPw(true);
        if (loginData.email) {
            sendPasswordResetEmail(
                getAuth(), 
                loginData.email
            ).then(res => {
                setLoadingForgotPw(false);
                setForgotPassword(true);
            }).catch(err => {
                setLoadingForgotPw(false);
                setLoginError(`Failed to send password reset email: ${err.message}`)
            })
        }
        else {
            setLoginError('Enter the account email to receive a password reset.')
            setLoadingForgotPw(false);
        }
    }

    const handleGoogleSignIn = async (e) => {
        setGLoad(true);
        try {
            const res = await signInWithGoogle();
            conditionalNavigation(navigate, '/account');
        } catch (err) {
            // handle error
        } finally {
            setGLoad(false);
        }
    };


    if (forgotPassword) {
        return (<>
            <Hr sx={{mt:1}}/>
            <Typography
                variant='h3'
                sx={{
                    mt:2,
                }}
            >
                Reset Password
            </Typography>
            <Typography
                sx={{
                    fontSize:16,
                    fontWeight:480,
                }}
            >
                {`We have sent a password reset email to ${loginData.email}. Please follow the relevant instructions in order to reset your password and retry sign-in. Thank you for your cooperation.`}
            </Typography>
            <Typography
                sx={{
                    mt:2,
                    fontSize:15,
                    fontWeight:500,
                    cursor:'pointer',
                    color:colors.info.main,
                }}
                onClick={() => setForgotPassword(false)}
            >
                ← Back to Login
            </Typography>
            <Hr sx={{mt:2}}/>
        </>)
    }
    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmitLogin}
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    gap:1,
                }}
            >
                <TextField
                    required
                    fullWidth
                    type="email"
                    name="email"
                    label="Email"
                    placeholder='Enter Email'
                    variant="standard"
                    autoComplete="off"
                    InputProps={{
                        style:{
                            fontWeight:500,
                        }
                    }}
                    InputLabelProps={{
                        style:{
                            fontWeight:475,
                        }
                    }}
                    sx={{
                        "& .MuiInputBase-root": {
                            fontSize: "1rem",
                        },
                        "& .MuiInputLabel-root": {
                            fontSize: "1rem",
                        },
                    }}
                    value={loginData.email}
                    onChange={handleFormChange}
                />
                <TextField
                    required
                    fullWidth
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    label="Password"
                    placeholder='Enter Password'
                    variant="standard"
                    autoComplete="off"
                    InputProps={{
                        style:{
                            fontWeight:500,
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                edge="end"
                                sx={{
                                    transform:'scale(0.85)',
                                    mb:.25,
                                }}
                                >
                                {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{
                        style:{
                            fontWeight:475,
                        }
                    }}
                    sx={{
                        "& .MuiInputBase-root": {
                            fontSize: "1rem",
                        },
                        "& .MuiInputLabel-root": {
                            fontSize: "1rem",
                        },
                    }}
                    value={loginData.password}
                    onChange={handleFormChange}
                />

                <Typography
                    sx={{
                        display:loginError ? 'block' : 'none',
                        color:'#f00',
                        fontSize:13,
                        fontWeight:500,
                    }}
                >
                    {loginError}
                </Typography>

                <Box
                    sx={{
                        my:1,
                        display:'flex',
                        alignItems:'center',
                    }}
                >
                    <FormControlLabel
                        label="Remember me"
                        control={
                            <Checkbox
                                checked={rememberUserLogin}
                                onClick={(e) => {
                                    setRememberUserLogin(e.target.checked)
                                }}
                                sx={{
                                    mr:'auto',
                                    userSelect:'none',
                                }}
                            />
                        }
                        sx={{
                            userSelect:'none',
                            fontWeight:550,
                            fontFamily:'Montserrat, sans-serif',
                        }}
                    />

                    <Typography
                        sx={{
                            ml:'auto',
                            fontSize:12,
                            fontWeight:600,
                            cursor:'pointer',
                            color:colors.info.main,
                        }}
                        onClick={handleForgotPassword}
                    >
                        {loadingForgotPw && <LoadingComponent compact />}
                        {!loadingForgotPw && 'Forgot password?'}
                    </Typography>
                </Box>

                <MKButton
                    color={loading ? 'light' : 'info'}
                    disabled={loading}
                    type="submit"
                    sx={{
                        mt:.5,
                        py:2.25,
                        width:'100%',
                        fontSize:15,
                        fontWeight:475,
                        textTransform:'none',
                    }}
                >
                    {!loading && `Log In`}
                    {loading && 
                        <LoadingSpinner compact/>
                    }
                </MKButton>
            </Box>

            {!isMobile && <>
                <TextSplitter text='or'/>

                <MKButton
                    disabled={gload}
                    sx={{
                        width:'100%',
                        fontSize:15,
                        fontWeight:500,
                        textTransform:'none',
                        color:'#454545',
                        border:'1px solid #454545',
                        display:'flex',
                        gap:1,
                    }}
                    onClick={handleGoogleSignIn}
                >
                    {!gload && <>
                        <img src={GoogleLogo} width={35} height={35}/>
                        Sign in with Google
                    </>}
                    {gload && <LoadingSpinner compact/>}
                </MKButton>
            </>}
        </>
    )
}

export default SignIn;