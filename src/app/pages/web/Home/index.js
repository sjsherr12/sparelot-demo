import { Container, useMediaQuery } from "@mui/material";

import SearchHeader from "app/sections/Search/SearchHeader";
import SearchBar from "app/sections/Search/SearchBar";
import Navbar from "app/sections/Navbar";
import { useReducer } from "react";
import * as c from "const"
import colors from "assets/theme/base/colors";
import { home_web_routes, home_mobile_routes } from "app/sections/Navbar/routes";
import { option_routes } from "app/sections/Options/routes"
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import ListingCard from "app/sections/Options/Card/Listing";
import { home_actions } from "app/sections/Navbar/actions";
import TitleBackground from "app/sections/Extra/Display/TitleBg";
import { LocationOn } from "@mui/icons-material";
import Footer from "app/sections/Footer";
import ListingsCarousel from "app/sections/Options/Carousel/Listings";
import IconicTextCard from "app/sections/Options/Card/Iconic/Textful";
import { BenefitArray, StorageTypeSelection, TLIRFormatted, TRILFormatted } from "./dynamic";
import HouseArray from 'assets/images/PersonView.webp'
import { Helmet } from 'react-helmet-async';
import HomeFAQs from "./FAQs";
import { useTheme } from "@emotion/react";
import { useSearchResultsState } from "../Explore/context";
import Hr from "app/utils/Hr";

const Home = () => {

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Corporation",
      "name": "SpareLot",
      "url": "https://sparelot.com",
      "logo": "https://sparelot.com/Images/SpareLotLogo.png",  
      "description": "SpareLot is a storage and parking marketplace that connects renters searching for storage and parking to hosts looking to rent out their unused space.",
      "areaServed": "US",
      "sameAs": [
        "https://www.facebook.com/sparelot",
        "https://www.tiktok.com/@sparelot",
        "https://www.linkedin.com/company/sparelot",
        "https://www.instagram.com/sparelotstorage"
      ]
    };

    document.title='SpareLot';

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
      <>
        <Helmet>
          <title>SpareLot | Local Storage and Parking for Items, Vehicles, & More</title>
          <meta
            name="description"
            content="Storage and parking for items, cars, trailers, RVs, and boats — Long-term or short-term. Book rental spaces from garages to basements, driveways, and more."
          />
          <meta
            name="keywords"
            content="storage, parking, marketplace, rental space, parking spaces, storage solutions, rent parking, rent storage, car parking, vehicle storage, item storage, storage and parking marketplace, host unused space"
          />
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
        </Helmet>

        <MKBox>
          <TitleBackground
            title="Find Local Storage and Parking"
            imageUrl={HouseArray}
            subtitle={`Enjoy safe, convenient, and affordable storage.`}
            BelowTitleContent={() => <SearchBar placeholder={isMobile ? "Enter Location" : "Enter Location, ZIP, or Address"} AdornmentIcon={LocationOn}/>}
            desktopContentHeight="650"
          />
          <StorageTypeSelection/>
          <ListingsCarousel
            title={"Featured listings"}
            description={"Explore listings and save spaces you may be interested in."}
          />

          <Container>
          <Hr/>
          </Container>

          <TRILFormatted/>

          <BenefitArray/>
          
          <TLIRFormatted/>

          <HomeFAQs/>
          


        </MKBox>
      </>
    )
}

export default Home;