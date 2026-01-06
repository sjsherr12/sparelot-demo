import { useMediaQuery } from "@mui/material";
import ListingCard from "app/sections/Options/Card/Listing";
import theme from "assets/theme";
import ReactDOM from 'react-dom'
import { Router } from "react-router";
import { BrowserRouter, Routes } from "react-router-dom";
import ProviderWrapper from "providerWrapper";

const PopupContent = ({ listing, listing_uuid, host, userimpl, }) => {
    const isMobile = useMediaQuery(`(max-width:1024px)`)
    return (
        <BrowserRouter>
            <ProviderWrapper>
                <div style={{ width: 'fit-content', height: 270, marginLeft: -14, marginRight: -10, overflow: 'hidden' }}>
                    <ListingCard
                        listing={listing}
                        listing_uuid={listing_uuid}
                        host={host}
                        userimpl={userimpl}
                        customWidth={230}
                        customImageHeight={150}
                        isInPopupMode={true}
                    />
                </div>
                </ProviderWrapper>
        </BrowserRouter>
    );
};
  
export const createPopupContent = (props) => {
    const div = document.createElement('div');
    const root = ReactDOM.createRoot(div);
    root.render(<PopupContent {...props} />);
    return div;
  };