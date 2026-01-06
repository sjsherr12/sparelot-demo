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
    'Renter Cancellation',
    'Host Cancellation'
];

const ReservationCancellationHosts = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Hosting"
                childPath="/help/hosting/"
                secondChild="Reservation Cancellation (Hosts)"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Reservation Cancellation (Hosts)
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
                Renter Cancellation
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                If you need to cancel a reservation as a renter, you can easily do so through the SpareLot app or website. Navigate to the “Current Spaces” tab in your account, select the reservation you wish to cancel, and follow the on-screen instructions. The ability to cancel and any associated fees are detailed in SpareLot’s Renter Cancelation policy, so it is crucial to review this policy before confirming your cancellation to understand any potential charges. If you cancel within the permitted time frame, your payment will be refunded, usually processed within 5-7 business days. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Host Cancellation
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                For hosts, canceling a reservation involves accessing the “Current Spaces” tab, selecting the reservation, and choosing the cancellation option. It is important to follow the proper procedure to avoid any penalties. Hosts should clearly communicate their cancellation policy to renters to ensure that all parties are aware of the terms. If a host needs to cancel a reservation, they must be mindful of any potential fees or penalties that may apply.. Frequent cancellations by hosts may negatively impact their rating and ability to list spaces on SpareLot. Therefore, we encourage hosts to honor their commitments to maintain a good standing on the platform.
            </MKTypography>
        </Container>
    </>
  )
}

export default ReservationCancellationHosts