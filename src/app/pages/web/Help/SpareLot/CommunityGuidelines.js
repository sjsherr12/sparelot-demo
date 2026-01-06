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
    'Respectful Communication',
    'Accurate Listings',
    'Trust and Safety',
    'Compliance with Laws'
];

const CommunityGuidelines = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="SpareLot"
                childPath="/help/sparelot/"
                secondChild="Community Guidelines"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Community Guidelines
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
                Respectful Communication
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                At SpareLot, fostering a respectful and inclusive community is paramount. Whether you are a host or a renter, always communicate in a courteous and professional manner. Treat others with respect, listen to their concerns, and resolve any issues amicably. Harassment, discrimination, or abusive behavior will not be tolerated and may result in account suspension or termination.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Accurate Listings
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Hosts are responsible for providing accurate and detailed information about their storage spaces. This includes clear descriptions, high-quality photos, and honest representations of the space's condition and features. Misleading or false information not only affects the renting experience but also undermines trust within the SpareLot community. Ensure your listings are up-to-date and reflective of the actual space being offered.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Trust and Safety
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
                Building trust and ensuring the safety of all community members is a core value at SpareLot. Hosts and renters should follow these guidelines to maintain a safe environment:
                <ul style={{marginLeft: '50px'}}>
                    <li><strong>Verification:</strong> Complete the account verification process to enhance trustworthiness.</li>
                    <li><strong>Secure Transactions:</strong> Always use SpareLot's secure payment system for all transactions. Avoid conducting payments outside the platform.</li>
                    <li><strong>Personal Information:</strong> Protect your personal information and be cautious when sharing details with others. Use SpareLot's messaging system for communication to ensure privacy and security.</li>
                    <li><strong>Respect Property:</strong> Treat rented spaces with care and respect. Any damage or misuse of property will be addressed seriously and may result in penalties or account suspension.</li>
                </ul>
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Compliance with Laws
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                All community members must comply with local, state, and federal laws. This includes adhering to zoning regulations, obtaining necessary permits, and respecting property rights. Illegal activities, including the storage of prohibited items, will not be tolerated and will result in immediate account suspension and potential legal action. <br></br> <br></br>

                By following these community guidelines, you contribute to a trustworthy and harmonious environment on SpareLot. Together, we can ensure a positive experience for all users, fostering a community built on respect, accuracy, trust, safety, and compliance.
            </MKTypography>
        </Container>
    </>
  )
}

export default CommunityGuidelines