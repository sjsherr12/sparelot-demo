import { Add, CheckCircle, Close, Remove } from "@mui/icons-material";
import { Box, Button, Collapse, IconButton, Modal, TextField, Typography } from "@mui/material";
import delete_account from "app/backend/cloud/delete_account";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import AdaptiveModal from "app/sections/Modal/Adaptive";
import ReauthComponent from "app/sections/Modal/UserAuth/Reauth";
import { useReauth } from "app/sections/Modal/UserAuth/Reauth/context";
import { LoadingSpinner } from "app/utils/loading/component";
import colors from "assets/theme/base/colors";
import conditionalNavigation from "conditionalNavigation";
import { AnimatePresence, motion } from "framer-motion";
import isStandalone from "isStandalone";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const deletionPolicy = [
    {
        "title": "Irreversible Action",
        "description": "Deleting your account is permanent. Once confirmed, neither you nor anyone else can recover your account, data, or history."
    },
    {
        "title": "Notifying other Users",
        "description": "Chats you have participated in will show that you are now a deleted user. Other users will see that the conversation is with a nonexistent account to prevent confusion."
    },
    {
        "title": "Listings, Drafts, and Reservations",
        "description": "All your listings, drafts, and reservations will be permanently deleted."
    },
    {
        "title": "Hosts with Active Reservations",
        "description": "If you have active reservations as a host, they will all be canceled, and guests will be refunded for the unused period. This refund will come directly from your potential payout."
    },
    {
        "title": "Guests with Reservations",
        "description": "Any reservations you have pending with a host will be deleted, and the chat will indicate that you have deleted your account."
    },
    {
        "title": "Refund & Payment Policy",
        "description": "If you have an active reservation as a guest, you will not receive a refund for the current renting period, as deleting your account is sudden and unexpected for the host. However, you will not be charged for any additional renting periods beyond this date."
    }
]

const DeleteAccount = () => {
    const {user} = useUserAuthState();
    const [openIndex, setOpenIndex] = useState(-1);
    const [seen, setSeen] = useState([])
    const [loading, setLoading] = useState(false);
    const [reauth, setReauth] = useState(false);
    const {requestReauth} = useReauth();
    const navigate = useNavigate();

    const handleDelete = () => {
        setLoading(true);
        setReauth(true);
        requestReauth(
        ).then(res => {
            setReauth(false);
            delete_account(
            ).then(res => {
                conditionalNavigation(navigate, '/')
            })
        }).catch(err => {
            setLoading(false);
            alert('Something went wrong. Please try again later.')
        })
    }

    return (
        <Box
            sx={{
                px:3,
                display:'flex',
                flexDirection:'column',
            }}
        >
            <Typography
                sx={{
                    fontSize:{xs:'1.5rem',sm:'1.75rem',lg:'2rem'},
                    color:'#000',
                    fontWeight:650,
                }}
            >
                We are sorry to see you go.
            </Typography>
            <Typography
                sx={{
                    mt:1,
                    mb:2,
                    color:'#737373',
                    fontSize:'1rem',
                }}
            >
                Before we let you delete your account, we want to make sure you know the full implications of such an action. Please expand and read the following policies below to ensure you are making the right decision.
            </Typography>

            {deletionPolicy.map((policy, index) => (
                <Box
                    key={index}
                    sx={{
                        py:1,
                        userSelect:'none',
                        borderBottom:'1px solid #ededed',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s, border-color 0.3s',
                    }}
                    onClick={() => {
                        if (index === openIndex) {
                            setOpenIndex(-1)
                        }
                        else {
                            if (!seen.includes(index)) {
                                setSeen((prev) => [...prev, index])
                            }
                            setOpenIndex(index)
                        }
                    }}
                >
                    <Box display="flex" alignItems="center">
                        <Typography
                            sx={{
                                fontSize:'1rem',
                                color:'#000',
                                fontWeight:500,
                            }}
                        >
                            {policy.title}
                        </Typography>
                        <IconButton sx={{ marginLeft: 'auto' }}>
                            {openIndex === index ? 
                                <Remove sx={{height:'24px', width:'auto',color:'#000'}}/> 
                                :

                                <>
                                    {seen.includes(index)?
                                        <CheckCircle sx={{height:'24px', width:'auto',color:colors.success.main}}/>
                                        :
                                        <Add sx={{height:'24px', width:'auto',color:'#000'}}/>
                                    }
                                </>
                            }
                        </IconButton>
                    </Box>

                    <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                        <Typography
                            sx={{
                                my:1,
                                color:'#333',
                                fontSize:'.875rem',
                                fontWeight:450,
                            }}
                        >
                            {policy.description}
                        </Typography>
                    </Collapse>
                </Box>
            ))}

            <Button
                onClick={handleDelete}
                disabled={(seen.length < 6 || loading)}
                sx={{
                    mt:4,
                    bgcolor:`${(seen.length < 6 || loading) ? '#bcbcbc' : colors.error.main} !important`,
                    color:'#fff !important',
                    fontSize:'1rem',
                    fontWeight:500,
                }}
            >
                {loading?
                    <LoadingSpinner compact />

                    :

                    'Delete your Account'
                }

            </Button>

            <AdaptiveModal
                open={reauth}
                onClose={() => {
                    setReauth(false);
                    setLoading(false);
                }}
                title='Reauthenticate'
                maxWidth={500}
            >
                <ReauthComponent
                    description='This action is irreversible. To make sure it is really you trying to delete your account, please enter your password for verification.'
                />
            </AdaptiveModal>
        </Box>
    )
}

export default DeleteAccount;