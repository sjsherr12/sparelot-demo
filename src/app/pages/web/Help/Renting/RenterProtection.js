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
    'Host Verification',
    'Secure Payments',
    'Clear Communication and Agreements'
];

const RenterProtection = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Renting"
                childPath="/help/renting/"
                secondChild="Renter Protection"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Renter Protection
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
                Host Verification
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Ensuring that renters feel safe and secure is a top priority at SpareLot. To achieve this, we implement a comprehensive host verification process. Before a host can list their space on our platform, they must undergo contact checks to verify their identity. <br></br> <br></br>

                Firstly, hosts are required to provide valid contact information. This step is crucial in preventing fraudulent listings and ensuring that all hosts are who they say they are. In addition to contact verification, we also encourage hosts to complete detailed profiles and provide thorough descriptions and photographs of their spaces. This transparency allows renters to make informed decisions based on accurate and reliable information.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Secure Payments
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                SpareLot uses Stripe as its secure payment system to protect both renters and hosts during transactions. When you reserve a space, your payment information is encrypted and processed through a secure payment gateway, ensuring that your financial details are safe from unauthorized access. <br></br> <br></br>

                All payments are made through the SpareLot platform, which means you never have to worry about handling cash or using third-party payment services. This centralized payment system not only simplifies the process but also ensures that every transaction is documented and traceable.
                Moreover, by keeping all communications and payments within the SpareLot platform, we can provide additional security and support in case of any disputes or issues that may arise. With these measures in place, SpareLot is dedicated to providing a secure and trustworthy environment for all users, allowing you to focus on finding the perfect storage space without concerns about safety or security.
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

export default RenterProtection