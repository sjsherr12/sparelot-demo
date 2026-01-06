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
    'Communication and Payments on SpareLot',
    'Pre-Rental Inquiries',
    'Renter Professionalism'
];

const HostInteractions = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Renting"
                childPath="/help/renting/"
                secondChild="Host Interactions"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Host Interactions
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
                Pre-Rental Inquiries
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Pre-rental inquiries are a crucial part of the hosting process on SpareLot. They allow potential renters to gather information about the space, clarify any doubts, and build trust with the host before committing to a reservation. As a host, being prompt and detailed in your responses can significantly increase the likelihood of securing a booking. Aim to respond to all inquiries within 24 hours. Quick responses show potential renters that you are attentive and reliable. Additionally, provide detailed answers to any questions. If a renter asks about the dimensions of the space, the type of access available, or security features, ensure your response is comprehensive. Finally, use clear and concise language to avoid any misunderstandings. If certain terms or conditions apply, make them explicit.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Renter Professionalism
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
                Maintaining a high level of professionalism in your interactions with renters is essential for a positive hosting experience. Professionalism builds trust and ensures smooth communication throughout the rental period.
                <ul style={{marginLeft: '50px'}}>
                    <li><strong>Respect and Courtesy:</strong> Always communicate respectfully and courteously. Positive interactions can lead to better reviews and repeat business.</li>
                    <li><strong>Clear Expectations:</strong> Clearly communicate the expectations and rules for the space. This includes access hours, security measures, and any other relevant details.</li>
                    <li><strong>Follow-Up:</strong> After initial inquiries, follow up to confirm details and ensure the renter has all the information they need. This helps avoid any confusion or issues later on.</li>
                </ul> <br></br>
                By following these guidelines for pre-rental inquiries and maintaining professionalism, you can create a positive experience for both yourself and your renters on SpareLot. Clear communication, detailed responses, and courteous interactions are key to successful hosting.
            </MKTypography>
        </Container>
    </>
  )
}

export default HostInteractions