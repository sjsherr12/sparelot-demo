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
    'How to Reserve a Space',
    'Reservation Requests',
    'Finding Exact Listing Location',
    'Reservation Termination'
];

const ReserveSpace = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Renting"
                childPath="/help/renting/"
                secondChild="Reserving a Space"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Reserving a Space
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
                How to Reserve a Space
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
                Reserving a space on SpareLot is a straightforward process designed to provide a seamless experience for renters. To get started, follow these steps:
                <ol style={{marginLeft: '50px'}}>
                    <li><strong>Search for a Space:</strong> Use the search feature on SpareLot to find a suitable space that meets your storage or parking needs. You can filter results by location, size, type of space, price, and other relevant criteria.</li>
                    <li><strong>Review Listings:</strong> Carefully review the listings that match your criteria. Pay attention to details such as the dimensions of the space, accessibility, security features, and any host-specific terms.</li>
                    <li><strong>Initiate Reservation:</strong> Once you’ve found a suitable space, click on the "Reserve" button to initiate the reservation process. You will be prompted to enter your reservation dates and any other necessary information.</li>
                    <li><strong>Provide Payment Information:</strong> Enter your payment details to secure the reservation. SpareLot uses secure payment processing to ensure the safety of your financial information.</li>
                    <li><strong>Submit Reservation Request:</strong> After completing the necessary fields, submit your reservation request. You will receive a confirmation email with the details of your request.</li>
                </ol>
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
            }}>
                When you submit a reservation request, it is sent to the host for approval. Here’s what to expect. First, the host will review your reservation request to ensure it meets their availability and criteria. Next, the host can either approve or decline your reservation request. If approved, you will receive a confirmation email with the details of your reservation. If declined, you can search for other available spaces or contact the host for more information. Finally, if the host has any questions or needs additional information, they may contact you through the SpareLot messaging system. Be sure to respond promptly to facilitate the reservation process.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Finding Exact Listing Location
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Make sure you can easily locate the space you have reserved. The exact address of the listing will be provided in your reservation confirmation email and in the app. This will include any specific instructions for accessing the space if it is not directly located at the address. Furthermore, communicate with the host to get any additional details about the location. The host may provide landmarks, entry codes, or other relevant information. Finally, use the provided address to find the location using a map application. If needed, you can ask the host for directions to ensure you reach the space without any issues.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Reservation Termination
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
                There may be circumstances where you need to terminate your reservation. Here’s how to manage that process:
                <ul style={{marginLeft: '50px'}}>
                    <li><strong>Initiate Termination:</strong> If you need to terminate your reservation, log into your SpareLot account and navigate to your current reservations. Select the reservation you wish to terminate and follow the prompts to initiate the termination.</li>
                    <li><strong>Host Notification:</strong> The host will be notified of your intention to terminate the reservation. Depending on the timing and terms of your reservation, cancellation fees may apply.</li>
                    <li>Please note that depending on the time frame of the reservation cancellation, there may be associated fees to compensate the host.</li>
                </ul>
            </MKTypography>
        </Container>
    </>
  )
}

export default ReserveSpace