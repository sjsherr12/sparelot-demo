import Navbar from "app/sections/Navbar";
import colors from "assets/theme/base/colors";
import * as c from "const"
import { help_actions, help_mobile_routes } from "../routes";
import MKTypography from "components/MKTypography";
import { Container } from "@mui/material";
import LinkToArticle from "../LinkToArticle";
import MKBox from "components/MKBox";
import DirectoryHeader from "../../Account/header";
import { Helmet } from "react-helmet-async";

const RentingHelp = () => {

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Corporation",
        "name": "SpareLot",
        "url": "https://sparelot.com",
        "logo": "https://sparelot.com/Images/SpareLotLogo.png",  
        "description": "SpareLot is a storage and parking marketplace that connects renters searching for storage and parking to hosts looking to rent out their unused space.",
        "areaServed": "US",
        "sameAs": [
          "https://www.facebook.com/sparelot",
          "https://www.tiktok.com/@sparelot",
          "https://www.linkedin.com/company/sparelot",
          "https://www.instagram.com/sparelotstorage"
        ]
    };

    const rentingCollectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Help Center Renting - SpareLot",
        "description": "Explore our collection of renting articles, covering essentials, concerns, payments, and operations.",
        "url": "https://sparelot.com/help/renting/",
        "hasPart": [
          {
            "@type": "Article",
            "name": "Renting Essentials",
            "url": "https://sparelot.com/help/renting/rentingessentials/"
          },
          {
            "@type": "Article",
            "name": "Renting Concerns",
            "url": "https://sparelot.com/help/renting/rentingconcerns/"
          },
          {
            "@type": "Article",
            "name": "Renting Fees",
            "url": "https://sparelot.com/help/renting/rentingfees/"
          },
          {
            "@type": "Article",
            "name": "Renter Payments",
            "url": "https://sparelot.com/help/renting/renterpayments/"
          },
          {
            "@type": "Article",
            "name": "Host Interactions",
            "url": "https://sparelot.com/help/renting/hostinteractions/"
          },
          {
            "@type": "Article",
            "name": "Reserving a Space",
            "url": "https://sparelot.com/help/renting/reservespace/"
          },
          {
            "@type": "Article",
            "name": "Accessing Stored Items",
            "url": "https://sparelot.com/help/renting/accessitems/"
          },
          {
            "@type": "Article",
            "name": "Reservation Cancellation (Renters)",
            "url": "https://sparelot.com/help/renting/reservationcancellationrenters/"
          },
          {
            "@type": "Article",
            "name": "Renter Protection",
            "url": "https://sparelot.com/help/renting/renterprotection/"
          }
        ]
    };

    return (
        <>
            <Helmet>
                <title>Renting - SpareLot Help Center</title>
                <meta
                    name="description"
                    content="Get fast answers to questions about renting on SpareLot."
                />
                <meta
                    name="keywords"
                    content="storage, parking, marketplace, rental space, parking spaces, storage solutions, rent parking, rent storage, car parking, vehicle storage, item storage, SpareLot renting, renting on SpareLot, SpareLot renters"
                />
                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(rentingCollectionSchema)}
                </script>
            </Helmet>

            <Container
                sx={{
                    my: 2,
                }}
            >
                <DirectoryHeader
                    title='Renting'
                    parent='Help Center'
                    parentPath='/help/'
                    child='Renting'
                    childPath='/help/renting/'
                />

                <MKTypography
                    variant='h2'
                    sx={{
                        my:2,
                        color:'#000',
                        fontWeight:'bold',
                        fontFamily: "Montserrat, sans serif"
                    }}
                >
                    {"Relevant Articles"}
                </MKTypography>

                <LinkToArticle
                    title={'Renting Essentials'}
                    link={'/help/renting/rentingessentials/'}
                    description={'Discover the user essentials before renting a SpareLot space to ensure a good experience.'}
                />
                <LinkToArticle
                    title={'Renting Concerns'}
                    link={'/help/renting/rentingconcerns/'}
                    description={'Address all renting-related concerns about using SpareLot to find convenient storage and parking.'}
                />
                <LinkToArticle
                    title={'Renting Fees'}
                    link={'/help/renting/rentingfees/'}
                    description={'Learn about the fees associated with renting on SpareLot and how they affect your budget.'}
                />
                <LinkToArticle
                    title={'Renter Payments'}
                    link={'/help/renting/renterpayments/'}
                    description={'Understand how payments work on SpareLot, including payment methods and schedules.'}
                />
                <LinkToArticle
                    title={'Host Interactions'}
                    link={'/help/renting/hostinteractions/'}
                    description={'Guidance on how to communicate effectively with hosts and build positive relationships on SpareLot.'}
                />
                <LinkToArticle
                    title={'Reserving a Space'}
                    link={'/help/renting/reservespace/'}
                    description={'Step-by-step instructions on how to reserve a storage or parking space on SpareLot.'}
                />
                <LinkToArticle
                    title={'Accessing Stored Items'}
                    link={'/help/renting/accessitems/'}
                    description={'Learn how to access your stored items, including the steps to coordinate with hosts on SpareLot.'}
                />
                <LinkToArticle
                    title={'Reservation Cancellation (Renters)'}
                    link={'/help/renting/reservationcancellationrenters/'}
                    description={'Understand the policies and procedures for canceling a reservation as a renter on SpareLot.'}
                />
                <LinkToArticle
                    title={'Renter Protection'}
                    link={'/help/renting/renterprotection/'}
                    description={'Discover the protection plans and measures in place to safeguard renters on SpareLot.'}
                />
            </Container>
        </>
    )
}

export default RentingHelp;