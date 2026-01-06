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
    'Connecting a Payment Method',
    'Renter Payments',
    'Host Payments',
    'SpareLot Fees',
    'Payment Protection'
];

const PaymentBasics = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="FAQs"
                childPath="/help/faqs/"
                secondChild="Payment Basics"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Payment Basics
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
                Connecting a Payment Method
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Connecting your payment method will be different for hosts and renters. Hosts must connect a bank account in order to receive payments while renters are required to provide valid credit card information. Specific details about connecting your payment methods can be found in our other help articles: Connecting Payment Method (Host) and Connecting Payment Method (Renter)
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
                Payments on SpareLot are straightforward and secure. When you confirm your reservation, the payment for the first month’s rent (or the agreed-upon period) will be charged to your connected payment method. Recurring payments will be automatically processed according to the rental agreement. Payment price is calculated as the cost of the listing in addition to SpareLot’s small percentage service fee. You can view your payment history and upcoming payments in the "Payments and Billing" section of your account. For safety, never use any form of outside payment such as checks, cash, or Paypal. For more details about renter payments, check out our dedicated Renter Payments help article. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Host Payments
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
                SpareLot Fees
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                SpareLot only takes two small fees from the entire platform including a transactional fee and hosting fee. Full details on these fees can be found in our SpareLot Fees help article. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Payment Protection
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                SpareLot provides secure payment protection for both renters and hosts. Our third party processor, Stripe, ensures that each user’s financial information is stored and transmitted safely. These payment protection features ensure that each user can enjoy a smooth experience using our platform. Therefore, make sure to never engage in any sort of outside form of payment, as this would leave both the host and renter without SpareLot’s protection. 
            </MKTypography>
        </Container>
    </>
  )
}

export default PaymentBasics