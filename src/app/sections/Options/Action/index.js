import { Check, Close } from "@mui/icons-material"
import { Box, Modal, Typography } from "@mui/material"
import { LoadingSpinner } from "app/utils/loading/component";
import MKButton from "components/MKButton"
import { useState } from "react";

const WarnedAction = ({
    sx,
    open,
    color,
    onClick,
    onClose,
    warningTitle,
    warningDescription,
    actionTitle,
    status,
}) => {
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        await onClick();
        setLoading(false);
    }
    
    if (loading) {
        return (
            <Modal
                open={loading}
                sx={{
                    zIndex:100000,
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                }}
                closeAfterTransition
            >
                <Box
                    sx={{
                        px:4,
                        py:2,
                        borderRadius:4,
                        bgcolor:'#fff',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <LoadingSpinner />
                </Box>
            </Modal>
        )
    }
    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                zIndex:100000,
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
            }}
            closeAfterTransition
        >
            <Box
                sx={{
                    px:3,
                    overflow:'hidden',
                    pt:3,
                    borderRadius:2,
                    width:550,
                    maxWidth:'80vw',
                    display:'flex',
                    bgcolor:'#fff',
                    alignItems:'center',
                    flexDirection:'column',
                    justifyContent:'center',
                }}
            >
               <Typography
                    sx={{
                        width:'100%',
                        color:'#000',
                        fontWeight:600,
                        fontSize:{xs:'1rem',lg:'1.5rem'},
                        textAlign:'center',
                    }}
                >
                    {status ? '' : warningTitle}
                </Typography>
                <Typography
                    sx={{
                        mt:1,
                        width:'100%',
                        color:'#737373',
                        fontWeight:400,
                        fontSize:{xs:'.75rem',lg:'.9rem'},
                        textAlign:'center',
                    }}
                >
                    {status || warningDescription}
                </Typography>
                
                <Box
                    sx={{
                        mt:{xs:3,lg:4},
                        gap:{xs:0,lg:2},
                        mb:{xs:0,lg:2},
                        mx:{xs:-4,lg:-1,},
                        height:40,
                        
                        width:{xs:'calc(100% + 64px)',lg:'calc(100% + 16px)'},
                        display:'flex',
                        alignItems:'center',
                    }}
                >
                    <MKButton
                        sx={{
                            height:'100%',
                            width:'100%',
                            bgcolor:'#efefef',
                            fontSize:{xs:'.875rem',lg:'1rem'},
                            fontWeight:500,
                            color:'#737373',
                            borderRadius:{xs:0,lg:2},
                            textAlign:'center',
                        }}
                        onClick={onClose}
                    >
                        {status ? 'Dismiss' : 'Cancel'}
                    </MKButton>
                    <MKButton
                        color={color || 'light'}
                        sx={{
                            height:'100%',
                            width:'100%',
                            display:status?'none':'flex',
                            fontSize:{xs:'1rem',lg:'1.25rem'},
                            fontWeight:500,
                            color:'#fff',
                            borderRadius:{xs:0,lg:2},
                        }}
                        onClick={handleConfirm}
                    >
                        {actionTitle || 'Confirm'}
                    </MKButton>
                </Box>
            </Box>
        </Modal>
    )
}

export default WarnedAction