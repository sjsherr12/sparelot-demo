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
    // 'Referral Program',
    'Affiliate Program',
    'General Marketing Strategies'
];

const SpareLotMarketing = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="SpareLot"
                childPath="/help/sparelot/"
                secondChild="SpareLot Marketing"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                SpareLot Marketing
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
            {/* <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Referral Program
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
                Our referral program is designed to reward both current users and new members for helping grow the SpareLot community. By sharing your unique referral link with friends, family, or colleagues, you can earn rewards when they sign up and complete their first reservation. This program benefits both hosts and renters, as it helps bring more spaces and potential renters to the platform.
                <ol style={{marginLeft: '50px'}}>
                    <li><strong>Get Your Referral Link:</strong> Log in to your SpareLot account and navigate to the referral section to find your unique link.</li>
                    <li><strong>Share the Link:</strong> Share your link via email, social media, or any other preferred method.</li>
                    <li><strong>Earn Rewards:</strong> When a new user signs up through your link and completes a reservation, you both earn rewards. These can be in the form of discounts, credits, or other benefits.</li>
                </ol>
            </MKTypography> */}
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Affiliate Program
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
                SpareLot's affiliate program allows businesses, content creators, and other organizations to partner with us and earn commissions for driving traffic and conversions to the platform. This program is ideal for those with an audience interested in storage solutions, real estate, or related services. Please find our Affiliates and Partners page for more information. To become a SpareLot affiliate, follow the steps below. 
                <ol style={{marginLeft: '50px'}}>
                    <li><strong>Apply to Become an Affiliate:</strong> Fill out the application form on our website and provide details about your platform and audience.</li>
                    <li><strong>Receive Your Affiliate Links:</strong> Once approved, you'll receive unique affiliate links and marketing materials to promote SpareLot.</li>
                    <li><strong>Promote SpareLot:</strong> Share your affiliate links through your website, blog, social media, or other channels.</li>
                    <li><strong>Earn Commissions:</strong> Earn a commission for every user who signs up and completes a reservation through your affiliate link.</li>
                </ol>
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                General Marketing Strategies
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
                SpareLot employs various marketing strategies to increase brand awareness and attract new users. Our marketing efforts focus on both digital and traditional channels to reach a wide audience.
                <ul style={{marginLeft: '50px'}}>
                    <li><strong>Digital Marketing:</strong>
                        <ul style={{marginLeft: '40px'}}>
                            <li><strong>Social Media:</strong> We maintain active profiles on platforms like Facebook, Instagram, and Tiktok to engage with our community, share updates, and run targeted advertising campaigns.</li>
                            <li><strong>Content Marketing:</strong> Our blog and resource center provide valuable information on storage solutions, tips for hosts and renters, and updates about SpareLot.</li>
                            <li><strong>Email Marketing:</strong> We send regular newsletters and promotional emails to keep our users informed and engaged.</li>
                            <li><strong>SEO:</strong> By optimizing our website content for search engines, we aim to attract organic traffic from users searching for storage solutions.</li>
                        </ul>
                    </li>
                    <li><strong>Traditional Marketing:</strong>
                        <ul style={{marginLeft: '40px'}}>
                            <li><strong>Local Advertising:</strong> We advertise in local newspapers, magazines, and community bulletin boards to reach potential users in specific regions.</li>
                            <li><strong>Events and Sponsorships:</strong> We participate in and sponsor local events, trade shows, and community gatherings to raise awareness about SpareLot.</li>
                            <li><strong>Flyers and Brochures:</strong> We distribute printed materials in high-traffic areas and through partnerships with local businesses.</li>
                        </ul>
                    </li>
                </ul> <br></br>
                By combining these strategies, we aim to create a strong presence both online and offline, ensuring that SpareLot continues to grow and serve our community effectively.
            </MKTypography>
        </Container>
    </>
  )
}

export default SpareLotMarketing