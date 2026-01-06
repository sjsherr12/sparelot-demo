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
    'Becoming an Elite Host',
    'How It Works',
    'Elite Host Advantages'
];

const EliteHost = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="Hosting"
                childPath="/help/hosting/"
                secondChild="Elite Host Program"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Elite Host Program
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
                Becoming an Elite Host
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
                The Elite Host Program at SpareLot is designed to recognize and reward our top-performing hosts. Becoming an Elite Host involves meeting specific criteria that ensure the highest quality of service and reliability for renters. To qualify for the Elite Host Program, hosts must meet the following requirements:
                <ul>
                    <li><strong>Listing Quality:</strong>
                        <ul>
                            <li>Verify Account: Hosts must verify their account to ensure authenticity and trustworthiness.</li>
                            <li>Add Profile Picture: A clear and professional profile picture helps build trust with potential renters.</li>
                            <li>Upload Photos: High-quality photos of the space should be uploaded to provide a clear and accurate representation.</li>
                            <li>Short Biography: A brief biography allows renters to know more about the host and their experience.</li>
                            <li>Space Description: A detailed description of the space, including any amenities and features, helps renters make informed decisions.</li>
                        </ul>
                    </li>
                    <li><strong>Responsiveness:</strong>
                        <ul>
                            <li>Average Message Response Time: Hosts must maintain an average message response time of under 1 hour to ensure prompt communication with renters.</li>
                        </ul>
                    </li>
                    <li><strong>Approval Rate:</strong>
                        <ul>
                            <li>Rental Request Approval: Hosts must approve at least 80% of the rental requests they receive.</li>
                        </ul>
                    </li>
                    <li><strong>Reservations:</strong>
                        <ul>
                            <li>Recent Activity: Hosts need to have at least one reservation within the last two months to demonstrate ongoing engagement with the platform.</li>
                        </ul>
                    </li>
                    <li><strong>Rating:</strong>
                        <ul>
                            <li>Review Rating Average: Hosts must maintain an average review rating of 4 stars or higher to qualify for the Elite Host status.</li>
                        </ul>
                    </li>
                </ul>
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                How It Works
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Once a host meets all the requirements, they will be automatically awarded the elite host status and enjoy the benefits of an elite host. Additionally, the Elite Host status is reviewed periodically to ensure hosts continue to meet the high standards set by SpareLot. Hosts who fail to maintain these standards may lose their Elite Host status. 
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Elite Host Advantages
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
                Being an Elite Host comes with several benefits designed to enhance visibility, attract more renters, and provide additional tools for managing and promoting listings:
                <ul>
                    <li><strong>Elite Host Badge:</strong> The Elite Host badge is a mark of excellence and reliability, helping to attract more renters.</li>
                    <li><strong>Higher Search Rankings:</strong> Elite Hosts benefit from higher search rankings, making their listings appear more frequently in search results.</li>
                    <li><strong>More Search Appearances:</strong> Enhanced visibility leads to more search appearances, increasing the chances of securing reservations.</li>
                    <li><strong>Additional Tools:</strong> Elite Hosts have access to advanced tools that help manage and promote their listings more effectively, ensuring they can maximize their earnings and maintain high standards of service.</li>
                </ul> <br></br>
                By striving to become an Elite Host, you can significantly enhance your presence on SpareLot, attract more renters, and enjoy the rewards of being a top performer on the platform.
            </MKTypography>
        </Container>
    </>
  )
}

export default EliteHost