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
    'What is SpareLot',
    'Mission and Values'
];

const AboutSpareLot = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="FAQs"
                childPath="/help/faqs/"
                secondChild="About SpareLot"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                About SpareLot
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
                What is SpareLot
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                SpareLot is a peer-to-peer storage and parking marketplace. Our online platform connects renters searching for safe, convenient, and affordable storage to individuals and entities with a surplus of space. <br /><br />
                
                Whether you’re looking for a secure place to store extra furniture or trying to find a place to park your boat for the winter, SpareLot helps renters find localized, cost-effective storage solutions. On the flip side, SpareLot allows hosts to turn their unused space into an income producing asset. From driveways to garages, basements, and unpaved lots, hosts can list almost any extra area they own and start generating cash. <br /><br />
                
                By choosing SpareLot, renters can browse available listings, compare prices, and book storage that meets their specific needs. Hosts, on the other hand, can easily list their available spaces, manage their bookings, and find renters suited to their space.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Mission and Values
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Our mission at SpareLot is to revolutionize the way people think about storage and parking by providing a flexible, community-driven platform that maximizes unused space. We aim to empower individuals to generate extra income while offering easy, economical storage solutions to renters. <br /><br />
                
                SpareLot Values: <br></br>
                <strong>Community Empowerment:</strong> We believe in the power of community. By connecting people who need storage with those who have space to spare, we foster a sharing economy that benefits everyone involved. Our platform is designed to strengthen local communities by creating new opportunities for income and resource optimization. <br /><br />
                
                <strong>Innovation:</strong> SpareLot is committed to continuous innovation. We leverage the latest technology to improve our platform, making it more efficient, secure, and user-friendly. Our goal is to provide the best possible experience for both hosts and renters, constantly seeking new ways to enhance our services. <br /><br />
                
                <strong>Trust and Security:</strong> Trust is the cornerstone of our platform. We implement robust security measures to protect our users' information and ensure safe transactions. Our verification processes and customer support systems are designed to build and maintain trust between hosts, renters, and SpareLot. <br /><br />
                
                <strong>Sustainability:</strong> We are dedicated to promoting sustainability through the efficient use of space. By encouraging the utilization of existing resources, SpareLot helps reduce the need for new construction and minimizes the environmental impact of traditional storage facilities. <br /><br />
                
                <strong>Accessibility:</strong> Our platform is built to be accessible to everyone. We strive to make storage solutions affordable and available to individuals from all walks of life. Whether you are a homeowner looking to monetize your extra space or someone in need of storage, SpareLot is here to help. <br /><br />
                
                <strong>Customer Focus:</strong> Customer satisfaction is at the heart of everything we do. We listen to our users to continuously improve our platform based on their feedback. <br /><br />
                
                In short, SpareLot is more than just a storage platform; it's a community-driven solution that transforms how we use and think about space. By connecting those with excess space to those in need of storage, we create mutually beneficial opportunities that empower individuals and strengthen communities.
            </MKTypography>
        </Container>
    </>
  )
}

export default AboutSpareLot