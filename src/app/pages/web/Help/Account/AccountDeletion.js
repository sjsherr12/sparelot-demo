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
    'How to Delete Your Account',
    'What Happens When You Delete Your Account'
];

const AccountDeletion = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Account"
                childPath="/help/account/"
                secondChild="Account Deletion"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Account Deletion
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
                How to Delete Your Account
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
                If you wish to delete your SpareLot account, follow these steps:
                <ol style={{marginLeft: '50px'}}>
                    <li><strong>Log In:</strong> Log in to your SpareLot account using your credentials.</li>
                    <li><strong>Navigate to Account Settings:</strong> Go to the "My Account" section and select "Account Settings."</li>
                    <li><strong>Request Deletion:</strong> Scroll down to find the "Delete Account" option. Click on it to initiate the deletion process.</li>
                    <li><strong>Confirm Deletion:</strong> You will be asked to confirm your decision. This step ensures that you understand the consequences of account deletion. Once confirmed, your request will be processed.</li>
                </ol>
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                What Happens When You Delete Your Account
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
                Deleting your SpareLot account is an irreversible action with the following consequences:
                <ul style={{marginLeft: '50px'}}>
                    <li><strong>Data Removal:</strong> All your personal information, listings, and transaction history will be permanently deleted from the platform. This includes any reviews, messages, and payment information associated with your account.</li>
                    <li><strong>Active Reservations:</strong> Any active reservations will be canceled. If you are a host, your renters will be notified of the cancellation, and they will need to find alternative storage solutions. If you are a renter, your host will be informed of your cancellation.</li>
                    <li><strong>Refunds and Penalties:</strong> Any applicable refunds or penalty fees will be processed according to SpareLot's policies. Ensure you understand these policies before deleting your account.</li>
                    <li><strong>Loss of Elite Status:</strong> If you are an Elite Host, you will lose your Elite Host status and any associated benefits. This includes higher search rankings and special tools for managing listings.</li>
                </ul>
            </MKTypography>
        </Container>
    </>
  )
}

export default AccountDeletion