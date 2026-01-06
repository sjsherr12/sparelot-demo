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
    'How to Cancel a Reservation',
    'Cancellation and Refund Policy',
    'Host-Terminated Reservation'
];

const ReservationCancellationRenters = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Renting"
                childPath="/help/renting/"
                secondChild="Reservation Cancellation (Renters)"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Reservation Cancellation (Renters)
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
                How to Cancel a Reservation
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
                If you need to cancel a reservation on SpareLot, the process is straightforward:
                <ol style={{marginLeft: '50px'}}>
                    <li><strong>Log In:</strong> Log in to your SpareLot account.</li>
                    <li><strong>Navigate to Reservations:</strong> Go to the "My Account" section and select "Current Reservations."</li>
                    <li><strong>Select Reservation:</strong> Choose the reservation you wish to cancel.</li>
                    <li><strong>Initiate Cancellation:</strong> Click on the "Cancel Reservation" button and follow the prompts to confirm your cancellation.</li>
                </ol>
                Once you’ve initiated the cancellation, the system will automatically apply any relevant cancellation fees based on the timing of your cancellation.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Cancellation and Refund Policy
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
                Understanding the cancellation and refund policy is crucial to avoid any unexpected fees. Here’s a breakdown of how these policies work for renters:
                <ul style={{marginLeft: '50px'}}>
                    <li>Less than 24 hours after approval by the host: 0% fee.</li>
                    <li>On monthly renewal date: 0% fee.</li>
                    <li>4 days or more before the start date: 0% fee.</li>
                    <li>4 days or less before the start date: 25% fee.</li>
                </ul>
                The cancellation fees are calculated as a percentage of the total booking amount. If you cancel less than 4 days before the start date, you will be charged a 25% cancellation fee, which is transferred directly to the host as compensation for the late cancellation.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Host-Terminated Reservation
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
                In rare cases, a host may need to cancel a confirmed reservation. Here’s how SpareLot handles such situations:
                <ul style={{marginLeft: '50px'}}>
                    <li><strong>Host Cancellation Fee:</strong>
                        <ul style={{marginLeft:'40px'}}>
                            <li>Hosts are charged a $30 cancellation fee if they cancel a reservation after it has been confirmed or before the designated end date.</li>
                            <li>This fee is paid directly to the renter as compensation for the inconvenience caused by the early termination of the reservation.</li>
                        </ul>
                    </li>
                    <li><strong>Implications for Hosts:</strong>
                        <ul style={{marginLeft:'40px'}}>
                            <li>Frequent cancellations may negatively impact a host’s rating and visibility on SpareLot.</li>
                            <li>Hosts are encouraged to communicate any potential issues as early as possible to avoid cancellations and maintain a positive relationship with renters.</li>
                        </ul>
                    </li>
                </ul>
                By following these guidelines, both renters and hosts can manage reservation cancellations effectively, ensuring a fair and transparent process for all parties involved.
            </MKTypography>
        </Container>
    </>
  )
}

export default ReservationCancellationRenters