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

const SecurityHelp = () => {

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

    const securityCollectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Help Center Security - SpareLot",
        "description": "Get fast answers to questions regarding platform and account security.",
        "url": "https://sparelot.com/help/security/",
        "hasPart": [
          {
            "@type": "Article",
            "name": "Renter Protection",
            "url": "https://sparelot.com/help/security/renterprotection/"
          },
          {
            "@type": "Article",
            "name": "Host Protection",
            "url": "https://sparelot.com/help/security/hostprotection/"
          },
          {
            "@type": "Article",
            "name": "Payment Basics",
            "url": "https://sparelot.com/help/security/paymentbasics/"
          },
          {
            "@type": "Article",
            "name": "Community Violations",
            "url": "https://sparelot.com/help/security/communityviolations/"
          }
        ]
    };

    return (
        <>
            <Helmet>
                <title>Security - SpareLot Help Center</title>
                <meta
                    name="description"
                    content="Get fast answers to questions regarding platform and account security."
                />
                <meta
                    name="keywords"
                    content="storage, parking, marketplace, rental space, parking spaces, storage solutions, rent parking, rent storage, car parking, vehicle storage, item storage, security, SpareLot security, security questions"
                />
                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(securityCollectionSchema)}
                </script>
            </Helmet>

            <Container
                sx={{
                    my: 2,
                }}
            >
                <DirectoryHeader
                    title='Security'
                    parent='Help Center'
                    parentPath='/help/'
                    child='Security'
                    childPath='/help/security/'
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
                    title={'Renter Protection'}
                    link={'/help/security/renterprotection/'}
                    description={"Discover the protection plans and measures in place to safeguard renters on SpareLot."}
                />
                <LinkToArticle
                    title={'Host Protection'}
                    link={'/help/security/hostprotection/'}
                    description={"Learn about the protection plans and measures in place to safeguard hosts on SpareLot."}
                />
                <LinkToArticle
                    title={'Payment Basics'}
                    link={'/help/security/paymentbasics/'}
                    description={"Find out how payments work on SpareLot and how to connect your payment method as a host or a renter."}
                />
                <LinkToArticle
                    title={'Community Violations'}
                    link={'/help/security/communityviolations/'}
                    description={'Review the guidelines on community behavior and learn how to report any violations within the SpareLot platform.'}
                />
            </Container>
        </>
    )
}

export default SecurityHelp;