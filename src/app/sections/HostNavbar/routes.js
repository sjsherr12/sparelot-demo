import { Button, Fab, Icon, IconButton, useMediaQuery } from "@mui/material";
import { useSpareLotHostData } from "app/pages/mobile/Hosting/Bookings/context";
import { ReservationStatus } from "app/utils/optimize/utils";
import colors from "assets/theme/base/colors";
import conditionalNavigation from "conditionalNavigation";
import isStandalone from "isStandalone";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { GridViewOutlined, LocalAtmOutlined, AccountBalanceOutlined, RequestQuoteOutlined, MenuBookOutlined, WorkspacePremiumOutlined, StarOutline, ReceiptLongOutlined, EventAvailableOutlined, HistoryOutlined, VisibilityOffOutlined, CheckCircleOutlineOutlined, ChatBubbleOutlineOutlined, MailOutlineOutlined, HomeWorkOutlined, CalendarMonthOutlined, Add, WorkspacesOutlined, PendingActionsOutlined, EventBusyOutlined, CancelOutlined, Replay, DoDisturbOffOutlined, DoDisturbOutlined, DoDisturbAltOutlined } = require("@mui/icons-material");

const host_routes = [
    {
        title: 'Operations',
        icon: GridViewOutlined,
        route: '/hosting/operations/earnings',
        subroutes: [
            {
                name: 'Earnings',
                icon: LocalAtmOutlined,
                route: '/hosting/operations/earnings'
            },
            // {
            //     name: 'Reviews',
            //     icon: StarOutline,
            //     route: '/hosting/operations/reviews'
            // },
            {
                name: 'Elite Host',
                icon: WorkspacePremiumOutlined,
                route: '/hosting/operations/elitehost'
            },
            {
                name: 'Resources',
                icon: MenuBookOutlined,
                route: '/hosting/operations/resources'
            },
        ]
    },
    {
        title: 'Bookings',
        icon: CalendarMonthOutlined,
        route: '/hosting/bookings/calendar',
        custom: {
            Adornment: () => {
                const {loading, get_reservations} = useSpareLotHostData('reservations');

                return (
                    <Fab 
                        disabled={loading}
                        onClick={async () => {
                            await get_reservations(true)
                        }}
                        size='small' 
                        color='sparelot' 
                        aria-label='add'
                        sx={{
                            zIndex:1,
                            ml:'auto',
                            display:{xs:'flex',lg:'none'},
                        }}
                    >
                        <Replay sx={{
                            color:'#fff',
                            scale:1.5,
                        }}/>
                    </Fab>
                )
            }
        },
        subroutes: [
            {
                name: 'Calendar',
                icon: CalendarMonthOutlined,
                route: '/hosting/bookings/calendar',
            },
            {
                name:'Approved',
                icon:EventAvailableOutlined,
                route:'/hosting/bookings/approved',
                custom: {
                    badgeType: ReservationStatus.Approved,
                }
            },
            {
                name:'Pending',
                icon:PendingActionsOutlined,
                route:'/hosting/bookings/pending',
                custom: {
                    badgeType: ReservationStatus.Pending,
                }
            },
            {
                name:'Declined',
                icon:EventBusyOutlined,
                route:'/hosting/bookings/declined',
                custom: {
                    badgeType: ReservationStatus.Declined,
                }
            },
            {
                name:'Canceled',
                icon:DoDisturbAltOutlined,
                route:'/hosting/bookings/canceled',
                custom: {
                    badgeType: ReservationStatus.Canceled,
                }
            },
        ]
    },
    {
        title: 'Listings',
        icon: HomeWorkOutlined,
        route: '/hosting/listings/unpublished',
        custom: {
            Adornment: () => {
                const isMobile = useMediaQuery('(max-width:991px)')
                const {location} = useLocation();
                const navigate = useNavigate();

                if (isMobile) {
                    return (
                        <Fab 
                            onClick={() => navigate(`/create${window.location.pathname.endsWith('/unpublished')?'?draft=true':''}`)}
                            size='small' 
                            color='info' 
                            aria-label='add'
                            sx={{
                                zIndex:1,
                                ml:'auto',
                            }}
                        >
                            <Add sx={{
                                color:'#fff',
                                scale:1.5,
                            }}/>
                        </Fab>
                    )
                }
                return (
                    <Button
                        component={Link}
                        to={`/create${window.location.pathname.endsWith('/unpublished')?'?draft=true':''}`}
                        sx={{
                            ml:3,
                            gap:2,
                            display:{xs:'none',lg:'flex'},
                            fontWeight:450,
                            borderRadius:16,
                            fontSize:'1.1rem',
                            alignItems:'center',
                            color:'#fff !important',
                            bgcolor:colors.info.main,
                            transition:'scale .2s ease-in-out',
                            '&:active':{scale:.98,transition:'scale .2s ease-in-out'},
                            '&:hover':{bgcolor:colors.info.main,color:'#fff !important',},
                        }}
                    >
                        Create
                        <Add sx={{
                            color:'#fff',
                            scale:1.5,
                        }}/>
                    </Button>
                )
            }
        },
        subroutes: [
            {
                name: 'Drafts',
                icon: VisibilityOffOutlined,
                route: '/hosting/listings/unpublished',

            },
            {
                name: 'Published',
                icon: CheckCircleOutlineOutlined,
                route: '/hosting/listings/published',
            }
        ]
    },
];

export default host_routes;