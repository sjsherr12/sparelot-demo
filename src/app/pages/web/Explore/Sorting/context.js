import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SortingContext = createContext();

export const useSorting = () => useContext(SortingContext);

export const SortingProvider = ({ children }) => {

    const old = {
        price: 'none',
        size: 'none',
    }

    const [sorting, setSorting] = useState(old);
    const [previews, setPreviews] = useState(old);

    const apply = () => {
        setSorting(previews);
    }

    const reset = () => {
        setSorting(old);
        setPreviews(old);
    }

    return (
        <SortingContext.Provider 
            value={{
                old,
                sorting, setSorting,
                previews, setPreviews,
                apply, reset,
            }}
        >
            {children}
        </SortingContext.Provider>
    );
};

export const SortingValues = [
    'none',
    'asc',
    'desc',
]

export const PriceSortingTypeToDescription = {
    'none':'Unordered',
    'asc':'Lowest to Highest',
    'desc':'Highest to Lowest',
}

export const SizeSortingTypeToDescription = {
    'none':'Unordered',
    'asc':'Smallest to Largest',
    'desc':'Largest to Smallest',
}

export const sortListings = (listings, priceOrder, sizeOrder) => {
    return listings.sort((a, b) => {
        let priceDiff = 0;
        let sizeDiff = 0;
    
        // Only calculate price difference if priceOrder is not 'none'
        if (priceOrder !== 'none') {
            priceDiff = (a?.listing?.logistics?.price || 0) - (b?.listing?.logistics?.price || 0);
            if (priceOrder === "desc") priceDiff *= -1; // Apply descending if needed
        }
    
        // Only calculate size difference if sizeOrder is not 'none'
        if (sizeOrder !== 'none') {
            let sizeA = (a?.listing?.logistics?.width || 0) * (a?.listing?.logistics?.length || 0);
            let sizeB = (b?.listing?.logistics?.width || 0) * (b?.listing?.logistics?.length || 0);
            sizeDiff = sizeA - sizeB;
            if (sizeOrder === "desc") sizeDiff *= -1; // Apply descending if needed
        }
    
        // Apply sorting: prioritize price first, then size if price is the same
        if (priceDiff !== 0) return priceDiff; 
        return sizeDiff; 
    });
};