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
    'Choosing the Space',
    'Preparing the Space',
    'Listing the Space',
    'Listing Standards',
];

const CreateListing = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Hosting"
                childPath="/help/hosting/"
                secondChild="Creating a Listing"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Creating a Listing
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
                Choosing the Space
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                The first step in creating a listing on SpareLot is to choose the space you want to rent out. This could be any underutilized area of your property, such as a garage, driveway, basement, attic, shed, or spare room. Consider the type of items that renters might store in these spaces and select the most suitable one. Think about accessibility, security, and any unique features that make your space stand out. The more versatile and secure the space, the higher the potential demand and earning capacity.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Preparing the Space
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Once you have chosen the space, it's essential to prepare it for potential renters. Start by cleaning the area thoroughly to make it appealing and safe. Remove any personal items, debris, or hazards. If applicable, enhance security by installing locks, security cameras, or a security system. Consider improving the space with amenities like shelves, lighting, or climate control if possible. A well-prepared space not only attracts more renters but also allows you to charge a premium rate.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Listing the Space
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
                After preparing the space, you are ready to create your listing on SpareLot. Log into your account and navigate to the "Create a Listing" section. Here, you will need to provide detailed information about your space, including:
                <ul>
                    <li><strong>Title and Description:</strong> Write a clear and concise title that highlights the best features of your space. Follow it with a detailed description covering all relevant aspects such as size, accessibility, security features, and any amenities. Be honest and transparent to set accurate expectations.</li>
                    <li><strong>Photos:</strong> Upload high-quality photos that showcase your space from different angles. Good lighting and clear images help potential renters visualize the space and feel more confident in their choice.</li>
                    <li><strong>Pricing:</strong> Set a competitive price for your listing based on similar spaces in your area. SpareLot may provide pricing recommendations to help you determine an appropriate rate. Consider offering introductory discounts to attract your first few renters.</li>
                    <li><strong>Availability:</strong> Specify the availability of your space. Keep your calendar updated to reflect accurate availability and avoid double bookings.</li>
                </ul>
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Listing Standards
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                To maintain a high-quality marketplace, SpareLot has established certain listing standards that all hosts must adhere to. First, ensure that all information provided in your listing is accurate and up-to-date. Misleading or false information can lead to negative reviews and potential removal of your listing. Second, make sure your listing complies with local laws and regulations. This includes having the legal right to rent out the space and meeting any zoning or safety requirements.Third, maintain a professional and courteous attitude in all interactions with potential renters. Promptly respond to inquiries and reservation requests. Adhering to these standards helps create a trustworthy and reliable community, encouraging more renters to choose your space.
            </MKTypography>
        </Container>
    </>
  )
}

export default CreateListing