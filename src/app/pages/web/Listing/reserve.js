import { Skeleton, Tooltip, tooltipClasses, useMediaQuery } from "@mui/material"
import create_chat_for_users from "app/backend/cloud/create_chat_for_users"
import { useUserAuthState } from "app/backend/user/auth/reactprovider"
import { userauth_actions } from "app/sections/Modal/actions"
import { userauth_title } from "app/sections/Modal/actions"
import { useModal } from "app/sections/Modal/Parent/context"
import Hr from "app/utils/Hr"
import { transactionalFee } from "app/utils/userenv/transaction/prices";
import { useNavigate } from "react-router-dom"
import './picker.css'
import DatePicker from 'react-flatpickr'
import { getDayPricing } from "app/utils/userenv/transaction/prices"
import { useDatePricing } from "./prices"
import colors from "assets/theme/base/colors"
import isStandalone from "isStandalone"
import AdaptiveModal from "app/sections/Modal/Adaptive"
import Checkout from "../Checkout"
const { default: MKBox } = require("components/MKBox")
const { default: MKButton } = require("components/MKButton")
const { Typography } = require("@mui/material")
const { useEffect, useState, useRef } = require("react")

const ReservationSection = ({loading, listing, listingId, dateOverlapCounts, disableDateClicking, dontShowReserve, onClose}) => {
    const navigate = useNavigate();
    const {user} = useUserAuthState();
    const {openModal} = useModal();
    const parentRef = useRef(null);
    const [inCheckout, setInCheckout] = useState(false);
    const [hasChosenValidPreviously, setHasChosenValidPreviously] = useState(false)
    const [datePickerPos, setDatePickerPos] = useState({top:0, left:0, bottom:0, right:0})
    const {getDays, getMonths, getDayPrice, getMonthPrice, getSpareLotPrice, getTotalPrice, setListingPrice, onlyMonths, dateRange, setDateRange, setOnlyMonths} = useDatePricing();
    const [dateSelectorOpen, setDateSelectorOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:1024px)')

    const rentSpace = () => {
        if (user) {
            if (dateRange[0] && dateRange[1]) {
                setInCheckout(true)
            }
            else {
                alert('Please select 2 valid dates.');
            }
        }
        else {
            onClose && onClose();
            openModal(userauth_title, userauth_actions)
        }
    }

    useEffect(() => {
        if (parentRef?.current) {
            const rect = parentRef.current.getBoundingClientRect();
            setDatePickerPos(rect)
        }
    }, [])

    useEffect(() => {
        setListingPrice(listing?.logistics?.price);
    }, [listing])

    useEffect(() => {
        if (inCheckout) {
            document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
            document.body.style.overflow = ""; // Restore scrolling
        }
    
        return () => {
            document.body.style.overflow = ""; // Cleanup on unmount
        };
    }, [inCheckout]);

    return (
        <>
            <MKBox
                ref={parentRef}
                sx={{
                    borderRadius: 3,
                    border:'1px solid #ededed',
                    boxShadow:'rgba(0, 0, 0, 0.12) 0px 6px 16px',
                    px:4,
                    py:3, 
                    width: '100%',
                }}
            >
                <MKBox
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'left',
                        textAlign: 'center',
                        gap: 1,
                        mb: 2,
                    }}
                >
                    <Typography
                        variant='h3'
                        sx={{
                            color: '#333',
                            fontWeight:700,
                        }}
                    >
                        {loading ? (
                            <Skeleton
                                width={150}
                                height='100%'
                                animation='wave'
                            />
                        ) : (
                            <>
                                {`$${listing?.logistics?.price}`}
                            </>
                        )}
                        
                    </Typography>
                    <Typography
                        sx={{
                            mt:.25,
                            fontSize: 24,
                            color: '#737373',
                            display:loading?'none':'flex',
                        }}
                    >
                        / month
                    </Typography>
                </MKBox>

                <MKBox
                    sx={{
                        px:2,
                        py:1.5,
                        borderRadius:2,
                        border:'1px solid #D2D6DA',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        cursor:loading?'default':'pointer',
                        userSelect:'none',
                        position:'relative',
                        [loading ? 'none' : '&:hover']:{
                            bgcolor:'#efefef',
                            transition:'all .15s ease-in-out',
                        },
                        transition:'all .15s ease-in-out',
                    }}
                    onClick={disableDateClicking || loading ? null : () => setDateSelectorOpen(true)}
                >
                    <MKBox
                        sx={{
                            width:'100%',
                        }}
                    >
                        <Typography
                            variant='h6'
                            sx={{
                                color:'#333',
                                
                            }}
                        >
                            Start Date
                        </Typography>
                        <Typography
                            variant='h6'
                            sx={{
                                fontWeight:500,
                                color:'#737373',
                                
                            }}
                        >
                            {dateRange[0]?.toLocaleDateString() || 'Select'}
                        </Typography>
                    </MKBox>

                    <MKBox
                        sx={{
                            pl:2,
                            width:'100%',
                            borderLeft:'1px solid #D2D6DA',
                        }}
                    >
                        <Typography
                            variant='h6'
                            sx={{
                                color:'#333',
                                
                            }}
                        >
                            End Date
                        </Typography>
                        <Typography
                            variant='h6'
                            sx={{
                                fontWeight:500,
                                color:'#737373',
                                
                            }}
                        >
                            {dateRange[1]?.toLocaleDateString() || 'Select'}
                        </Typography>
                    </MKBox>

                    {dateSelectorOpen &&
                        <MKBox
                            sx={{
                                position:{xs:'fixed', md:'fixed', lg:'fixed', xl:'absolute'},
                                top:{xs:'unset',md:'unset',lg:'unset', xl:-1,},
                                right:{xs:'unset',md:'unset',lg:'unset', xl:-1,},
                                bgcolor: '#fff',
                                boxShadow:'rgba(0, 0, 0, 0.2) 0px 6px 20px !important',
                                zIndex:2,
                                borderRadius:2,
                                padding:2,
                                flexDirection:'column',
                            }}
                        >
                            <DatePicker
                                onChange={(selectedDates) => {
                                    setDateRange(selectedDates)
                                    if (selectedDates.length === 2) {
                                        if (!hasChosenValidPreviously) {
                                            setHasChosenValidPreviously(true)
                                        }
                                        setDateSelectorOpen(false)
                                        setOnlyMonths((getMonths() >= 1) || (getDays() > 31))
                                    }
                                }}
                                options={{
                                    inline:true,
                                    dateFormat:'Y-m-d',
                                    mode: 'range',
                                    defaultDate: dateRange,
                                    minDate: 'today',

                                    disable: Object.keys(dateOverlapCounts)
                                        .filter((date) => dateOverlapCounts[date] >= listing.logistics.rentingCapacity)
                                        .map((date) => {
                                            console.error(date)
                                            return date
                                        }),   
                                    showMonths: isMobile?1:2, // Display two months side by side
                                    onDayCreate: (dObj, dStr, fp, dayElem) => {
                                        if (dayElem.classList.contains('flatpickr-disabled')) {
                                            const today = new Date();
                                            const dayDate = new Date(dayElem.dateObj);

                                            const isSelected = fp.selectedDates.some(
                                                (date) =>
                                                    date.getDate() === dayDate.getDate() &&
                                                    date.getMonth() === dayDate.getMonth() &&
                                                    date.getFullYear() === dayDate.getFullYear()
                                            );
                                
                                            // Style for the current date
                                            if (
                                                dayDate.getDate() === today.getDate() &&
                                                dayDate.getMonth() === today.getMonth() &&
                                                dayDate.getFullYear() === today.getFullYear()
                                            ) {
                                                dayElem.style.backgroundColor = '#051d40'; 
                                                dayElem.style.color = '#fff';
                                                dayElem.style.fontWeight = 'bold';
                                            }
                                            else if(isSelected){
                                                dayElem.style.backgroundColor = '#2e89ff'; 
                                                dayElem.style.color = '#fff';
                                                dayElem.style.fontWeight = 'bold';
                                            }
                                            else if (dayElem.classList.contains('flatpickr-disabled')) {
                                                dayElem.style.color = '#cdcdcd'; // Example: Red text for disabled dates
                                                dayElem.style.textDecoration = 'line-through';
                                                dayElem.style.cursor = 'auto'; // Example: Change cursor for disabled dates
                                                dayElem.setAttribute("title", "Rented")
                                            }
                                            else {
                                                dayElem.style.color = '#000';
                                                dayElem.style.fontWeight = 'bold';
                                            }
                                            dayElem.style.fontFamily = "'Inter', sans-serif"
                                        }
                                    }
                                }}
                                style={{
                                    display:dateSelectorOpen?'flex':'none',
                                    fontSize: 17,
                                    fontWeight: 500,
                                    fontFamily: "'Inter', sans-serif",
                                    color: '#495057',
                                    border: 0,
                                    width: '100%',
                                    '&:focus': {
                                        border: 0,
                                        borderColor: 'transparent',
                                    }
                                }}
                            />

                            <Hr sx={{mt:2,}}/>

                            <MKBox
                                sx={{
                                    display:'flex',
                                    gap:1,
                                    mt:2,
                                    alignItems:'center',
                                }}
                            >
                                {!listing?.logistics?.oneTimePricing &&
                                    <Typography
                                        sx={{
                                            color:'#051d40',
                                            fontSize:18,
                                            fontWeight:500,
                                        }}
                                    >
                                        {isMobile ? `Must book for 7+ days.` : 'Reservations must be 7 days or more for this listing'}
                                    </Typography>
                                }
                                <MKButton
                                    color='sparelot'
                                    sx={{
                                        fontFamily:'Montserrat, sans-serif',
                                        textTransform:'none',
                                        fontSize:18,
                                        transform:'scale(0.75)',
                                        borderRadius:2,
                                        ml:'auto',
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setDateSelectorOpen(false)
                                    }}
                                >
                                    Close
                                </MKButton>
                            </MKBox>
                        </MKBox>
                    }
                </MKBox>

                <MKBox
                    sx={{
                        my:2,
                        display:'none',
                        flexDirection:'column',
                        gap:1,
                    }}
                >
                    <MKBox
                        sx={{
                            display:'flex',
                            alignItems:'center',
                            width:'100%',
                        }}
                    >
                    <Tooltip
                        title={`Pricing for ${(dateRange && dateRange[0] && dateRange[0].toLocaleDateString()) || 'Start Date'} to ${(dateRange && dateRange[1] && dateRange[1].toLocaleDateString()) || 'End Date'}, charged ${getMonths() ? 'monthly until reservation is finished or canceled' : 'once for the entire reservation'}.`}
                        arrow
                        placement='left'
                        PopperProps={{
                            style:{
                                zIndex:100000,
                            }
                        }}
                        componentsProps={{
                            tooltip: {
                                sx: { maxWidth: 300,}
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                textDecoration:loading?'none':'underline',
                                color:'#000',
                                fontSize:20,
                                mr:'auto',
                                cursor:'pointer',
                            }}
                        >
                            {loading ? (
                                <Skeleton
                                    width={150}
                                    height='100%'
                                    animation='wave'
                                />
                            ) : (
                                <>
                                    {onlyMonths ? `$${listing?.logistics?.price} / month${getMonths()>1?'s':''}`:`$${listing?.logistics?.price} / mo × ${getDays()} day${(getDays() !== 1 && 's') || ''}`}
                                </>
                            )}
                        </Typography>
                    </Tooltip>

                        <Typography
                            sx={{
                                color:'#000',
                                fontSize:20,
                                ml:'auto',
                                textAlign:'right',
                                
                            }}
                        >
                            {loading ? (
                                <Skeleton
                                    width={75}
                                    height='100%'
                                    animation='wave'
                                />
                            ) : (
                                <>
                                    {onlyMonths ?`$${getMonthPrice()}.00`:`$${(getDayPrice()).toFixed(2)}`}
                                </>
                            )}
                        </Typography>
                    </MKBox>
                    
                    <MKBox
                        sx={{
                            display:'flex',
                            alignItems:'center',
                            width:'100%',
                        }}
                    >
                        <Tooltip
                            title={`Transactional fee to help run the SpareLot platform and services, charged ${getMonths() ? 'monthly until reservation is finished or canceled' : 'once for the entire reservation'}.`}
                            arrow
                            placement='left'
                            componentsProps={{
                                tooltip: {
                                    sx: { maxWidth: 300}
                                }
                            }}
                            PopperProps={{
                                style:{
                                    zIndex:100000,
                                }
                            }}
                        >
                            <Typography
                                sx={{
                                    textDecoration:loading?'none':'underline',
                                    color:'#000',
                                    fontSize:20,
                                    mr:'auto',
                                    cursor:'pointer',
                                    
                                }}
                            >
                                {loading ? (
                                    <Skeleton
                                        width={150}
                                        height='100%'
                                        animation='wave'
                                    />
                                ) : (
                                    <>
                                        SpareLot fee
                                    </>
                                )}
                            </Typography>
                        </Tooltip>

                        <Typography
                            sx={{
                                color:'#000',
                                fontSize:20,
                                ml:'auto',
                                textAlign:'right',
                                
                            }}
                        >
                            {loading ? (
                                <Skeleton
                                    width={75}
                                    height='100%'
                                    animation='wave'
                                />
                            ) : (
                                <>
                                    {`$${getSpareLotPrice()}`}
                                </>
                            )}
                        </Typography>
                    </MKBox>
                </MKBox>

                <MKBox
                    sx={{
                        display:'none',
                        alignItems:'center',
                        width:'100%',
                        mt:2,
                    }}
                >
                    <Tooltip
                        title={`Total fee, charged ${getMonths() ? 'monthly until reservation is finished or canceled' : 'once for the entire reservation'}. You are not charged until the start date of your reservation, only if your reservation is approved by then.`}
                        arrow
                        placement='left'
                        componentsProps={{
                            tooltip: {
                                sx: { maxWidth: 300}
                            }
                        }}
                        PopperProps={{
                            style:{
                                zIndex:100000,
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                color:'#000',
                                fontSize:20,
                                mr:'auto',
                                fontWeight:'bold',
                                cursor:'pointer',
                                textDecoration:loading?'none':'underline',
                                
                            }}
                        >
                            {loading ? (
                                <Skeleton
                                    width={150}
                                    height='100%'
                                    animation='wave'
                                />
                            ) : (
                                <>
                                    Total
                                </>
                            )}
                        </Typography>
                    </Tooltip>

                    <Typography
                        sx={{
                            color:'#000',
                            fontSize:20,
                            ml:'auto',
                            textAlign:'right',
                            fontWeight:'bold',       
                        }}
                    >
                        {loading ? (
                            <Skeleton
                                width={75}
                                height='100%'
                                animation='wave'
                            />
                        ) : (
                            <>
                                {`$${getTotalPrice()}`}
                            </>
                        )}
                    </Typography>
                </MKBox>

                <MKButton
                    variant='contained'
                    color='info'
                    fullWidth
                    sx={{
                        fontSize:'1.25rem',
                        mt:3,
                        mb:1.5,
                        height:55,
                        fontWeight:550,
                        borderRadius:8,
                        textTransform:'none',
                        display:'flex',
                    }}
                    onClick={rentSpace}
                    disabled={!getDays() || (user?.uid === listing?.host) || (!listing?.logistics?.oneTimePricing && getDays() < 7)}
                >
                    {user?.uid === listing?.host ? 'This is your listing' : 'Reserve Space'}
                </MKButton>

                <Typography
                    sx={{
                        color:'#737373',
                        textAlign:'center',
                        fontSize:16,
                    }}
                >
                    You won't be charged yet.
                </Typography>
            </MKBox>

            {inCheckout && 
                <Checkout
                    open={inCheckout}
                    onClose={() => setInCheckout(false)}
                    listing={listing}
                    listingId={listingId}
                    dateRange={dateRange}
                />
            }
        </>
    )
}

export default ReservationSection;