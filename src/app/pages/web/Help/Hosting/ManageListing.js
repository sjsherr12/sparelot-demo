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
    'Promoting a Listing',
    'Pricing a Listing',
    'Editing a Listing'
];

const ManageListing = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Hosting"
                childPath="/help/hosting/"
                secondChild="Managing a Listing"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Managing a Listing
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
                Promoting a Listing
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                To maximize the visibility of your listing and attract more renters, effective promotion is key. Start by leveraging social media platforms to share your listing. Post on Facebook, Instagram, and Twitter, highlighting the unique features of your space. Join local community groups or online forums where potential renters might be looking for storage solutions. Engaging with these communities can drive traffic to your listing. <br></br> <br></br>

                Consider offering special promotions or discounts, especially when you first list your space or during periods of low demand. For example, you could offer a reduced rate for the first month or a discount for long-term rentals. Additionally, make sure to respond promptly to inquiries and maintain a high level of engagement with potential renters. Active and responsive hosts are more likely to attract bookings and receive positive reviews, which further boosts your listing’s visibility.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Pricing a Listing
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Setting the right price for your listing is crucial for attracting renters while maximizing your earnings. Begin by researching the rates of similar spaces in your area to understand the market standard. Factors such as location, size, amenities, and security features should influence your pricing. If your space offers additional benefits like climate control or 24/7 access, you can justify a higher rate. <br></br> <br></br>

                SpareLot provides pricing tools and recommendations to help you determine the optimal price for your listing. Utilize these resources to find a competitive rate. It’s also wise to remain flexible and adjust your pricing based on demand and occupancy. For instance, you might increase rates during peak seasons or offer discounts during slower periods to maintain a steady flow of renters.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Editing a Listing
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Regularly updating your listing is essential to keep it accurate and appealing. If there are any changes to your space, such as added amenities or improvements, make sure to update the description and photos accordingly. High-quality images are particularly important, as they are often the first impression potential renters have of your space. Ensure your photos are well-lit, clear, and showcase the best features of your space. <br></br> <br></br>

                If you receive feedback from renters, consider incorporating their suggestions into your listing to improve it. Positive reviews and testimonials can also be added to your listing to enhance its credibility and attractiveness. Furthermore, keep your availability calendar up-to-date to avoid double bookings and cancellations, which can negatively impact your rating and reviews.
                Regularly reviewing and optimizing your listing ensures it remains competitive and continues to attract renters. By staying proactive and responsive, you can effectively manage your listing, maximize your earnings, and provide a positive experience for renters on SpareLot.
            </MKTypography>
        </Container>
    </>
  )
}

export default ManageListing