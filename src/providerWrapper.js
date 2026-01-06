import { ThemeProvider } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { UserAuthStateProvider } from "app/backend/user/auth/reactprovider";
import { ChatProvider } from "app/pages/mobile/Account/Messages/provider";
import { SpareLotHostDataProvider } from "app/pages/mobile/Hosting/Bookings/context";
import { AppModeStateProvider } from "app/pages/mobile/Hosting/context";
import { StripeTransactionsProvider } from "app/pages/mobile/Hosting/Operations/stripeTransactions";
import { SpareLotRenterReservationsProvider } from "app/pages/web/Account/Activity/Rentals/context";
import { SearchResultsProvider } from "app/pages/web/Explore/context";
import { FiltersProvider } from "app/pages/web/Explore/Filters/context";
import { SortingProvider } from "app/pages/web/Explore/Sorting/context";
import { DatePricingProvider } from "app/pages/web/Listing/prices";
import { AlertProvider } from "app/sections/Alert/context";
import { ModalProvider } from "app/sections/Modal/Parent/context";
import { ReauthProvider } from "app/sections/Modal/UserAuth/Reauth/context";
import theme from "assets/theme";
import { HelmetProvider } from "react-helmet-async";

const ProviderWrapper = ({children}) => {
    const stripePromise = loadStripe('pk_live_51PPazEP5F31qwwmUIIcHjjzL71ywxTOdNcWAqrnh35MfdW30RxRD6YQQGhEOMfO9gxsdkNdcvAdgHM3u2KXRtEfD00oW7F4W62');
    return (
        <ThemeProvider theme={theme}> <Elements stripe={stripePromise}>  <UserAuthStateProvider> <ChatProvider> <AppModeStateProvider> <DatePricingProvider> <FiltersProvider> <SortingProvider> <HelmetProvider> <SearchResultsProvider>  <ReauthProvider> <AlertProvider> <ModalProvider> <StripeTransactionsProvider> <SpareLotRenterReservationsProvider> <SpareLotHostDataProvider>
            {children}
        </SpareLotHostDataProvider> </SpareLotRenterReservationsProvider> </StripeTransactionsProvider> </ModalProvider> </AlertProvider> </ReauthProvider> </SearchResultsProvider> </HelmetProvider> </SortingProvider> </FiltersProvider> </DatePricingProvider> </AppModeStateProvider> </ChatProvider> </UserAuthStateProvider> </Elements> </ThemeProvider>
    )
}

export default ProviderWrapper;