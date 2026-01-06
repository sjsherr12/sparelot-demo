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
    'Profile Setup',
    'Payment Method Connect (Host)',
    'Creating a Listing',
    'Publishing a Listing',
    'Renter Inquiries',
    'Receiving Payments',
    'Personal Information'
];

const HostingEssentials = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="FAQs"
                childPath="/help/faqs/"
                secondChild="Hosting Essentials"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Hosting Essentials
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
                Profile Setup
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Setting up your profile on SpareLot is the first step to becoming a host and starting to earn extra income from your unused space. Begin by signing up with your email address or social media account and adding all required personal information such as name, email, and phone number. Complete your profile by adding a profile picture, a short biography, and some specific details about yourself. A well-completed profile establishes trust and credibility with potential renters, making them more likely to choose your listing. Finally, ensure all information is accurate and up-to-date to facilitate smooth communication and transactions.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Payment Method Connect (Host)
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                To receive payments from your renters, you need to connect a payment method. For hosts, this means a valid bank account. Navigate to the "Payment Methods" section in your account settings, and follow the prompts to add your preferred payment method. Ensuring your payment details are correctly entered will allow for seamless transactions. Please note that your payment information is securely stored and processed through Stripe–our payment processing software, which guarantees the safety of your financial details. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Creating a Listing
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Creating a compelling and detailed listing is crucial to attracting renters to your space. To create a listing, navigate to the listings page of the host interface and click on the plus icon to add a listing. Then, our platform will take you through the necessary steps to publishing your first listing. A few of these steps include:
                <ol style={{marginLeft:'55px'}}>
                    <li><strong>Adding High-Quality Photos:</strong> Upload clear and high-resolution photos of your space. Include multiple angles and highlight key features.</li>
                    <li><strong>Detailed Description:</strong> Provide a thorough description of your space, including size, accessibility, security features, and any restrictions. Mention nearby landmarks or amenities to make your listing more appealing.</li>
                    <li><strong>Setting Your Price:</strong> Determine a competitive and fair price for your space. Our algorithmic pricing model will suggest a price for your space, but you can always feel free to change it.</li>
                    <li><strong>Inputting the Location:</strong> Input the address of your space or the nearest address if an address is not applicable. Then, provide location details for renters to understand the location of the space more clearly.</li>
                </ol>
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Publishing a Listing
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Once your listing is complete, publish it to make it visible to potential renters. Once published, it will be live on the platform, and renters can start viewing and booking your space. Make sure to regularly check up on your listings to monitor their performance and start promoting if necessary. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Renter Inquiries
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                When a renter makes a request for your listing, you will receive a notification via email and within the SpareLot app on the listings page. Then, you will have until the renter's designated start date to approve or decline the request. After this time, the request will expire. If you, as the host, have additional inquiries, you can always message the potential renter. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Receiving Payments
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Receiving payments on SpareLot is straightforward and secure. Here’s how the process works. When a renter confirms a reservation, the payment for the first month’s rent (or the agreed-upon period) will be processed and paid to you. Then, subsequent payments will be automatically processed according to the rental agreement. You can access your payment dashboard to view transaction history, upcoming payments, and total earnings. After 3-5 business days, you should see the payout appear in your bank account. Furthermore, make sure to never accept outside forms of payment from renters such as checks, cash, and online payment systems because these transactions would not be monitored using SpareLot’s safety measures. Additionally, SpareLot takes a small 4% processing fee out of every host payment. This small fee allows SpareLot to connect hosts and renters most effectively through our platform. For more details about host payments, check out our dedicated Hosting Payments help article. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Personal Information
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Maintaining accurate personal information on your SpareLot profile is crucial for effective communication and transaction processing. Regularly update your contact details, payment information, and any other relevant data. SpareLot values your privacy and ensures that your personal information is protected through advanced security measures. You can manage your personal information in the "Account Settings" section and make any necessary updates as needed. For the safety of our hosts, we recommend never sharing personal information such as emails, phone numbers, and payment information with renters. <br></br> <br></br>

                By following these hosting essentials, you can ensure a smooth and successful experience on SpareLot. From setting up your profile to managing bookings and receiving payments, SpareLot provides a user-friendly platform to help you make the most of your unused space and maximize your earnings. Happy hosting!
            </MKTypography>
        </Container>
    </>
  )
}

export default HostingEssentials