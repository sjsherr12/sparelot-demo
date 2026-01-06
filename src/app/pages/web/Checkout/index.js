import { Add, ArrowBackIosNew, ArrowDownward, AttachMoneyOutlined, CalendarMonthOutlined, Check, Close, KeyboardArrowDown, Remove, Style } from "@mui/icons-material";
import { Box, Collapse, Icon, IconButton, Tab, Tabs, Tooltip, Typography, useMediaQuery } from "@mui/material";
import AdaptiveModal from "app/sections/Modal/Adaptive";
import WarnedAction from "app/sections/Options/Action";
import { useState } from "react";
import StorageRequestDescription from "./description";
import Hr from "app/utils/Hr";
import StorageRequestRenterInfo from "./personal";
import colors from "assets/theme/base/colors";
import MKButton from "components/MKButton";
import StorageRequestPaymentInformation from "./payment";
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { LoadingSpinner } from "app/utils/loading/component";
import create_reservation from "app/backend/cloud/create_reservation";
import { useDatePricing } from "../Listing/prices";
import { useNavigate } from "react-router-dom";
import conditionalNavigation from "conditionalNavigation";

const Checkout = ({
    open,
    onClose,
    listing,
    listingId,
}) => {
    const {user} = useUserAuthState();
    const [warn, setWarn] = useState(false);
    const [step, setStep] = useState(0);
    const [tab, setTab] = useState('steps')
    const maxSteps = 2;
    const isMobile = useMediaQuery('(max-width:991px)')

    const [storageDescription, setStorageDescription] = useState('')
    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [idPicture, setIdPicture] = useState(null);
    const [idPictureBase64, setIdPictureBase64] = useState('');
    const [cardComplete, setCardComplete] = useState({
        number: false,
        expiry: false,
        cvc: false
      });

    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [finishing, setFinishing] = useState(false);
    const [finishedStatus, setFinishedStatus] = useState('')
    const {getDays, getMonths, getDayPrice, getMonthPrice, getSpareLotPrice, getTotalPrice, setListingPrice, onlyMonths, dateRange, setDateRange, setOnlyMonths} = useDatePricing();

    const validations = {
        0: () => storageDescription !== '',
        1: () => fullName !== '' && address !== '' && idPicture && idPictureBase64 !== '',
        2: () => validations[0]() && validations[1]() && (elements && cardComplete?.number && cardComplete?.expiry && cardComplete?.cvc)
    };

    const steps = [
        {
            name:'Storage Description',
            component: StorageRequestDescription,
            props: {
                storageDescription,
                setStorageDescription,
            }
        },
        {
            name:'Personal Details',
            component: StorageRequestRenterInfo,
            props: {
                fullName,
                setFullName,
                address,
                setAddress,
                idPicture,
                setIdPicture,
                idPictureBase64,
                setIdPictureBase64,
            }
        },
        {
            name:'Payment Information',
            component: StorageRequestPaymentInformation,
            props: {
                cardComplete,
                setCardComplete,
            }
        },
    ]

    const finishRequest = () => {
        if (!stripe || !elements) {
            alert('Could not load payment information. Please try re-entering card info.')
        }

        stripe.createPaymentMethod({
            type:'card',
            card:elements.getElement(CardNumberElement),
            billing_details: {
                name: fullName,
                email: user.email,
            },
        }).then(res => {
            setFinishing(true)
            create_reservation({
                listingId,

                dateRange,

                storeDesc: storageDescription,

                fullName,
                address: address,
                idPicture: idPictureBase64,
                payment_id: res.paymentMethod.id,
                user_email: user.email,
            }).then(res => {
                if (res?.data?.error) {
                    setFinishing(false);
                    setFinishedStatus(res?.data?.message)
                } else {
                    conditionalNavigation(navigate, `/messages/${res.data.newChatId}`)
                }
            }).catch(err => {
                setFinishing(false);
                setFinishedStatus(err?.message)
            });
        }).catch(error => {
            setFinishing(false);
            setFinishedStatus('You have not filled out all payment details yet.')
        })
    }

    return (<>
        <AdaptiveModal
            open={open}
            onClose={() => setWarn(true)}
            title={'Storage Request'}
            noSwipedownMobile
            maxWidth={1000}
            C_leftCornerOptionIcon={Close}
            C_leftCornerOptionClick={() => setWarn(true)}
            sx={{
                pb:{xs:8,lg:2},
                minHeight: {
                    xs: '100dvh',
                    lg:finishing?'500px':'unset',
                }
            }}
            parent_sx={{
                bgcolor:'#efefef',
            }}
        >
            {finishing ? (
                <Box
                    sx={{
                        minHeight:'inherit',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <LoadingSpinner />
                </Box>
            ) : (
                <Box
                    sx={{
                        gap:2,
                        width:'100%',
                        display:'flex',
                        flexDirection:{xs:'column',lg:'row'}
                    }}
                >
                    <Tabs
                        value={tab}
                        onChange={(e, v) => setTab(v)}
                        sx={{
                            mx:-.5,
                            display:{xs:'flex',lg:'none'},
                            width:'calc(100% + 8px)',
                        }}
                    >
                        <Tab                                     
                            value='steps' 
                            label='File request'
                            sx={{
                                width:'100%',
                            }}
                        />
                        <Tab
                            value='info' 
                            label='Info overview'
                            sx={{
                                width:'100%',
                            }}
                        />
                    </Tabs>
                    <Box
                        sx={{
                            gap:2,
                            width:{xs:'100%',lg:'65%'},
                            display:{xs:tab==='steps' ? 'flex' : 'none', lg:'flex'},
                            flexDirection:'column',
                        }}
                    >
                        {steps.map((iStep, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    ...Styles.Container,
                                    pr:1,
                                    bgcolor:step === idx ? '#fff' : validations[idx]() ? colors.info.main : '#fff',
                                    transition: 'all .25s',
                                }}
                            >
                                <Box
                                    sx={{
                                        display:"flex", 
                                        alignItems:"center",
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setStep(idx)
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize:'1.2rem',
                                            color:step === idx ? '#000' : validations[idx]() ? '#fff' : '#000',
                                            fontWeight:550,
                                        }}
                                    >
                                        {iStep.name}
                                    </Typography>
                                    <IconButton
                                        size='medium'
                                        sx={{ 
                                            ml: 'auto',
                                            color: step === idx ? '#000' : validations[idx]() ? '#fff' : '#000',
                                        }}    
                                    >
                                        {step === idx ? 
                                            <Remove/> 
                                            :
            
                                            <>
                                            {validations[idx]()?
                                                <Check />
                                                :
                                                <Add />
                                            }
                                            </>
                                        }
                                    </IconButton>
                                </Box>

                                <Collapse in={step === idx} timeout="auto" unmountOnExit>
                                    <Box
                                        sx={{
                                            pr:1,
                                            pb:1,
                                        }}
                                    >
                                        <Hr sx={{mt:.5,mb:2}}/>
                                        <iStep.component {...iStep.props}/>
                                        <Box

                                            sx={{
                                                width:'100%',
                                                mt:2,
                                                display:'flex',
                                                alignItems:'center',
                                            }}
                                        >
                                            <MKButton
                                                disabled={step===0}
                                                onClick={() => {
                                                    setStep(step-1)
                                                }}
                                                color='light'
                                                sx={Styles.ActionButton}
                                            >
                                                Back
                                            </MKButton>
                                            <MKButton
                                                disabled={!(validations[idx]())}
                                                onClick={() => {
                                                    if (step === maxSteps) {
                                                        finishRequest();
                                                    }
                                                    else {
                                                        setStep(step+1)
                                                    }
                                                }}
                                                color='info'
                                                sx={{
                                                    ...Styles.ActionButton,
                                                    fontSize:'1.2rem',
                                                    ml:'auto',
                                                }}
                                            >
                                                {step>=maxSteps?'Send request':'Next'}
                                            </MKButton>
                                        </Box>
                                    </Box>
                                </Collapse>
                            </Box>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            gap:2,
                            width:{xs:'100%',lg:'35%'},
                            display:{xs:tab==='info'?'flex':'none',lg:'flex'},
                            flexDirection:'column',
                        }}
                    >
                        <Box
                            sx={{
                                ...Styles.Container,
                                gap:2,
                                py:2,
                            }}
                        >
                            <Box
                                sx={{
                                    display:'flex',
                                    alignItems:'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color:'#000',
                                    }}
                                >
                                    Reservation
                                </Typography>
                                <Icon
                                    sx={{
                                        ml:'auto',
                                        height:24,
                                        display:'flex',
                                        alignItems:'center',
                                        color:'#ababab',
                                    }}
                                >
                                    <CalendarMonthOutlined />
                                </Icon>
                            </Box>

                            <Box
                                sx={Styles.Section}
                            >
                                <Typography
                                    sx={{
                                        color:'#737373',
                                        fontSize:'.875rem',
                                    }}
                                >
                                    Start Date
                                </Typography>
                                <Typography
                                    sx={{
                                        color:'#333',
                                        fontSize:'1.2rem',
                                    }}
                                >
                                    {(new Date(dateRange[0]).toLocaleDateString('en-US', {weekday:'long', month:'long',day:'2-digit',year:'numeric'}))}
                                </Typography>
                            </Box>

                            <Box
                                sx={Styles.Section}
                            >
                                <Typography
                                    sx={{
                                        color:'#737373',
                                        fontSize:'.875rem',
                                    }}
                                >
                                    End Date
                                </Typography>
                                <Typography
                                    sx={{
                                        color:'#333',
                                        fontSize:'1.2rem',
                                    }}
                                >
                                    {(new Date(dateRange[1]).toLocaleDateString('en-US', {weekday:'long', month:'long',day:'2-digit',year:'numeric'}))}
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                ...Styles.Container,
                                gap:2,
                                py:2,
                                alignItems:'center',
                                width:'100%',
                            }}
                        >
                            <Box
                                sx={{
                                    width:'100%',
                                    display:'flex',
                                    alignItems:'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color:'#000',
                                    }}
                                >
                                    Pricing
                                </Typography>
                                <Icon
                                    sx={{
                                        ml:'auto',
                                        height:24,
                                        display:'flex',
                                        alignItems:'center',
                                        color:'#ababab',
                                    }}
                                >
                                    <AttachMoneyOutlined />
                                </Icon>
                            </Box>

                            <Box
                                sx={Styles.Section}
                            >
                                <Typography
                                    sx={{
                                        color:'#737373',
                                        fontSize:'.875rem',
                                    }}
                                >
                                    {onlyMonths ? `$${listing?.logistics?.price} / month${getMonths()>1?'s':''}`:`$${listing?.logistics?.price} / mo × ${getDays()} day${(getDays() !== 1 && 's') || ''}`}
                                </Typography>
                                <Typography
                                    sx={{
                                        color:'#333',
                                        fontSize:'1.2rem',
                                    }}
                                >
                                    {onlyMonths ?`$${getMonthPrice()}.00`:`$${(getDayPrice()).toFixed(2)}`} {onlyMonths && '/ mo'}
                                </Typography>
                            </Box>
                            <Box
                                sx={Styles.Section}
                            >
                                <Typography
                                    sx={{
                                        color:'#737373',
                                        fontSize:'.875rem',
                                    }}
                                >
                                    SpareLot transactional fee
                                </Typography>
                                <Typography
                                    sx={{
                                        color:'#333',
                                        fontSize:'1.2rem',
                                    }}
                                >
                                    {`$${getSpareLotPrice()}`} {onlyMonths && '/ mo'}
                                </Typography>
                            </Box>
                            <Icon
                                sx={{
                                    width:32,
                                    height:32,
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    boxShadow:'0px 2px 6px rgba(0,0,0,.25)',
                                    borderRadius:8,
                                }}
                            >
                                <ArrowDownward />
                            </Icon>
                            <Box
                                sx={{
                                    ...Styles.Section,
                                    bgcolor:colors.info.main,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color:'#fff',
                                        fontSize:'.875rem',
                                    }}
                                >
                                    Total charge
                                </Typography>
                                <Typography
                                    sx={{
                                        color:'#fff',
                                        fontSize:'1.2rem',
                                    }}
                                >
                                    {`$${getTotalPrice()}`} {onlyMonths && '/ mo'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
            
        </AdaptiveModal>

        <AdaptiveModal
            open={finishedStatus !== ''}
            onClose={() => setFinishedStatus('')}
            title='Request Error'
            sx={{
                pb:{xs:8,lg:2},
                bgcolor:'#efefef',
            }}
            parent_sx={{
                pb:0,
            }}
        >
            <Typography
                sx={{
                    fontSize:'1rem',
                    fontWeight:500,
                    textAlign:'center',
                }}
            >
                Error creating reservation request: {finishedStatus}
            </Typography>
        </AdaptiveModal>

        <WarnedAction
            color='error'
            open={warn}
            onClick={() => {
                setWarn(false);
                onClose();
            }}
            onClose={() => setWarn(false)}
            warningTitle='Are you sure you want to exit?'
            warningDescription='Your progress will not be saved.'
            actionTitle='Exit'
        />
    </>)
}

export default Checkout;

const Styles = {
    ActionButton: {
        py:.75,
        px:3,
        minHeight:'unset',
        fontWeight:500,
        fontSize:'1rem',
    },
    Container: {
        px:2,
        py:1,
        bgcolor:'#fff',
        boxShadow:'0px 2px 6px rgba(0,0,0,.25)',
        borderRadius:2,
        display:'flex',
        flexDirection:'column',
    },
    Section: {
        px:2,
        pt:1.5,
        pb:1.25,
        width:'100%',
        border:'1px solid #ededed',
        borderRadius:2,
    }
}