import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const FiltersContext = createContext();

export const useFilters = () => useContext(FiltersContext);

export const Vehicle_Types = [
    'Garage',
    'Storage_unit',
    'Warehouse',
    'Carport',
    'Parking_lot',
    'Parking_garage',
    'Driveway',
    'Unpaved_lot',
]

export const NonVehicle_Types = [
    'Attic',
    'Basement',
    'Bedroom',
    'Closet',
    'Garage',
    'Storage_unit',
    'Shed',
    'Warehouse',
    'Carport',
]

// Define default filters outside component to prevent recreation on every render
const getDefaultFilters = () => [
    {min:0, max:1000},   // idx 0 : price ($)
    {length:0, width:0}, // idx 1 : size (ft)
    {
      Garage:false,
      Storage_unit:false,
      Warehouse:false,
      Carport:false,
      Parking_garage:false,
      Parking_lot:false,
      Driveway:false,
      Unpaved_lot:false,
      Shed:false,
      Attic:false,
      Basement:false,
      Bedroom:false,
      Closet:false,
    }, // idx 2 : type [LOGIC: if the listing's key mapped into here is false, exclude it.]
    0, // idx 3 : features [LOGIC: if one of these is true and the listing doesnt contain it, exclude it. (all are false by default, no standard)]
    [0,1,2,3], // idx 4 : accessibility time of day [LOGIC: start off with all enabled, else show only included]
    [0,1,2]
];

export const FiltersProvider = ({ children }) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [storageType, setStorageType] = useState(searchParams.get('storageType'))
    const [reloadParamCheck, setReloadParamCheck] = useState(0);

    const old = useMemo(() => getDefaultFilters(), []);

    const [filters, setFilters] = useState(() => {
        // Initialize filters with proper deep copy
        const initialFilters = getDefaultFilters();
        initialFilters[2] = {...initialFilters[2]};

        // Set all space types to true by default
        Object.keys(initialFilters[2]).forEach(key => {
            initialFilters[2][key] = true;
        });

        return initialFilters;
    });
    const [previews, setPreviews] = useState(() => {
        // Initialize previews with proper deep copy
        const initialPreviews = getDefaultFilters();
        initialPreviews[2] = {...initialPreviews[2]};

        // Set all space types to true by default
        Object.keys(initialPreviews[2]).forEach(key => {
            initialPreviews[2][key] = true;
        });

        return initialPreviews;
    });

    useEffect(() => {
        // Create a proper deep copy of the default filters
        const copy = [
            {...old[0]},
            {...old[1]},
            {...old[2]},
            old[3],
            [...old[4]],
            [...old[5]]
        ];

        if (storageType) {
            if (storageType === 'Items') {
                NonVehicle_Types.forEach((_) => {
                    copy[2][_] = true;
                })
            }
            else {
                Vehicle_Types.forEach((_) => {
                    copy[2][_] = true;
                })
            }
        }
        else {
            Object.keys(copy[2]).forEach((key) => {
                copy[2][key] = true;
            })
        }
        console.log('Filters updated:', {
            spaceTypes: copy[2],
            accessFrequency: copy[4],
            timeOfDayAccess: copy[5],
            storageType
        });
        setFilters(copy);
    }, [reloadParamCheck, location?.pathname, storageType, old])

    const apply = () => {
        // Deep copy previews when applying
        const copy = [
            {...previews[0]},
            {...previews[1]},
            {...previews[2]},
            previews[3],
            [...previews[4]],
            [...previews[5]]
        ];
        setFilters(copy);
    }

    const reset = () => {
        // Create proper deep copies when resetting
        const resetFilters = [
            {...old[0]},
            {...old[1]},
            {...old[2]},
            old[3],
            [...old[4]],
            [...old[5]]
        ];
        const resetPreviews = [
            {...old[0]},
            {...old[1]},
            {...old[2]},
            old[3],
            [...old[4]],
            [...old[5]]
        ];
        setFilters(resetFilters);
        setPreviews(resetPreviews);
        setStorageType(storageType)
        setReloadParamCheck(reloadParamCheck+1);
    }

    return (
        <FiltersContext.Provider 
            value={{
                old,
                filters, setFilters,
                previews, setPreviews,
                apply, reset,
            }}
        >
            {children}
        </FiltersContext.Provider>
    );
};
