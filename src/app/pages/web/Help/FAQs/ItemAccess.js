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
    'Access Frequency',
    'Host Terms',
    'Accessing Stored Items'
];

const ItemAccess = () => {
  return (
    <>
        <Container sx={{mb:'50px'}}>
            <DirectoryHeader
                parent="Help"
                parentPath="/help/"
                child="FAQs"
                childPath="/help/faqs/"
                secondChild="Accessing Stored Items"
            />
            <MKTypography variant='h2' sx={{
                mt: '20px',
                color: '#000',
                fontWeight: '750',
                fontFamily: "Montserrat, sans serif",
                fontSize: '50px'
            }}>
                Accessing Stored Items
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
                Access Frequency
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                When renting storage space on SpareLot, it's important to understand how frequently you can access your stored items. Access frequency can vary depending on the type of space and the agreement made with the host. Some hosts may allow 24/7 access, while others may have specific hours or days when access is permitted. Always check the access frequency details in the listing to ensure it meets your needs before making a reservation.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Host Terms
            </MKTypography>
            <MKTypography variant='body1' sx={{
                mt: '10px',
                color: '#464647',
                fontWeight: '520',
                fontFamily: "Montserrat, sans serif",
                fontSize: '19px',
            }}>
                Before renting a space, review the host’s terms and conditions regarding access to your stored items. These terms will outline any specific rules or restrictions the host has set. For example, the host will have designated hours when you can access the storage space. Furthermore, a host may require that a renter provide advance notice to the host before accessing their items. Understanding these terms will help you plan your visits and avoid any misunderstandings with the host.
            </MKTypography>
            <MKTypography sx={{
                mt: '35px',
                color: '#000',
                fontWeight: '700',
                fontFamily: "Montserrat, sans serif",
                fontSize: '32px'
            }}>
                Accessing Stored Items
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
                    marginBottom: '5px', // Add space between list items
                }
            }}>
                Once you have confirmed the access terms and frequency, accessing your stored items should be straightforward. Here’s how to ensure a smooth process:
                <ul>
                    <li><strong>Contact the Host:</strong> Before heading to the storage location, contact the host to confirm your visit and any specific instructions they may have.</li>
                    <li><strong>Bring Identification:</strong> Always carry a valid ID to verify your identity if required.</li>
                    <li><strong>Follow Instructions:</strong> Adhere to any instructions provided by the host, such as where to park or how to enter the facility.</li>
                    <li><strong>Respect the Space:</strong> Be mindful of the host’s property and follow any rules they have set to maintain a good relationship.</li>
                </ul> <br></br>
                By understanding access frequency, checking host terms, and following proper procedures, you can ensure a great experience when accessing your stored items on SpareLot.
            </MKTypography>
        </Container>
    </>
  )
}

export default ItemAccess