import sparelot_llc_logo from "assets/logos/sparelot_llc_logo.png"
import sparelot_llc_logo_themed from "assets/logos/sparelot_llc_logo_themed.png"
import {
    Lock as LockIcon,
    Videocam as VideocamIcon,
    Home as HomeIcon,
    MeetingRoom as MeetingRoomIcon,
    Gavel as GavelIcon,
    SmokeFree as SmokeFreeIcon,
    AcUnit as AcUnitIcon,
    Pets as PetsIcon,
    Fence as FenceIcon,
    Bathtub as BathtubIcon,
    Opacity as OpacityIcon,
    EvStation as EvStationIcon,
    Stairs as StairsIcon,
    Elevator as ElevatorIcon,
    Accessible as AccessibleIcon,
    Upcoming,
    SmokingRooms,
    SmokeFree,
    GarageOutlined,
    Inventory2Outlined,
    WarehouseOutlined,
    DirectionsCarOutlined,
    LocalParkingOutlined,
    PlaceOutlined,
    AddRoadOutlined,
    GrassOutlined,
    HolidayVillageOutlined,
    RoofingOutlined,
    HomeOutlined,
    BedroomParentOutlined,
    CheckroomOutlined,
    AppsOutlined
  } from '@mui/icons-material';
import { Box, SvgIcon } from "@mui/material";
  
export const company_logo = sparelot_llc_logo;
export const company_logo_themed = sparelot_llc_logo_themed;

export const text_color = "grey";
export const title_color = "white";
export const light_mode = true;
export const light_text_color = "white";
export const dark_text_color = "grey";
export const light_dark_text = light_mode ? light_text_color : dark_text_color;

export const title_text_color_hex = "#ffffff"
export const subtitle_text_color_hex = "#bbbbbb";
export const background_theme_color = '#051d40';

export const domain_name = "sparelot.com"

export const faq_data_hosts = [
    { question: "How do I create my first listing?", answer: "To create your first listing, you must fill out all the information about your space including location, unique features, access availability, and any other necessary notes. Next, the host must take pictures of their space for storage seekers to view. This does not require any equipment and can be done using almost any mobile device. Finally, decide on a price using our proprietary recommendation system and wait for the reservations to roll in."},
    { question: "How do hosts get paid?", answer: "Hosts receive payments by connecting their bank accounts and are paid automatically after each rental period. This is done using Stripe, our secure payment system."},
    { question: "How are hosts protected?", answer: "While SpareLot is not liable for damage to property, hosts are protected through a number of in-app safety features. For example, our storage-seeker background checks and review system ensure that each renter is well-qualified and well-intentioned. Additionally, hosts are able to decline reservations within a 24-hour period if they do not feel comfortable with the request."}
]

export const faq_data_seekers = [
    { question: "How do I reserve a rental space?", answer: "You can reserve a rental space by simply creating an account, filtering for your type and size of required space, and searching within your location. Then, SpareLot makes it easy to reserve your space, make your first payment, and get in contact with your host."},
    { question: "How can I trust my host?", answer: "Storage-seekers can trust that all hosts on SpareLot are background checked and meet all legal requirements to list their space. Furthermore, users can reference the in-app review system for hosts to check that their host is well-regarded by past storage-seekers."},
    { question: "Will my items be safe?", answer: "Renters can rest assured that their items will remain safe when in storage. If any items were to be damaged, the host will be penalized and the renter will recieve compensation."},
    { question: "How much does it cost and how do payments work?", answer: "The price of each space listing is decided upon by the host with a recommendation from our pricing system. However, storing or parking with SpareLot is almost always more economical than traditional storage or parking facilities. Payments are made automatically at the end of each storage period, which could be weekly or monthly. If a renter fails to make a payment, they will be charged a late fee at the end of a 10-day margin."},
    { question: "Are there places to store near me?", answer: "SpareLot utilizes a user to user based ecosystem, meaning that it is much more likely to find SpareLot listings near you than traditional storage facilities. Additionally, by existing users recruiting more hosts, we can expand to more locations and offer even more storage options."},
    { question: "How often can I access my items?", answer: "Access frequency is specified by hosts but is usually lenient. For storage functionalities such as parking, users can negotiate with their hosts for unrestricted access."},
    { question: "Are there limits on the length of storage time?", answer: "Users must be storing for at least one week but do not have any limit on the amount of time their items can be stored for."},
    { question: "Can SpareLot also be used for parking?", answer: "Yes! One of SpareLot's primary functionalities is parking—whether that be one time parking for an event or long term parking for school or work."},
    { question: "How can I contact my host?", answer: "Renters can contact their hosts through our in-app messaging system. There, you can negotiate storage terms, discuss access restrictions, ask about unique space perks, and more."}
]

