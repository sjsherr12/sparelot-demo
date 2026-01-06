import MKButton from "components/MKButton";
import { TextField, Button, FormHelperText, FormControl, Box, Typography, FormControlLabel, InputAdornment, IconButton, Checkbox } from "@mui/material";
import MKTypography from "components/MKTypography";
import TextSplitter from "app/sections/Extra/Display/TextSplit";
import { Apple, Email, Facebook, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import MKDatePicker from "components/MKDatePicker";
import Flatpickr from "assets/theme/components/flatpickr";
import { useReducer, useState } from "react";
import MKBox from "components/MKBox";
import { isValidDate, isValidNumber, isValidEmail, isValidPassword } from "./utils";
import user_auth from 'app/backend/fb_auth';
import GoogleLogo from 'assets/images/GoogleLogo1.webp';
import checkIfUserExists from 'app/backend/cloud/checkIfUserExists';
import { signInWithGoogle } from "app/backend/fb_cfg";
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import create_user_account from "app/backend/cloud/create_user_account";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { isMobile } from "react-device-detect";
import conditionalNavigation from "conditionalNavigation";
import { useNavigate } from "react-router-dom";
import colors from "assets/theme/base/colors";

const SignUp = () => {
    const [signUpError, setSignUpError] = useState(null);
    const [passwordError, setPasswordError] = useState(false);
    const [cnfmPassError, setCnfmPassError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [gload, setGLoad] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        cnfmpass:'',
        isOver18:'',
        agreedToTerms:'',
    })

    const handleFormChange = (e) => {
        if (signUpError) {
            setSignUpError('');
        }
        const {name, value} = e.target;

        if (name === 'password') {
            setPasswordError((!isValidPassword(value)));
        }

        if (name === 'cnfmpass' && signUpData.password.length) {
            setCnfmPassError(signUpData.password !== e.target.value);
        }

        setSignUpData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const isAnyFieldMissing = Object.values(signUpData).some(value => value.trim() === '');
        if (isAnyFieldMissing) {
            setSignUpError('Some registration info is missing.')
            return;
        }

        if (passwordError || cnfmPassError) {
            return;
        }

        setLoading(true);
        create_user_account(
            signUpData
        )
        .then(res => {
            if (res?.data?.error) {
                setLoading(false);
                setSignUpError(res.data.error)
            }
            else {
                signInWithEmailAndPassword(
                    getAuth(), 
                    signUpData.email, 
                    signUpData.password
                ).then(res => {
                    setLoading(false);
                    conditionalNavigation(navigate, '/account')
                }).catch(err => {
                    setLoading(false);
                    setSignUpError(err.message)
                })
            }
        }).catch(err => {
            setLoading(false);
            setSignUpError(err.message)
        })
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

    return (
        <>
            <Box
                component="form"
                onSubmit={handleFormSubmit}
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    gap:1.5,
                }}
            >
                <Box
                    sx={{
                        display:'flex',
                        width:'100%',
                        gap:4,
                    }}
                >
                    <TextField
                        required
                        fullWidth
                        type="text"
                        name="firstName"
                        label="First Name"
                        placeholder='Enter First Name'
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
                        value={signUpData.firstName}
                        onChange={handleFormChange}
                    />
                    <TextField
                        required
                        fullWidth
                        type="text"
                        name="lastName"
                        label="Last Name"
                        placeholder='Enter Last Name'
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
                        value={signUpData.lastName}
                        onChange={handleFormChange}
                    />
                </Box>
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
                    value={signUpData.email}
                    onChange={handleFormChange}
                />
                <TextField
                    required
                    fullWidth
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    label="Password"
                    placeholder="Enter Password"
                    variant="standard"
                    autoComplete="off"
                    InputProps={{
                        style: {
                            fontWeight: 500,
                        },
                        endAdornment: (
                            <InputAdornment position="end" tabIndex="-1">
                                <IconButton
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    edge="end"
                                    tabIndex="-1"
                                    sx={{
                                        transform: 'scale(0.85)',
                                        mb: 0.25,
                                    }}
                                >
                                    {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{
                        style: {
                            fontWeight: 475,
                        },
                    }}
                    sx={{
                        "& .MuiInputBase-root": {
                            fontSize: "1rem",
                        },
                        "& .MuiInputLabel-root": {
                            fontSize: "1rem",
                        },
                    }}
                    value={signUpData.password}
                    onChange={handleFormChange}
                />
                <Typography
                    sx={{
                        fontSize:{xs:10.5,mb:11,lg:12},
                        fontWeight:500,
                        mt:-1.5,
                        mb:-1,
                        color:passwordError ? '#f00' : 'unset',
                    }}
                >
                    At least 8 characters, 1 number & 1 special character.
                </Typography>
                <TextField
                    required
                    fullWidth
                    type={passwordVisible ? "text" : "password"}
                    name="cnfmpass"
                    label="Confirm Password"
                    placeholder='Confirm Your Password'
                    variant="standard"
                    autoComplete="off"
                    InputProps={{
                        style:{
                            fontWeight:500,
                        },
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
                    value={signUpData.cnfmpass}
                    onChange={handleFormChange}
                />
                <Typography
                    sx={{
                        fontSize:{xs:10.5,mb:11,lg:12},
                        fontWeight:500,
                        mt:-1.5,
                        color:cnfmPassError ? '#f00' : 'unset',
                    }}
                >
                    Passwords must match each other.
                </Typography>

                <Box
                    sx={{
                        mb:-1,
                    }}
                >
                    <FormControlLabel
                        sx={{
                            display:'flex',
                            alignItems:'center',
                        }}
                        name='isOver18'
                        required
                        control={<Checkbox />}
                        label={<>I confirm that I am 18 years of age or older.</>}
                        onChange={handleFormChange}
                    />

                    <FormControlLabel
                        sx={{
                            display:'flex',
                            alignItems:'center',
                        }}
                        required
                        name='agreedToTerms'
                        control={<Checkbox />}
                        label={
                            <>
                            I agree to the{' '}
                            <a style={{ color: colors.info.main }} href="/terms-of-service" target="_blank" rel="noopener noreferrer">
                                Terms of Service
                            </a>.
                            </>
                        }
                        onChange={handleFormChange}
                    />
                </Box>

                <Typography
                    sx={{
                        display:signUpError ? 'block' : 'none',
                        color:'#f00',
                        fontSize:15,
                        fontWeight:500,
                    }}
                >
                    {signUpError}
                </Typography>

                <MKButton
                    color={loading ? 'light' : 'info'}
                    disabled={loading}
                    type="submit"
                    sx={{
                        mt:2,
                        py:2.25,
                        width:'100%',
                        fontSize:15,
                        fontWeight:475,
                        textTransform:'none',
                    }}
                >
                    {!loading && `Sign Up`}
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
                        Sign up with Google
                    </>}
                    {gload && <LoadingSpinner compact/>}
                </MKButton>
            </>}
        </>
    )
}

export default SignUp;