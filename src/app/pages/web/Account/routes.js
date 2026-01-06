import { faArrowRightFromBracket, faBell, faCircleUser, faCreditCard, faEnvelopeOpenText, faIdCard, faLock, faPlus, faSliders, faUser, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PaymentInfo from "./Payments";
import Notifications from "./Notifications";
import { AccountCircleOutlined, AccountTree, AccountTreeOutlined, Add, BlockOutlined, Create, EditNotificationsOutlined, EventAvailable, EventAvailableOutlined, EventNoteOutlined, EventRepeatOutlined, ExitToAppOutlined, GppGood, GppGoodOutlined, InfoOutlined, MailLockOutlined, MoveToInboxOutlined, NotificationsActiveOutlined, NotificationsOutlined, PasswordOutlined, PendingActions, PersonOutlined, PersonOutlineOutlined, PersonRemoveOutlined, RateReview, RateReviewOutlined, ReviewsOutlined, SupervisedUserCircleOutlined, SwapHorizOutlined, TaskAlt, VpnKeyOutlined } from "@mui/icons-material";
import colors from "assets/theme/base/colors";
import AboutYourAccount from "./Info/about";
import EditProfile from "./Info/profile";
import EditPersonal from "./Info/personal";
import UserProfile from "../UserProfile";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import EditNotificationPreferences from "./Notifications/preferences";
import HostReviews from "app/pages/mobile/Hosting/Operations/Reviews";
import Reviews from "./Activity/Reviews";
import { Box } from "@mui/material";
import EditEmail from "./Security/email";
import EditPassword from "./Security/pass";
import ConnectedAccounts from "./Security/connected";
import BlockedUsers from "./Security/blocked";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import DeleteAccount from "./Actions/delete";
import ActiveRentals from "./Activity/Rentals/active";
import PendingRentals from "./Activity/Rentals/pending";
import PreviousRentals from "./Activity/Rentals/previous";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import isStandalone from "isStandalone";
import { LoadingSpinner } from "app/utils/loading/component";
import { useLocation, useNavigate } from "react-router-dom";
import conditionalNavigation from "conditionalNavigation";

const account_web_routes = [
    {
        title:'custom',
        routes: [
            {
                name: 'Your Profile',
                desc: 'View your user profile and how other SpareLot users view you',
                route: '/account/viewprofile',
                icon: AccountCircleOutlined,
                Component: () => {
                    const {user} = useUserAuthState();
                    return (
                        <UserProfile userIdSubstitute={user?.uid} />
                    )
                },
                custom: {
                    maxContainerWidth:1000,
                }
            }
        ]
    },
    {
        title: 'Info',
        routes: [
            {
                name: 'Edit profile',
                desc: 'Edit how people view your SpareLot profile',
                route: '/account/profile',
                icon: AccountCircleOutlined,
                Component:EditProfile,
                custom: {
                    doNotDisplayInfo:true,
                }
            },
            {
                name: 'Personal details',
                desc: 'Manage your personal info for this platform',
                route: '/account/personal',
                icon: Create,
                Component:EditPersonal,
                custom: {
                    doNotDisplayInfo:true,
                }
            },
            {
                name: 'About your account',
                desc: 'Check specific details about your account',
                route: '/account/about',
                icon: InfoOutlined,
                Component: AboutYourAccount,
            }
        ]
    },
    {
        title: 'Activity',
        routes: [
            {
                name: 'Rentals',
                desc: 'View your active or past rentals with hosts',
                icon: SupervisedUserCircleOutlined,
                subroutes: [
                    {
                        name: 'Active Rentals',
                        desc: 'Manage active rentals & contact hosts',
                        route: '/account/rentals/active',
                        icon: EventAvailableOutlined,
                        Component: ActiveRentals,
                    },
                    {
                        name: 'Pending Rentals',
                        desc: 'View pending rental requests',
                        route: '/account/rentals/pending',
                        icon: PendingActions,
                        Component: PendingRentals,
                    },
                    {
                        name: 'Previous Rentals',
                        desc: 'View previously completed reservations',
                        route: '/account/rentals/history',
                        icon: EventRepeatOutlined,
                        Component: PreviousRentals,
                    },
                ]
            },
            // {
            //     name: 'Reviews',
            //     desc: 'View reviews people have written about you',
            //     icon: ReviewsOutlined,
            //     route: '/account/reviews',
            //     Component: () => (
            //         <Box
            //             sx={{
            //                 width:'100%',
            //                 px:2,
            //             }}
            //         >
            //             <Reviews />
            //         </Box>
            //     ),
            // },
            {
                name: 'Notifications',
                desc: 'View your notifications and edit preferences',
                icon: NotificationsOutlined,
                subroutes: [
                    {
                        name: 'View Notifications',
                        desc: 'View your new notifications',
                        route: '/account/notifications/view',
                        icon: NotificationsOutlined,
                        Component: Notifications,
                    },
                    {
                        name: 'Edit Preferences',
                        desc: 'Edit your notification preferences',
                        route: '/account/notifications/preferences',
                        icon: EditNotificationsOutlined,
                        Component: EditNotificationPreferences,
                    },
                ]
            },
        ]
    },
    {
        title: 'Account',
        routes: [
            {
                name: 'Login info',
                desc: 'Manage your account email and password',
                icon: VpnKeyOutlined,
                subroutes: [
                    {
                        name: 'Email',
                        desc: 'Manage your email for login & notifications',
                        route: '/account/login/email',
                        icon: MailLockOutlined,
                        Component:EditEmail,
                        custom: {
                            doNotDisplayInfo:true,
                        }
                    },
                    {
                        name: 'Password',
                        desc: 'Manage your account password for login',
                        route: '/account/login/password',
                        icon: PasswordOutlined,
                        Component:EditPassword,
                        custom: {
                            doNotDisplayInfo:true,
                        }
                    },
                ]
            },

            {
                name: 'Connected logins',
                desc: 'Manage other login providers for your account',
                route: '/account/providers',
                icon: AccountTreeOutlined,
                Component:ConnectedAccounts,
            },
            {
                name: 'Blocked users',
                desc: 'Manage users you have blocked on SpareLot',
                route: '/account/blocked',
                icon: BlockOutlined,
                Component:BlockedUsers,
            },
        ]
    },
    {
        title:'Actions',
        routes: [
            ...(isStandalone() ? [{
                name: 'Switch to Hosting',
                desc: 'Switch to hosting or renting',
                route: '/account/switchmode',
                icon: SwapHorizOutlined,
                color: colors.info.main,
                Component: () => {
                    const { user, userImpl } = useUserAuthState();
                    const navigate = useNavigate();
                    const handleSwitchMode = () => {
                        const toRentMode = userImpl?.hosting?.isHostMode;
                        setDoc(doc(getFirestore(), 'users', user?.uid), {
                            hosting: {
                                isHostMode: !userImpl?.hosting?.isHostMode,
                            }
                        }, {merge:true}).then(res => {
                            conditionalNavigation(navigate, toRentMode ? '/' : '/hosting/operations/earnings')
                        }).catch(err => {
                            alert(`Error switching mode: ${err?.message}`)
                        })
                    }
        
                    useEffect(() => {
                        handleSwitchMode();
                    }, []);
        
                    return (
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <LoadingSpinner />
                        </Box>
                    );
                }
            }] : []),
            {
                name: 'Logout',
                desc: 'Log out of your account',
                route: '/account/logout',
                icon: ExitToAppOutlined,
                color: colors.warning.main,
                Component: () => {
                    const { logout } = useUserAuthState();
                    const navigate = useNavigate();
        
                    useEffect(() => {
                        const as = async () => {
                            await logout();
                            conditionalNavigation(navigate, '/')
                        }
                        as();
                    }, []);
                }
            },
            {
                name: 'Delete account',
                desc: 'Delete your SpareLot account & associated info',
                route: '/account/delete',
                icon: PersonRemoveOutlined,
                color: colors.error.main,
                Component: DeleteAccount,
                custom: {
                    doNotDisplayInfo: true,
                }
            }
        ]
    },
]

export default account_web_routes;