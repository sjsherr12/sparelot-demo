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
    'Creating a SpareLot Account',
    'Email Verification'
];

const AccountSetup = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="FAQs"
                childPath="/help/faqs/"
                secondChild="Account Setup"
            />
            <MKTypography variant='h1' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
            }}>
                Account Setup
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
                Creating a SpareLot Account
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Creating a compelling and detailed listing is crucial to attracting renters to your space. To create a listing, navigate to the listings page of the host interface and click on the plus icon to add a listing. Then, our platform will take you through the necessary steps to publishing your first listing. A few of these steps include:
                <ol style={{marginLeft:'55px'}}>
                    <li><strong>Visit the SpareLot Website or App:</strong> Go to the SpareLot website or download the SpareLot mobile app from your device's app store.</li>
                    <li><strong>Sign Up:</strong> Click on the "Sign Up" button. You’ll be prompted to enter your email address, create a password, and add a couple of personal details including email and phone number. Alternatively, you can sign up using third party accounts such as Facebook, Google, or Apple.</li>
                    <li><strong>Complete Profile Information:</strong> After entering your email and password, you’ll be asked to fill in additional information like your full name and phone number. Adding a profile picture at this stage can help build trust with potential renters or hosts.</li>
                    <li><strong>Agree to Terms and Conditions:</strong> Read through SpareLot’s terms and conditions, privacy policy, and user agreement. Check the box to agree and proceed with the account creation.</li>
                </ol>
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Email Verification
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                To ensure the security and authenticity of your account, SpareLot requires email verification. To verify your email follow these steps. After completing the sign-up process, you’ll receive an email from SpareLot. This email contains a verification link.Find the email from SpareLot in your inbox. If you don’t see it, check your spam or junk folder. Open the email and click on the verification link provided. This will redirect you to the SpareLot website or app, confirming that your email has been verified. Once your email is verified, your account will be fully activated. You can now log in to SpareLot using your email and password, and start exploring the platform. <br></br> <br></br>

                By following these steps to create and verify your account, you'll be ready to take full advantage of SpareLot's features and access the platform. Welcome to the SpareLot community!
            </MKTypography>
        </Container>
    </>
  )
}

export default AccountSetup