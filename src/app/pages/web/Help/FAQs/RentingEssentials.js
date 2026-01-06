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
    'Payment Method Connect (Renter)',
    'Reserving a Rental Space',
    'Approved or Declined Request',
    'Accepted Reservation',
    'Renter Payments',
    'Personal Information'
];

const RentingEssentials = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="FAQs"
                childPath="/help/faqs/"
                secondChild="Renting Essentials"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Renting Essentials
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
                Creating a profile on SpareLot is the first step to accessing our extensive network of storage and parking listings. To get started, sign up using your email address or third-party account and creating a password. Next, input your full name, and contact information. After you’ve signed up, a verification email will be sent. Simply, click on the “verify email” button in the email and your account is set up! Now, enhance your account with a profile picture and personal details to build trust as a renter or host. Throughout time, make sure your information is accurate and up-to-date to ensure smooth communication and transactions.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Payment Method Connect (Renter)
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                To reserve a rental space on SpareLot, you need to connect a valid payment method. SpareLot accepts major credit cards and other secure payment options. Navigate to the "Payment Methods" section in your account settings, and follow the prompts to add your preferred payment method. Renters will add credit card information and hosts will connect their bank accounts. Ensuring your payment details are correctly entered will allow for seamless transactions when booking a space. Please note that your payment information is securely stored and processed through our encrypted system. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Reserving a Rental Space
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                To reserve a rental space on SpareLot, you need to connect a valid payment method. SpareLot accepts major credit cards and other secure payment options. Navigate to the "Payment Methods" section in your account settings, and follow the prompts to add your preferred payment method. Renters will add credit card information and hosts will connect their bank accounts. Ensuring your payment details are correctly entered will allow for seamless transactions when booking a space. Please note that your payment information is securely stored and processed through our encrypted system. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Approved or Declined Request
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                After you submit a rental request, the host will review it and decide whether to approve or decline your request. You will receive a notification via email and within the SpareLot app regarding the host’s decision. If your request is declined, consider revising your search criteria or reaching out to the host for more information. If your request is approved, you can proceed with storing your items! 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Renter Payments
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Payments on SpareLot are straightforward and secure. When you confirm your reservation, the payment for the first month’s rent (or the agreed-upon period) will be charged to your connected payment method. Recurring payments will be automatically processed according to the rental agreement. Payment price is calculated as the cost of the listing in addition to SpareLot’s small percentage service fee. You can view your payment history and upcoming payments in the "Payments and Billing" section of your account. For safety, never use any form of outside payment such as checks, cash, or Paypal. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Accepted Reservation
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Upon receiving approval from the host, you will need to confirm your reservation. Review the terms and conditions provided by the host, including any specific rules or requirements. Confirm your reservation by completing the payment process. Once the payment is processed, your reservation is officially accepted, and you will receive detailed instructions for accessing the rental space. Ensure you communicate with the host to coordinate any necessary arrangements.
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
                Maintaining accurate personal information on your SpareLot profile is crucial for effective communication and transaction processing. Regularly update your contact details, payment information, and any other relevant data. SpareLot values your privacy and ensures that your personal information is protected through advanced security measures. You can manage your personal information in the "Account Settings" section and make any necessary updates as needed. For safety, we recommend that you never share your personal information such as phone numbers or payment information with other users. <br></br> <br></br>

                By following these renting essentials, you can ensure a smooth experience on SpareLot. From setting up your profile to making payments and managing your reservations, SpareLot provides a user-friendly platform to meet all your storage and parking needs. Happy renting!
            </MKTypography>
        </Container>
    </>
  )
}

export default RentingEssentials