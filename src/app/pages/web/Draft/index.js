import { AccessTime, Add, ArrowBack, ArrowBackIosNew, ArrowForward, ArrowLeft, Bookmark, CalendarMonth, Cancel, CheckBox, CheckCircleOutlineOutlined, CheckOutlined, Clear, CloudUploadOutlined, Create, Delete, Done, Edit, KeyboardArrowLeft, MoreHoriz, MoreVert, PhotoLibraryOutlined, RotateLeftOutlined, SaveAlt, SaveAltOutlined, Share, Style, SwapHorizOutlined, Timelapse } from "@mui/icons-material";
import { Avatar, Box, Checkbox, Container, Fade, FormControlLabel, Icon, IconButton, InputBase, Modal, NativeSelect, Skeleton, TextField, Tooltip, Typography, useMediaQuery } from "@mui/material";
import create_chat_for_users from "app/backend/cloud/create_chat_for_users";
import { getListing } from "app/backend/db/public_listings/utils";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { userauth_actions } from "app/sections/Modal/actions";
import { userauth_title } from "app/sections/Modal/actions";
import { useModal } from "app/sections/Modal/Parent/context";
import Hr from "app/utils/Hr";
import { makeUsernameAbbreviated } from "app/utils/listings/utils";
import { makeListingAddress } from "app/utils/listings/utils";
import { makeTimestampFormatted } from "app/utils/listings/utils";
import { makeListingTitle } from "app/utils/listings/utils";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ListingImageCarousel from "../Checkout/dynamic";
import * as c from 'const'
import { transactionalFee } from "app/utils/userenv/transaction/prices";
import DatePicker from "react-flatpickr";
import { getDraft } from "app/backend/db/public_listings/utils";
import { getUser } from "app/backend/db/user";
import styled from "@emotion/styled";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SpecificationsEnum } from "app/utils/optimize/utils";
import { AccessFrequencyTypes } from "app/utils/optimize/utils";
import { TimeOfDayAccessTypes } from "app/utils/optimize/utils";
import { SpaceTypes } from "app/utils/optimize/utils";
import { States } from "app/utils/optimize/utils";
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import publish_draft from "app/backend/cloud/publish_draft";
import { Helmet } from "react-helmet-async";
import { makeListingTitleExtended } from "app/utils/listings/utils";
import { Sheet } from "react-modal-sheet";
import { recommendPrice } from "app/utils/listings/utils";
import { isInvalidListingInfo } from "app/utils/listings/utils";
import AdaptiveModal from "app/sections/Modal/Adaptive";
import { isElegibleForSTPP } from "app/utils/listings/utils";
import { isElegibleForCustomCapacity } from "app/utils/listings/utils";
import { MoreOptionsMenu } from "app/sections/More";
import { DeleteMenuItem } from "app/sections/More";
import { PublishMenuItem } from "app/sections/More";

const EditButton = styled('button')`
  color: #fff;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.background.theme};
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  margin-left: auto;

  &:hover {
    cursor: pointer;
  }
`;

