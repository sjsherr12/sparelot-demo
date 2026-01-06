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

const FAQHelp = () => {

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

    const faqCollectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Help Center FAQs - SpareLot",
        "description": "Explore our collection of frequently asked questions to learn more about SpareLot's services, including listing spaces, payment processing, and account management.",
        "url": "https://sparelot.com/help/faqs/",
        "hasPart": [
          {
            "@type": "Article",
            "name": "About SpareLot",
            "url": "https://sparelot.com/help/faqs/aboutsparelot/"
          },
          {
            "@type": "Article",
            "name": "Renting Essentials",
            "url": "https://sparelot.com/help/faqs/rentingessentials/"
          },
          {
            "@type": "Article",
            "name": "Hosting Essentials",
            "url": "https://sparelot.com/help/faqs/hostingessentials/"
          },
          {
            "@type": "Article",
            "name": "Payment Basics",
            "url": "https://sparelot.com/help/faqs/paymentbasics/"
          },
          {
            "@type": "Article",
            "name": "Account Setup",
            "url": "https://sparelot.com/help/faqs/accountsetup/"
          },
          {
            "@type": "Article",
            "name": "Where SpareLot Offers Storage",
            "url": "https://sparelot.com/help/faqs/storagelocations/"
          },
          {
            "@type": "Article",
            "name": "Messaging on SpareLot",
            "url": "https://sparelot.com/help/faqs/messaging/"
          },
          {
            "@type": "Article",
            "name": "SpareLot Fees",
            "url": "https://sparelot.com/help/faqs/sparelotfees/"
          },
          {
            "@type": "Article",
            "name": "Accessing Stored Items",
            "url": "https://sparelot.com/help/faqs/itemaccess/"
          },
          {
            "@type": "Article",
            "name": "Hosting Concerns",
            "url": "https://sparelot.com/help/faqs/hostingconcerns/"
          },
          {
            "@type": "Article",
            "name": "Renting Concerns",
            "url": "https://sparelot.com/help/faqs/rentingconcerns/"
          }
        ]
    };
      
    return (
        <>
            <Helmet>
                <title>FAQs - SpareLot Help Center</title>
                <meta
                    name="description"
                    content="Get fast answers to your most frequently asked questions—both renters and hosts."
                />
                <meta
                    name="keywords"
                    content="storage, parking, marketplace, rental space, parking spaces, storage solutions, rent parking, rent storage, car parking, vehicle storage, item storage, SpareLot FAQs, frequently asked questions"
                />
                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(faqCollectionSchema)}
                </script>
            </Helmet>

            <Container
                sx={{
                    my: 2,
                }}
            >
                <DirectoryHeader
                    title='FAQs'
                    parent='Help Center'
                    parentPath='/help/'
                    child='FAQs'
                    childPath='/help/faqs/'
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
                    link={'/help/faqs/aboutsparelot/'}
                    description={"Learn about what SpareLot is as a platform, how it works, and the values that drive our business."}
                />
                <LinkToArticle
                    title={'Renting Essentials'}
                    link={'/help/faqs/rentingessentials/'}
                    description={'Discover the user essentials before renting a SpareLot space to ensure a good experience.'}
                />
                <LinkToArticle
                    title={'Hosting Essentials'}
                    link={'/help/faqs/hostingessentials/'}
                    description={'Discover the host essentials before hosting a SpareLot space to ensure a good experience.'}
                />
                <LinkToArticle
                    title={'Payment Basics'}
                    link={'/help/faqs/paymentbasics/'}
                    description={'Find out how payments work on SpareLot and how to connect your payment method as a host or a renter.'}
                />
                <LinkToArticle
                    title={'Account Setup'}
                    link={'/help/faqs/accountsetup/'}
                    description={'See how you can create an account on SpareLot and verify it using your email.'}
                />
                <LinkToArticle
                    title={'Where SpareLot Offers Storage'}
                    link={'/help/faqs/storagelocations/'}
                    description={'Find out where SpareLot offers storage.'}
                />
                <LinkToArticle
                    title={'Messaging on SpareLot'}
                    link={'/help/faqs/messaging/'}
                    description={'See how you can contact hosts or renters to keep in contact and find new reservations.'}
                />
                <LinkToArticle
                    title={'SpareLot Fees'}
                    link={'/help/faqs/sparelotfees/'}
                    description={'Understand the fees that SpareLot takes and why we take them.'}
                />
                <LinkToArticle
                    title={'Accessing Stored Items'}
                    link={'/help/faqs/itemaccess/'}
                    description={'Learn how to access your stored items, including the steps to coordinate with hosts on SpareLot.'}
                />
                <LinkToArticle
                    title={'Hosting Concerns'}
                    link={'/help/faqs/hostingconcerns/'}
                    description={'Address all hosting-related concerns about using SpareLot to rent out your extra space.'}
                />
                <LinkToArticle
                    title={'Renting Concerns'}
                    link={'/help/faqs/rentingconcerns/'}
                    description={'Address all renting-related concerns about using SpareLot to find convenient storage and parking.'}
                />
            </Container>
        </>
    )
}

export default FAQHelp;