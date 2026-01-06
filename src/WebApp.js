import { useEffect, useState } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "assets/theme";

import PrivateRoute from "privateroute";

// pages
import Home from "app/pages/web/Home"
import Launch from "app/pages/web/Launch"
import HelpPage from "app/pages/web/Help";
import SubscribeConfirmation from "app/pages/web/Subscribe/Confirmation";

import * as c from "const"
import ParentModal from "app/sections/Modal/Parent";
import { ModalProvider } from "app/sections/Modal/Parent/context";
import { UserAuthStateProvider } from "app/backend/user/auth/reactprovider";

// Help/FAQ routes
import FAQHelp from "app/pages/web/Help/FAQs";
import HostingHelp from "app/pages/web/Help/Hosting";
import RentingHelp from "app/pages/web/Help/Renting";
import SecurityHelp from "app/pages/web/Help/Security";
import AccountHelp from "app/pages/web/Help/Account";
import SpareLotHelp from "app/pages/web/Help/SpareLot";
import Partners from "app/pages/web/Partners";
import { onAuthStateChanged } from "firebase/auth";
import { app_auth } from "app/backend/fb_cfg";
import Account from "app/pages/web/Account";
import { AlertProvider } from "app/sections/Alert/context.js";
import { ReauthProvider } from "app/sections/Modal/UserAuth/Reauth/context";
import WebWrapper from "app/utils/wrapper/web";
import HostWebWrapper from "app/utils/wrapper/host";
import Hosting from "app/pages/web/Hosting";
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import { AnimatePresence } from "framer-motion";
import Press from "app/pages/web/Press";
import About from "app/pages/web/About";
import Error404 from "app/pages/web/404";
import Feedback from "app/pages/web/Feedback";
import UserProfile from "app/pages/web/UserProfile";
import Create from "app/pages/web/Create";
import { create_actions } from "app/sections/Navbar/actions";

//Help article routes
//FAQs
import AboutSpareLot from 'app/pages/web/Help/FAQs/AboutSpareLot';
import RentingEssentials from 'app/pages/web/Help/FAQs/RentingEssentials';
import HostingEssentials from 'app/pages/web/Help/FAQs/HostingEssentials';
import PaymentBasics from 'app/pages/web/Help/FAQs/PaymentBasics';
import AccountSetup from 'app/pages/web/Help/FAQs/AccountSetup';
import StorageLocations from 'app/pages/web/Help/FAQs/StorageLocations';
import Messaging from 'app/pages/web/Help/FAQs/Messaging';
import SpareLotFees from 'app/pages/web/Help/FAQs/SpareLotFees';
import ItemAccess from 'app/pages/web/Help/FAQs/ItemAccess';
import HostingConcerns from 'app/pages/web/Help/FAQs/HostingConcerns';
import RentingConcerns from 'app/pages/web/Help/FAQs/RentingConcerns';

//Hosting
import HostingFees from 'app/pages/web/Help/Hosting/HostingFees';
import HostingPayments from 'app/pages/web/Help/Hosting/HostingPayments';
import HostEligibility from 'app/pages/web/Help/Hosting/HostEligibility';
import HostStandards from 'app/pages/web/Help/Hosting/HostStandards';
import MaxEarnings from 'app/pages/web/Help/Hosting/MaxEarnings';
import CreateListing from 'app/pages/web/Help/Hosting/CreateListing';
import ManageListing from 'app/pages/web/Help/Hosting/ManageListing';
import InteractRenters from 'app/pages/web/Help/Hosting/InteractRenters';
import ReservationCancellationHosts from 'app/pages/web/Help/Hosting/ReservationCancellationHosts';
import HostProtection from 'app/pages/web/Help/Hosting/HostProtection';
import EliteHost from 'app/pages/web/Help/Hosting/EliteHost';

//Renting
import RentingFees from 'app/pages/web/Help/Renting/RentingFees';
import RenterPayments from 'app/pages/web/Help/Renting/RenterPayments';
import HostInteractions from 'app/pages/web/Help/Renting/HostInteractions';
import ReserveSpace from 'app/pages/web/Help/Renting/ReserveSpace';
import ReservationCancellationRenters from 'app/pages/web/Help/Renting/ReservationCancellationRenters';
import RenterProtection from 'app/pages/web/Help/Renting/RenterProtection';

//Security
import CommunityViolations from 'app/pages/web/Help/Security/CommunityViolations';

//Account

import AccountDeletion from 'app/pages/web/Help/Account/AccountDeletion';
import AccountVerification from 'app/pages/web/Help/Account/AccountVerification';
import AccountUpdates from 'app/pages/web/Help/Account/AccountUpdates';

