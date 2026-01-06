import SearchHeader from "app/sections/Search/SearchHeader";
import { option_routes } from "app/sections/Options/routes";
import { footer_option_routes_renter } from "app/sections/Options/routes";
import MKBox from "components/MKBox";
import ListingsCarousel from "app/sections/Options/Carousel/Listings";
import IconicTextCard from "app/sections/Options/Card/Iconic/Textful";
import { Container } from "@mui/material";
import Explore from "app/pages/web/Explore";
import { storage_type_routes } from "app/sections/Options/routes";
import { useState } from "react";

const Home = () => {

  const [selectedOption, setSelectedOption] = useState(null);

  // Callback function to handle option selection
  const handleOptionSelect = (optionIndex) => {
    // Update the state with the selected option index
    setSelectedOption(optionIndex);
  };

    return (
      <MKBox sx={{overflow:'hidden'}}>
        <Explore selectedOption={selectedOption}/>
      </MKBox>
    )
}

export default Home;