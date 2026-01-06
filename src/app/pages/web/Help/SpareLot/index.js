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

const SpareLotHelp = () => {

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

    const sparelotCollectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Help Center Company - SpareLot",
        "description": "Get fast answers to questions about SpareLot as a platform, what we do, and how we operate.",
        "url": "https://sparelot.com/help/sparelot/",
        "hasPart": [
          {
            "@type": "Article",
            "name": "About SpareLot",
            "url": "https://sparelot.com/help/sparelot/aboutsparelot/"
          },
          {
            "@type": "Article",
            "name": "Community Guidelines",
            "url": "https://sparelot.com/help/sparelot/communityguidelines/"
          },
          {
            "@type": "Article",
            "name": "How Does SpareLot Make Money",
            "url": "https://sparelot.com/help/sparelot/makemoney/"
          },
          {
            "@type": "Article",
            "name": "SpareLot Marketing",
            "url": "https://sparelot.com/help/sparelot/sparelotmarketing/"
          }
        ]
    };

    return (
        <>
            <Helmet>
                <title>SpareLot - SpareLot Help Center</title>
                <meta
                    name="description"
                    content="Get fast answers to questions about SpareLot as a platform, what we do, and how we operate."
                />
                <meta
                    name="keywords"
                    content="storage, parking, marketplace, rental space, parking spaces, storage solutions, rent parking, rent storage, car parking, vehicle storage, item storage, SpareLot, company, information"
                />
                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(sparelotCollectionSchema)}
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
                    title={'About SpareLot'}
                    link={'/help/sparelot/aboutsparelot/'}
                    description={'Learn about what SpareLot is as a platform, how it works, and the values that drive our business.'}
                />
                <LinkToArticle
                    title={'Community Guidelines'}
                    link={'/help/sparelot/communityguidelines/'}
                    description={'Explore the community guidelines for SpareLot and understand the standards we expect from all users.'}
                />
                <LinkToArticle
                    title={'How Does SpareLot Make Money'}
                    link={'/help/sparelot/makemoney/'}
                    description={'Discover the various ways SpareLot generates revenue and how our pricing model works.'}
                />
                <LinkToArticle
                    title={'SpareLot Marketing'}
                    link={'/help/sparelot/sparelotmarketing/'}
                    description={'Get insights into SpareLot’s marketing strategies and how we promote our platform.'}
                />
            </Container>
        </>
    )
}

export default SpareLotHelp;