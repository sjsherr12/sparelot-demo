import { ArrowBackIosNew, ArrowForwardIos, BusinessCenter, ChatBubble, Flag, FlagCircle, GppGood, Grading, Home, MoreHoriz, MoreVert, OtherHouses, Star, TextSnippet, Villa, Warning, Work } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, Container, Icon, InputBase, Menu, MenuItem, Modal, Rating, Skeleton, TextField, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { firestore } from "app/backend/fb_cfg";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import Hr from "app/utils/Hr";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import { arrayUnion, average, collection, count, doc, getAggregateFromServer, getDoc, getDocs, getFirestore, limit, query, setDoc, startAfter, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewBlurb from "./ReviewBlurb";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import MKButton from "components/MKButton";
import create_review_for_user from "app/backend/cloud/create_review_for_user";
import { useModal } from "app/sections/Modal/Parent/context";
import { getListing } from "app/backend/db/public_listings/utils";
import { Message } from "@mui/icons-material";
import ListingCard from "app/sections/Options/Card/Listing";
import { getUser } from "app/backend/db/user";
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import { useAlertState } from "app/sections/Alert/context";
import { Helmet } from "react-helmet-async";
import create_chat_for_users from "app/backend/cloud/create_chat_for_users";
import AdaptiveModal from "app/sections/Modal/Adaptive";
import { MoreOptionsMenu } from "app/sections/More";
import { ShareMenuItem } from "app/sections/More";
import { BlockMenuItem } from "app/sections/More";
import { ReportMenuItem } from "app/sections/More";
import { ContactMenuItem } from "app/sections/More";
import { userauth_title } from "app/sections/Modal/actions";
import { userauth_actions } from "app/sections/Modal/actions";

const Section = ({children, sx}) => (
    <Box
        sx={{
            p:2,
            width:'100%',
            borderRadius:2,
            border:'1px solid rgba(0,0,0,.2)',
            ...sx,
        }}
    >
        {children}
    </Box>
)

const Action = ({children, sx, ...props}) => (
    <MKButton
        sx={{
            minWidth:'unset',
            minHeight:'unset',
            px:2,
            fontWeight:600,
            whiteSpace:'nowrap',
        }}
        {...props}
    >
        {children}
    </MKButton>
)

const UserProfile = ({userIdSubstitute, userDataSubstitute, dontShowOptions}) => {
    const { userId: userIdParams } = useParams();
    const userId = userIdSubstitute || userIdParams;
    const {user, userImpl} = useUserAuthState();
    const [loading, setLoading] = useState(false);
    const isMobile = useMediaQuery('(max-width:1024px)')
    const [moreOptionsMenu, setMoreOptionsMenu] = useState(false);
    const [menuAlign, setMenuAlign] = useState(null);
    const {openAlert} = useAlertState();
    const {openModal} = useModal();
    const navigate = useNavigate();
    const [viewUser, setViewUser] = useState(userDataSubstitute);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('')
    const [listings, setListings] = useState(null);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [submittingReview, setSubmittingReview] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('')

    const [reviews, setReviews] = useState([]);
    const [overallRating, setOverallRating] = useState(0)
    const [totalReviews, setTotalReviews] = useState(0);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [viewingMoreReviews, setViewingMoreReviews] = useState(false);

    const get_reviews_paginated = async () => {
        if (reviewsLoading || !hasMore) return;

        setReviewsLoading(true);
        const reviewsRef = collection(getFirestore(), 'reviews');
        let q = query(
            reviewsRef,
            where('to', '==', `${userId}`),
            limit(2)
        )

        if (lastDoc) {
            q = query(
                reviewsRef,
                where('to', '==', `${userId}`),
                startAfter(lastDoc),
                limit(2),
            )
        }

        const ss = await getDocs(q);
        const newFetchedReviews = ss.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }))

        setReviews(prev => [...prev, ...newFetchedReviews]);
        setLastDoc(ss.docs[ss.docs.length - 1] || null);
        setHasMore(ss.docs.length > 0);
        setReviewsLoading(false);
    }

    const desc_items = [
        {
            title:'Biography',
            icon:TextSnippet,
            text:viewUser?.profile?.fullBio,
        },
        {
            title:'Occupation',
            icon:Work,
            text:viewUser?.profile?.jobWork,
        },
        {
            title:'Residence',
            icon:Villa,
            text:viewUser?.profile?.residence,
        }
    ]

    const handleRatingChange = (value) => {
      setRating(prevRating => prevRating === value ? 0 : value); // Toggle rating
    };

    const handleSubmitReview = async () => {
        setSubmittingReview(true);
        create_review_for_user({
            rating,
            review,
            userToBeReviewedId: userId,
        }).then(res => {
            if (!res.data.error) {
                setSubmitStatus('Review submitted!');
            }
            else {
                setSubmitStatus(res.data.message);
            }
            setSubmittingReview(false);
        })
    }

    useEffect(() => {
        const get_user = async () => {
            const user_res = await getUser(userId);
            if (user_res?.extra?.blocked?.includes(user?.uid)) {
                navigate('/')
            }
            setViewUser(user_res);
        }

        const get_overall_rating = async () => {
            const reviewsRef = collection(getFirestore(), 'reviews');
            const averageRatingQuery = query(
                reviewsRef,
                where('to', '==', userId)
            )
            const snapshot = await getAggregateFromServer(averageRatingQuery, {
                overallRating: average('rating')
            })
            const res = snapshot.data();
            setOverallRating(res.overallRating)
        }

        const get_total_reviews = async () => {
            const reviewsRef = collection(getFirestore(), 'reviews');
            const totalReviewsQuery = query(
                reviewsRef,
                where('to', '==', userId)
            )
            const snapshot = await getAggregateFromServer(totalReviewsQuery, {
                totalReviews: count(),
            })
            const res = snapshot.data();
            setTotalReviews(res.totalReviews)
        }

        const get_published = async () => {
            if (userId) {
                try {
                    // Firestore query to get all listings where host_uuid matches the current user's ID
                    const q = query(collection(getFirestore(), "listings"), where("host", "==", userId));
        
                    // Fetch all matching listings
                    const querySnapshot = await getDocs(q);
        
                    const fetchedListings = querySnapshot.docs.map((doc) => ({
                        listing: doc.data(),
                        listingId: doc.id,
                    }));
        
                    // Replace the previous listings with the new ones
                    setListings(fetchedListings);
                } catch (error) {
                    openAlert(`Error fetching Listings: ${error.message}`, colors.error.main);
                } finally {
                    // Always stop the loading state
                    setLoading(false);
                }
            }
        };        

        const all = async () => {
            setLoading(true);
            if (!viewUser) {
                await get_user();
            }
            await get_total_reviews();
            await get_overall_rating();
            await get_reviews_paginated();
            await get_published();
            setLoading(false);
        }

        all();
    }, [userId]);

    if (!userId) {
        navigate('/')
    }

    return (
        <div style={{minHeight:'inherit'}}>
            <Helmet>
                <title>{`SpareLot | ${viewUser?.personal?.firstName || 'User'}'s Profile`}</title>
                <meta name="description" content="See other user profiles including hosts and renters." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            {userImpl?.extra?.blocked?.includes(userId) &&
                <Alert
                    severity="error"
                    variant='filled'
                    sx={{
                        width:'100%',
                        
                        fontWeight:500,
                        borderRadius:0,
                    }}
                >
                    {`You have this user blocked. `}
                    <span
                        style={{
                            cursor:'pointer',
                            textDecoration:'underline',
                        }}
                        onClick={(e) => {
                            setMenuAlign(e.currentTarget)
                            setMoreOptionsMenu(true);
                        }}
                    >
                        Unblock
                    </span>
                </Alert>
            }

            <Container
                sx={{
                    gap:2,
                    py:2,
                    display:'flex',
                    minHeight:'inherit',
                    flexDirection:'column',
                }}
            >
                <Section
                    sx={{
                        gap:{xs:2,lg:4},
                        height:'fit-content',
                        display:'flex',
                    }}
                >
                    <Box
                        sx={{
                            width:'100%',
                            display:'flex',
                            flexDirection:'column',
                        }}
                    >
                        <Box
                            sx={{
                                gap:{xs:2,lg:3},
                                display:'flex',
                                alignItems:'center',
                            }}
                        >
                            <Avatar
                                src={viewUser?.profile?.avatar}
                                sx={{
                                    width:{xs:64,lg:100},
                                    height:{xs:64,lg:100},
                                    aspectRatio:'1',

                                    boxShadow: '1px 1px 6px 0px rgba(0,0,0,0.125)',
                                    'img':{
                                        width:'100%',
                                        height:'100%',
                                        objectFit:'cover',
                                    }
                                }}
                            />
                            <Box
                                sx={{
                                    mb:{xs:0,lg:.5},
                                }}
                            >
                                <Box
                                    sx={{
                                        gap:{xs:1,lg:1.5},
                                        alignItems:'center',
                                        display:'flex',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize:{xs:'1rem',md:'1.5rem',lg:'2rem'},
                                            fontWeight:650,
                                            color:'#000',
                                        }}
                                    >
                                        {
                                            loading ?
                                                <Skeleton
                                                    width={isMobile?150:250}
                                                    height={isMobile?20:30}
                                                    variant='rectangular' 
                                                    animation='wave'
                                                    style={{
                                                        borderRadius:'4px',
                                                    }}
                                                />
                                            :
                                                <>
                                                    {
                                                        viewUser?.personal?.firstName || viewUser?.personal?.lastName ?
                                                        (viewUser?.personal?.firstName || '') + ' ' + (viewUser?.personal?.lastName || '') :
                                                        'SpareLot User'
                                                    }
                                                </>
                                        }

                                    </Typography>
                                    {viewUser && 
                                        <Tooltip
                                            title="Contact Verified" 
                                            arrow
                                            placement='right'
                                            PopperProps={{
                                                style:{
                                                    zIndex:100000
                                                }
                                            }}
                                        >
                                            <Icon
                                                sx={{
                                                    mt:.25,
                                                    padding:{xs:.5,lg:1.75},
                                                    display:'flex',
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                    backgroundColor:colors.gradients.info.main,
                                                    borderRadius:32,
                                                    cursor:'pointer',
                                                }}
                                            >
                                                <GppGood sx={{color:'#fff', scale:{xs:.75,lg:1}}}/>
                                            </Icon>
                                        </Tooltip>
                                    }
                                </Box>

                                <Typography
                                    sx={{
                                        mt:.5,
                                        fontSize:{xs:'.75rem',md:'1rem'},
                                        fontWeight:500,
                                        color:colors.info.main,
                                    }}
                                >
                                    {`${viewUser?.hosting?.signUpDate? 'Hosting since ' + (new Date(viewUser.hosting.signUpDate)).getFullYear() : 'Renter on SpareLot'}`}
                                </Typography>
                            </Box>
                        </Box>

                        <Hr 
                            sx={{mt:{xs:1.5,md:2},mb:2.5}}
                        />

                        <Typography
                            sx={{
                                textTransform:'uppercase',
                                fontSize:{xs:'.66rem',lg:'.75rem'},
                                fontWeight:650,
                                color:'#ababab',
                            }}
                        >
                            Overall Rating
                        </Typography>

                        <Box
                            sx={{
                                gap:1,
                                display:'flex',
                                alignItems:'center',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize:{xs:'1rem',md:'1.25rem',lg:'1.5rem'},
                                    fontWeight:660,
                                    color:'#000',
                                }}
                            >
                                {overallRating > 0 ? overallRating.toFixed(2) : 'No reviews yet.'}
                            </Typography>

                            {overallRating > 0 &&                                
                                <Rating
                                    name="read-only"
                                    readOnly
                                    precision={.1}
                                    value={overallRating}
                                />
                            }
                        </Box>

                        <Hr sx={{
                                my:2,
                                display:dontShowOptions?'none':'flex',
                            }}
                        />

                        <Box
                            sx={{
                                mt:'auto',
                                display:dontShowOptions?'none':'flex',
                                gap:2,
                            }}
                        >
                            <ContactMenuItem
                                sx={{
                                    width:'fit-content',
                                    borderRadius:8,
                                    padding:'4px 16px',
                                    bgcolor:'#2e89ff !important',
                                    color:{xs:userId===user?.uid?'#000':'#fff',lg:'#fff'},
                                    border:{xs:userId===user?.uid?'1px solid #737373 !important':'unset',lg:'1px solid #fff !important'},
                                }}
                                hostId={userId}
                                userId={user?.uid}
                                disabled={userId===user?.uid}
                            />
                            <Action
                                color='light'
                                sx={{
                                    px:0,
                                }}
                                onClick={(e) => {
                                    setMenuAlign(e.currentTarget)
                                    setMoreOptionsMenu(true);
                                }}
                            >   
                                <MoreHoriz />
                            </Action>
                        </Box>
                    </Box>
                </Section>

                <Box
                    sx={{
                        gap:2,
                        width:'100%',
                        display:'flex',
                        flexDirection:{xs:'column',lg:'row'}
                    }}
                >
                    <Section
                        sx={{
                            gap:2,
                            display:'flex',
                            flexDirection:'column',
                            minHeight:'100%',
                            width:{xs:'100%',lg:'33%'}
                        }}
                    >
                        {desc_items.map((it, idx) => {
                            const DIcon = it.icon;
                            return (
                                <Box>
                                    <div
                                        style={{
                                            paddingBottom:1,
                                            marginBottom:6,
                                            display:'flex',
                                            alignItems:'center',
                                            borderBottom:'1px solid #efefef',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color:'#000',
                                                fontWeight:550,
                                                fontSize:{xs:'1rem',lg:'1.25rem'}
                                            }}
                                        >
                                            {it.title}
                                        </Typography>
                                        <DIcon 
                                            sx={{
                                                ml:'auto',
                                                color:'#ababab',
                                            }}
                                        />
                                    </div>
                                    <Typography
                                        sx={{
                                            color:'#737373',
                                            fontWeight:450,
                                            fontSize:{xs:'.875rem',lg:'1rem'}
                                        }}
                                    >
                                        {
                                            loading ?
                                                <Skeleton
                                                    width={250}
                                                    height={20}
                                                    variant='rectangular' 
                                                    animation='wave'
                                                    style={{
                                                        borderRadius:'4px',
                                                    }}
                                                />
                                            :
                                                <>
                                                    {it?.text || 'No description provided.'}
                                                </>
                                        }
                                    </Typography>
                                </Box>
                            )
                        })}
                        
                    </Section>

                    <Box
                        sx={{
                            gap:2,
                            display:'flex',
                            flexDirection:'column',
                            minHeight:'100%',
                            width:{xs:'100%',lg:'66%'}
                        }}
                    >
                        <Section
                            sx={{
                                width:'100%',
                            }}
                        >
                            <div
                                style={{
                                    paddingBottom:1,
                                    marginBottom:6,
                                    display:'flex',
                                    alignItems:'center',
                                    borderBottom:'1px solid #efefef',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color:'#000',
                                        fontWeight:550,
                                        fontSize:{xs:'1rem',lg:'1.25rem'}
                                    }}
                                >
                                    {`${viewUser?.personal?.firstName || 'User'}'s Reviews`}
                                </Typography>
                                <Grading 
                                    sx={{
                                        ml:'auto',
                                        color:'#ababab',
                                    }}
                                />
                            </div>
                            <Box
                                sx={{
                                    ...Styles.CustomScrollbarContainer,
                                    pb:reviews?.length > 2?2:1,  
                                }}
                            >
                                {reviews?.map((rev, idx) => (
                                    <Box
                                        sx={{
                                            px:2,
                                            minWidth:{xs:'100%',md:'49%', lg:'48%', xl:'49%'},
                                            borderRadius:2,
                                            border:'1px solid #ededed',
                                        }}
                                    >
                                        <ReviewBlurb
                                            key={idx}
                                            reviewText={rev?.review}
                                            reviewerId={rev?.from}
                                            reviewDate={rev?.created}
                                            reviewRating={rev?.rating}
                                        />
                                    </Box>
                                ))}
                                {!reviews?.length &&
                                    <Typography
                                        sx={{
                                            py:2,
                                            borderRadius:2,
                                            width:'100%',
                                            border:'1px dashed #737373',
                                            color:'#737373',
                                            fontSize:'.875rem',
                                            fontWeight:450,
                                            textAlign:'center',
                                            userSelect:'none',
                                            cursor:'not-allowed'
                                        }}
                                    >
                                        No reviews yet.
                                    </Typography>
                                }
                            </Box>
                            
                            <Box
                                sx={{
                                    mt:2,
                                    gap:2,
                                    width:'100%',
                                    display:'flex',
                                    alignItems:'center',
                                    flexDirection:{xs:'column',lg:'row'},
                                    justifyContent:{xs:'center',lg:'space-between'},
                                }}
                            >
                                <MKButton
                                    color='light'
                                    disabled={!(overallRating > 0) || !reviews?.length}
                                    sx={{
                                        fontWeight:500,
                                        fontSize:'1rem',
                                        color:'#000',
                                        width:{xs:'100%',lg:'fit-content'}
                                    }}
                                    onClick={() => setViewingMoreReviews(true)}
                                >
                                    View all reviews
                                </MKButton>
                                <MKButton
                                    color='sparelot'
                                    disabled={user?.uid === userId || !viewUser || viewUser?.profile?.reviews?.some(r => r?.writer === user?.uid)}
                                    sx={{
                                        fontWeight:500,
                                        fontSize:'1rem',
                                        width:{xs:'100%',lg:'fit-content'}
                                    }}
                                    onClick={() => {
                                        if (!user?.uid) {
                                            openModal(userauth_title, userauth_actions)
                                        }
                                        else {
                                            if (user?.uid === userId) {
                                                setSubmitStatus('Users cannot review their own profile.');
                                            }
                                            setReviewModalOpen(true)
                                        }
                                    }}
                                >
                                    Write a review
                                </MKButton>
                            </Box>
                        </Section>
                        <Section
                            sx={{
                                width:'100%',
                            }}
                        >
                            <div
                                style={{
                                    paddingBottom:1,
                                    marginBottom:6,
                                    display:'flex',
                                    alignItems:'center',
                                    borderBottom:'1px solid #efefef',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color:'#000',
                                        fontWeight:550,
                                        fontSize:{xs:'1rem',lg:'1.25rem'}
                                    }}
                                >
                                    {`${viewUser?.personal?.firstName || 'User'}'s Listings`}
                                </Typography>
                                <OtherHouses 
                                    sx={{
                                        ml:'auto',
                                        color:'#ababab',
                                    }}
                                />
                            </div>
                            <Box
                                sx={{
                                    ...Styles.CustomScrollbarContainer,
                                    pb:listings?.length > 2?2:1,
                                }}
                            >
                                {listings?.map((item, idx) => (
                                    <ListingCard
                                        customWidth={isMobile?'100%':'49%'}
                                        key={idx}
                                        listing={item.listing}
                                        listing_uuid={item.listingId}
                                        host={viewUser}
                                        userimpl={userImpl}
                                    />
                                ))}
                                {!listings?.length &&
                                    <Typography
                                        sx={{
                                            py:2,
                                            borderRadius:2,
                                            width:'100%',
                                            border:'1px dashed #737373',
                                            color:'#737373',
                                            fontSize:'.875rem',
                                            fontWeight:450,
                                            textAlign:'center',
                                            userSelect:'none',
                                            cursor:'not-allowed'
                                        }}
                                    >
                                        No listings yet.
                                    </Typography>
                                }
                            </Box>
                        </Section>
                    </Box>
                </Box>
            </Container>

            <AdaptiveModal
                open={viewingMoreReviews}
                onClose={() => setViewingMoreReviews(false)}
                maxWidth={500}
                title={'Reviews'}
                sx={{
                    px:3,
                    height:'100dvh'
                }}
            >
                <Box
                    sx={{
                        width:'100%',
                        display:'flex',
                        flexDirection:'column',
                    }}
                >
                    <Typography
                        sx={{
                            mb:2,
                            color:'#000',
                            fontSize:{xs:'1.25rem',lg:'1.5rem'},
                            fontWeight:500,
                        }}
                    >
                        {totalReviews} review{(totalReviews) !== 1 && 's'}
                    </Typography>

                    <Box
                        sx={{
                            gap:2,
                            display:'flex',
                            flexDirection:'column',
                        }}
                    >
                        {reviews.map((rev, idx) => (
                            <Box
                                sx={{
                                    borderBottom:'1px solid #efefef',
                                }}
                            >
                                <ReviewBlurb
                                    key={idx}
                                    reviewText={rev?.review}
                                    reviewerId={rev?.from}
                                    reviewDate={rev?.created}
                                    reviewRating={rev?.rating}
                                />
                            </Box>
                        ))}
                        <Button
                            disabled={!hasMore}
                            sx={{
                                px:2,
                                py:1,
                                color:'#000 !important',
                                borderRadius:2,
                                fontWeight:500,
                                fontSize:'1rem',
                                width:200,
                                whiteSpace:'nowrap',
                                border:'1px solid #000',
                            }}
                            onClick={hasMore ? get_reviews_paginated : null}
                        >
                            {reviewsLoading ? 

                                <LoadingSpinner compact />

                                :

                                <>
                                    {hasMore ? 'Load more reviews' : 'All reviews loaded'}
                                </>
                            }
                            
                        </Button>
                    </Box>
                </Box>
            </AdaptiveModal>

            <AdaptiveModal
                open={reviewModalOpen}
                onClose={() => {
                    setReviewModalOpen(false);
                    setSubmitStatus('');
                    setReview('');
                    setRating(0)
                }}
                maxWidth={500}
                title={`Write a Review`}
            >
                { !submittingReview && submitStatus === '' && <>
                    <Typography variant='h4' sx={{
                    
                    color:'#000',
                    fontWeight:'bold',
                    }}>
                        {`Write a review on ${(viewUser?.personal?.firstName || 'this user') + '’s'} profile`}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt:2, mb:3, color:'#000'}}>
                        Describe your experience and what others should know about this user. You only get one review per profile, so make it count!
                    </Typography>

                    <MKBox display="flex" alignItems="center" my={2} sx={{width:'100%', gap:1,}}>
                        {[1, 2, 3, 4, 5].map((value) => (
                        <MKBox
                            key={value}
                            onClick={() => handleRatingChange(value)}
                            border={rating === value ? "2px solid black" : "2px solid lightgray"}
                            borderRadius="4px"
                            p={{xs:1, md:2}}
                            display="flex"
                            alignItems="center"
                            justifyContent='center'
                            sx={{ cursor: 'pointer', borderRadius:3, width:'100%', }}
                        >
                            <Typography variant="body2" sx={{
                                mr:.25,
                                fontWeight:'600',
                                color:'#000',
                                fontSize:{xs:15, md:20},
                            }}>
                                {value}
                            </Typography>
                            <Star sx={{
                                color:'#000',
                                transform:'scale(0.75)'
                            }}/>
                        </MKBox>
                        ))}
                    </MKBox>

                    <TextField
                        multiline
                        minRows={3}
                        number={100}
                        value={review}
                        placeholder='Describe your experience...'
                        onChange={(e) => {
                            setReview(e.target.value)
                        }}
                        sx={{
                            width:'100%',
                            color:'#000',
                            borderRadius:3,
                        }}
                        inputProps={{
                            maxLength:500,
                            style: {
                                color:'#000',
                                fontSize:'1rem',
                            }
                        }}
                        FormHelperTextProps={{
                            sx:{
                                fontWeight:450,
                                ml:.5,
                                color:review?.length===500?'#f00':review?.length>=450?'#fd6c01':'#737373',
                            }
                        }}
                        helperText={review?.length >= 450 && `${500-review?.length} letters left (max 500)`}
                    />

                    <MKButton
                        color='sparelot'
                        sx={{
                            fontSize:18,
                            
                            textTransform:'none',
                            width:'100%',
                            mt:3,
                        }}
                        onClick={handleSubmitReview}
                    >
                        Submit Review
                    </MKButton>

                    <Typography id="modal-modal-description" sx={{ color:'#000', fontSize:12, textAlign:'center', mt:1}}>
                        Before submitting, ensure your review complies with our terms by not containing any hate speech or derogatory language.
                    </Typography>
                </>}
                { submittingReview &&
                    <LoadingSpinner />
                }
                {submitStatus !== '' && 
                    <Typography id="modal-modal-description" sx={{ color:'#000', fontSize:20, textAlign:'center', mb:2}}>
                        {submitStatus + ' Click anywhere to close.'}
                    </Typography>
                }
            </AdaptiveModal>

            <MoreOptionsMenu
                open={moreOptionsMenu && !dontShowOptions}
                onClose={() => setMoreOptionsMenu(false)}
                menuAlign={menuAlign}
            >
                <ShareMenuItem
                    contentType='profile'
                    shareLink={`https://sparelot.com/profile/${userId}`}
                />
                {user && <>
                    <BlockMenuItem
                        targetUserId={userId}
                        disabled={userId === user?.uid || !viewUser}
                    />
                    <ReportMenuItem
                        contentType='user'
                        contentId={userId}
                        disabled={userId === user?.uid || !viewUser}
                    />
                    <ContactMenuItem
                        userId={user?.uid}
                        hostId={userId}
                        disabled={!user?.uid || !userId || user?.uid === userId}
                    />
                </>}
            </MoreOptionsMenu>
        </div>
    )
}
export default UserProfile;

const Styles = {
    CustomScrollbarContainer: {
        pt:1.5,
        px: 0.25,
        gap: 2,
        display: 'flex',
        alignItems: 'center',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '4px',
            height:'10px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ababab',
            borderRadius: '16px',
            border: '2px solid transparent',
            backgroundClip: 'content-box',
            '&:hover': {
                backgroundColor: '#737373',
            },
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#efefef',
            borderRadius: '16px',
            padding: '4px',
        },
    }
}