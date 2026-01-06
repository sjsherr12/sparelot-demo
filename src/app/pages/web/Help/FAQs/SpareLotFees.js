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
    'Transactional Fee',
    'Hosting Fee',
    'Penalty Fees'
];

const SpareLotFees = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="FAQs"
                childPath="/help/faqs/"
                secondChild="SpareLot Fees"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                SpareLot Fees
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
                Transactional Fee
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Along with each transaction between renter and host, SpareLot adds a small transactional fee to the price of the space based on factors such as location, type of space, size of space, access, and more. This small fee enables SpareLot to provide a safe and secure community for all of its online users. It typically averages to be around 13-16% of the price of the listing. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Hosting Fee
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                For our hosts, SpareLot charges a small 4% hosting fee taken from each monthly transaction. This small payment gives hosts the ability to list and advertise on SpareLot. Additionally, it allows SpareLot to further ensure the safety of its hosts and renters. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Penalty Fees
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
                lineHeight: '1.6',
                '& ul': {
                    paddingLeft: '20px', // Adjust padding for the ordered list
                    margin: '0', // Reset margin
                },
                '& li': {
                    marginBottom: '10px', // Add space between list items
                },
                '& ul ol': {
                    paddingLeft: '60px', // Adjust padding for nested ordered lists
                },
                '& ul ol li': {
                    marginBottom: '5px', // Space between nested list items
                }
            }}>
                Penalty fees include all charges related to late payments and rental cancellations. These payments are never received by SpareLot but rather provide compensation to either hosts or renters. The structure of penalty fees can be found below:
                <ul style={{marginLeft:'50px'}}>
                    <li><strong>Late Fees:</strong> Late fees will not be applied to reservations where a renter fails to make a payment. If a payment fails, that booking will be immediately canceled. If this was not intentional, renters can message hosts and re-book the listing.</li>
                    <li><strong>Renter Cancellation Fee:</strong> Cancellation fees apply when a renter cancels a reservation after a certain period. In the event that a renter cancels a reservation, which was scheduled to continue, the renter will bear the full cost of that month's price but will no longer be obligated to make payments afterwards. </li>
                    <li><strong>Host Cancellation Fee:</strong> A cancellation fee will be applied when a host cancels a reservation after it has been confirmed or earlier than the designated end date. Renters will receive a full refund for that month and the booking will cancel for following months. </li>
                </ul>
            </MKTypography>
        </Container>
    </>
  )
}

export default SpareLotFees