import { Box, Checkbox, Container, FormControlLabel, Typography } from "@mui/material";
import { getUser } from "app/backend/db/user";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import StepsProgress from "app/utils/steps";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import create_listing from "app/backend/cloud/create_listing";
import MKBox from "components/MKBox";
import colors from "assets/theme/base/colors";
import { TimeOfDayAccessTypes } from "app/utils/optimize/utils";
import { AccessFrequencyTypes } from "app/utils/optimize/utils";
import { SpaceTypes } from "app/utils/optimize/utils";
import { SpecificationsEnum } from "app/utils/optimize/utils";
import { States } from "app/utils/optimize/utils";
import MKTypography from "components/MKTypography";
import { useModal } from "app/sections/Modal/Parent/context";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import SpaceType from "./type";
import SpaceFeatures from "./features";
import SpaceLocation from "./location";
import SpaceDescription from "./description";
import SpaceDimensions from "./dimensions";
import SpaceAccessibility from "./accessibility";
import SpacePricing from "./pricing";
import SpaceCapacity from "./capacity";
import SpaceImages from "./images";
import { LoadingSpinner } from "app/utils/loading/component";
import AdaptiveModal from "app/sections/Modal/Adaptive";
import CreateFinish from "./Finish";
import { FolderSpecial, GiteOutlined } from "@mui/icons-material";
import { isElegibleForCustomCapacity } from "app/utils/listings/utils";

const swipeVariants = {
    hidden: (direction) => ({
      x: direction === 0 ? '0%' : direction > 0 ? "100%" : "-100%", // Start from right or left based on direction
      opacity: 0,
    }),
    visible: (direction) => ({
      x: 0, // Animate to the center
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18,
        duration: 0.05,
      },
    }),
    exit: (direction) => ({
      x: direction === 0 ? '0%' : direction > 0 ? "-100%" : "100%", // Exit to left or right based on direction
      opacity: 0,
      transition: {
        duration: 0.05,
      },
    }),
  };

const initialVariant = {
    initial: {
        y: '100%', // Start off-screen
        opacity: 0,
    },
    animate: {
        y: 0, // Move to its final position
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 18,
            duration:.05,
        },
    },
};

