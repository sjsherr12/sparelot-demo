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
    'Host Messaging',
    'Reservation Requests',
    'Communication and Payments on SpareLot',
    'Reliability'
];

const HostStandards = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Hosting"
                childPath="/help/hosting/"
                secondChild="Host Standards"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Host Standards
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
                Host Messaging
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Effective communication is crucial for a smooth hosting experience on SpareLot. Hosts are expected to respond promptly. Aim to respond to messages and inquiries from potential renters within 24 hours. Timely communication helps build trust and ensures a positive experience for both parties. Additionally, hosts are expected to be clear and professional when using SpareLot. Host should provide clear, concise, and professional responses. Answer any questions thoroughly and provide additional details about the space when requested.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Reservation Requests
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
                '& ul': {
                    paddingLeft: '50px', // Adjust padding for the unordered list
                    margin: '0', // Reset margin
                },
                '& li': {
                    marginBottom: '10px', // Add space between list items
                }
            }}>
                When you receive a reservation request, it’s important to handle it efficiently:
                <ul>
                    <li><strong>Review Requests Promptly:</strong> Review each reservation request as soon as possible. Consider the renter's profile, reviews, and the details of their request.</li>
                    <li><strong>Confirm or Decline:</strong> Confirm or decline reservation requests within 24-48 hours if possible. If you need more information before deciding, communicate with the renter promptly.</li>
                </ul> <br></br>
                Additionally, note that we expect our hosts to accept a majority of their reservation requests. If we find that a host consistently rejects reservation requests, they may be removed.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Communication and Payments on SpareLot
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
                '& ul': {
                    paddingLeft: '50px', // Adjust padding for the unordered list
                    margin: '0', // Reset margin
                },
                '& li': {
                    marginBottom: '10px', // Add space between list items
                }
            }}>
                To ensure safety and security for all users, hosts and renters must keep all communications and transactions on the SpareLot platform:
                <ul>
                    <li><strong>In-Platform Messaging:</strong> Use SpareLot’s messaging system for all communication with renters. This ensures that all interactions are recorded and monitored for safety.</li>
                    <li><strong>In-Platform Payments:</strong> All payments should be processed through SpareLot’s secure payment system. Avoid using third-party payment methods or platforms, as this can compromise the safety features and protections offered by SpareLot.</li>
                </ul> <br></br>
                By keeping communication and payments within the SpareLot platform, both hosts and renters are protected by our security measures and support systems.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Reliability
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Reliability is key to maintaining a trustworthy and reputable hosting experience on SpareLot. Ensure that the space you list is available as described. Avoid double-booking or canceling reservations at the last minute. Next, have the space ready for the renter by the agreed-upon time. Make sure the space is clean, accessible, and matches the description in your listing. Finally, honor all commitments made to renters. This includes access arrangements, communication promises, and any additional services or amenities offered in your listing. <br></br> <br></br>

                By adhering to these standards, hosts can create a positive and reliable experience for renters, which in turn can lead to positive reviews and repeat business.
            </MKTypography>
        </Container>
    </>
  )
}

export default HostStandards