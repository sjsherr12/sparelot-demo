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
    'Why Account Verification is Important',
    'How to Verify Your Account'
];

const AccountVerification = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Account"
                childPath="/help/account/"
                secondChild="Account Verification"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Account Verification
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
                Why Account Verification is Important
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Account verification is a crucial step in ensuring the security and trustworthiness of the SpareLot community. By verifying your account, you help maintain a safe environment for all users, both hosts and renters. Verified accounts signify that users are genuine, which builds confidence and encourages more successful transactions on the platform.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                How to Verify Your Account
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
                Verifying your SpareLot account is a simple and straightforward process:
                <ol style={{marginLeft: '50px'}}>
                    <li><strong>Create an Account:</strong> Begin by creating an account on SpareLot using your email address. Fill in the required details and submit your registration.</li>
                    <li><strong>Receive Verification Email:</strong> After registration, you will receive an email from SpareLot containing a verification link. This email is typically sent within a few minutes of account creation.</li>
                    <li><strong>Click the Verification Link:</strong> Open the verification email and click on the "Verify Account" button. This action will confirm your email address and complete the verification process.</li>
                    <li><strong>Verification Confirmation:</strong> Once you click the link, you will be redirected to a confirmation page on SpareLot, indicating that your account has been successfully verified. You can now access all features and benefits of the platform.</li>
                </ol>
            </MKTypography>
        </Container>
    </>
  )
}

export default AccountVerification