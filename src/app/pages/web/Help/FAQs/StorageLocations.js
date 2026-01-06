import React from 'react';
import Navbar from "app/sections/Navbar";
import colors from "assets/theme/base/colors";
import * as c from "const";
import { help_actions, help_mobile_routes } from "../routes";
import MKTypography from "components/MKTypography";
import { Container } from "@mui/material";
import LinkToArticle from "../LinkToArticle";
import MKBox from "components/MKBox";
import DirectoryHeader from "../../Account/header";
import ArticleSummary from "app/pages/web/Help/ArticleSummary";

const Items = [
    'Everywhere!'
];

const StorageLocations = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="FAQs"
                childPath="/help/faqs/"
                secondChild="Where SpareLot Offers Storage"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Where SpareLot Offers Storage
            </MKTypography>
            <MKTypography variant='h6' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '650',
                fontFamily: "Montserrat, sans serif",
                fontSize: '24px'
            }}>
                Article Summary:
            </MKTypography>
            <ArticleSummary items={Items} />
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Everywhere!
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Because SpareLot utilizes a peer-to-peer based marketplace, our community is not limited by location! Renters and hosts are joining each day from around the United States, making storage easier to find and more accessible. If there aren’t already listings in your area, be sure to sign up and share the platform with your friends and family. 
            </MKTypography>
        </Container>
    </>
  )
}

export default StorageLocations