//SpareLot
import CommunityGuidelines from 'app/pages/web/Help/SpareLot/CommunityGuidelines';
import MakeMoney from 'app/pages/web/Help/SpareLot/MakeMoney';
import SpareLotMarketing from 'app/pages/web/Help/SpareLot/SpareLotMarketing';
import { SearchResultsProvider } from "app/pages/web/Explore/context";
import { HelmetProvider } from "react-helmet-async";
import Messages from "app/pages/mobile/Account/Messages";
import InChat from "app/pages/mobile/Account/Messages/inchat";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Explore from "app/pages/web/Explore";
import { FiltersProvider } from "app/pages/web/Explore/Filters/context";

import LoginPage from "app/pages/web/Login";
import SignupPage from "app/pages/web/Signup";

import TermsOfService from "app/pages/web/TermsOfService";
import PrivacyPolicy from "app/pages/web/PrivacyPolicy";

import SearchResults from "app/pages/web/Help/SearchResults";

import FeedbackConfirmation from "app/pages/web/Feedback/FeedbackConfirmation";

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
import { AppModeStateProvider } from "app/pages/mobile/Hosting/context";

import PaymentInfo from "app/pages/web/Account/Payments";
import Notifications from "app/pages/web/Account/Notifications";
import Draft from "app/pages/web/Draft";

import SavedListings from "app/pages/mobile/Saved";

import Taxes from "app/pages/mobile/Hosting/Operations/Taxes";
import { DatePricingProvider } from "app/pages/web/Listing/prices";
import { StripeTransactionsProvider } from "app/pages/mobile/Hosting/Operations/stripeTransactions";
import { SortingProvider } from "app/pages/web/Explore/Sorting/context";
import HostBookingCalendar from "app/pages/mobile/Hosting/Bookings/Calendar";
import Listing from "app/pages/web/Listing";
import HostingBookingsGroupedApprovedBookings from "app/pages/mobile/Hosting/Bookings/Grouped/ApprovedBookings";
import HostingBookingsGroupedPendingBookings from "app/pages/mobile/Hosting/Bookings/Grouped/PendingBookings";
import HostingBookingsGroupedDeclinedBookings from "app/pages/mobile/Hosting/Bookings/Grouped/DeclinedBookings";
import HostingBookingsGroupedCanceledBookings from "app/pages/mobile/Hosting/Bookings/Grouped/CanceledBookings";
import ProviderWrapper from "providerWrapper";

