import { Info, InfoOutlined } from "@mui/icons-material";
import { Box, Fade, Icon, Tab, Tabs, Typography } from "@mui/material";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import DescriptiveToggle from "app/sections/Options/Toggle/descriptive";
import { createContext, useContext, useState } from "react";
import './styles.css'
import { doc, getFirestore, setDoc } from "firebase/firestore";
import _ from "lodash";

const TogglerSection = ({prf}) => {
    const {user, userImpl} = useUserAuthState();
    const [loading, setLoading] = useState(false);
    const [appToggled, setAppToggled] = useState(userImpl?.preferences?.notifications?.app?.[prf.property] || false);
    const [emailToggled, setEmailToggled] = useState(userImpl?.preferences?.notifications?.email?.[prf.property] || false);

    const setProperty = async (obj) => {
        setLoading(true);
        await setDoc(
            doc(getFirestore(), `/users/${user?.uid}`),
            {
                preferences: {
                    notifications: obj,
                }
            },
            {merge:true},
        )
        setLoading(false);
    }
                
    return (
        <Box
            sx={{
                py:4,
                gap:4,
                display:'flex',
                flexDirection:{xs:'column',lg:'row'},
                alignItems:'center',
                borderBottom:'1px solid #efefef',
            }}
        >
            <Box
                sx={{
                    width:'100%',
                }}
            >
                <Typography
                    sx={{
                        color:'#000',
                        fontWeight:500,
                        fontSize:{xs:'.875rem',lg:'1rem'}
                    }}
                >
                    {prf.name}
                </Typography>
                <Typography
                    sx={{
                        color:'#737373',
                        fontWeight:450,
                        fontSize:{xs:'.75rem',lg:'.875rem'}
                    }}
                >
                    {prf.desc}
                </Typography>
            </Box>
            <Box
                sx={{
                    gap:1,
                    ml:'auto',
                    width:{xs:'100%',lg:'fit-content'},
                    display:'flex',
                    alignItems:'center',
                }}
            >
                <Box
                    onClick={async () => {
                        const bnew = !appToggled;
                        setAppToggled(bnew);
                        await setProperty({
                            app: {
                                [prf.property]: bnew
                            }
                        })
                        _.set(userImpl, `preferences.notifications.app.${prf.property}`, bnew)
                    }}
                >
                    <div className="container" >
                        <div className={`switch ${appToggled ? "checked" : ""}`}>
                            <span className="slider"></span>
                        </div>
                    </div>
                </Box>
                <Typography
                    sx={{
                        color:'#000',
                        fontWeight:500,
                        whiteSpace:'nowrap',
                        fontSize:{xs:'.75rem',lg:'.875rem'},
                    }}
                >
                    Website
                </Typography>

                <Box
                    sx={{
                        ml:2,
                    }}
                    onClick={async () => {
                        const bnew = !emailToggled
                        setEmailToggled(bnew);
                        await setProperty({
                            email: {
                                [prf.property]: bnew
                            }
                        })
                        _.set(userImpl, `preferences.notifications.email.${prf.property}`, bnew)
                    }}
                >
                    <div className="container" >
                        <div className={`switch ${emailToggled ? "checked" : ""}`}>
                            <span className="slider"></span>
                        </div>
                    </div>
                </Box>
                <Typography
                    sx={{
                        color:'#000',
                        fontWeight:500,
                        whiteSpace:'nowrap',
                        fontSize:{xs:'.75rem',lg:'.875rem'},
                    }}
                >
                    Email
                </Typography>
            </Box>
            
        </Box>
    )
}

const EditNotificationPreferences = () => {
    const preferences = [
        {
            name: 'Conversations',
            desc: 'Stay in the loop with instant notifications when users or hosts message you about inquiries on SpareLot.',
            property: 'chats',
        },
        {
            name: 'Reservations',
            desc: 'Get updates on confirmations, changes, and completions for all reservations related to you.',
            property: 'reservations',
        },
        {
            name: 'Reviews',
            desc: 'Receive notifications when users leave feedback about their experience with you while renting or hosting.',
            property: 'reviews',
        }
    ]

    return (
        <Box
            sx={{
                px:4,
                width:'100%',
                display:'flex',
                flexDirection:'column',
            }}
        >
            {preferences.map((prf, idx) => (
                <TogglerSection key={idx} prf={prf} />
            ))}
        </Box>
    )
}

export default EditNotificationPreferences;