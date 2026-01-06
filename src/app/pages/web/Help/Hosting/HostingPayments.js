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
    'Payment Method Connect (Host)',
    'Receiving Payments',
    'Taxes on Host Income',
    'Updating Payment Information'
];

const HostingPayments = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Hosting"
                childPath="/help/hosting/"
                secondChild="Hosting Payments"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Hosting Payments
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
                Receiving Payments
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Receiving payments on SpareLot is straightforward and secure. Here’s how the process works. When a renter confirms a reservation, the payment for the first month’s rent (or the agreed-upon period) will be processed and paid to you. Then, subsequent payments will be automatically processed according to the rental agreement. You can access your payment dashboard to view transaction history, upcoming payments, and total earnings. After 3-5 business days, you should see the payout appear in your bank account. Furthermore, make sure to never accept outside forms of payment from renters such as checks, cash, and online payment systems because these transactions would not be monitored using SpareLot’s safety measures. Additionally, SpareLot takes a small 4% processing fee out of every host payment. This small fee allows SpareLot to connect hosts and renters most effectively through our platform. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Taxes on Host Income
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
                As a host on SpareLot, it's important to understand your tax obligations related to the income you earn from renting out your space. SpareLot is required to comply with IRS regulations and provide necessary documentation to both hosts and the IRS. Here’s what you need to know:
                <ul>
                    <li><strong>Form 1099-K:</strong> SpareLot is obligated to issue a Form 1099-K to hosts who meet the IRS thresholds for payment reporting. This form reports the total gross payment amounts you have received during the calendar year. As of the most recent guidelines, SpareLot will issue a Form 1099-K if you receive more than $600 in total payments within a calendar year, regardless of the number of transactions.</li>
                    <li><strong>Information Collection:</strong> To comply with IRS regulations, SpareLot must collect specific information from hosts. This includes:
                        <ul style={{ marginTop: '10px', paddingLeft: '40px' }}>
                            <li><strong>Taxpayer Identification Number (TIN):</strong> This can be your Social Security Number (SSN), Employer Identification Number (EIN), or Individual Taxpayer Identification Number (ITIN).</li>
                            <li><strong>Legal Name:</strong> The name associated with your TIN.</li>
                            <li><strong>Address:</strong> Your current mailing address.</li>
                        </ul>
                    </li>
                    <li>This information will be collected during your account setup or before your earnings reach the reporting threshold. Ensure that your tax information is accurate and up-to-date to avoid any delays or issues with your 1099-K form.</li>
                    <li>By staying informed and prepared, you can manage your tax obligations effectively and avoid any potential issues.</li>
                </ul>
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Updating Payment Information
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
                To ensure you receive your payments on time, it’s crucial to keep your payment information up-to-date. Here’s how you can do it:
                <ul>
                    <li><strong>Log into Your SpareLot Account:</strong>
                        <ul style={{ marginTop: '10px', paddingLeft: '40px' }}>
                            <li>Navigate to the "My Account" section.</li>
                            <li>Select "Payment Information."</li>
                        </ul>
                    </li>
                    <li><strong>Update Payment Details:</strong>
                        <ul style={{ marginTop: '10px', paddingLeft: '40px' }}>
                            <li>Enter your new payment method details, such as bank account information or PayPal details.</li>
                            <li>Double-check the information for accuracy.</li>
                        </ul>
                    </li>
                    <li><strong>Save Changes:</strong> Confirm and save your updated payment information.</li>
                </ul>
                <br></br>By regularly reviewing and updating your payment details, you can ensure smooth and timely transactions.
            </MKTypography>
        </Container>
    </>
  )
}

export default HostingPayments