export default function WebApp() {
  return (
    <>
      <AnimatePresence>
        <ProviderWrapper>
          <CssBaseline />
          
          <Routes>
            <Route path='*' element={<WebWrapper Content={Error404} />}/>
            <Route path="/launch" element={<Launch />} />
            <Route path="/" element={<WebWrapper Content={Home}/>} />
            <Route path ="/hosting" element={<WebWrapper Content={Hosting}/>}/>

            <Route path ="/login" element={<WebWrapper Content={LoginPage} noFooter/>}/>
            <Route path ="/signup" element={<WebWrapper Content={SignupPage} noFooter/>}/>

            <Route path={c.subscribed_href} element={<SubscribeConfirmation />} />

            <Route path="/about" element={<WebWrapper Content={About} />} />
            <Route path="/press" element={<WebWrapper Content={Press} />} />
            <Route path="/partners" element={<WebWrapper Content={Partners} />} />
            <Route path="/explore" element={<WebWrapper Content={Explore} noFooter />} />
            <Route path="/feedback" element={<WebWrapper Content={Feedback} />} />

            <Route path='/listing/:listingId' element={<WebWrapper Content={Listing} web_routes={[]}  noFooter={true}/> } />
            <Route path='/draft/:listingId' element={<WebWrapper Content={Draft} web_routes={[]}  noFooter={true}/> } />
            
            <Route path='/create' element={<PrivateRoute><WebWrapper Content={Create} web_routes={[]} actions={create_actions} noFooter={true}/></PrivateRoute>} />
              <Route path='/error_creating_listing' element={<WebWrapper Content={Feedback} web_routes={[]} actions={create_actions} noFooter={true}/> } />
            
              <Route path="/messages" element={<WebWrapper Content={Messages} noFooter/>} />
              <Route path="/messages/:chatId" element={<WebWrapper Content={Messages} noFooter/>} />
            
            <Route path="/help" element={<WebWrapper Content={HelpPage}/>} />
            {/* Help/FAQ routes */}
            <Route path="/help/faqs/" element={<WebWrapper Content={FAQHelp}/>}/>
            <Route path="/help/hosting/" element={<WebWrapper Content={HostingHelp}/>}/>
            <Route path="/help/renting/" element={<WebWrapper Content={RentingHelp}/>}/>
            <Route path="/help/security/" element={<WebWrapper Content={SecurityHelp}/>}/>
            <Route path="/help/account/" element={<WebWrapper Content={AccountHelp}/>}/>
            <Route path="/help/sparelot/" element={<WebWrapper Content={SpareLotHelp}/>}/>


            {/* Help/FAQ routes */}

            <Route path="/account/*" element={<PrivateRoute><WebWrapper Content={Account} web_routes={[{}]} noFooter/></PrivateRoute>}/>
            <Route path="/profile/:userId" element={<WebWrapper Content={UserProfile} noFooter/>} />
            {/* <Route path="/account/profile" element={<PrivateRoute><WebWrapper Content={AccountProfile} web_routes={[{}]}/></PrivateRoute>} />
            <Route path="/account/personal" element={<PrivateRoute><WebWrapper Content={AccountPersonal} web_routes={[{}]}/></PrivateRoute>} />
            <Route path="/account/security" element={<PrivateRoute><WebWrapper Content={AccountSecurity} web_routes={[{}]}/></PrivateRoute>} />
            <Route path="/account/payments" element={<PrivateRoute><WebWrapper Content={PaymentInfo} web_routes={[{}]}/></PrivateRoute>} />
            <Route path="/account/notifications" element={<PrivateRoute><WebWrapper Content={Notifications} web_routes={[{}]}/></PrivateRoute>} /> */}
            
            
            {/* Help article routes */}
            {/* FAQs Routes */}
            <Route path="/help/faqs/aboutsparelot/" element={<WebWrapper Content={AboutSpareLot}/>}/>
            <Route path="/help/faqs/rentingessentials/" element={<WebWrapper Content={RentingEssentials}/>}/>
            <Route path="/help/faqs/hostingessentials/" element={<WebWrapper Content={HostingEssentials}/>}/>
            <Route path="/help/faqs/paymentbasics/" element={<WebWrapper Content={PaymentBasics}/>}/>
            <Route path="/help/faqs/accountsetup/" element={<WebWrapper Content={AccountSetup}/>}/>
            <Route path="/help/faqs/storagelocations/" element={<WebWrapper Content={StorageLocations}/>}/>
            <Route path="/help/faqs/messaging/" element={<WebWrapper Content={Messaging}/>}/>
            <Route path="/help/faqs/sparelotfees/" element={<WebWrapper Content={SpareLotFees}/>}/>
            <Route path="/help/faqs/itemaccess/" element={<WebWrapper Content={ItemAccess}/>}/>
            <Route path="/help/faqs/hostingconcerns/" element={<WebWrapper Content={HostingConcerns}/>}/>
            <Route path="/help/faqs/rentingconcerns/" element={<WebWrapper Content={RentingConcerns}/>}/>
            
            {/* Hosting Routes */}
            <Route path="/help/hosting/hostingessentials/" element={<WebWrapper Content={HostingEssentials}/>}/>
            <Route path="/help/hosting/hostingconcerns/" element={<WebWrapper Content={HostingConcerns}/>}/>
            <Route path="/help/hosting/hostingfees/" element={<WebWrapper Content={HostingFees}/>}/>
            <Route path="/help/hosting/hostingpayments/" element={<WebWrapper Content={HostingPayments}/>}/>
            <Route path="/help/hosting/hosteligibility/" element={<WebWrapper Content={HostEligibility}/>}/>
            <Route path="/help/hosting/hoststandards/" element={<WebWrapper Content={HostStandards}/>}/>
            <Route path="/help/hosting/maxearnings/" element={<WebWrapper Content={MaxEarnings}/>}/>
            <Route path="/help/hosting/createlisting/" element={<WebWrapper Content={CreateListing}/>}/>
            <Route path="/help/hosting/managelisting/" element={<WebWrapper Content={ManageListing}/>}/>
            <Route path="/help/hosting/interactrenters/" element={<WebWrapper Content={InteractRenters}/>}/>
            <Route path="/help/hosting/reservationcancellationhosts/" element={<WebWrapper Content={ReservationCancellationHosts}/>}/>
            <Route path="/help/hosting/hostprotection/" element={<WebWrapper Content={HostProtection}/>}/>
            {/* <Route path="/help/hosting/elitehost/" element={<WebWrapper Content={EliteHost}/>}/> */}

            {/* Renting Routes */}
            <Route path="/help/renting/rentingessentials/" element={<WebWrapper Content={RentingEssentials}/>}/>
            <Route path="/help/renting/rentingconcerns/" element={<WebWrapper Content={RentingConcerns}/>}/>
            <Route path="/help/renting/rentingfees/" element={<WebWrapper Content={RentingFees}/>}/>
            <Route path="/help/renting/renterpayments/" element={<WebWrapper Content={RenterPayments}/>}/>
            <Route path="/help/renting/hostinteractions/" element={<WebWrapper Content={HostInteractions}/>}/>
            <Route path="/help/renting/reservespace/" element={<WebWrapper Content={ReserveSpace}/>}/>
            <Route path="/help/renting/accessitems/" element={<WebWrapper Content={ItemAccess}/>}/>
            <Route path="/help/renting/reservationcancellationrenters/" element={<WebWrapper Content={ReservationCancellationRenters}/>}/>
            <Route path="/help/renting/renterprotection/" element={<WebWrapper Content={RenterProtection}/>}/>

            {/* Security Routes */}
            <Route path="/help/security/renterprotection/" element={<WebWrapper Content={RenterProtection}/>}/>
            <Route path="/help/security/hostprotection/" element={<WebWrapper Content={HostProtection}/>}/>
            <Route path="/help/security/paymentbasics/" element={<WebWrapper Content={PaymentBasics}/>}/>
            <Route path="/help/security/communityviolations/" element={<WebWrapper Content={CommunityViolations}/>}/>

            {/* Account Routes */}
            <Route path="/help/account/accountsetup/" element={<WebWrapper Content={AccountSetup}/>}/>
            <Route path="/help/account/accountdeletion/" element={<WebWrapper Content={AccountDeletion}/>}/>
            <Route path="/help/account/accountverification/" element={<WebWrapper Content={AccountVerification}/>}/>
            <Route path="/help/account/accountupdates/" element={<WebWrapper Content={AccountUpdates}/>}/>

            {/* SpareLot Routes */}
            <Route path="/help/sparelot/aboutsparelot/" element={<WebWrapper Content={AboutSpareLot}/>}/>
            <Route path="/help/sparelot/communityguidelines/" element={<WebWrapper Content={CommunityGuidelines}/>}/>
            <Route path="/help/sparelot/makemoney/" element={<WebWrapper Content={MakeMoney}/>}/>
            <Route path="/help/sparelot/sparelotmarketing/" element={<WebWrapper Content={SpareLotMarketing}/>}/>

            <Route path="/login" element={<WebWrapper Content={LoginPage}/>}/>
            <Route path="/signup" element={<WebWrapper Content={SignupPage}/>}/>

            <Route path="/terms-of-service" element={<WebWrapper Content={TermsOfService}/>}/>
            <Route path="/privacy-policy" element={<WebWrapper Content={PrivacyPolicy}/>}/>

            <Route path="/search-results" element={<WebWrapper Content={SearchResults}/>}/>

            <Route path="/feedback-confirmation" element={<WebWrapper Content={FeedbackConfirmation}/>}/>

            <Route path="/hosting/operations/earnings" element={<PrivateRoute><HostWebWrapper Content={HostEarnings}/></PrivateRoute>} />
              <Route path="/hosting/operations/earnings/taxes" element={<PrivateRoute><HostWebWrapper Content={Taxes}/></PrivateRoute>} />
            <Route path="/hosting/operations/reviews" element={<PrivateRoute><HostWebWrapper Content={HostReviews}/></PrivateRoute>} />
            <Route path="/hosting/operations/elitehost" element={<PrivateRoute><HostWebWrapper Content={HostEliteHost}/></PrivateRoute>} />
            <Route path="/hosting/operations/resources" element={<PrivateRoute><HostWebWrapper Content={HostResources}/></PrivateRoute>} />

            <Route path="/hosting/messages" element={<PrivateRoute><HostWebWrapper Content={Messages}/></PrivateRoute>} />
            <Route path="/hosting/messages/:chatId" element={<PrivateRoute><WebWrapper Content={Messages} noFooter/></PrivateRoute>} />

            <Route path="/hosting/bookings/calendar" element={<PrivateRoute><HostWebWrapper Content={HostBookingCalendar}/></PrivateRoute>} />
            <Route path="/hosting/bookings/approved" element={<PrivateRoute><HostWebWrapper Content={HostingBookingsGroupedApprovedBookings}/></PrivateRoute>} />
            <Route path="/hosting/bookings/pending" element={<PrivateRoute><HostWebWrapper Content={HostingBookingsGroupedPendingBookings}/></PrivateRoute>} />
            <Route path="/hosting/bookings/declined" element={<PrivateRoute><HostWebWrapper Content={HostingBookingsGroupedDeclinedBookings}/></PrivateRoute>} />
            <Route path="/hosting/bookings/canceled" element={<PrivateRoute><HostWebWrapper Content={HostingBookingsGroupedCanceledBookings}/></PrivateRoute>} />

            <Route path="/hosting/listings/unpublished" element={<PrivateRoute><HostWebWrapper Content={UnpublishedListings}/></PrivateRoute>} />
            <Route path="/hosting/listings/published" element={<PrivateRoute><HostWebWrapper Content={PublishedListings}/></PrivateRoute>} />

            <Route path="/saved" element={<PrivateRoute><WebWrapper Content={SavedListings}/></PrivateRoute>}/>
          </Routes>
          <ParentModal />
        </ProviderWrapper>
      </AnimatePresence>
    </>
  );
}