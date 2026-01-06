import { AccessTime, ArrowRightAltOutlined, BadgeOutlined, CalendarMonth, CalendarMonthOutlined, DescriptionOutlined, Directions, East, FlakyOutlined, Info, InfoOutlined, KeyboardArrowRight, LocationOn, LocationOnOutlined, MoreHoriz, MoreVert, OpenInNew, OtherHouses, Timelapse, TimelapseOutlined, West } from "@mui/icons-material";
import { Box, Container, Fade, Icon, IconButton, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { getListing } from "app/backend/db/public_listings/utils";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { ContactMenuItem } from "app/sections/More";
import { CancelReservationMenuItem } from "app/sections/More";
import { BasicMenuItem } from "app/sections/More";
import { MoreOptionsMenu } from "app/sections/More";
import { makeListingAddress } from "app/utils/listings/utils";
import { makeListingTitle } from "app/utils/listings/utils";
import colors from "assets/theme/base/colors";
import { noop } from "lodash";
import { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {motion} from 'framer-motion'
import AdaptiveModal from "app/sections/Modal/Adaptive";
import { makeListingTitleExtended } from "app/utils/listings/utils";
import { States } from "app/utils/optimize/utils";
import Hr from "app/utils/Hr";
import { TimeOfDayAccessTypes } from "app/utils/optimize/utils";
import { AccessFrequencyTypes } from "app/utils/optimize/utils";
import { ReservationStatusToColor } from "app/utils/optimize/utils";
import { ReservationViewingRole } from "app/utils/optimize/utils";
import { DeclineReservationMenuItem } from "app/sections/More";
import { ApproveReservationMenuItem } from "app/sections/More";
import ListingCard from "app/sections/Options/Card/Listing";
import MKButton from "components/MKButton";
import UserProfileSheet from "app/sections/Modal/Profile";
import conditionalNavigation from "conditionalNavigation";
import { useDatePricing } from "app/pages/web/Listing/prices";
import { useTheme } from "@emotion/react";
import isStandalone from "isStandalone";

const { ReservationStatus } = require("app/utils/optimize/utils");

const now = (new Date()).getTime()

const RentalPreview = ({
    reservationId,
    reservationInfo,
    providedListingInfo,
    viewingRole,
    onlyModal,
    alwaysLoading,
}) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const {user} = useUserAuthState();
    const [loading, setLoading] = useState(true);
    const [listingInfo, setListingInfo] = useState(providedListingInfo || null);
    const [MO, setMO] = useState(false);
    const [MA, setMA] = useState(null);
    const [viewing, setViewing] = useState(false);
    const [viewingListing, setViewingListing] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const {calculateForCustomRange, getDays, getMonths} = useDatePricing();

    const shouldHaveOptions = () => {
        if (reservationInfo?.renter === user?.uid) {
            return reservationInfo?.status === ReservationStatus.Approved
        }
        else {
            return [
                ReservationStatus.Pending,
                ReservationStatus.Approved,
            ].includes(
                reservationInfo?.status
            )
        }
    }

    const getAppropriateContextInfo = () => {
        const now = new Date().setHours(23, 59, 59, 0)
        const start_now = new Date().setHours(0,0,0,0)
        if (reservationInfo?.status === ReservationStatus.Declined) { // needs to be filled in with first checked condition, probably going to be from a denied because of ordering (0,1,2,3), 0=Denied
            return {
                name: 'Declined',
                color: '#fff',
                bgcolor: colors.error.main,
                requestTense: 'Requested to rent from',
                prefixTense: 'Declined',
                suffixTense: 'request',
            }
        }

        /// PENDING SECTION
        // --------------------
        else if (reservationInfo?.startDate >= start_now && reservationInfo?.endDate > reservationInfo?.startDate && reservationInfo?.status === ReservationStatus.Pending) {
            // the end date is in the future, can still be approved, considered a PENDING REQUESET
            return {
                name: 'Pending',
                color: '#fff',
                bgcolor: colors.warning.main,
                requestTense: 'Requesting to rent from',
                prefixTense: 'Pending',
                suffixTense: 'request',
            }
        }
        else if (reservationInfo?.startDate < start_now && reservationInfo?.status === ReservationStatus.Pending) {
            // the end date is in the past, cant be approved anymore, considered an OVERDUE REQUESET
            return {
                name: 'Overdue',
                color: '#fff',
                bgcolor: '#ff5f15',
                requestTense: 'Requested to rent from',
                prefixTense: 'Overdue',
                suffixTense: 'request',
            }
        }
        // --------------------


        /// APPROVED SECTION
        // --------------------
        else if (reservationInfo?.status === ReservationStatus.Approved) {
            if (reservationInfo?.startDate > now) {
                // the start date is upcoming and it has been approved
                return {
                    name: 'Upcoming',
                    color: '#fff',
                    bgcolor: '#ffa500',
                    requestTense: 'Renting from',
                    prefixTense: ReservationViewingRole.Renter.Generic.includes(viewingRole) ? 'Your' : 'Upcoming',
                    suffixTense: 'rental',
                }
            }
            else if (reservationInfo?.startDate < now && reservationInfo?.endDate > now) {
                // the start date is in the past and it has been approved
                return {
                    name: 'Active',
                    color: '#fff',
                    bgcolor: colors.success.main,
                    requestTense: 'Renting from',
                    prefixTense: ReservationViewingRole.Renter.Generic.includes(viewingRole) ? 'Your' : 'Active',
                    suffixTense: 'rental'
                }
            }
            else if (reservationInfo?.endDate < now) {
                // the end date is in the past and it has been approved
                return {
                    name: 'Completed',
                    color: '#000',
                    bgcolor: '#ededed',
                    requestTense: 'Rented from',
                    prefixTense: ReservationViewingRole.Renter.Generic.includes(viewingRole) ? 'Your' : 'Completed',
                    suffixTense: 'rental'
                }
            }
        }
        
        // --------------------


        /// CANCELED SECTION
        // --------------------
        else if (reservationInfo?.status === ReservationStatus.Canceled) {
            return {
                name: 'Canceled',
                color: '#fff',
                bgcolor: colors.info.main,
                requestTense: 'Rented from',
                prefixTense: ReservationViewingRole.Renter.Generic.includes(viewingRole) ? 'Canceled' : '',
                suffixTense: 'rental'
            }
        }
    }

    const appropriateContextInfo = getAppropriateContextInfo()

    const [viewingRenterPhoto, setViewingRenterPhoto] = useState(false);
    const [viewingRenterProfile, setViewingRenterProfile] = useState(false);

    const summarizedListingInfo = [
        {
            text:`Access ${AccessFrequencyTypes[listingInfo?.listing?.display?.accessFrequency || 0 ]} (At Most)`,
            icon:CalendarMonthOutlined,
        },
        {
            text:`Can visit during ${TimeOfDayAccessTypes[listingInfo?.listing?.display?.timeOfDayAccess || 0 ]}`,
            icon:TimelapseOutlined,
        },
        {
            text:`Appointments are${listingInfo?.listing?.display?.appointmentsRequired ? '' : `n't` } required before visiting`,
            icon:AccessTime,
        },
    ].concat( // dont need to check the host/renter viewingRole for this b/c the whole listing info component wont display if its a host, only limited to the renter generic case
        reservationInfo?.status === ReservationStatus.Approved ? [{
            text:`${listingInfo?.listing?.location?.street}, ${listingInfo?.listing?.location?.city}, ${States[listingInfo?.listing?.location?.state]} ${listingInfo?.listing?.location?.zip}`,
            icon:LocationOnOutlined,
            custom: {
                sx: {
                    color: colors.info.main,
                    textDecoration:'underline',
                    cursor:'pointer',
                },
                onClick: () => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${listingInfo?.listing?.location?.street}, ${listingInfo?.listing?.location?.city}, ${States[listingInfo?.listing?.location?.state]}, ${listingInfo?.listing?.location?.zip}`)}`, '_blank')
            }
        }] : []
    )

    const summarizedReservationInfo = [
        {
            text:`Request ${reservationInfo?.status === ReservationStatus.Pending && (!(reservationInfo?.endDate < (new Date().setHours(23, 59, 59, 0)))) ? 'is' : 'was'} ${Object.entries(ReservationStatus).find(([key, value]) => (value === reservationInfo?.status))?.[0]}${reservationInfo?.startDate < (new Date()).setHours(0,0,0,0) && reservationInfo?.status === ReservationStatus.Pending ? ' (Overdue)' : ''}`,
            icon:FlakyOutlined,
            color:ReservationStatusToColor[reservationInfo?.status],
        },
        {
            text:`${appropriateContextInfo?.requestTense} ${(new Date(reservationInfo?.startDate)).toLocaleDateString('en-US', {month:'numeric',day:'2-digit',year:'2-digit'})} to ${(new Date(reservationInfo?.endDate)).toLocaleDateString('en-US', {month:'numeric',day:'2-digit',year:'2-digit'})}`,
            icon:CalendarMonthOutlined,
        },
        {
            text:`Storage Description: ${reservationInfo?.storeDesc || 'Not provided.'}`,
            icon:DescriptionOutlined,
        },
    ]

    const summarizedRenterInfo = [
        {
            text:`Full name: ${reservationInfo?.fullName}`,
            icon:BadgeOutlined,
        },
        {
            text:`Lives at ${reservationInfo?.address}`,
            icon:LocationOnOutlined,
        },
    ]

    useEffect(() => {
        const get_listing = async () => {
            setLoading(true);
            if (reservationInfo?.listing && !listingInfo) {
                const listing_info = await getListing(reservationInfo?.listing)
                setListingInfo(listing_info);
            }
            setLoading(alwaysLoading);
        }
        get_listing();
    }, [reservationInfo?.listing])

    const [total, setTotal] = useState(0)
    const [om, setOm] = useState(false);
    const [dr, setDr] = useState([])
    useEffect(() => {
        if (reservationInfo?.startDate && reservationInfo?.endDate && listingInfo?.listing) {
            const nd = [(new Date(reservationInfo?.startDate)), (new Date(reservationInfo?.endDate))]
            const onlyMonths = (getMonths(nd) >= 1) || (getDays(nd) > 31);
            const t = calculateForCustomRange(nd, listingInfo?.listing?.logistics?.price, onlyMonths)
            setOm(onlyMonths)
            setDr(nd);
            setTotal(t.totalPrice)
        }
    }, [reservationInfo, listingInfo])

    return (<>
        <Box
            sx={{
                display:onlyModal?'none':'flex',
                flexDirection:'column',
            }}
        >
            <Box
                sx={{
                    pb:1,
                    gap:1,

                    display:'flex',
                    alignItems:'center',
                }}
            >
                {loading ? 
                    (
                        <>
                            <Skeleton
                                height={46}
                                width={150}
                                animation='wave'
                            />
                            <Skeleton
                                height={25}
                                width={100}
                                animation='wave'
                                sx={{
                                    ml:'auto',
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Typography
                                sx={{
                                    color:'#000',
                                    fontWeight:650,
                                    fontSize:'1.75rem',
                                }}
                            >
                                {listingInfo?.listing? `$${total}` : 'Not found.'}
                            </Typography>
                            <Typography
                                sx={{
                                    display:listingInfo?.listing?'flex':'none',
                                    color:'#737373',
                                    fontSize:'1rem',
                                    lineHeight:'25px',
                                }}
                            >
                                {om ? '/ mo' : `(${getDays(dr)} days)`}
                            </Typography>

                            <Typography
                                sx={{
                                    ml:'auto',
                                    fontSize:'.75rem',
                                    fontWeight:550,
                                    bgcolor:appropriateContextInfo?.bgcolor,
                                    color:appropriateContextInfo?.color || '#fff',
                                    px:1.25,
                                    py:.3,
                                    borderRadius:8,
                                }}
                            >
                                {appropriateContextInfo?.name}
                            </Typography>
                            <IconButton
                                size='small'
                                sx={{
                                    color:'#000',
                                    display:listingInfo?.listing?'flex':'none',
                                    bgcolor:'#efefef !important',
                                }}
                                onClick={(e) => {
                                    setMA(e.currentTarget)
                                    setMO(true);
                                }}
                            >
                                <MoreHoriz />
                            </IconButton>
                        </>
                    )
                }
            </Box>
            <Box
                onClick={() => {
                    if (listingInfo?.listing) {
                        setViewing(true)
                    }
                }}
                sx={{
                    p:{xs:2,lg:2.5},
                    width:'100%',
                    display:'flex',
                    alignItems:'center',
                    cursor:listingInfo?.listing?'pointer':'auto',
                    gap:3,
                    transition:'all .15s ease',
                    '&:hover':{bgcolor:listingInfo?.listing?'rgba(0,0,0,.033)':'unset',transition:'all .15s ease'},
                    border:'1px solid #ededed',
                    borderRadius:3,
                }}
            >
                {loading ? 
                    <Skeleton
                        sx={{
                            minWidth:100,
                            maxWidth:100,                        
                            minHeight:100,
                            maxHeight:100,
                            borderRadius:2,
                        }}
                        variant='rectangular'
                        animation='wave'
                    />
                    :
                    <img
                        src={listingInfo?.listing?listingInfo?.listing?.display?.images[0]:'https://s3-cdn.cmlabs.co/page/2023/01/24/a-guideline-on-how-to-fix-error-404-not-found-effectively-519451.png'}
                        style={{
                            minWidth:100,
                            maxWidth:100,                        
                            minHeight:100,
                            maxHeight:100,
                            borderRadius:8,
                            overflow:'hidden',
                            objectFit: 'cover',
                            boxShadow:'0px 6px 6px rgba(0,0,0,.05)',
                            cursor:'pointer',
                        }}
                    />
                }
                
                <Box
                    sx={{
                        width:'100%',
                        minHeight:100,
                        height:'fit-content',
                        display:'flex',
                        flexDirection:'column',
                        overflow:'hidden',
                        textOverflow:'ellipsis',
                    }}
                >
                    <Typography
                        sx={{
                            color:'#000',
                            fontSize:'1.2rem',
                            overflow:'hidden',
                            whiteSpace:'nowrap',
                            textOverflow:'ellipsis',
                            fontWeight:600,
                        }}
                    >
                        {loading ? <Skeleton width={150} animation='wave' /> : listingInfo?.listing ? makeListingTitle(listingInfo?.listing) : 'Listing not found.'}
                    </Typography>
                    <Typography
                        sx={{
                            color:'#737373',
                            fontSize:'1rem',
                            overflow:'hidden',
                            whiteSpace:listingInfo?.listing?'nowrap':'unset',
                            textOverflow:listingInfo?.listing?'ellipsis':'unset',
                            fontWeight:450,
                        }}
                    >
                        {loading ? <Skeleton width={200} animation='wave' /> : listingInfo?.listing ?makeListingAddress(listingInfo?.listing) : 'We could not find the requested listing for this reservation. The host may have deleted it. We are sorry for the inconvenience.'}
                    </Typography>
                    <Typography
                        sx={{
                            mt:'auto',
                            color:'#ababab',
                            fontSize:'.875rem',
                            fontWeight:450,
                        }}
                    >
                        {loading ? 
                            <Skeleton width={125} animation='wave' />

                            :

                            <>
                                {!isMobile && appropriateContextInfo?.requestTense} {`${(new Date(reservationInfo?.startDate)).toLocaleDateString('en-US', {month:'numeric',day:'2-digit',year:'2-digit'})} to ${(new Date(reservationInfo?.endDate)).toLocaleDateString('en-US', {month:'numeric',day:'2-digit',year:'2-digit'})}`}
                            </>
                        }
                    </Typography>
                </Box>
            </Box>
        </Box>

        <AdaptiveModal
            title='Reservation Info'
            open={(viewing || onlyModal?.open) && !alwaysLoading}
            onClose={() => {
                if (onlyModal) {
                    onlyModal?.onClose && onlyModal?.onClose();
                }
                setViewing(false)
            }}
            sx={{
                p:0,
                pb:4,
            }}
            moreOptions={
                shouldHaveOptions()
                
                ?

                <>
                    <BasicMenuItem
                        title='Listing'
                        BMIcon={isStandalone() ? OtherHouses : OpenInNew}
                        onClick={() => {
                            if (isStandalone()) {
                                setViewingListing(true);
                            }
                            else {
                                conditionalNavigation(navigate, `/listing/${reservationInfo?.listing}`, '_blank');
                            }
                        }}
                    />
                    { (listingInfo?.hostId === user?.uid && reservationInfo?.status === ReservationStatus.Pending && appropriateContextInfo?.prefixTense === 'Pending') &&
                        <ApproveReservationMenuItem
                            reservationId={reservationId}
                            disabled={!user?.uid || user?.uid === reservationInfo?.renter}
                        />
                    }
                    { (listingInfo?.hostId === user?.uid && reservationInfo?.status === ReservationStatus.Pending) &&
                        <DeclineReservationMenuItem
                            reservationId={reservationId}
                            disabled={!user?.uid || user?.uid === reservationInfo?.renter}
                        />
                    }
                    { (reservationInfo?.status === ReservationStatus.Approved && appropriateContextInfo?.prefixTense !== 'Completed') &&
                        <CancelReservationMenuItem
                            reservationId={reservationId}
                            isRenterCancelling={reservationInfo?.renter === user?.uid}
                            disabled={!user?.uid}
                        />
                    }
                    { !([ReservationViewingRole.Renter.FromChat, ReservationViewingRole.Host.FromChat].includes(viewingRole)) &&
                        <ContactMenuItem
                            hostId={listingInfo?.hostId}
                            userId={reservationInfo?.renter}
                        />
                    }
                </>

                :

                null
            }
            C_rightCornerOptionIcon={shouldHaveOptions() ? null : isStandalone() ? OtherHouses : OpenInNew}
            C_rightCornerOptionClick={shouldHaveOptions() ? null : () => {
                if (isStandalone()) {
                    setViewingListing(true);
                }
                else {
                    conditionalNavigation(navigate, `/listing/${reservationInfo?.listing}`, '_blank');
                }
            }}
        >
            <Box
                sx={{
                    mb:5,
                    position:'relative',
                }}
            >
                <img
                    src={listingInfo?.listing?.display?.images[0]}
                    style={{
                        minWidth:'100%',
                        maxWidth:'100%',
                        minHeight:isMobile?350:450,
                        maxHeight:isMobile?350:450,
                        objectFit:'cover',
                    }}
                />
                <Box
                    sx={{
                        px:2.5,
                        py:1.5,
                        mb:-3.5,
                        gap:.5,
                        bottom: 0,
                        width:'90%',
                        left: '50%',
                        display:'flex',
                        bgcolor:'#fff',
                        color: 'white',
                        borderRadius: 2,
                        position: 'absolute',
                        flexDirection:'column',
                        transform: 'translateX(-50%)',
                        boxShadow:'0px 6px 12px rgba(0,0,0,.2)',
                    }}
                >
                    <Typography
                        sx={{
                            color:'#000',
                            fontWeight:500,
                            textAlign:'center',
                            fontSize:{xs:'1.25rem',lg:'1.5rem'},
                            whiteSpace:{xs:'unset',lg:'nowrap'},
                        }}
                    >
                        {appropriateContextInfo?.prefixTense + ' '}
                        <span style={{fontWeight:750}}>{makeListingTitle(listingInfo?.listing)}</span>
                        {' ' + appropriateContextInfo?.suffixTense}
                    </Typography>
                </Box>
            </Box>
            <Container
                sx={{
                    pt:2,
                    gap:3,
                    display:'flex',
                    flexDirection:'column',
                }}
            >
                <Box
                    sx={{
                        width:'100%',
                        p:2,
                        borderRadius:2,
                        border:'1px solid #ededed',
                        display:ReservationViewingRole.Host.Generic.includes(viewingRole)?'none':'block',
                    }}
                >
                    <Box
                        sx={{
                            display:'flex',
                            alignItems:'center',
                        }}
                    >
                        <Typography
                            sx={{
                                color:'#000',
                                fontSize:'1.2rem',
                                fontWeight:550,
                            }}
                        >
                            Listing Info
                        </Typography>
                        <Icon
                            sx={Styles.DescriptionHeaderIconAdornment}
                        >
                            <Info />
                        </Icon>
                    </Box>

                    {summarizedListingInfo.map((infoItem, idx) => (
                        <>
                            <Hr sx={{mt:1.5+(.5*(idx>0)),mb:2}} />
                            <Typography
                                sx={{
                                    ...Styles.DescriptionTypography,
                                    ...infoItem?.custom?.sx,
                                }}
                                onClick={infoItem?.custom?.onClick || null}
                            >
                                <Icon
                                    fontSize='small'
                                    sx={{
                                        ...Styles.DescriptionIcon,
                                    }}
                                >
                                    <infoItem.icon />
                                </Icon>
                                {infoItem.text}
                            </Typography>
                        </>
                    ))}
                </Box>

                <Box
                    sx={{
                        width:'100%',
                        p:2,
                        borderRadius:2,
                        border:'1px solid #ededed',
                    }}
                >
                    <Box
                        sx={{
                            display:'flex',
                            alignItems:'center',
                        }}
                    >
                        <Typography
                            sx={{
                                color:'#000',
                                fontSize:'1.2rem',
                                fontWeight:550,
                            }}
                        >
                            Request Info
                        </Typography>
                        <Icon
                            sx={Styles.DescriptionHeaderIconAdornment}
                        >
                            <Info />
                        </Icon>
                    </Box>
                    {summarizedReservationInfo.map((infoItem, idx) => (<>
                        <Hr sx={{mt:1.5+(.5*(idx>0)),mb:2}} />
                        <Typography
                            sx={{
                                ...Styles.DescriptionTypography,
                                color:infoItem?.color ||'#333',
                            }}
                        >
                            <Icon
                                fontSize='small'
                                sx={Styles.DescriptionIcon}
                            >
                                <infoItem.icon />
                            </Icon>
                            {infoItem.text}
                        </Typography>
                    </>))}
                </Box>

                <Box
                    sx={{
                        width:'100%',
                        p:2,
                        borderRadius:2,
                        border:'1px solid #ededed',
                        display:ReservationViewingRole.Host.Generic.includes(viewingRole)?'block':'none',
                    }}
                >
                    <Box
                        sx={{
                            display:'flex',
                            alignItems:'center',
                        }}
                    >
                        <Typography
                            sx={{
                                color:'#000',
                                fontSize:'1.2rem',
                                fontWeight:550,
                            }}
                        >
                            Renter Info
                        </Typography>
                        <Icon
                            sx={Styles.DescriptionHeaderIconAdornment}
                        >
                            <Info />
                        </Icon>
                    </Box>
                    <Box
                        sx={{
                            pb:2,
                            borderBottom:'1px solid #ededed',
                        }}
                    >
                        {summarizedRenterInfo.map((infoItem, idx) => (<>
                            <Hr sx={{mt:1.5+(.5*(idx>0)),mb:2}} />
                            <Typography
                                sx={Styles.DescriptionTypography}
                            >
                                <Icon
                                    fontSize='small'
                                    sx={Styles.DescriptionIcon}
                                >
                                    <infoItem.icon />
                                </Icon>
                                {infoItem.text}
                            </Typography>
                        </>))}
                    </Box>
                    <Box
                        sx={{
                            mt:2.5,
                            gap:2,
                            width:'100%',
                            display:'flex',
                            alignItems:'center',
                            flexDirection:{xs:'column',lg:'row'},
                        }}
                    >
                        <MKButton
                            color='light'
                            sx={{
                                width:'100%',
                                fontSize:'1rem',
                                fontWeight:500,
                            }}
                            onClick={() => setViewingRenterPhoto(true)}
                        >
                            View ID photo
                        </MKButton>
                        <MKButton
                            component={isStandalone() ? null : Link}
                            to={`/profile/${reservationInfo?.renter}`}
                            target='_blank'
                            color='info'
                            sx={{
                                width:'100%',
                                fontSize:'1rem',
                                fontWeight:500,
                            }}
                            onClick={() => {
                                if (isStandalone()) {
                                    setViewingRenterProfile(true)
                                }
                            }}
                        >
                            View renter profile
                        </MKButton>
                    </Box>
                </Box>
            </Container>
        </AdaptiveModal>

        <UserProfileSheet
            open={viewingRenterProfile && isStandalone()}
            onClose={() => setViewingRenterProfile(false)}
            userId={reservationInfo?.renter}
            customTitle='Renter’s Profile'
        />

        <AdaptiveModal
            title='Renter ID Photo'
            open={viewingRenterPhoto}
            onClose={() => setViewingRenterPhoto(false)}
            maxWidth={400}
        >
            <img
                src={reservationInfo?.idPicture}
                style={{
                    width:'100%',
                    borderRadius:'8px',
                }}
            />
        </AdaptiveModal>

        <AdaptiveModal
            title='Reservation Listing'
            open={viewingListing && isStandalone()}
            onClose={() => setViewingListing(false)}
        >
            <ListingCard
                listing={listingInfo?.listing}
                listing_uuid={reservationInfo?.listing}
                reservationId={reservationId}
                dontShowSaveButton
                dontShowHostInfo
            />
        </AdaptiveModal>

        <MoreOptionsMenu
            open={MO && !viewing}
            onClose={() => setMO(false)}
            menuAlign={MA}
        >
            <BasicMenuItem
                title='View'
                BMIcon={InfoOutlined}
                onClick={() => setViewing(true)}
            />
            <BasicMenuItem
                title='Listing'
                BMIcon={isStandalone() ? OtherHouses : OpenInNew}
                onClick={() => {
                    if (isStandalone()) {
                        setViewingListing(true);
                    }
                    else {
                        conditionalNavigation(navigate, `/listing/${reservationInfo?.listing}`, '_blank');
                    }
                }}
            />
            { (listingInfo?.hostId === user?.uid && reservationInfo?.status === ReservationStatus.Pending && appropriateContextInfo?.prefixTense === 'Pending') &&
                <ApproveReservationMenuItem
                    reservationId={reservationId}
                    disabled={!user?.uid || user?.uid === reservationInfo?.renter}
                />
            }
            { (listingInfo?.hostId === user?.uid && reservationInfo?.status === ReservationStatus.Pending) &&
                <DeclineReservationMenuItem
                    reservationId={reservationId}
                    disabled={!user?.uid || user?.uid === reservationInfo?.renter}
                />
            }
            { (reservationInfo?.status === ReservationStatus.Approved && appropriateContextInfo?.prefixTense !== 'Completed') &&
                <CancelReservationMenuItem
                    reservationId={reservationId}
                    isRenterCancelling={reservationInfo?.renter === user?.uid}
                    disabled={!user?.uid}
                />
            }
            { !([ReservationViewingRole.Renter.FromChat, ReservationViewingRole.Host.FromChat].includes(viewingRole)) &&
                <ContactMenuItem
                    hostId={listingInfo?.hostId}
                    userId={reservationInfo?.renter}
                />
            }
        </MoreOptionsMenu>
    </>)
}

export default RentalPreview;

const Styles = {
    DescriptionTypography: {
        gap:2,
        color:'#333',
        fontSize:{xs:'.875rem',lg:'1rem'},
        display:'flex',
        alignItems:'center',
    },
    DescriptionIcon: {
        p:.25,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    DescriptionHeaderIconAdornment: {
        ml:'auto',
        color:'#ababab',
        height:30,
        display:'flex',
        alignItems:'center',
    }
}