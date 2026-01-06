import { createContext, useContext, useEffect, useState } from "react";

const { getDayPricing } = require("app/utils/userenv/transaction/prices");
const { transactionalFee } = require("app/utils/userenv/transaction/prices");

const DatePricingContext = createContext();

export const DatePricingProvider = ({ children }) => {
    const [dateRange, setDateRange] = useState([]);
    const [listingPrice, setListingPrice] = useState(0);
    const [onlyMonths, setOnlyMonths] = useState(false);

    const calculateDays = (range) => {
        if (range?.length && range[0] && range[1]) {
            const oneDay = 1000 * 60 * 60 * 24;
            const diffInTime = range[1] - range[0]; // No Math.abs(), so difference can be negative
            const diffInDays = Math.floor(diffInTime / oneDay); // Use Math.floor instead of Math.ceil
            if (diffInDays < 0) {
                return 0;
            }
            return diffInDays; // This will return the correct number of days
        }
        return 0;
    };
    
    const calculateMonths = (range) => {
        if (range?.length && range[0] && range[1]) {
            // Get the years, months, and days from both dates
            const startYear = range[0].getFullYear();
            const startMonth = range[0].getMonth(); // 0-indexed
            const startDay = range[0].getDate();
            
            const endYear = range[1].getFullYear();
            const endMonth = range[1].getMonth(); // 0-indexed
            const endDay = range[1].getDate();
    
            // Calculate the total month difference, considering years
            let monthDifference = (endYear - startYear) * 12 + (endMonth - startMonth);
    
            // Adjust for days: If the end day is greater than the start day, add 1 month
            if (endDay > startDay && monthDifference > 0) {
                monthDifference++;
            }
            if (endDay < startDay && monthDifference === 1) {
                monthDifference--;
            }
    
            return (monthDifference > 0) + 0;
        }
        return 0; 
    }
    
    const getDays = (customRange) => {
        return calculateDays(customRange || dateRange);
    };    
    
    const getMonths = (customRange) => {
        return calculateMonths(customRange || dateRange);
    }
    
    const getDayPrice = (customDays, customPrice) => {
        const price = customPrice !== undefined ? customPrice : listingPrice;
        const days = customDays !== undefined ? customDays : getDays();
        return getDayPricing(days, price);
    }
    
    const getMonthPrice = (customMonths, customPrice) => {
        const price = customPrice !== undefined ? customPrice : listingPrice;
        const months = customMonths !== undefined ? customMonths : getMonths();
        return months * price;
    }
    
    const getSpareLotPrice = (useMonthly, customPeriod, customPrice) => {
        const isMonthly = useMonthly !== undefined ? useMonthly : onlyMonths;
        const price = customPrice !== undefined ? customPrice : listingPrice;
        
        if (isMonthly) {
            const months = customPeriod !== undefined ? customPeriod : getMonths();
            return parseFloat(transactionalFee(getMonthPrice(1, price)) * months).toFixed(2);
        }
        
        const days = customPeriod !== undefined ? customPeriod : getDays();
        return parseFloat(transactionalFee(getDayPrice(days, price))).toFixed(2);
    }
    
    const getTotalPrice = (useMonthly, customPeriod, customPrice) => {
        const isMonthly = useMonthly !== undefined ? useMonthly : onlyMonths;
        const price = customPrice !== undefined ? customPrice : listingPrice;
        
        if (isMonthly) {
            const months = customPeriod !== undefined ? customPeriod : getMonths();
            return (parseFloat(getMonthPrice(months, price)) + parseFloat(getSpareLotPrice(true, months, price))).toFixed(2);
        }
        
        const days = customPeriod !== undefined ? customPeriod : getDays();
        return (parseFloat(getDayPrice(days, price)) + parseFloat(getSpareLotPrice(false, days, price))).toFixed(2);
    }
    
    // New function to calculate prices for a custom date range
    const calculateForCustomRange = (customRange, customPrice, useMonthly) => {
        const isMonthly = useMonthly !== undefined ? useMonthly : onlyMonths;
        const price = customPrice !== undefined ? customPrice : listingPrice;
        
        if (!customRange || customRange.length < 2) {
            return {
                days: 0,
                months: 0,
                basePrice: 0,
                feePrice: 0,
                totalPrice: 0
            };
        }
        
        const days = calculateDays(customRange);
        const months = calculateMonths(customRange);
        
        let basePrice = 0;
        let feePrice = 0;
        
        if (isMonthly) {
            basePrice = months * price;
            feePrice = parseFloat(transactionalFee(price) * months).toFixed(2);
        } else {
            basePrice = getDayPricing(days, price);
            feePrice = parseFloat(transactionalFee(basePrice)).toFixed(2);
        }
        
        const totalPrice = (parseFloat(basePrice) + parseFloat(feePrice)).toFixed(2);
        
        return {
            days,
            months,
            basePrice: parseFloat(basePrice).toFixed(2),
            feePrice,
            totalPrice
        };
    };

    return (
        <DatePricingContext.Provider
            value={{
                setListingPrice,
                dateRange, setDateRange,
                onlyMonths, setOnlyMonths,

                getDays, getMonths,
                getDayPrice, getMonthPrice,
                getSpareLotPrice, getTotalPrice,
                
                // New function for custom calculations
                calculateForCustomRange
            }}
        >
            {children}
        </DatePricingContext.Provider>
    );
};

export const useDatePricing = () => {
    return useContext(DatePricingContext);
};