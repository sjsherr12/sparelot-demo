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
    'Connecting Payment Method (Renter)',
    'How Payments are Made on SpareLot',
    'Payment Failure'
];

const RenterPayments = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Renting"
                childPath="/help/renting/"
                secondChild="Renter Payments"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Renter Payments
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
                Connecting Payment Method (Renter)
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
                How Payments are Made on SpareLot
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
                Once a renter has connected their payment method, making payments on SpareLot is straightforward and secure. Here’s how the process works:
                <ol style={{marginLeft: '50px'}}>
                    <li><strong>Booking Confirmation:</strong> When a renter reserves a storage space, they must provide their payment details during the booking process. SpareLot securely stores this information and processes the payment once the reservation is confirmed by the host.</li>
                    <li><strong>Automatic Payments:</strong> Payments for the rental space are typically processed automatically on a recurring monthly basis. This ensures that renters don’t have to worry about manually making payments each month.</li>
                    <li><strong>Payment Schedule:</strong> Renters can view their payment schedule in their SpareLot account under the "Payments" section. This section provides details of past payments, upcoming payments, and any outstanding balances. Keeping track of this schedule helps renters manage their finances and plan accordingly.</li>
                    <li><strong>Receipts and Invoices:</strong> After each payment is processed, renters will receive an email receipt confirming the transaction. Invoices for all transactions are also available in the renter's SpareLot account. These records can be useful for budgeting and tax purposes.</li>
                    <li><strong>Payment Methods:</strong> Renters can use various payment methods, including credit cards, debit cards, and other supported electronic payment options. SpareLot ensures that all transactions are processed securely using Stripe–an encrypted online payment processor.</li>
                </ol>
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Payment Failure
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Occasionally, payment failures may occur due to various reasons, such as insufficient funds, expired cards, or technical issues. When a payment fails, SpareLot has protocols in place to address the issue. First, renters will receive an immediate notification via email and within their SpareLot account if a payment fails. This notification will include the reason for the failure and instructions on how to resolve the issue. Next, SpareLot will attempt to retry the payment after a certain period, typically within a few days. If a payment method is no longer valid (e.g., expired credit card), renters can update their payment information in their SpareLot account under the "Payment Methods" section. If payment failures persist and are not resolved within a specified timeframe, late fees will apply. These fees are intended to encourage timely payments and compensate hosts for any inconvenience caused by delayed payments. Please see our dedicated Renter Payments help article for more information. 
            </MKTypography>
        </Container>
    </>
  )
}

export default RenterPayments