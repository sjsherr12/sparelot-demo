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
    'Business Model Revenue Sources',
    'Transactional Fee',
    'Hosting Fee'
];

const MakeMoney = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="SpareLot"
                childPath="/help/sparelot/"
                secondChild="How Does SpareLot Make Money"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                How Does SpareLot Make Money
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
                Business Model Revenue Sources
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                SpareLot operates as a peer-to-peer storage marketplace, connecting individuals with surplus storage space to those in need of storage solutions. Our business model focuses on providing a platform that facilitates these connections, offering a seamless experience for both hosts and renters. In line with our commitment to transparency, we ensure that our revenue generation methods are clear and straightforward. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Transactional Fee
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                One of the primary ways SpareLot generates revenue is through a transactional fee applied to each rental agreement. When a renter books a space through our platform, a small fee is added to the total cost of the rental. This fee is calculated based on various factors such as the location, type, and size of the space, as well as the level of access provided. It typically varies around 10 to 15 percent. This fee enables us to maintain and improve our platform, ensuring a secure and user-friendly experience for all users.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Hosting Fee
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                In addition to the transactional fee, SpareLot also charges a hosting fee to our hosts. This fee is a small percentage (4%) of the monthly rental income received by the host. The hosting fee helps us provide essential services such as support, marketing, and platform enhancements, ensuring that hosts have a positive and profitable experience on SpareLot.
            </MKTypography>
        </Container>
    </>
  )
}

export default MakeMoney