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
    'Renter Protection',
    'Host-Renter Negotiation'
];

const RentingConcerns = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="FAQs"
                childPath="/help/faqs/"
                secondChild="Renting Concerns"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Renting Concerns
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
                Renter Protection
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
                    marginBottom: '5px', // Add space between list items
                }
            }}>
                At SpareLot, we prioritize the security and protection of renters and their belongings. While we may not provide direct financial coverage for damages, we offer several measures to help safeguard your stored items and ensure a secure renting experience:
                <ul>
                    <li><strong>Verified Hosts:</strong> SpareLot conducts thorough verification processes for all hosts. This ensures that you are renting from reliable and trustworthy individuals or entities.</li>
                    <li><strong>Secure Payment Processing:</strong> All transactions are handled through our secure payment system, reducing the risk of payment disputes or fraud. Your payments are processed safely and efficiently.</li>
                    <li><strong>Clear Communication Channels:</strong> Our platform provides a secure messaging system that allows you to communicate directly with hosts. This enables you to discuss any specific concerns, rules, or conditions before agreeing to a rental arrangement.</li>
                    <li><strong>Detailed Listings and Agreements:</strong> SpareLot encourages hosts to create detailed listings that clearly outline the terms and conditions of the rental. By understanding the rules, access protocols, and any restrictions upfront, you can prevent misunderstandings and set clear expectations.</li>
                    <li><strong>Review System:</strong> Our review system allows renters to rate and leave feedback on hosts. This helps maintain accountability and transparency within the SpareLot community, as hosts with positive reviews are more likely to be reliable and responsible.</li>
                </ul>
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Host-Renter Negotiation
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Effective communication and negotiation with renters can further protect your property and ensure a positive hosting experience. In the event that damage to host or renter property does occur, SpareLot recommends entering into fair and mutually respectable negotiations. By utilizing SpareLot’s messaging system, hosts and renters should be able to work out liability and financial compensation. 
            </MKTypography>
        </Container>
    </>
  )
}

export default RentingConcerns