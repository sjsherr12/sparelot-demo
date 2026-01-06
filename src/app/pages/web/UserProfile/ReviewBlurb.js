import { Avatar, Box, Rating, Skeleton, Typography } from "@mui/material";
import { getUser } from "app/backend/db/user";
import { makeUsernameAbbreviated } from "app/utils/listings/utils";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

const TextSkeleton = ({w, h}) => (
    <Skeleton 
        variant='rectangular' 
        animation='pulse'
        width={w || 100}
        height={h || 15}
        style={{
            borderRadius:'4px',
        }}
    />
)

const ReviewBlurb = ({reviewText, reviewerId, reviewDate, reviewRating}) => {
    const maxTextLength = isMobile ? 50 : 200;
    const truncatedText = reviewText.length > maxTextLength ? `${reviewText.substring(0, maxTextLength)}` : `${reviewText}`;

    const [loading, setLoading] = useState(false);
    const [reviewer, setReviewer] = useState(null);
    const [isViewingUserProfile, setIsViewingUserProfile] = useState(false);

    useEffect(() => {
        const get_reviewer = async () => {
            setLoading(true);
            const rev = await getUser(reviewerId);
            setReviewer(rev);
            setLoading(false);
        }
        get_reviewer();
    }, [])

    return (
        <Box
            sx={{
                py:2,
                gap:2,
                width:'100%',
                display:'flex',
                flexDirection:'column',
            }}
        >
            <Rating
                name="read-only"
                readOnly
                precision={.1}
                value={reviewRating}
            />
            <Box
                component={isMobile ? Box : Link}
                to={isMobile ? '' : `/profile/${reviewerId}`}
                target='_blank'
                sx={{
                    gap:2,
                    display:'flex',
                    alignItems:'center',
                }}
                onClick={() => {
                    if (isMobile) {
                        setIsViewingUserProfile(true)
                    }
                }}
            >
                <Avatar
                    src={reviewer?.profile?.avatar}
                    sx={Styles.UserPFP}
                />
                <Box>
                    <Typography
                        sx={{
                            color:'#000',
                            fontSize:'1rem',
                            fontWeight:500,
                            whiteSpace:'nowrap',
                        }}
                    >
                        {loading ? <TextSkeleton h={20}/> :
                            makeUsernameAbbreviated(reviewer)
                        }
                    </Typography>
                    <Typography
                        sx={{
                            mt:loading*.5,
                            color:'#737373',
                            fontSize:'.875rem',
                            fontWeight:450,
                            whiteSpace:'nowrap',
                        }}
                    >
                        {loading ? <TextSkeleton w={100} h={15}/> :
                            <>{(new Date(reviewDate)).toLocaleDateString('en', {month:'long', year:'numeric'})}</>
                        }
                    </Typography>
                </Box>
            </Box>
            <Typography
                sx={{
                    color:'#333',
                    fontSize:'1rem',
                    fontWeight:450,
                    display:'flex',
                    alignItems:'center',
                    gap:2,
                }}
            >
                &ldquo;{truncatedText}&rdquo;
            </Typography>
        </Box>
    )
}

export default ReviewBlurb;

const Styles = {
    UserPFP: {
        width:48,
        height:48,
        objectFit:'cover',
        boxShadow:'0px 6px 12px rgba(0,0,0,.05)',
        '& img':{
            objectFit:'cover',
            width:'100%',
            height:'100%',
            objectFit:'cover',
            userDrag: 'none',
            WebkitUserDrag: 'none'
        },
    },
}