// import DefaultNavbar from "layouts/Navbars/DefaultNavbar";

import FAQ from "app/sections/FAQ";
import {useState, useEffect } from 'react'
import { EmailSubscribe, FooterSubscribe } from "app/sections/Subscribe/Email";
import { TextLeftImageRight, TextRightImageLeft } from "app/sections/Extra/Display";
import LogoLoadingScreen from "app/sections/Extra/Loading/Logo";

import * as c from "const"
import colors from "assets/theme/base/colors";

import Navbar from "app/sections/Navbar";
import { launch_routes } from "app/sections/Navbar/routes";

function Launch() {
  
  // const [showLoading, setShowLoading] = useState(true);

  // const timeout_length_ms=3000
  // const fadeout_length_ms=1000

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //   setTimeout(() => setShowLoading(false), timeout_length_ms); // Delay must match animation duration
  // }, fadeout_length_ms); // Time before fade out starts

  //     return () => clearTimeout(timer);
  // }, []);

  // if (showLoading) {
  //   return (
  //     <LogoLoadingScreen
  //     timeout_length_ms={timeout_length_ms}
  //     fadeout_length_ms={fadeout_length_ms}
  //     />
  //   )
  // }

  return (
    <>
      <Navbar
        actions={[{
          type: "external",
          onclick: () => { document.getElementById("FooterSubscribe").scrollIntoView({behavior:"smooth", block:"start"})},
          label: "Sign Up",
          color: "info",
        }]}
        web_routes={launch_routes}
        mobile_routes={launch_routes}
        sticky={true} // add if you want the navbar to stay with you while you scroll
        shadow={true}
        imglogo={c.company_logo}
        nav_text_color={colors.text.focus}
        backgroundColor={colors.background.theme}
      />

      <div id="Home"/>
      <TextLeftImageRight
        headline="Search, Store, Save —"
        subheadline="The Ultimate Storage Solution"
        description="SpareLot is a software application that connects individuals with a need for storage and parking (storage-seekers) to other individuals, organizations, and entities with extra space (hosts). Our seamless platform allows storage seekers to find safe, convenient, and affordable storage solutions while enabling hosts to generate extra income by leasing out their unused space."       
      />

      <EmailSubscribe
        title={"We're Launching Soon!"}
        description={"We're excited to announce that SpareLot will be launching soon. Sign up now to receive launch updates!"}
        register={c.email_sub_register}
        disclaimer={c.email_sub_disclaimer}
      />

      <div id="Benefits" />
      <TextRightImageLeft
        benefit_array={["Safety", "Convenience", "Affordability"]}
        description_array = {[
          "SpareLot has safety features ranging from host identity verification to secure and automatic payments. These functionalities help keep your items protected at all times, so you can spend less time thinking about storage and more about what matters to you.",
          "Our platform connects hosts to storage-seekers everywhere, allowing users greater control over your storage location and access to closer storage options. Additionally, our easy to use platform is free from annoying paperwork and gives users an easy way to manage their storage needs from month to month through our in-app messaging.",
          "SpareLot storage is significantly less expensive than its storage unit counterparts. The average cost of a self-storage unit in the US is $180 per month. By using SpareLot and connecting with other individuals as opposed to big businesses, you can get more space at a lower price."
        ]}
      />

      <div id="FAQ" />
      <FAQ
        title="Frequently Asked Questions (FAQs)"
        faqData={c.faq_data}
      />
      
      <div id="FooterSubscribe" />
      <FooterSubscribe 
        title={"Stay Up to Date!"}
        register={c.email_sub_register}
        disclaimer={c.email_sub_disclaimer}      
      />
    </>
  );
}

export default Launch;