export const faq_data = faq_data_seekers.concat(faq_data_hosts);

export const email_sub_register = "Receieve Launch Updates";
export const email_sub_disclaimer = "We will never share your information with anyone"

// URLS
export const subscribed_href = "/subscribed"
export const font_import_url = "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
export const LOCALSTORAGE_REQUESTEDLOCATION_KEY = 'user_approved_location_access'

// export const popular_cities = [
//     { name: 'Detroit, Michigan', zipCode: '48201' },
//     { name: 'Seattle, Washington', zipCode: '98101' },
//     { name: 'Phoenix, Arizona', zipCode: '85001' },
//     { name: 'Los Angeles, California', zipCode: '90001' },
//     { name: 'Chicago, Illinois', zipCode: '60601' },
//     { name: 'Portland, Oregon', zipCode: '97201' },
//     { name: 'Miami, Florida', zipCode: '33101' },
//     { name: 'New York, New York', zipCode: '10001' },
//     { name: 'Louisville, Kentucky', zipCode: '40201' },
//     { name: 'Nashville, Tennessee', zipCode: '37201' },
//     { name: 'Austin, Texas', zipCode: '73301' },
//     { name: 'Columbus, Ohio', zipCode: '43085' },
//     { name: 'Salt Lake City, Utah', zipCode: '84101' },
//     { name: 'Houston, Texas', zipCode: '77001' },
//     { name: 'Milwaukee, Wisconsin', zipCode: '53201' },
//     { name: 'Boston, Massachusetts', zipCode: '02101' },
//     { name: 'Philadelphia, Pennsylvania', zipCode: '19101' },
//     { name: 'Albuquerque, New Mexico', zipCode: '87101' },
// ];
  
export const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
    "New Hampshire", "New Jersey", "New Mexico", "New York", 
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
    "West Virginia", "Wisconsin", "Wyoming"
];

export const US_CENTER_LAT = 39.8283;
export const US_CENTER_LNG = -98.5795;

const NoPetsIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {/* Pets Icon (Paw) */}
      <path 
        d="M7 3.5C7 2.12 8.12 1 9.5 1S12 2.12 12 3.5 10.88 6 9.5 6 7 4.88 7 3.5zM12 8.5C12 7.12 13.12 6 14.5 6S17 7.12 17 8.5 15.88 11 14.5 11 12 9.88 12 8.5zM3 10C3 8.62 4.12 7.5 5.5 7.5S8 8.62 8 10 6.88 12.5 5.5 12.5 3 11.38 3 10zM15 18c0-2.67-2.17-4.84-4.84-4.84-2.67 0-4.84 2.17-4.84 4.84V20h9.68V18zM20.5 12.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
        fill="currentColor"
      />
      {/* No Symbol Slash */}
      <line 
        x1="4" y1="4" x2="20" y2="20" 
        stroke="currentColor" strokeWidth="2" 
      />
    </SvgIcon>
);

const NoStairsIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {/* Stairs */}
      <path 
        d="M4 18h4v-3h4v-3h4v-3h4" 
        stroke="currentColor" strokeWidth="2" fill="none"
      />
      {/* No Symbol Slash */}
      <line 
        x1="4" y1="4" x2="20" y2="20" 
        stroke="currentColor" strokeWidth="2"
      />
    </SvgIcon>
);  

export const specificationToIcon = {
    Locked_area: <LockIcon />,
    Security_camera_monitored: <VideocamIcon />,
    Private_space: <HomeIcon />,
    Private_entrance: <MeetingRoomIcon />,
    Gated_or_guarded_community: <GavelIcon />,
    Smoke_detectors: <Upcoming />,
    Climate_controlled: <AcUnitIcon />,
    Smoke_free: <SmokeFree />,
    Pet_free: <NoPetsIcon />,
    Fenced_property: <FenceIcon />,
    Bathroom_available: <BathtubIcon />,
    Water_access: <OpacityIcon />,
    EV_charging: <EvStationIcon />,
    No_stairs: <NoStairsIcon />,
    Elevator: <ElevatorIcon />,
    Wheelchair_accessible: <AccessibleIcon />,
}

export const spaceTypeToIcon = {
  All: AppsOutlined,
  Garage: GarageOutlined,
  Storage_unit: Inventory2Outlined,
  Warehouse: WarehouseOutlined,
  Carport: DirectionsCarOutlined ,
  Parking_garage: LocalParkingOutlined ,
  Parking_lot: PlaceOutlined,
  Driveway: AddRoadOutlined ,
  Unpaved_lot: GrassOutlined ,
  Shed: HolidayVillageOutlined,
  Attic: RoofingOutlined,
  Basement: HomeOutlined,
  Bedroom: BedroomParentOutlined,
  Closet: CheckroomOutlined,
};