import React, { useEffect, useState } from 'react';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import IconButton from '@mui/material/IconButton'; // Import IconButton from MUI
import StarIcon from '@mui/icons-material/Star';
import MessageIcon from '@mui/icons-material/Message';
import Person from 'assets/images/Person.png';
import { Box, Button, Container, Skeleton, Typography } from "@mui/material";
import { getUser } from 'app/backend/db/user';
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import ReviewBlurb from 'app/pages/web/UserProfile/ReviewBlurb';
import { Helmet } from 'react-helmet-async';
import { ArrowBackIos, ArrowBackIosNew, ArrowForwardIos, KeyboardArrowDown, Sort, Tune } from '@mui/icons-material';
import HostContentWrapper from 'app/utils/wrapper/host/content';
import { average, collection, count, getAggregateFromServer, getDocs, getFirestore, limit, query, startAfter, where } from 'firebase/firestore';
import { DisabledTypography } from 'app/pages/mobile/Hosting/common';

const Reviews = () => {

    const {user, userImpl} = useUserAuthState();

    const [reviews, setReviews] = useState([]);
    const [overallRating, setOverallRating] = useState(0)
    const [totalReviews, setTotalReviews] = useState(0);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const get_reviews_paginated = async () => {
        if (reviewsLoading || !hasMore) return;
        const reviewsRef = collection(getFirestore(), 'reviews');
        let q = query(
            reviewsRef,
            where('to', '==', `${user?.uid}`),
            limit(4)
        )

        if (lastDoc) {
            q = query(
                reviewsRef,
                where('to', '==', `${user?.uid}`),
                startAfter(lastDoc),
                limit(4),
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
    }

    const get_overall_rating = async () => {
        const reviewsRef = collection(getFirestore(), 'reviews');
        const averageRatingQuery = query(
            reviewsRef,
            where('to', '==', user?.uid)
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
            where('to', '==', user?.uid)
        )
        const snapshot = await getAggregateFromServer(totalReviewsQuery, {
            totalReviews: count(),
        })
        const res = snapshot.data();
        setTotalReviews(res.totalReviews)
    }

    useEffect(() => {
        const all = async () => {
            setReviewsLoading(true);
            await get_total_reviews();
            await get_overall_rating();
            await get_reviews_paginated();
            setReviewsLoading(false);
        }
        all();
    }, [])

    return (<>
        <Helmet>
            <title>SpareLot | Reviews</title>
            <meta name="description" content="See your reviews from other SpareLot users." />
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Box
            sx={{
                mb:2,
                gap:2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={Styles.ReviewsContainer}
            >
                {reviewsLoading ? (
                    <>
                        {Array.from({length:4}).map((_, idx) => (
                            <Skeleton
                                variant='rectangular'
                                animation='wave'
                                height={200}
                                style={{
                                    borderRadius:'16px',
                                }}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        {reviews?.length? (
                            <>
                                {reviews?.map((rev, idx) => (
                                    <Box
                                        sx={{
                                            py:1,
                                            px:3,
                                            borderRadius:2,
                                            width:'100%',
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
                                ))
                                }
                            </>
                        ) : (
                            <Typography
                                sx={DisabledTypography}
                            >
                                No reviews available.
                            </Typography>
                        )}
                    </>
                )}
            </Box>
        </Box>
    </>)
}

export default Reviews;

const Styles = {
    FilterButton: {
        px:2,
        gap:1,
        py:.75,
        minHeight:0,
        color:'#000 !important',
        fontWeight:550,
        display:'flex',
        borderRadius:16,
        alignItems:'center',
        border:'1px solid #ababab',
    },
    ReviewsContainer: {
        gap:2,
        zIndex:3,
        width:'100%',
        display:'grid',
        gridTemplateColumns:{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)',
            xxl: 'repeat(4, 1fr)',
        }
    },
}