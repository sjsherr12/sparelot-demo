import { Routes, Route, useLocation, HashRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "assets/theme";

// pages
import Home from "app/pages/mobile/Home"

import ParentModal from "app/sections/Modal/Parent";
import { ModalProvider } from "app/sections/Modal/Parent/context";
import { UserAuthStateProvider } from "app/backend/user/auth/reactprovider";
import { useEffect } from "react";
import Messages from "app/pages/mobile/Account/Messages";
import MobileWrapper from "app/utils/wrapper/mobile";
import { ReauthProvider } from "app/sections/Modal/UserAuth/Reauth/context";
import { AlertProvider } from "app/sections/Alert/context";
import { AnimatePresence } from "framer-motion";
import InChat from "app/pages/mobile/Account/Messages/inchat";

//Saved
import SavedListings from "app/pages/mobile/Saved";

//Hosting
//Operations
import HostEarnings from "app/pages/mobile/Hosting/Operations/Earnings";
import HostReviews from "app/pages/mobile/Hosting/Operations/Reviews";
import HostEliteHost from "app/pages/mobile/Hosting/Operations/EliteHost";
import HostResources from "app/pages/mobile/Hosting/Operations/Resources";
//Booking
//Listing
import UnpublishedListings from "app/pages/mobile/Hosting/Listings/UnpublishedListings";
import PublishedListings from "app/pages/mobile/Hosting/Listings/PublishedListings";
import UserProfile from "app/pages/web/UserProfile";
import { SearchResultsProvider } from "app/pages/web/Explore/context";
import LoginPage from "app/pages/web/Login";
import { HelmetProvider } from "react-helmet-async";
import { AppModeStateProvider } from "app/pages/mobile/Hosting/context";
import Explore from "app/pages/web/Explore";
import { FiltersProvider } from "app/pages/web/Explore/Filters/context";
import Taxes from "app/pages/mobile/Hosting/Operations/Taxes";
import PaymentInfo from "app/pages/web/Account/Payments";
import SignupPage from "app/pages/web/Signup";
import Create from "app/pages/web/Create";
import Feedback from "app/pages/web/Feedback";
import Notifications from "app/pages/web/Account/Notifications";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { DatePricingProvider } from "app/pages/web/Listing/prices";
import { StripeTransactionsProvider } from "app/pages/mobile/Hosting/Operations/stripeTransactions";
import Draft from "app/pages/web/Draft";
import Account from "app/pages/web/Account";
import HostWebWrapper from "app/utils/wrapper/host";
import { SortingProvider } from "app/pages/web/Explore/Sorting/context";
import ActiveRentalsMobileShortcut from "app/pages/web/Account/Activity/Rentals/mobile";
import HostBookingCalendar from "app/pages/mobile/Hosting/Bookings/Calendar";
import Listing from "app/pages/web/Listing";
import HostingBookingsGroupedApprovedBookings from "app/pages/mobile/Hosting/Bookings/Grouped/ApprovedBookings";
import HostingBookingsGroupedPendingBookings from "app/pages/mobile/Hosting/Bookings/Grouped/PendingBookings";
import HostingBookingsGroupedDeclinedBookings from "app/pages/mobile/Hosting/Bookings/Grouped/DeclinedBookings";
import HostingBookingsGroupedCanceledBookings from "app/pages/mobile/Hosting/Bookings/Grouped/CanceledBookings";
import ProviderWrapper from "providerWrapper";
import { Router } from "react-router";
import { Box, Typography, useMediaQuery } from "@mui/material";

export default function MobileApp() {
  const isMobile = useMediaQuery('(max-width:991px)')
  return (
    <>
      <AnimatePresence>
        <ProviderWrapper>
          <CssBaseline />
            <Routes>
            <Route path="/" element={<MobileWrapper Content={Home}/>}/>
            <Route path="/home" element={<MobileWrapper Content={Home}/>} />
            <Route path="/explore" element={<MobileWrapper Content={Explore}/>} />

            <Route path="/login" element={<MobileWrapper title='Log in' noBack Content={LoginPage}/>} />
            <Route path ="/signup" element={<MobileWrapper title='Sign up' noBack Content={SignupPage}/>}/>

            <Route path='/listing/:listingId' element={<MobileWrapper title='Listing' Content={Listing}/> } />
            <Route path='/draft/:listingId' element={<MobileWrapper title='Draft' Content={Draft} /> } />

            <Route path='/create' element={<MobileWrapper Content={Create} title='Create' noFooter /> } />
              <Route path='/error_creating_listing' element={<MobileWrapper Content={Feedback} title='Error Creating'/> } />

            <Route path="/account" element={<MobileWrapper title='My Account' Content={Account} noBack/>} />
            <Route path="/account/*" element={<MobileWrapper title='My Account' Content={Account} noBack/>} />
                <Route path="/profile/:userId" element={<MobileWrapper title='Host Profile' Content={UserProfile}/>} />
            
            <Route path="/messages" element={<MobileWrapper title='Messages' Content={Messages}/>} />
            <Route path="/messages/:chatId" element={<MobileWrapper title='Messages' Content={Messages} noFooter={isMobile}/>} />

            <Route path="/hosting/operations/earnings" element={<MobileWrapper title='Operations' Content={HostEarnings} noBack/>} />
            <Route path="/hosting/operations/reviews" element={<MobileWrapper title='Operations' Content={HostReviews}/>} />
            <Route path="/hosting/operations/elitehost" element={<MobileWrapper title='Operations' Content={HostEliteHost}/>} />
            <Route path="/hosting/operations/resources" element={<MobileWrapper title='Operations' Content={HostResources}/>} />

            <Route path="/hosting/bookings/calendar" element={<MobileWrapper title='Booking Calendar' Content={HostBookingCalendar} noBack/>} />
            <Route path="/hosting/bookings/approved" element={<MobileWrapper title='Approved Bookings' Content={HostingBookingsGroupedApprovedBookings} noBack/>} />
            <Route path="/hosting/bookings/pending" element={<MobileWrapper title='Pending Bookings' Content={HostingBookingsGroupedPendingBookings} noBack/>} />
            <Route path="/hosting/bookings/declined" element={<MobileWrapper title='Declined Bookings' Content={HostingBookingsGroupedDeclinedBookings} noBack/>} />
            <Route path="/hosting/bookings/canceled" element={<MobileWrapper title='Canceled Bookings' Content={HostingBookingsGroupedCanceledBookings} noBack/>} />

            <Route path="/hosting/messages" element={<MobileWrapper title='Messages' Content={Messages} noFooter/>} />
            <Route path="/hosting/messages/:chatId" element={<MobileWrapper title='Messages' Content={Messages} noFooter/>} />

            <Route path="/hosting/listings/unpublished" element={<MobileWrapper title='Listings' Content={UnpublishedListings} noBack/>} />
            <Route path="/hosting/listings/published" element={<MobileWrapper title='Listings' Content={PublishedListings}/>} />

            <Route path="/saved" element={<MobileWrapper title='Saved Spaces' Content={SavedListings} noBack/>} />
            <Route path="/spaces" element={<MobileWrapper title='Saved Spaces' Content={ActiveRentalsMobileShortcut} noBack/>} />
            <Route path="/account/payments" element={<MobileWrapper title='Payment Info' Content={PaymentInfo} noBack/>} />
            </Routes>


          <ParentModal />
        </ProviderWrapper>
      </AnimatePresence>
    </>
  );
}