import { Backdrop, Box, Fade, IconButton, Modal, Snackbar, TextField, Typography, useMediaQuery } from "@mui/material";
import MKBox from "components/MKBox";
import { Close, ContentCopy, Facebook, Forum, Link, Mail, Message, MoreHoriz, WhatsApp, X } from "@mui/icons-material";
import colors from "assets/theme/base/colors";
import Hr from "app/utils/Hr";
import isStandalone from "isStandalone";
import theme from "assets/theme";
import InterchangeableSwipeable from "../Swipeable";
import AdaptiveModal from "../Modal/Adaptive";

const ShareModal = ({open, onClose, contentType, shareLink, disabled}) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

    const getSharingWhat = () => {
        if (contentType) {
            return contentType
        }
        return 'content'
    }

    const shareOptions = [
        {
            bg:colors.background.theme,
            name:'Link',
            icon: Link,
            onClick: async () => {
                navigator.clipboard.writeText(
                    shareLink || window.location.href
                ).then(res => {
                    onClose();
                }).catch(err => {

                })
            }
        },
        {
            bg:'#46E060',
            name:'Messages',
            icon:Forum,
            onClick:async () => {
                const message = encodeURIComponent(`Check out this SpareLot ${getSharingWhat()}! ${shareLink}`)
                window.location.href=`sms:?body=${message}`
            }
        },
        {
            bg:'#25D366',
            name:'WhatsApp',
            icon:WhatsApp,
            onClick:async () => {
                const message = encodeURIComponent(`Check out this SpareLot ${getSharingWhat()}! ${shareLink}`)
                window.location.href=`whatsapp://send?text=${message}`
            }
        },
        {
            bg:'#000',
            name:'X',
            icon:X,
            onClick:async () => {
                const message = encodeURIComponent(`Check out this SpareLot ${getSharingWhat()}! ${shareLink}`);
                window.location.href = `https://twitter.com/intent/tweet?text=${message}`;
            }
        },
        {
            bg:'#0865FE',
            name:'Facebook',
            icon:Facebook,
            onClick:async () => {
                const message = encodeURIComponent(`Check out this SpareLot ${getSharingWhat()}! ${shareLink}`);
                window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&quote=${message}`;
            }
        },
        {
            bg:'#249EE4',
            name:'Mail',
            icon:Mail,
            onClick:async () => {
                const subject = encodeURIComponent('Check out SpareLot!');
                const body = encodeURIComponent(`Check out this SpareLot ${getSharingWhat()}! ${shareLink}`);
                window.location.href = `mailto:?subject=${subject}&body=${body}`;
            }
        },
        {
            bg:'#737373',
            name:'More',
            icon:MoreHoriz,
            onClick:async () => {
                navigator.share({
                    title:`SpareLot ${getSharingWhat().capitalize()}`,
                    description:`Check out this ${getSharingWhat().capitalize()} on SpareLot!`,
                    url:shareLink || window.location.href
                }).then(res => {
                    onClose();
                }).catch(err => {
                    
                })
            }
        }
    ]

    return (<>
        <AdaptiveModal
            title='Share'
            open={open}
            onClose={onClose}
            sx={{
                px:{xs:2,lg:2.5},
                pb:0,
            }}
            maxWidth={580}
        >
            <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    gap:{xs:1.5,lg:2},
                }}
            >

                <Typography
                    sx={{
                        textAlign:'left',
                        fontWeight:'bold',
                        fontSize:{xs:'1rem', lg:'1.5rem'}
                    }}
                >
                    {`Share this ${getSharingWhat().capitalize()}`}
                </Typography>

                <TextField
                    placeholder={shareLink || window.location.href}
                    aria-readonly
                    value={shareLink || window.location.href}
                    sx={{
                        width:'100%',
                        display:{xs:'none',lg:'flex'}
                    }}
                    InputProps={{
                        sx: {
                            fontWeight:520,
                        }
                    }}
                />

                <MKBox
                    sx={{
                        ml:-.5,
                        pb:2,
                        gap:1,
                        width:'100%',
                        overflowX:'auto',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'start',
                    }}
                >
                    {shareOptions.map((opt, idx) => (
                        <Box
                            sx={{
                                p:1,
                                gap:1,
                                cursor:'pointer',
                                borderRadius:2,
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'center',
                                justifyContent:'center',
                                '&:hover':{bgcolor:'#efefef'}
                            }}
                        >
                            <IconButton
                                sx={{
                                    color:'#fff',
                                    bgcolor:opt.bg,
                                    width:50,
                                    height:50,
                                    '&:hover':{
                                        color:'#fff',
                                        bgcolor:opt.bg,
                                    },
                                    '&:focus':{
                                        color:'#fff',
                                        bgcolor:opt.bg,
                                    }
                                }}
                                onClick={opt.onClick}
                            >
                                <opt.icon/>
                            </IconButton>
                            <Typography
                                sx={{
                                    textAlign:'center',
                                    fontSize:12,
                                    fontFamily:'Inter, sans-serif',
                                    fontWeight:550,
                                }}
                            >
                                {opt.name}
                            </Typography>
                        </Box>
                    ))} 
                </MKBox>

                <Hr
                    sx={{
                        mt:-2,
                        width:'calc(100% + 32px)',
                        ml:-2,
                        display:{xs:'flex',lg:'none'}
                    }}

                />
            </Box>
        </AdaptiveModal>
    </>)
}

export default ShareModal;