const Draft = ({onClickBack, customListingId}) => {
    const {listingId: plid} = useParams();
    const listingId = customListingId || plid;
    const isMobile = useMediaQuery('(max-width:991px)')

    const navigate = useNavigate();
    
    const [listing, setListing] = useState(null);

    const {location} = useLocation();
    const {user} = useUserAuthState();
    const {openModal} = useModal();
    const [loading, setLoading] = useState(false);

    const [spaceDescription, setSpaceDescription] = useState('');
    const [spaceDescriptionDraft, setSpaceDescriptionDraft] = useState('');

    const [price, setPrice] = useState(0);
    const [priceDraft, setPriceDraft] = useState(0);

    const [specifications, setSpecifications] = useState([]);
    const [specificationsDraft, setSpecificationsDraft] = useState(0);

    const [length, setLength] = useState(0);
    const [lengthDraft, setLengthDraft] = useState(0);
    const [width, setWidth] = useState(0);
    const [widthDraft, setWidthDraft] = useState(0);
    const [height, setHeight] = useState(0);
    const [heightDraft, setHeightDraft] = useState(null); // height is optional
    const [spaceType, setSpaceType] = useState(0);
    const [spaceTypeDraft, setSpaceTypeDraft] = useState(0);

    const [images, setImages] = useState([])
    const [imagesDraft, setImagesDraft] = useState([])

    const [city, setCity] = useState(''); // Current city
    const [state, setState] = useState(''); // Current state
    const [zip, setZip] = useState('');
    const [street, setStreet] = useState('');

    const [cityDraft, setCityDraft] = useState(''); // Draft city
    const [stateDraft, setStateDraft] = useState(''); // Draft state
    const [zipDraft, setZipDraft] = useState('');
    const [streetDraft, setStreetDraft] = useState('');

    const [accessFrequency, setAccessFrequency] = useState(0);
    const [accessFRQDraft, setAccessFRQDraft] = useState(0);
    const [appointmentsRequired, setAppointmentsRequired] = useState(false);
    const [appointmentsRequiredDraft, setAppointmentsRequiredDraft] = useState(false);
    const [timeOfDayAccess, setTimeOfDayAccess] = useState(0);
    const [timeOfDayAccessDraft, setTimeOfDayAccessDraft] = useState(0);

    const [deleteDraftWarning, setDeleteDraftWarning] = useState(false);

    const [rentingCapacity, setRentingCapacity] = useState(1);
    const [rentingCapacityDraft, setRentingCapacityDraft] = useState(1);

    const [oneTimePricing, setOneTimePricing] = useState(false);
    const [oneTimePricingDraft, setOneTimePricingDraft] = useState(false);
    const [readingAboutOTP, setReadingAboutOTP] = useState(false);
    const [readingAboutCC, setReadingAboutCC] = useState(false);

    const [MA, setMA] = useState(false)
    const [MO, setMO] = useState(false);

    const invalidListingInfo = useMemo(() => {
        const res = isInvalidListingInfo(
            {
                display: {
                    accessFrequency: accessFRQDraft,
                    appointmentsRequired: appointmentsRequiredDraft === 1 ? true : false,
                    images: imagesDraft,
                    spaceDescription: spaceDescriptionDraft,
                    timeOfDayAccess: timeOfDayAccessDraft,
                },
                host: listing?.host,
                location: {
                    city: cityDraft,
                    state: stateDraft,
                    street: streetDraft,
                    zip: zipDraft,
                },
                logistics: {
                    width: widthDraft,
                    length: lengthDraft,
                    height: heightDraft,
                    price: priceDraft,
                    propertyType: spaceTypeDraft,
                    rentingCapacity: rentingCapacityDraft,
                    spaceType: spaceTypeDraft,
                    specifications: specificationsDraft,
                    oneTimePricing: oneTimePricingDraft,
                }
            },
            user?.uid
        );

        return res; 
    }, [
        accessFRQDraft,
        appointmentsRequiredDraft,
        imagesDraft,
        spaceDescriptionDraft,
        timeOfDayAccessDraft,
        cityDraft,
        stateDraft,
        streetDraft,
        zipDraft,
        widthDraft,
        lengthDraft,
        heightDraft,
        priceDraft,
        spaceTypeDraft,
        specificationsDraft,
        rentingCapacityDraft,
        oneTimePricingDraft,
    ]);

    const canSave = useMemo(() => {
        return (
            spaceDescription !== spaceDescriptionDraft ||
            price !== priceDraft ||
            length !== lengthDraft ||
            width !== widthDraft ||
            height !== heightDraft ||
            spaceType !== spaceTypeDraft ||
            city !== cityDraft ||
            state !== stateDraft ||
            zip !== zipDraft ||
            street !== streetDraft ||
            accessFrequency !== accessFRQDraft ||
            appointmentsRequired !== (appointmentsRequiredDraft === 1 ? true : false) ||
            timeOfDayAccess !== timeOfDayAccessDraft ||
            specifications !== specificationsDraft ||
            images !== imagesDraft ||
            rentingCapacity !== rentingCapacityDraft ||
            oneTimePricing !== oneTimePricingDraft
        ) && (invalidListingInfo === false);
    }, [
        spaceDescription, spaceDescriptionDraft,
        price, priceDraft,
        length, lengthDraft,
        width, widthDraft,
        height, heightDraft,
        spaceType, spaceTypeDraft,
        city, cityDraft,
        state, stateDraft,
        zip, zipDraft,
        street, streetDraft,
        accessFrequency, accessFRQDraft,
        appointmentsRequired, appointmentsRequiredDraft,
        timeOfDayAccess, timeOfDayAccessDraft,
        specifications, specificationsDraft,
        rentingCapacity, rentingCapacityDraft,
        oneTimePricing, oneTimePricingDraft,
    ]);

    const handleSave = () => {
        if (canSave) {
            setLoading(true);
            setDoc(doc(getFirestore(), `/drafts/${listingId}`), {
                display: {
                    accessFrequency: accessFRQDraft,
                    appointmentsRequired: appointmentsRequiredDraft === 1 ? true : false,
                    images: imagesDraft,
                    spaceDescription: spaceDescriptionDraft,
                    timeOfDayAccess: timeOfDayAccessDraft,
                },
                host: listing?.host,
                location: {
                    city: cityDraft,
                    state: stateDraft,
                    street: streetDraft,
                    zip: zipDraft,
                },
                logistics: {
                    width: widthDraft,
                    length: lengthDraft,
                    height: heightDraft,
                    price: priceDraft,
                    propertyType: spaceTypeDraft,
                    rentingCapacity: rentingCapacityDraft,
                    spaceType: spaceTypeDraft,
                    specifications: specificationsDraft,
                    oneTimePricing: oneTimePricingDraft,
                }
            }, {merge:true})
            setListing(null)
            setLoading(false);
        }
    }

    const publishDraft = () => {
        setLoading(true);
        publish_draft({draftId: listingId}).then(res => {
            setLoading(false);
            if (res.data.error) {
                openModal('', [{
                    title: 'Error',
                    component: [() => (
                        <MKTypography>{res.data.message}</MKTypography>
                    )]
                }]);
            }
            else {
                navigate(`/listing/${res.data.listingId}`)
            }
        })
    }

    // const deleteDraft = async () => {
    //     setLoading(true);
    //     const draft_ref = doc(getFirestore(), `/drafts/${listingId}`);
    //     await deleteDoc(draft_ref);
    //     setLoading(false);
    //     window.location.href='/hosting/listings/unpublished'
    // }

    useEffect(() => {
        const get_listing = async () => {
            setLoading(true)
            if (!user || !user.uid) {
                navigate('/')
                return;
            }
            const listing_res = await getDraft(listingId);
            // if (listing_res === null || host_res === null) {
            //     navigate('/')
            //     return;
            // }
            setListing(listing_res)

            setSpaceDescription(listing_res?.display?.spaceDescription);
            setSpaceDescriptionDraft(listing_res?.display?.spaceDescription);

            setSpecifications(listing_res?.logistics?.specifications || 0);
            setSpecificationsDraft(listing_res?.logistics?.specifications || 0);

            setPrice(listing_res?.logistics?.price || 0); 
            setPriceDraft(listing_res?.logistics?.price || 0);

            setLength(listing_res?.logistics?.length || 0);
            setLengthDraft(listing_res?.logistics?.length || 0);
            setWidth(listing_res?.logistics?.width || 0);
            setWidthDraft(listing_res?.logistics?.width || 0);
            setHeight(listing_res?.logistics?.height || 0);
            setHeightDraft(listing_res?.logistics?.height || 0); // Null if not available
            setSpaceType(listing_res?.logistics?.spaceType || 0);
            setSpaceTypeDraft(listing_res?.logistics?.spaceType || 0);
            setOneTimePricing(listing_res?.logistics?.oneTimePricing);
            setOneTimePricingDraft(listing_res?.logistics?.oneTimePricing);
            setRentingCapacity(listing_res?.logistics?.rentingCapacity);
            setRentingCapacityDraft(listing_res?.logistics?.rentingCapacity)

            setImages(listing_res?.display?.images || [])
            setImagesDraft(listing_res?.display?.images || [])

            setZip(listing_res?.location?.zip || '');
            setStreet(listing_res?.location?.street || '')
            setCity(listing_res?.location?.city || '');
            setState(listing_res?.location?.state || '');

            setZipDraft(listing_res?.location?.zip || '');
            setStreetDraft(listing_res?.location?.street || '');
            setCityDraft(listing_res?.location?.city || '');  // Populate drafts
            setStateDraft(listing_res?.location?.state || '');

            setAccessFrequency(listing_res?.display?.accessFrequency || 0);
            setAccessFRQDraft(listing_res?.display?.accessFrequency || 0);

            setAppointmentsRequired((listing_res?.display?.appointmentsRequired === true) || false)
            setAppointmentsRequiredDraft(listing_res?.display?.appointmentsRequired === true ? 1 : 0)

            setTimeOfDayAccess(listing_res?.display?.timeOfDayAccess || 0)
            setTimeOfDayAccessDraft(listing_res?.display?.timeOfDayAccess || 0)

            setLoading(false);
        }

        if (!listing) {
            get_listing();
        }
    }, [listing])

    if (listingId === null) {
        navigate('/')
    }

    const isOnSeparatePage = location?.pathname.includes('/draft/')
    const ContentContainer = isMobile ? Box : Container;

    return (
        <div style={{minHeight:'inherit'}}>
            <Helmet>
                <title>SpareLot | Draft: {makeListingTitle(listing)}</title>
                <meta name="description" content="Manage your listing drafts." />
                <meta name="robots" content="noindex" />
            </Helmet>

            <Box
                sx={{
                    width:'100%',
                    p:2,
                    bgcolor:'#fafafa',
                    minHeight:isOnSeparatePage ? 'inherit' : '100dvh',
                }}
            >
                <ContentContainer
                    sx={{
                        width:'100%',
                    }}
                >
                    <Box
                        sx={{
                            ...Styles.ContrastedMainSections,
                            flexDirection:'row',
                            mb:2,
                        }}
                    >
                        <Box
                            sx={{
                                ml:isOnSeparatePage ? {xs:-.75,lg:-1} : 0,
                                gap:{xs:1,lg:1.5},
                                display:'flex',
                                alignItems:'center',
                            }}
                        >
                            <IconButton
                                size={isMobile ? 'medium' : 'large'}
                                sx={{
                                    ...Styles.IconButton.CommonStyle,
                                    display:isOnSeparatePage ? 'flex' : 'none',
                                }}
                                component={Link}
                                to={window.history.length > 1 ? -1 : '/hosting/listings/unpublished'}
                            >
                                <ArrowBack />
                            </IconButton>
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: '1.25rem',
                                            lg:'1.75rem',
                                        },
                                        color:'#333',
                                        lineHeight:{xs:'30px',lg:'40px'},
                                        fontWeight:600,
                                    }}
                                >
                                    Edit draft
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize:{
                                            xs:'.75rem',
                                            lg:'.875rem',
                                        },
                                        fontWeight:450,
                                        color:'#737373',
                                        lineHeight:'25px',
                                    }}
                                >
                                    {loading ? 
                                        <Skeleton
                                            width={200}
                                            height='100%'
                                            animation='wave'
                                        />
                                        :
                                        <>
                                            {makeListingTitleExtended(listing)}
                                        </>
                                    }
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display:'flex',
                                alignItems:'center',
                                ml:'auto',
                                gap:{xs:1,lg:2},
                            }}
                        >
                            <Box
                                onClick={(loading || canSave || invalidListingInfo) ? () => {} : publishDraft}
                            >
                                {isMobile ?
                                    <IconButton
                                        disabled={loading || canSave}
                                        size='medium'
                                        sx={{
                                            p:{xs:.75,lg:1},
                                            bgcolor:`${(loading || canSave || invalidListingInfo)?'#bcbcbc':colors.info.main} !important`,
                                            color:'#fff !important',
                                        }}
                                    >
                                        <CloudUploadOutlined sx={{scale:{xs:.875,lg:1}}}/>
                                    </IconButton>

                                    :

                                    <>
                                        <MKButton
                                            disabled={loading || canSave || invalidListingInfo}
                                            color='info'
                                            sx={{
                                                fontSize:'.875rem',
                                                fontWeight:500,
                                                borderRadius:2,
                                            }}
                                            startIcon={
                                                <CloudUploadOutlined />
                                            }
                                        >
                                            Publish
                                        </MKButton>
                                    </>
                                }
                            </Box>

                            <MKButton
                                disabled={loading || !canSave}
                                color='info'
                                sx={{
                                    display:{xs:'none',lg:'flex'},
                                    fontSize:'.875rem',
                                    fontWeight:500,
                                    borderRadius:2,
                                }}
                                startIcon={
                                    <CheckOutlined />
                                }
                                onClick={handleSave}
                            >
                                Save
                            </MKButton>
                            <MKButton
                                disabled={loading || !canSave}
                                color='light'
                                sx={{
                                    display:{xs:'none',lg:'flex'},
                                    fontSize:'.875rem',
                                    fontWeight:500,
                                    borderRadius:2,
                                }}
                                startIcon={
                                    <RotateLeftOutlined />
                                }
                                onClick={() => setListing(null)}
                            >
                                Reset
                            </MKButton>

                            <IconButton
                                onClick={(e) => {
                                    setMA(e.currentTarget)
                                    setMO(true)
                                }}
                                size='medium'
                                sx={{
                                    p:{xs:.75,lg:1},
                                    ...Styles.IconButton.CommonStyle,
                                    borderRadius:{xs:16,lg:2},
                                    border:'1px solid #ededed',
                                }}
                            >
                                <MoreHoriz />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            gap:2,
                            display:{xs:'flex',lg:'grid'},
                            gridTemplateColumns:'3fr 2fr',
                            flexDirection:'column',
                        }}
                    >
                        <Box
                            id='mainInfoSection'
                            sx={Styles.ContrastedMainSections}
                        >
                            <Box
                                sx={Styles.SubSections}
                            >
                                <Typography
                                    sx={Styles.Typography.Title}
                                >
                                    Basic info
                                </Typography>
                                <Box
                                    sx={{
                                        gap:1.5,
                                        width:'100%',
                                        display:'flex',
                                        alignItems:'center',
                                        flexDirection:{
                                            xs:'column',
                                            xl:'row',
                                        },
                                        p:{xs:1.5,lg:2},
                                        borderRadius:2,
                                        border:'1px solid #ededed',
                                    }}
                                >
                                    {[
                                        {
                                            name: 'Width',
                                            get: widthDraft,
                                            set: setWidthDraft,
                                        },
                                        {
                                            name: 'Length',
                                            get: lengthDraft,
                                            set: setLengthDraft,
                                        },
                                        {
                                            name: 'Height',
                                            get: heightDraft,
                                            set: setHeightDraft,
                                            optional:true,
                                        }
                                    ].map((methods, idx) => (
                                        <Box
                                            sx={{
                                                gap:.5,
                                                width:'100%',
                                                display:'flex',
                                                alignItems:'center',
                                                justifyContent:{
                                                    xs:'space-between',
                                                    xl:'start',
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    ...Styles.Typography.Caption,
                                                    color:(!methods.optional && methods.get < 1) || methods.get > 500 ? '#f00' : '#737373',
                                                    whiteSpace:'nowrap',
                                                }}
                                            >
                                                {(!methods.optional && methods.get < 1) || methods.get > 500 ? 
                                                    <>
                                                        1-500 ft.
                                                    </>
                                                    
                                                    :

                                                    <>
                                                        {methods.name}:
                                                    </>
                                                }
                                            </Typography>
                                            <TextField
                                                variant='outlined'
                                                value={methods.get}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    if (!isNaN(newValue)) {
                                                        methods.set(Number(newValue));
                                                    }
                                                }}
                                                inputProps={{
                                                    sx:{
                                                        px:1,
                                                        py:.5,
                                                        width:'fit-content',
                                                    }
                                                }}
                                                sx={{
                                                    width:50,
                                                }}
                                            />
                                        </Box>
                                    ))}
                                    <Box
                                        sx={{
                                            width:'100%',
                                            gap:.5,
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent:{
                                                xs:'space-between',
                                                xl:'default',
                                            }
                                        }}
                                    >
                                        <Typography
                                            sx={Styles.Typography.Caption}
                                        >
                                            Type:
                                        </Typography>

                                        <NativeSelect
                                            key={spaceTypeDraft}
                                            defaultValue={0}
                                            value={spaceTypeDraft}
                                            onChange={(e) => {
                                                setSpaceTypeDraft(Number(e.target.value))
                                            }}
                                            inputProps={{
                                                id: 'uncontrolled-native',
                                            }}
                                            sx={{
                                                border:'none',
                                            }}
                                        >
                                            {SpaceTypes.map((sv, idx) => (
                                                <option value={
                                                    idx
                                                }>{sv.replaceAll('_', ' ')}</option>
                                            ))}
                                        </NativeSelect>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={Styles.SubSections}
                            >
                                <Typography
                                    sx={Styles.Typography.Title}
                                >
                                    Access info
                                </Typography>
                                <Box
                                    sx={{
                                        gap:2,
                                        width:'100%',
                                        display:'flex',
                                        alignItems:'center',
                                        flexDirection:{
                                            xs:'column',
                                            xl:'row',
                                        }
                                    }}
                                >
                                    {[
                                        {
                                            name: 'Access frequency',
                                            get: accessFRQDraft,
                                            set: setAccessFRQDraft,
                                            all: AccessFrequencyTypes,
                                        },
                                        {
                                            name: 'Access during',
                                            get: timeOfDayAccessDraft,
                                            set: setTimeOfDayAccessDraft,
                                            all: TimeOfDayAccessTypes,
                                        },
                                        {
                                            name: 'Appointments?',
                                            get: appointmentsRequiredDraft,
                                            set: setAppointmentsRequiredDraft,
                                            all: [
                                                'Not required before visits',
                                                'Required before visits',
                                            ]
                                        }
                                    ].map((method, idx) => (
                                        <Box
                                            sx={{
                                                width:'100%',
                                                border:'1px solid #ededed',
                                                borderRadius:2,
                                                p:{xs:1.5,lg:2},
                                            }}
                                        >
                                            <Typography
                                                sx={Styles.Typography.Caption}
                                            >
                                                {method.name}
                                            </Typography>

                                            <NativeSelect
                                                defaultValue={0}
                                                value={Number(method.get)}
                                                onChange={(e) => {
                                                    method.set(Number(e.target.value))
                                                }}
                                                inputProps={{
                                                    id: 'uncontrolled-native',
                                                }}
                                                sx={{
                                                    width:'100%',
                                                }}
                                            >
                                                {method.all.map((sv, idx) => (
                                                    <option value={
                                                        idx
                                                    }>{sv.replaceAll('_', ' ')}</option>
                                                ))}
                                            </NativeSelect>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>

                            <Box
                                sx={Styles.SubSections}
                            >
                                <Typography
                                    sx={Styles.Typography.Title}
                                >
                                    Specifications
                                </Typography>
                                <Box
                                    sx={{
                                        p:{xs:1.5,lg:2},
                                        borderRadius:2,
                                        border:'1px solid #ededed',
                                        display:{xs:'flex',lg:'grid'},
                                        gridTemplateColumns:'1fr 1fr',
                                        flexDirection:'column',
                                        gap:{xs:1.5,lg:2},
                                    }}
                                >
                                    {Object.entries(SpecificationsEnum).slice(0, loading ? 6 : Object.keys(SpecificationsEnum).length).map(([key, value], index) => {
                                        const isSelected = (specificationsDraft & value) === value;

                                        return (
                                            <Box
                                                key={key}
                                                onClick={() => {
                                                    let newSpecDraft = specificationsDraft;
                                                    if (newSpecDraft & value) {
                                                        newSpecDraft ^= value; // Remove
                                                    } else {
                                                        newSpecDraft |= value; // Add
                                                    }
                                                    setSpecificationsDraft(newSpecDraft);
                                                }}
                                                sx={{
                                                    cursor: 'pointer',
                                                    gap: 2,
                                                    display:'flex',
                                                    border: `2px solid #${isSelected ? '2196f3' : 'ededed'}`,
                                                    backgroundColor: isSelected ? '#e3f2fd' : 'transparent',
                                                    alignItems: 'center',
                                                    px: { xs: 1, lg: 1 },
                                                    py: { xs: .75, lg: 1 },
                                                    borderRadius: 16,
                                                    '&:active':{
                                                        scale:.98,
                                                        transition:'scale .15s ease',
                                                    },
                                                    transition:'scale .15s ease',
                                                    userSelect:'none',
                                                }}
                                            >
                                                <Icon
                                                    sx={{
                                                        border: '1px solid #ededed',
                                                        width: 40,
                                                        height: 40,
                                                        display: 'flex',
                                                        borderRadius: 8,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0px 1px 2px rgba(0,0,0,.2)',
                                                        backgroundColor: isSelected ? '#bbdefb' : 'white',
                                                    }}
                                                >
                                                    {loading && index < 6 ? (
                                                        <Skeleton variant="circular" width="100%" height="100%" />
                                                    ) : (
                                                        c.specificationToIcon[`${key}`]
                                                    )}
                                                </Icon>

                                                <Box sx={{ flexGrow: 1 }}>
                                                    {loading && index < 6 ? (
                                                        <Skeleton variant="text" width="80%" height="1em" />
                                                    ) : (
                                                        <Typography
                                                            sx={{
                                                                color: '#737373',
                                                                fontSize: '.8rem',
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {`${key}`.replaceAll('_', ' ')}
                                                        </Typography>
                                                    )}
                                                </Box>

                                                <Icon
                                                    sx={{
                                                        ml: 'auto',
                                                        width: 24,
                                                        height: 24,
                                                        color: isSelected ? colors.info.main : '#ccc',
                                                        opacity: isSelected ? 1 : 0,
                                                        transition: 'opacity 0.2s',
                                                    }}
                                                >
                                                    <CheckCircleOutlineOutlined />
                                                </Icon>
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                gap:2,
                            }}
                        >
                            {/* <Box
                                sx={Styles.ContrastedMainSections}
                            >
                                <Box
                                    sx={Styles.SubSections}
                                >
                                    <Typography
                                        sx={Styles.Typography.Title}
                                    >
                                        Images
                                    </Typography>

                                    <Box
                                        sx={{
                                            display:'flex',
                                            flexDirection:'column',
                                            gap:2,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width:'100%',
                                                display:{xs:'none',lg:'flex'},
                                                minHeight:{xs:200,xxl:300},
                                                minHeight:{xs:200,xxl:300},
                                            }}
                                        >
                                            <img
                                                src={imagesDraft[0] || images[0]}
                                                style={{
                                                    width:'100%',
                                                    minHeight:'inherit',
                                                    maxHeight:'inherit',
                                                    objectFit:'cover',
                                                    borderRadius:8,
                                                }}
                                            />
                                        </Box>
                                        
                                        <Box
                                            sx={{
                                                gap:2,
                                                display:'grid',
                                                gridTemplateColumns:{
                                                    xs:'repeat(2, 1fr)',
                                                    md:'repeat(3, 1fr)',
                                                    lg:'repeat(2, 1fr)',
                                                    xxl:'repeat(3, 1fr)',
                                                }
                                            }}
                                        >
                                            {imagesDraft?.slice((!isMobile+0), imagesDraft.length).map((image, idx) => (
                                                <Box
                                                    sx={{
                                                        width:'100%',
                                                        minHeight:175,
                                                        maxHeight:175,
                                                        position:'relative',
                                                        borderRadius:2,
                                                        overflow:'hidden',
                                                        boxShadow:2,
                                                    }}
                                                >
                                                    <img
                                                        src={image}
                                                        style={{
                                                            width:'100%',
                                                            minHeight:'inherit',
                                                            maxHeight:'inherit',
                                                            objectFit:'cover',
                                                        }}
                                                    />
                                                </Box>
                                            ))}
                                            <Box
                                                sx={{
                                                    width:'100%',
                                                    height:175,
                                                    borderRadius:2,
                                                    cursor:'pointer',
                                                    border:`2px dashed ${colors.info.main}`,
                                                    display:'flex',
                                                    flexDirection:'column',
                                                    justifyContent:'center',
                                                    alignItems:'center',
                                                    '&:hover':{
                                                        bgcolor:'rgba(46, 137, 255, 0.05)'
                                                    },
                                                    '&:active':{
                                                        scale:.95,
                                                        transition:'all .15s ease',
                                                    },
                                                    transition:'all .15s ease',
                                                    userSelect:'none',
                                                }}
                                            >
                                                <Icon
                                                    color='info'
                                                    sx={{
                                                        width:50,
                                                        height:50,
                                                        display:'flex',
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                    }}
                                                >
                                                    <Add sx={{scale:2.5}}/>
                                                </Icon>
                                                <Typography
                                                    sx={{
                                                        color:'#333',
                                                        fontSize:'.875rem',
                                                        fontWeight:450,
                                                    }}
                                                >
                                                    Add image
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box> */}

                            <Box
                                sx={Styles.ContrastedMainSections}
                            >
                                <Box
                                    sx={Styles.SubSections}
                                >
                                    <Typography
                                        sx={Styles.Typography.Title}
                                    >
                                        Pricing
                                    </Typography>

                                    <Box
                                        sx={{
                                            gap:2,
                                            p:{xs:1.5,lg:2},
                                            display:'flex',
                                            flexDirection:'column',
                                            borderRadius:2,
                                            border:'1px solid #ededed',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display:'flex',
                                                alignItems:'center',
                                                justifyContent:'space-between',
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        ...Styles.Typography.Caption,
                                                        color:'#333',
                                                        fontWeight:550,
                                                    }}
                                                >
                                                    Monthly Price
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        ...Styles.Typography.Caption,
                                                        fontSize:'.875rem',
                                                        color:priceDraft < 1 || priceDraft > 1000 ? '#f00' : '#737373',
                                                    }}
                                                >
                                                    {priceDraft < 1 || priceDraft > 1000 ?
                                                        <>
                                                            Must be from $1-$1000.
                                                        </>

                                                        :

                                                        <>
                                                            Recommended: <span
                                                                style={{
                                                                    color:colors.info.main,
                                                                }}
                                                            >
                                                            ~${recommendPrice(spaceTypeDraft, (widthDraft*lengthDraft))}
                                                            </span>
                                                        </>
                                                    }
                                                </Typography>
                                            </Box>
                                            <TextField
                                                value={`$${priceDraft}`}
                                                onChange={(e) => {
                                                    const newValue = e.target.value.slice(1, e.target.value.length);
                                                    // Validate the input if necessary (e.g., only numbers)
                                                    if (!isNaN(newValue)) {
                                                        setPriceDraft(Number(newValue)); // Update draft state with new value
                                                    }
                                                }}
                                                sx={{
                                                    width:75,
                                                }}
                                            />
                                        </Box>

                                        <Box
                                            sx={{
                                                display:isElegibleForSTPP(spaceTypeDraft) ? 'flex' : 'none',
                                                alignItems:'center',
                                                justifyContent:'space-between',
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        ...Styles.Typography.Caption,
                                                        color:'#333',
                                                        fontWeight:550,
                                                    }}
                                                >
                                                    One-time pricing
                                                </Typography>
                                                <Typography
                                                    onClick={() => setReadingAboutOTP(true)}
                                                    sx={{
                                                        ...Styles.Typography.Caption,
                                                        fontSize:'.875rem',
                                                        color:colors.info.main,
                                                        cursor:'pointer',
                                                    }}
                                                >
                                                    More info
                                                </Typography>
                                            </Box>

                                            <Checkbox
                                                checked={oneTimePricingDraft}
                                                onChange={(e) => {
                                                    setOneTimePricingDraft(e.target.checked)
                                                }}
                                            />
                                        </Box>

                                        <Box
                                            sx={{
                                                display:isElegibleForCustomCapacity(spaceTypeDraft) ? 'flex' : 'none',
                                                alignItems:'center',
                                                justifyContent:'space-between',
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        ...Styles.Typography.Caption,
                                                        color:'#333',
                                                        fontWeight:550,
                                                    }}
                                                >
                                                    Custom Capacity
                                                </Typography>
                                                <Typography
                                                    onClick={() => setReadingAboutCC(true)}
                                                    sx={{
                                                        ...Styles.Typography.Caption,
                                                        fontSize:'.875rem',
                                                        color:(rentingCapacityDraft < 1 || rentingCapacityDraft > 500) ? '#f00' : colors.info.main,
                                                        cursor:'pointer',
                                                    }}
                                                >
                                                    {rentingCapacityDraft < 1 || rentingCapacityDraft > 500 ? 
                                                        <>
                                                            Must be 1-500 renters.
                                                        </>
                                                        :
                                                        <>
                                                            More info
                                                        </>

                                                    }   
                                                </Typography>
                                            </Box>

                                            <TextField
                                                value={rentingCapacityDraft}
                                                onChange={(e) => {
                                                    const newValue = e.target.value
                                                    // Validate the input if necessary (e.g., only numbers)
                                                    if (!isNaN(newValue)) {
                                                        setRentingCapacityDraft(Number(newValue)); // Update draft state with new value
                                                    }
                                                }}
                                                sx={{
                                                    width:75,
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={Styles.ContrastedMainSections}
                            >
                                <Box
                                    sx={Styles.SubSections}
                                >
                                    <Typography
                                        sx={Styles.Typography.Title}
                                    >
                                        Description
                                    </Typography>

                                    <TextField
                                        multiline
                                        minRows={5}
                                        inputProps={{
                                            maxLength:500,
                                        }}
                                        helperText={spaceDescriptionDraft?.length >= 450 ? 'Maximum of 500 characters allowed' : spaceDescriptionDraft?.length <= 0 ? 'Must enter a space description' : null}
                                        value={spaceDescriptionDraft}
                                        onChange={(e) => setSpaceDescriptionDraft(e.target.value)}
                                        sx={{
                                            width:'100%',
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={Styles.ContrastedMainSections}
                            >
                                <Box
                                    sx={Styles.SubSections}
                                >
                                    <Typography
                                        sx={Styles.Typography.Title}
                                    >
                                        Address
                                    </Typography>

                                    {[
                                        {
                                            get: streetDraft,
                                            set: setStreetDraft,
                                            name: 'Street',
                                        },
                                        {
                                            get: cityDraft,
                                            set: setCityDraft,
                                            name: 'City',
                                        }
                                    ].map((method, idx) => (
                                        <Box
                                            sx={{
                                                display:'flex',
                                                flexDirection:'column',
                                                gap:.5,
                                            }}
                                        >
                                            <Typography
                                                sx={Styles.Typography.Caption}
                                            >
                                                {method.name}
                                            </Typography>

                                            <TextField
                                                value={method.get}
                                                onChange={(e) => method.set(e.target.value)}
                                                sx={{
                                                    width:'100%',
                                                }}
                                            />
                                        </Box>
                                    ))}

                                    <Typography
                                        sx={Styles.Typography.Caption}
                                    >
                                        State & Zip
                                    </Typography>
                                    <Box
                                        sx={{
                                            mt:-1.5,
                                            gap:2,
                                            width:'100%',
                                            display:'flex',
                                            alignItems:'center',
                                            p:2,
                                            borderRadius:2,
                                            border:'1px solid #d2d6da',
                                        }}
                                    >
                                            <NativeSelect
                                                defaultValue={0}
                                                value={stateDraft}
                                                onChange={(e) => {
                                                    setStateDraft(Number(e.target.value))
                                                }}
                                                inputProps={{
                                                    id: 'uncontrolled-native',
                                                }}
                                                sx={{
                                                    width:'100%',
                                                }}
                                            >
                                                {States.map((sv, idx) => (
                                                    <option value={
                                                        idx
                                                    }>{sv}</option>
                                                ))}
                                            </NativeSelect>
                                        <TextField
                                                value={zipDraft}
                                                onChange={(e) => {
                                                    const newValue = e.target.value.trim();
                                                    if (!isNaN(newValue) && newValue.length <= 5) {
                                                        setZipDraft(newValue)
                                                    }
                                                }}
                                                sx={{
                                                    width:'100%',
                                                }}
                                            />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </ContentContainer>

                <div style={{
                    width:'100%',
                    height:'150px',
                    display:!loading && isMobile && canSave?'flex':'none',
                }} />
            </Box>

            <AdaptiveModal
                swipeSheetMobile
                open={readingAboutOTP}
                onClose={() => setReadingAboutOTP(false)}
                title='One-time pricing'
                maxWidth={500}
            >
                <Typography
                    sx={{
                        fontSize:'1rem',
                        fontWeight:500,
                        color:'#333',
                    }}
                >
                    Hosts listing an elegible space can optionally offer short-term renting for renters, in which 1-6 day rental requests are allowed. This is generally used for spaces near events and activities for renters to book as a parking alternative but can also be used as general short term storage.
                </Typography>
            </AdaptiveModal>

            <AdaptiveModal
                swipeSheetMobile
                open={readingAboutCC}
                onClose={() => setReadingAboutCC(false)}
                title='Custom Capacity'
                maxWidth={500}
            >
                <Typography
                    sx={{
                        fontSize:'1rem',
                        fontWeight:500,
                        color:'#333',
                    }}
                >
                    Hosts listing an eligible space (parking lot or parking structure) use space capacity to indicate the number of parking spots available without creating multiple listings. This allows multiple different reservations to be active at the same time up to your specified amount. If you choose to edit your renting capacity, please be precise with your exact capacity, as overestimating can cause conflicts between renters.
                </Typography>
            </AdaptiveModal>

            <MoreOptionsMenu
                open={MO}
                onClose={() => setMO(false)}
                menuAlign={MA}
            >
                <PublishMenuItem
                    draftId={listingId}
                    disabled={!user?.uid || user?.uid !== listing?.host}
                />
                <DeleteMenuItem
                    draftId={listingId}
                    disabled={!user?.uid || listing?.host !== user?.uid}
                />
            </MoreOptionsMenu>

            <Fade in={!loading && isMobile && canSave} exit={200}>
                <Box
                    sx={{
                        position:'fixed',
                        bottom:0,
                        left:0,
                        p:2,
                        pb:6,
                        minHeight:150,
                        maxHeight:150,
                        gap:3,
                        width:'100%',
                        bgcolor:'#fff',
                        boxShadow:'0px 2px 12px rgba(0,0,0,.25)',
                        borderRadius:'24px 24px 0px 0px',
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                    }}
                >
                    <Box
                        sx={{
                            bgcolor:'#333',
                            width:40,
                            minHeight:2,
                            borderRadius:32,
                        }}
                    />

                    <Box
                        sx={{
                            display:'flex',
                            width:'100%',
                            alignItems:'center',
                            gap:2,
                        }}
                    >
                        <MKButton
                            color='light'
                            sx={{
                                minHeight:50,
                                fontWeight:500,
                                fontSize:'1rem',
                                width:'100%',
                                borderRadius:16,
                            }}
                            onClick={() => setListing(null)}
                        >
                            Reset
                        </MKButton>
                        <MKButton
                            color='info'
                            sx={{
                                minHeight:50,
                                fontWeight:500,
                                fontSize:'1rem',
                                width:'100%',
                                borderRadius:16,
                            }}
                            onClick={handleSave}
                        >
                            Save
                        </MKButton>
                    </Box>
                </Box>
            </Fade>
        </div>
    )
}

export default Draft;

const Styles = {
    ContrastedMainSections: {
        p:2.5,
        gap:2,
        width: '100%',
        bgcolor:'#fff',
        boxShadow:'0px 2px 6px rgba(0,0,0,.2)',
        borderRadius:2,
        display:'flex',
        flexDirection:'column',
    },
    SubSections: {
        width:'100%',
        display:'flex',
        flexDirection:'column',
        gap:1.5,
    },
    IconButton: {
        CommonStyle: {
            color:'#333',
            '&:hover':{
                bgcolor:'#efefef',
                transition:'all .15s ease',
            },
            transition:'all .15s ease',
        }
    },
    Typography: {
        Title: {
            fontSize: {
                xs:'1.2rem',
                lg:'1.5rem',
            },
            fontWeight:550,
            color:'#333',
        },
        Caption: {
            fontSize:{
                xs:'.875rem',
                lg:'1rem'
            },
            color:'#737373',
        }
    }
}