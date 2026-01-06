import React, { useEffect, useState } from 'react'
import MKBox from "components/MKBox";
import MKTypography from 'components/MKTypography';
import { Box, Container, Icon, IconButton, Modal, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import ListingCard from 'app/sections/Options/Card/Listing';
import colors from 'assets/theme/base/colors';
import { useNavigate } from 'react-router-dom';
import { useAlertState } from 'app/sections/Alert/context';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import { Helmet } from 'react-helmet-async';
import MKButton from 'components/MKButton';
import { Add, Create, GiteOutlined, MoreHoriz } from '@mui/icons-material';
import HostContentWrapper from 'app/utils/wrapper/host/content';
import { DisabledTypography } from '../common';
import { useSpareLotHostData } from '../Bookings/context';

const PublishedListings = () => {
    const {userImpl} = useUserAuthState();
    const {listingsLoaded, listings} = useSpareLotHostData('listings');
    
    return (
        <HostContentWrapper>
            <Helmet>
                <title>SpareLot | Published Listings</title>
                <meta name="description" content="Manage your published listings." />
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
                <MKBox
                    sx={{
                        display: !listingsLoaded || listings?.length ? 'grid' : 'flex',
                        gridTemplateColumns: {xs:'repeat(1, 1fr)', md:'repeat(2, 1fr)', lg:'repeat(2, 1fr)', xl:'repeat(3, 1fr)', xxl:'repeat(4, 1fr)'},
                        gap:2,
                        width:'inherit',
                    }}
                >
                    {!listingsLoaded 
                        ?

                        <>
                            {Array.from({length:4}, (_, idx) => (
                                <Skeleton
                                    variant='rectangular'
                                    animation='pulse'
                                    height={300}
                                    style={{
                                        borderRadius:16,
                                    }}
                                />
                            ))}
                        </>

                        :

                        <>
                            {listings?.length?
                                (
                                    <>
                                        {(listings?.map((_, idx) => (
                                            <MKBox
                                                sx={{
                                                    display:'flex',
                                                }}
                                            >
                                                <ListingCard
                                                    key={idx}
                                                    host={userImpl}
                                                    listing={_.listing}
                                                    listing_uuid={_.id}
                                                    userimpl={userImpl}
                                                    dontShowSaveButton
                                                    dontShowHostInfo
                                                    showMoreOptions
                                                    showUnpublishOption
                                                    showDeleteListingOption
                                                />
                                            </MKBox>
                                        )))}
                                    </>
                                ) : (
                                    <Typography
                                        sx={DisabledTypography}
                                    >
                                        You have no available listings.
                                    </Typography>
                                )
                            }
                        </>
                    }
                </MKBox>
            </Box>
        </HostContentWrapper>
    )
}

export default PublishedListings