const Create = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const {openModal} = useModal();
    const [step, setStep] = useState(1);
    const [dir, setDir] = useState(0);
    // const [userImpl, setUserImpl] = useState(null);
    const navigate = useNavigate();

    const [vehicleOk, setVehicleOk] = useState(-1);
    const [vehicleType, setVehicleType] = useState(-1);
    const [spaceType, setSpaceType] = useState(-1);

    const [specifications, setSpecifications] = useState([])

    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [hasPermissionToRent, setHasPermissionToRent] = useState(false);

    const [spaceDescription, setSpaceDescription] = useState('');
    const [spaceDescriptionWordCount, setSpaceDescriptionWordCount] = useState(0);

    const [width, setWidth] = useState(0);
    const [length, setLength] = useState(0);
    const [height, setHeight] = useState(0);

    const [appointmentsRequired, setAppointmentsRequired] = useState(true);
    const [timeOfDayAccess, setTimeOfDayAccess] = useState(0);
    const [accessFrequency, setAccessFrequency] = useState(0);

    const [monthlyPrice, setMonthlyPrice] = useState('');
    const [oneTimePricing, setOneTimePricing] = useState(false);

    const [rentingCapacity, setRentingCapacity] = useState(1);
    const [customCapacity, setCustomCapacity] = useState(false);
    // const [minimumPrice, setMinimumPrice] = useState('');
    // const [oneTimePrice, setOneTimePrice] = useState('');
    // const [isDynamicPricing, setIsDynamicPricing] = useState(false);
    // const [isDiscountedPrice, setIsDiscountedPrice] = useState(false);

    const [photos, setPhotos] = useState([])
    const [isDraft, setIsDraft] = useState(searchParams.get('draft'));

    const [finishing, setFinishing] = useState(false);
    const [finishedFileID, setFinishedFileID] = useState('')

    const validations = {
        1: () => spaceType >= 0 && spaceType < SpaceTypes.length,
        2: () => true, // Always valid
        3: () =>
            street !== '' &&
            state !== '' &&
            zip !== '' &&
            zip?.length === 5 &&
            hasPermissionToRent === true,
        4: () =>
            spaceDescriptionWordCount >= 10 &&
            spaceDescriptionWordCount <= 300 &&
            spaceDescription !== '',
        5: () =>
            width > 0 &&
            width <= 500 &&
            length > 0 &&
            length <= 500 &&
            (height ? height > 0 && height <= 500 : true),
        6: () =>
            appointmentsRequired !== null &&
            timeOfDayAccess >= 0 &&
            timeOfDayAccess < TimeOfDayAccessTypes.length &&
            accessFrequency >= 0 &&
            accessFrequency < AccessFrequencyTypes.length,
        7: () =>
            monthlyPrice !== '' &&
            parseInt(monthlyPrice) <= 1000 &&
            parseInt(monthlyPrice) > 0,
        8: () =>
            customCapacity
                ? rentingCapacity > 0 && rentingCapacity <= 500
                : photos.length >= 5,
        9: () => photos.length >= 5,
    };

    const steps = [
        {
            component: SpaceType,
            props: { 
                isDraft, setIsDraft, 
                vehicleOk, setVehicleOk, 
                vehicleType, setVehicleType,
                spaceType, setSpaceType,
            },
        },
        {
            component: SpaceFeatures,
            props: {
                specifications, setSpecifications,
            }
        },
        {
            component: SpaceLocation,
            props: {
                street, setStreet,
                city, setCity,
                state, setState,
                zip, setZip,
                hasPermissionToRent, setHasPermissionToRent,
            }
        },
        {
            component: SpaceDescription,
            props: {
                setWordCount: setSpaceDescriptionWordCount,
                spaceDescription, setSpaceDescription,
                spaceDescriptionWordCount, setSpaceDescriptionWordCount,
            }
        },
        {
            component: SpaceDimensions,
            props: {
                width, setWidth,
                length, setLength,
                height, setHeight,
                spaceType,
            }
        },
        {
            component: SpaceAccessibility,
            props: {
                appointmentsRequired, setAppointmentsRequired,
                timeOfDayAccess, setTimeOfDayAccess,
                accessFrequency, setAccessFrequency,
            }
        },
        {
            component: SpacePricing,
            props: {
                spaceType, width, length,
                monthlyPrice, setMonthlyPrice,
                oneTimePricing, setOneTimePricing,
                rentingCapacity, setRentingCapacity,
            }
        },
        {
            component: SpaceCapacity,
            props: {
                rentingCapacity, setRentingCapacity,
            },
            condition: customCapacity,
        },
        {
            component: SpaceImages,
            props: {
                photos, setPhotos
            }
        }
    ]

    const canAdvance = () => {
        const validate = validations[step]
        return validate ? validate() : true;
    }

    useEffect(() => {
        setCustomCapacity(isElegibleForCustomCapacity(spaceType))
    }, [spaceType])

    useEffect(() => {
        window.scrollTo(0,0)
    }, [step])

    return (<>
        <div style={{minHeight:'inherit', overflow:'hidden'}}>
            <Helmet>
                <title>SpareLot | Create a new Listing</title>
                <meta name="description" content="Create a listing to rent out your space." />
                <meta name="robots" content="noindex" />
            </Helmet>
            <motion.div
                initial="initial"
                animate="animate"
                variants={initialVariant}
                style={{
                    overflowX:'hidden',
                    minHeight:'inherit',
                    backgroundColor: "white",
                }}
            >
                <Container
                    sx={{
                        minHeight:'inherit',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'column',
                    }}
                >
                    { finishing && 
                        <Box
                            sx={{
                                pb:4,
                                width:'100%',
                                minHeight:'inherit',
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            <LoadingSpinner />
                        </Box>
                    }
                    {!finishing && !finishedFileID && 
                        <AnimatePresence mode="wait" custom={dir}>
                            <motion.div
                                key={step}
                                variants={swipeVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                custom={dir} // Pass the direction to the variants
                                style={{
                                    minHeight: "inherit",
                                }}
                            >
                            {(() => {
                                const Component = steps[step - 1]?.component;
                                const props = steps[step - 1]?.props;
                                const condition = steps[step - 1]?.condition;
                                if (condition !== undefined && condition === false) {
                                    setStep(step + dir)
                                }
                                return (
                                    <Box
                                        sx={{
                                            width:'100%',
                                            display:'flex',
                                            justifyContent:'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                mt:2,
                                                mb:16,
                                                gap:2,
                                                display:'flex',
                                                flexDirection:'column',
                                                width:'100%',
                                                maxWidth:600,
                                            }}
                                        >
                                            <Component {...props} />
                                        </Box>
                                    </Box>
                                )
                            })()}
                            </motion.div>
                        </AnimatePresence>
                    }
                </Container>
                
                {!finishedFileID &&
                    <StepsProgress
                        maxSteps={9} canAdvance={() => {return !finishing && canAdvance()}}
                        step={step} setStep={(newStep) => {
                            setDir(newStep - step);
                            setStep(newStep);
                        }}
                        onFinalStep={() => {
                            // console.log(`Space Type: ${spaceType}, specs: ${specifications}, street: ${street}, aptsuite: ${aptsuite}, city: ${city}, state: ${state}, zip: ${zip}, type: ${propertyType}, hasPermissionToRent: ${hasPermissionToRent}, location details: ${locationDetails} (${locationDetailsWordCount}), space description: ${spaceDescription} (${spaceDescriptionWordCount}), width: ${width}, length: ${length}, height: ${height}, appointment required? ${appointmentsRequired}, time of day access :${timeOfDayAccess}, access frequency: ${accessFrequency}.`)
                            setFinishing(true);
                            let specEnum = 0;
                            specifications.map((spec, idx) => {
                                specEnum |= SpecificationsEnum[spec];
                            })
                            create_listing({
                                propertyType:0,
                                spaceType: spaceType,
                                specifications: specEnum,
                                street,
                                city,
                                state: States.indexOf(state) || 0,
                                zip,
                                spaceDescription,
                                width,
                                length,
                                height,
                                appointmentsRequired,
                                timeOfDayAccess,
                                accessFrequency,
                                monthlyPrice: parseInt(monthlyPrice) || 100,
                                // minimumPrice,
                                oneTimePricing,
                                // isDynamicPricing,
                                // isDiscountedPrice,
                                rentingCapacity: isElegibleForCustomCapacity(spaceType) ? rentingCapacity : 1,
                                photos, // This now contains the base64 image data
                                isDraft,
                            }).then(res => {
                                setFinishing(false);
                                if (res.data.error) {
                                    openModal('', [{
                                        title: 'Error creating listing',
                                        component: [() => (
                                            <MKTypography>{`Error creating listing: ${res?.data?.message}` || 'Unknown error. Please try again later.'}</MKTypography>
                                        )]
                                    }]);
                                }
                                else {
                                    setFinishing(false)
                                    setFinishedFileID(res?.data?.listingId)
                                }
                            }).catch(err => {
                                setFinishing(false);
                                alert(err.message)
                            });
                        }}
                    />
                }
            </motion.div>
        </div>

        <AdaptiveModal
            open={!finishing && finishedFileID}
            title={isDraft ? 'Your draft is saved!' : 'Thank you for listing!'}
            noLeftCornerDefault
        >
            <CreateFinish
                DisplayIcon={isDraft ? FolderSpecial : GiteOutlined}
                title={isDraft ? 'Your draft has been saved!' : 'Your listing is live!'}
                desc={isDraft ? 
                    'Your draft is not yet published or visible to others on SpareLot. Feel free to keep editing until you’re ready to publish.'
                    :
                    'Your listing has been published and is now visible to renters on SpareLot. You should be receiving requests soon. Once you receive a rental request, you will be able to approve or decline it.'
                }
                goto={isDraft ? 'Go to Drafts' : 'Go to your Listings'}
                gotoURL={isDraft ? '/hosting/listings/unpublished' : '/hosting/listings/published'}
            />
        </AdaptiveModal>
    </>)
}

export default Create;