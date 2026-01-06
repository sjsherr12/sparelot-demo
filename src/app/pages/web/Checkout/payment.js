import { useEffect } from "react";

const { Typography, Box } = require("@mui/material");
const { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } = require("@stripe/react-stripe-js")

const cardElementStyle = {
    style: {
        base: {
            fontSize: '20px',
            color: '#000',
            fontFamily: '"Inter", sans-serif',
            '::placeholder': {
                color: '#737373',
            },
        },
        invalid: {
            color: '#fa755a',
        },
    },
};

const StorageRequestPaymentInformation = ({
    cardComplete,
    setCardComplete
}) => {

    useEffect(() => {
        setCardComplete({
            number:false,
            expiry:false,
            cvc:false,
        })
    }, [])

    return (
        <Box>
            <Typography
                sx={{
                    mb:2,
                    color:'#737373',
                    fontSize:'.875rem',
                    fontWeight:500,
                }}
            >
                You will not be charged until your reservation start date, if it is approved by then. If your reservation is not approved, you will not be charged at all.
            </Typography>

            <Typography
                sx={{
                    mb:.5,
                    fontSize:'.875rem',
                    color:'#333',
                    fontWeight:550,
                }}
            >
                Card Number
            </Typography>

            <Box
                sx={{
                    p:1,
                    borderRadius:1,
                    border:'1px solid #bcbcbc',
                }}
            >
                <CardNumberElement options={cardElementStyle} 
                    onChange={(event) => {
                        setCardComplete((prev) => ({ ...prev, number: event.complete }));
                    }}
                />
            </Box>

            <Box
                sx={{
                    mt:2,
                    display:'flex',
                    alignItems:'center',
                    gap:2,
                }}
            >
                <Box
                    sx={{width:'100%',}}
                >
                    <Typography
                        sx={{
                            mb:.5,
                            fontSize:'.875rem',
                            color:'#333',
                            fontWeight:550,
                        }}
                    >
                        Expiration Date
                    </Typography>
                    <Box
                        sx={{
                            p:1,
                            borderRadius:1,
                            border:'1px solid #bcbcbc',
                        }}
                    >
                        <CardExpiryElement options={cardElementStyle} 
                            onChange={(event) => {
                                setCardComplete((prev) => ({ ...prev, expiry: event.complete }));
                            }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{width:'100%',}}
                >
                    <Typography
                        sx={{
                            mb:.5,
                            fontSize:'.875rem',
                            color:'#333',
                            fontWeight:550,
                        }}
                    >
                        Security Code
                    </Typography>
                    <Box
                        sx={{
                            p:1,
                            borderRadius:1,
                            border:'1px solid #bcbcbc',
                        }}
                    >
                        <CardCvcElement options={cardElementStyle}
                            onChange={(event) => {
                                setCardComplete((prev) => ({ ...prev, cvc: event.complete }));
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            <Typography
                sx={{
                    mt:2,
                    mb:3,
                    color:'#ababab',
                    fontSize:'.75rem',
                    fontWeight:450,
                }}
            >
                By providing your card information, you are allowing SpareLot to make charges to your card for future payments in compliance with their terms.
            </Typography>
        </Box>
    )
}

export default StorageRequestPaymentInformation