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
    'Age Requirement',
    'Valid Payment Details',
    'Owning the Space'
];

const HostEligibility = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Hosting"
                childPath="/help/hosting/"
                secondChild="Host Eligibility"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Host Eligibility
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
                Age Requirement
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                To become a host on SpareLot, you must meet the minimum age requirement. All hosts must be at least 18 years old. This ensures that you can legally enter into a rental agreement and manage the responsibilities associated with hosting.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Valid Payment Details
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                As a host, it’s essential to have valid payment details on file to receive your earnings. When setting up your SpareLot account, you will need to provide accurate and current payment information. You can receive payments directly to your bank account. Ensure that the bank details you provide are correct and belong to you. Having valid payment details ensures that you receive your earnings on time and without any issues. Make sure to keep your payment information updated to avoid any delays in receiving payments.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Owning the Space
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                To list a space on SpareLot, you must own the space or have the legal right to rent it out. This means a host must have either property ownership or leaseholder rights. If you own the property, you can list available spaces, such as garages, driveways, basements, or spare rooms. If you are leasing a property and wish to rent out a space, ensure that your lease agreement allows for subletting or renting out portions of the property. You may need written permission from your landlord. <br></br> <br></br>

                By ensuring that you have the legal right to rent out your space, you protect yourself and your renters from potential legal issues. It’s crucial to verify your eligibility before creating a listing on SpareLot.
            </MKTypography>
        </Container>
    </>
  )
}

export default HostEligibility