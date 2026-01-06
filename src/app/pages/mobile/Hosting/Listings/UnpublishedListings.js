import React, { useEffect, useState } from 'react'
import { option_routes } from "app/sections/Options/routes";
import { footer_option_routes_renter } from "app/sections/Options/routes";
import MKBox from "components/MKBox";
import MKTypography from 'components/MKTypography';
import MKButton from 'components/MKButton';
import { Box, Container, Icon, IconButton, Skeleton, Typography } from "@mui/material";
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import { getListingOnly } from 'app/backend/db/public_listings/utils';
import ListingCard from 'app/sections/Options/Card/Listing';
import colors from 'assets/theme/base/colors';
import { useNavigate } from 'react-router-dom';
import { getDraft } from 'app/backend/db/public_listings/utils';
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import { useAlertState } from 'app/sections/Alert/context';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
import { Add, FolderSpecialOutlined } from '@mui/icons-material';
import { DeleteMenuItem } from 'app/sections/More';
import { MoreOptionsMenu } from 'app/sections/More';
import DeleteModal from 'app/sections/More/delete';
import HostContentWrapper from 'app/utils/wrapper/host/content';
import { DisabledTypography } from '../common';
import { useSpareLotHostData } from '../Bookings/context';


const UnpublishedListings = () => {

    const {userImpl} = useUserAuthState();
    const {draftsLoaded, drafts} = useSpareLotHostData('drafts');
    
    return (
        <HostContentWrapper>
            <Helmet>
                <title>SpareLot | Unpublished Listings</title>
                <meta name="description" content="Manage your unpublished listings." />
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
                    sx={{
                        display: !draftsLoaded || drafts?.length ? 'grid' : 'flex',
                        gridTemplateColumns: {xs:'repeat(1, 1fr)', md:'repeat(2, 1fr)', lg:'repeat(2, 1fr)', xl:'repeat(3, 1fr)', xxl:'repeat(4, 1fr)'},
                        gap:2,
                        width:'inherit',
                    }}
                >
                    {!draftsLoaded 
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
                            {drafts?.length?
                                (
                                    <>
                                        {(drafts?.map((_, idx) => (
                                            <MKBox
                                                sx={{
                                                    display:'flex',
                                                }}
                                            >
                                                <ListingCard
                                                    key={idx}
                                                    host={userImpl}
                                                    listing={_.draft}
                                                    listing_uuid={_.id}
                                                    userimpl={userImpl}
                                                    dontShowSaveButton
                                                    dontShowHostInfo
                                                    showMoreOptions
                                                    showPublishOption
                                                    showDeleteDraftOption
                                                />
                                            </MKBox>
                                        )))}
                                    </>
                                ) : (
                                    <Typography
                                        sx={DisabledTypography}
                                    >
                                        You have no available drafts.
                                    </Typography>
                                )
                            }
                        </>
                    }
                </Box>
            </Box>
        </HostContentWrapper>
    )
}

export default UnpublishedListings;