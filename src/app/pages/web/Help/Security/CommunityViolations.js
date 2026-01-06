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
    'Types of Violations',
    'Reporting Violations',
    'Consequences of Violations'
];

const CommunityViolations = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Security"
                childPath="/help/security/"
                secondChild="Community Violations"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Community Violations
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
                Types of Violations
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
                At SpareLot, maintaining a safe and respectful community is a top priority. To ensure a positive experience for all users, certain behaviors and actions are considered violations of our community guidelines. Here are some common types of community violations:
                <ul style={{marginLeft: '50px'}}>
                    <li><strong>Misrepresentation:</strong> Providing false information about your identity, space, or any other details related to your listing or profile.</li>
                    <li><strong>Unlawful Activities:</strong> Using the platform for any illegal activities, including storing prohibited items or conducting unauthorized business operations.</li>
                    <li><strong>Harassment or Abuse:</strong> Engaging in any form of harassment, threats, or abusive behavior towards other users.</li>
                    <li><strong>Discrimination:</strong> Displaying discriminatory behavior or making offensive comments based on race, gender, religion, sexual orientation, or any other protected characteristic.</li>
                    <li><strong>Unauthorized Access:</strong> Entering or accessing spaces without proper authorization or consent from the host.</li>
                    <li><strong>Payment Fraud:</strong> Attempting to manipulate or deceive the payment process, including providing false payment information or attempting to evade fees.</li>
                </ul>
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Reporting Violations
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                If you encounter any behavior or action that you believe violates SpareLot’s community guidelines, it is important to report it promptly. You can report violations by logging into your account, navigating to the Listing or Profile of concern, and submitting a community violation report. The SpareLot team will review the report promptly and take appropriate action based on our community guidelines and policies. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Consequences of Violations
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
                Violations of SpareLot’s community guidelines can result in a range of consequences, depending on the severity and frequency of the violations. Potential consequences include:
                <ul style={{marginLeft: '50px'}}>
                    <li><strong>Warnings:</strong> For minor violations, users may receive a warning and a reminder of our community guidelines.</li>
                    <li><strong>Temporary Suspension:</strong> Repeated or more serious violations can lead to a temporary suspension of the user’s account, restricting their ability to access the platform for a specified period.</li>
                    <li><strong>Permanent Ban:</strong> Severe or repeated violations may result in a permanent ban from the platform, with the user’s account being deactivated and their access revoked.</li>
                    <li><strong>Legal Action:</strong> In cases involving illegal activities or serious breaches of trust, SpareLot reserves the right to pursue legal action against the offending party.</li>
                </ul>
                By adhering to SpareLot’s community guidelines and reporting any violations you encounter, you help maintain a safe, respectful, and trustworthy environment for all users. Thank you for being a part of our community and contributing to its positive atmosphere.
            </MKTypography>
        </Container>
    </>
  )
}

export default CommunityViolations