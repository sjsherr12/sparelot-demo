import { AddRoadOutlined, BedroomParentOutlined, CheckroomOutlined, DirectionsCarOutlined, GarageOutlined, GrassOutlined, HolidayVillageOutlined, HomeOutlined, Inventory2Outlined, LocalParkingOutlined, PlaceOutlined, RoofingOutlined, WarehouseOutlined } from "@mui/icons-material";
import colors from "assets/theme/base/colors";

export const SpecificationsEnum = {
    Locked_area: 1,
    Security_camera_monitored: 2,
    Private_space: 4,
    Private_entrance: 8,
    Gated_or_guarded_community: 16,
    Smoke_detectors: 32,
    Climate_controlled: 64,
    Smoke_free: 128,
    Pet_free: 256,
    Fenced_property: 512,
    Bathroom_available:1024,
    Water_access: 2048,
    EV_charging:4096,
    No_stairs:8192,
    Elevator:16384,
    Wheelchair_accessible:32768,
}

export const getAllSpecifications = (spec) => {
    return Object.keys(SpecificationsEnum)
        .filter(key => spec & SpecificationsEnum[key]) // Check if the spec has the key
        .map(key => key) // Return the keys (specification names)
        .join(', '); // Join them into a string
}

export const AccessFrequencyTypes = [
    "Daily",
    "Weekly",
    "Monthly",
    "Infrequently",
]

export const TimeOfDayAccessTypes = [
    "Daytime hours",
    "Evening hours",
    "All hours (24/7)",
]

export const SpaceTypes = [
    "Garage",
    "Storage_unit",
    "Warehouse",
    "Carport",
    "Parking_garage",
    "Parking_lot",
    "Driveway",
    "Unpaved_lot",
    "Shed",
    "Attic",
    "Basement",
    "Bedroom",
    "Closet",
]

export const SpaceTypesExtraInfo = [
    {
        name: "Garage",
        icon: GarageOutlined
    },
    {
        name: "Storage_unit",
        icon: Inventory2Outlined
    },
    {
        name: "Warehouse",
        icon: WarehouseOutlined
    },
    {
        name: "Carport",
        icon: DirectionsCarOutlined
    },
    {
        name: "Parking_garage",
        icon: LocalParkingOutlined
    },
    {
        name: "Parking_lot",
        icon: PlaceOutlined
    },
    {
        name: "Driveway",
        icon: AddRoadOutlined
    },
    {
        name: "Unpaved_lot",
        icon: GrassOutlined
    },
    {
        name: "Shed",
        icon: HolidayVillageOutlined
    },
    {
        name: "Attic",
        icon: RoofingOutlined
    },
    {
        name: "Basement",
        icon: HomeOutlined
    },
    {
        name: "Bedroom",
        icon: BedroomParentOutlined
    },
    {
        name: "Closet",
        icon: CheckroomOutlined
    }
];

export const PropertyTypes = [
    "Residential",
    "Commercial",
]

export const States = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 
    'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export const ReservationStatus = {
    Declined: 0,
    Pending:  1,
    Approved: 2,
    Canceled: 3,
}

export const ReservationViewingRole = {
    Renter: {
        Generic: [
            'renter.fromRentals', 
            'renter.fromChat'
        ],
        FromRentals: 'renter.fromRentals',
        FromChat: 'renter.fromChat',
    },
    Host: {
        Generic: [
            'host.fromRentals', 
            'host.fromChat'
        ],
        FromRentals: 'host.fromRentals',
        FromChat: 'host.fromChat',
    }
}

export const ReservationStatusToColor = [
    colors.error.main,
    colors.warning.main,
    colors.success.main,
    colors.info.main,
]

export const FOOTER_HEIGHT = 70;