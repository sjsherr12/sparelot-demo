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
    'Renter Verification',
    'Renter Approval',
    'Renter Reviews',
    'Clear Communication and Agreements'
];

const HostProtection = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Hosting"
                childPath="/help/hosting/"
                secondChild="Host Protection"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Host Protection
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
                Renter Verification
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                To foster a secure environment for hosts, SpareLot implements a comprehensive renter verification process. By verifying each renter’s credentials, we aim to mitigate the risk of fraudulent activities and ensure that hosts are engaging with legitimate and reliable individuals. This level of scrutiny helps create a trustworthy community and enhances the overall security of the platform for hosts.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Renter Approval
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Hosts have significant control over who they allow to rent their space through our platform. Before finalizing a rental agreement, hosts are provided with the opportunity to review and approve potential renters. This review process includes examining the renter’s profile, background information, and any references they may have provided. By giving hosts the power to evaluate and select renters, we empower them to make informed decisions that align with their comfort and security standards. This proactive approach helps ensure that hosts are confident in their choice of renter.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Renter Reviews
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Our platform features a robust review system that allows hosts to provide feedback on their experiences with renters. This system is designed to enhance transparency and trust within the community. Hosts can read reviews left by other hosts to gauge the reliability and behavior of potential renters. Conversely, hosts can also share their own experiences through reviews, contributing to a collective understanding of renter behaviors and helping future hosts make informed decisions. This exchange of information fosters a culture of accountability and mutual respect.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Clear Communication and Agreements
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Effective communication is crucial for a successful rental experience. SpareLot facilitates clear and open dialogue between hosts and renters through integrated messaging tools. These tools allow both parties to discuss and document rental terms, expectations, and any specific agreements. By maintaining clear communication, hosts and renters can ensure that all conditions are understood and agreed upon, reducing the potential for misunderstandings. This clarity is essential for a smooth and satisfactory rental experience.
            </MKTypography>
        </Container>
    </>
  )
}

export default HostProtection