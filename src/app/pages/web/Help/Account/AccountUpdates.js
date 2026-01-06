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
    'How to Update Account Information'
];

const AccountUpdates = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Account"
                childPath="/help/account/"
                secondChild="Account Updates"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Account Updates
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
                How to Update Account Information
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
                '& li':{
                    mb:'8px'
                }
            }}>
                Updating your account information on SpareLot is a straightforward process. Follow these steps to ensure your details are current:
                <ol style={{marginLeft: '50px'}}>
                    <li><strong>Log In:</strong> Start by logging in to your SpareLot account using your credentials.</li>
                    <li><strong>Navigate to Account Settings:</strong> Go to the "My Account" section and select "Account Settings."</li>
                    <li><strong>Edit Personal Information:</strong> In the account settings, you will find options to update various pieces of information, such as:
                        <ul style={{listStyleType: 'circle', marginLeft: '35px'}}>
                            <li><strong>Name:</strong> Update your first and last name as needed.</li>
                            <li><strong>Email Address:</strong> Change your email address to ensure you receive all notifications and important communications.</li>
                            <li><strong>Phone Number:</strong> Add or update your phone number for better communication with renters or hosts.</li>
                            <li><strong>Address:</strong> Update your physical address if you have moved.</li>
                            <li><strong>Profile Picture:</strong> Upload a new profile picture to keep your account looking fresh and recognizable.</li>
                        </ul>
                    </li>
                    <li><strong>Save Changes:</strong> After making the necessary updates, be sure to save your changes. Look for a "Save" or "Update" button at the bottom of the page.</li>
                </ol>
            </MKTypography>
        </Container>
    </>
  )
}

export default AccountUpdates