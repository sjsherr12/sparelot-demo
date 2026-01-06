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
    'Host Protection',
    "Host-Renter Negotiation"
];

const HostingConcerns = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="FAQs"
                childPath="/help/faqs/"
                secondChild="Hosting Concerns"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Hosting Concerns
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
                Host Protection
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
                At SpareLot, we understand that protecting your property is a top priority when hosting renters. While we may not provide direct financial coverage for damages, we offer several measures to help safeguard your space and ensure a secure hosting experience:
                <ul>
                    <li><strong>Verified Renters:</strong> SpareLot conducts thorough verification processes for all renters. This helps ensure that only reliable and trustworthy individuals use your space.</li>
                    <li><strong>Secure Payment Processing:</strong> All transactions are handled through our secure payment system, reducing the risk of payment disputes or fraud. Payments are processed promptly, ensuring that hosts receive their earnings on time.</li>
                    <li><strong>Clear Communication Channels:</strong> Our platform provides a secure messaging system that allows you to communicate directly with renters. This enables you to discuss any specific concerns, rules, or conditions before agreeing to a rental arrangement.</li>
                    <li><strong>Detailed Listings and Agreements:</strong> SpareLot encourages hosts to create detailed listings that clearly outline the terms and conditions of the rental. By specifying the rules, access protocols, and any restrictions upfront, you can prevent misunderstandings and set clear expectations.</li>
                    <li><strong>Review System:</strong> Our review system allows hosts to rate and leave feedback on renters. This helps maintain accountability and transparency within the SpareLot community, as renters with positive reviews are more likely to be respectful and responsible.</li>
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

export default HostingConcerns