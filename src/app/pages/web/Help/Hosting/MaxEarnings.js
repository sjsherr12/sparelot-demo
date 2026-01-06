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
    'List All Available Spaces',
    'Space Amenities',
    'Analyzing and Adapting',
    'Marketing Your Space'
];

const MaxEarnings = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Hosting"
                childPath="/help/hosting/"
                secondChild="Maximizing Your Earnings"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Maximizing Your Earnings
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
                List All Available Spaces
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                To maximize your earnings on SpareLot, start by listing every available space you have. This includes not only obvious options like garages and driveways but also less conventional spaces such as basements, attics, sheds, and even spare rooms. By offering a variety of spaces, you increase the likelihood of attracting different types of renters, from those needing vehicle storage to those seeking a place for personal belongings or inventory.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Space Amenities
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
                Enhancing your space with attractive amenities can significantly boost its appeal and justify higher rental prices. Consider offering features such as:
                <ul>
                    <li><strong>Security:</strong> Install locks, cameras, or even a security system to ensure the safety of stored items. Secure spaces are highly sought after and can command higher rates.</li>
                    <li><strong>Climate Control:</strong> If possible, offer climate-controlled spaces for renters with temperature-sensitive items. This is particularly valuable for personal belongings and product inventory.</li>
                    <li><strong>Accessibility:</strong> Ensure that the space is easily accessible, with clear paths and sufficient lighting. Consider providing 24/7 access if feasible, as it increases convenience for renters.</li>
                    <li><strong>Cleanliness and Maintenance:</strong> Keep the space clean and well-maintained. A tidy, well-kept area is more attractive to potential renters and can help you earn more.</li>
                </ul>
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Analyzing and Adapting
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
                Regularly review your listings and their performance to understand what works best and where there is room for improvement:
                <ul>
                    <li><strong>Monitor Demand and Pricing:</strong> Keep an eye on local market trends and adjust your pricing accordingly. If similar spaces in your area are renting for higher rates, consider raising your prices. Conversely, if you’re not attracting enough renters, it might be time to offer a discount or special promotion.</li>
                    <li><strong>Review Feedback:</strong> Pay attention to feedback from renters and make necessary improvements. Positive reviews can boost your listing’s visibility and attractiveness, while addressing negative feedback can help you avoid future issues.</li>
                    <li><strong>Experiment with Listings:</strong> Try different descriptions, photos, and amenities to see what attracts the most interest. Use high-quality photos and detailed descriptions to make your listings stand out.</li>
                </ul>
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Marketing Your Space
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
                Effectively marketing your space can significantly increase your visibility and attract more renters:
                <ul>
                    <li><strong>Utilize Social Media:</strong> Share your listings on social media platforms to reach a broader audience. Join local community groups and marketplace pages to promote your space.</li>
                    <li><strong>Leverage Local Advertising:</strong> Place ads in local newspapers, community boards, and online classifieds. Consider partnering with local businesses to display flyers or posters.</li>
                    <li><strong>Engage with the Community:</strong> Participate in local events and community activities to network and spread the word about your available spaces. Building a positive reputation in your community can lead to word-of-mouth referrals.</li>
                </ul> <br></br>
                By implementing these strategies, you can maximize your earnings on SpareLot and create a successful and sustainable hosting experience.
            </MKTypography>
        </Container>
    </>
  )
}

export default MaxEarnings