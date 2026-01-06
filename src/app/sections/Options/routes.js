import { DirectionsCar, DirectionsBoatFilledOutlined, Inventory, Person, Rdvhookup, Home, Help, HomeMax, SavedSearch, AddBox, Message, AccountCircle, House, HouseRounded, HouseTwoTone, HouseSiding, Bookmark, CheckBoxOutlineBlank, Mail, Chair, AirportShuttle, Sailing, LocalShipping, Category, HomeOutlined, BookmarkBorderOutlined, Inventory2Outlined, Inventory2, ForumOutlined, Forum, AccountCircleOutlined, StarOutline, Star, CheckBoxOutlined, CheckBox, WarehouseOutlined, Warehouse, ChatOutlined, ChatBubbleOutline, SearchOutlined, Search  } from "@mui/icons-material";
import { userauth_actions, userauth_title } from "../Modal/actions";
import { isUserLoggedIn } from "app/backend/user/auth/state";
import { currentUser } from "app/backend/user/auth/state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaravan, faCarSide, faCouch, faSailboat, faShip, faTrailer, faTruck, faTruckMedical, faTruckMoving, faHouse, faBookmark, faBoxArchive, faComment, faCircleUser, faStar, faSquareCheck, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import StarIcon from '@mui/icons-material/Star';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';

export const footer_option_routes_renter = [
  {
    name: "Explore",
    baseIcon: SearchOutlined,
    activeIcon: Search,
    route: "/",
    base:'/explore'
  },
  {
    name: "Saved",
    baseIcon:BookmarkBorderOutlined,
    activeIcon:Bookmark,
    route:"/saved",
    base: '/saved',
  },
  {
    name: "Spaces",
    baseIcon:Inventory2Outlined,
    activeIcon:Inventory2,
    route:'/spaces',
    base: '/spaces',
  },
  {
    name: "Messages",
    baseIcon:ChatBubbleOutline,
    activeIcon:Forum,
    route:"/messages",
    base: '/messages',
    modalTitle:userauth_title,
    modalChildren:userauth_actions,
  },
  {
    name: "Account",
    baseIcon:AccountCircleOutlined,
    activeIcon:AccountCircle,
    route:"/account",
    base:'/account',
    modalTitle:userauth_title,
    modalChildren:userauth_actions,
  },
]

export const footer_option_routes_host = [
  {
    name: "Operations",
    baseIcon: StarOutline,
    activeIcon:Star,
    route: "/hosting/operations/earnings",
    base: '/hosting/operations'
  },
  {
    name: "Bookings",
    baseIcon:CheckBoxOutlined,
    activeIcon:CheckBox,
    route: "/hosting/bookings/calendar",
    base: '/hosting/bookings',
  },
  {
    name: "Listings",
    baseIcon:WarehouseOutlined,
    activeIcon:Warehouse,
    route: "/hosting/listings/unpublished",
    base: '/hosting/listings'
  },
  {
    name: "Messages",
    baseIcon:ChatBubbleOutline,
    activeIcon:Forum,
    route: "/messages",
    base: '/messages'
  },
  {
    name: "Account",
    baseIcon:AccountCircleOutlined,
    activeIcon:AccountCircle,
    route: "/account",
    base: '/account'
  },
]

export const storage_type_routes = [
  {
    name:'Items',
    icon:<FontAwesomeIcon icon={faCouch}/>,
  },
  {
    name:'Cars',
    icon:<FontAwesomeIcon icon={faCarSide}/>,
  },
  {
    name:'Trailer',
    icon:<FontAwesomeIcon icon={faTrailer}/>,
  },
  {
    name:'Camper',
    icon:<FontAwesomeIcon icon={faCaravan}/>,
  },
  {
    name:'Boat',
    icon:<FontAwesomeIcon icon={faSailboat}/>,
  },
  {
    name:'Oversized',
    icon:<FontAwesomeIcon icon={faTruckMoving}/>,
  }
]

const updateAccountModalCondition = () => {
  isUserLoggedIn().then(loggedIn => {

    footer_option_routes_renter.find(item => item.name === "Account").modalCondition = !loggedIn;
    //    footer_option_routes_renter.find(item => item.name === "Account").modalCondition = !loggedIn;
  })
};

// very hacky im sorry
updateAccountModalCondition();

export const option_selection_arr = [3]