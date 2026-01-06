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

const HostingHelp = () => {

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

    const hostingCollectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Help Center Hosting - SpareLot",
        "description": "Explore our collection of hosting articles, covering essentials, concerns, standards, and practices.",
        "url": "https://sparelot.com/help/hosting/",
        "hasPart": [
          {
            "@type": "Article",
            "name": "Hosting Essentials",
            "url": "https://sparelot.com/help/hosting/hostingessentials/"
          },
          {
            "@type": "Article",
            "name": "Hosting Concerns",
            "url": "https://sparelot.com/help/hosting/hostingconcerns/"
          },
          {
            "@type": "Article",
            "name": "Hosting Fees",
            "url": "https://sparelot.com/help/hosting/hostingfees/"
          },
          {
            "@type": "Article",
            "name": "Hosting Payments",
            "url": "https://sparelot.com/help/hosting/hostingpayments/"
          },
          {
            "@type": "Article",
            "name": "Host Eligibility",
            "url": "https://sparelot.com/help/hosting/hosteligibility/"
          },
          {
            "@type": "Article",
            "name": "Host Standards",
            "url": "https://sparelot.com/help/hosting/hoststandards/"
          },
          {
            "@type": "Article",
            "name": "Maximizing Your Earnings",
            "url": "https://sparelot.com/help/hosting/maxearnings/"
          },
          {
            "@type": "Article",
            "name": "Creating a Listing",
            "url": "https://sparelot.com/help/hosting/createlisting/"
          },
          {
            "@type": "Article",
            "name": "Managing a Listing",
            "url": "https://sparelot.com/help/hosting/managelisting/"
          },
          {
            "@type": "Article",
            "name": "Interacting with Renters",
            "url": "https://sparelot.com/help/hosting/interactrenters/"
          },
          {
            "@type": "Article",
            "name": "Reservation Cancellation (Hosts)",
            "url": "https://sparelot.com/help/hosting/reservationcancellationhosts/"
          },
          {
            "@type": "Article",
            "name": "Host Protection",
            "url": "https://sparelot.com/help/hosting/hostprotection/"
          }
        ]
    };

    return (
        <>
            <Helmet>
                <title>Hosting - SpareLot Help Center</title>
                <meta
                    name="description"
                    content="Get fast answers to questions about hosting on SpareLot."
                />
                <meta
                    name="keywords"
                    content="storage, parking, marketplace, rental space, parking spaces, storage solutions, rent parking, rent storage, car parking, vehicle storage, item storage, SpareLot hosting, host questions, hosting on SpareLot"
                />
                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(hostingCollectionSchema)}
                </script>
            </Helmet>

            <Container
                sx={{
                    my: 2,
                }}
            >
                <DirectoryHeader
                    title='Hosting'
                    parent='Help Center'
                    parentPath='/help/'
                    child='Hosting'
                    childPath='/help/hosting/'
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
                    title={'Hosting Essentials'}
                    link={'/help/hosting/hostingessentials/'}
                    description={'Discover the host essentials before hosting a SpareLot space to ensure a good experience.'}
                />
                <LinkToArticle
                    title={'Hosting Concerns'}
                    link={'/help/hosting/hostingconcerns/'}
                    description={'Address all hosting-related concerns about using SpareLot to rent out your extra space.'}
                />
                <LinkToArticle
                    title={'Hosting Fees'}
                    link={'/help/hosting/hostingfees/'}
                    description={'Learn about the fees associated with hosting on SpareLot and how they impact your earnings.'}
                />
                <LinkToArticle
                    title={'Hosting Payments'}
                    link={'/help/hosting/hostingpayments/'}
                    description={'Understand how payments work on SpareLot, including payout schedules and payment methods.'}
                />
                <LinkToArticle
                    title={'Host Eligibility'}
                    link={'/help/hosting/hosteligibility/'}
                    description={'Find out the requirements and qualifications needed to become a host on SpareLot.'}
                />
                <LinkToArticle
                    title={'Host Standards'}
                    link={'/help/hosting/hoststandards/'}
                    description={'Explore the quality standards and expectations that SpareLot hosts must adhere to.'}
                />
                <LinkToArticle
                    title={'Maximizing Your Earnings'}
                    link={'/help/hosting/maxearnings/'}
                    description={'Get tips and strategies to optimize your space and increase your earnings as a SpareLot host.'}
                />
                <LinkToArticle
                    title={'Creating a Listing'}
                    link={'/help/hosting/createlisting/'}
                    description={'Step-by-step guide on how to create an effective and appealing listing on SpareLot.'}
                />
                <LinkToArticle
                    title={'Managing a Listing'}
                    link={'/help/hosting/managelisting/'}
                    description={'Learn how to efficiently manage your SpareLot listing, from updates to responding to inquiries.'}
                />
                <LinkToArticle
                    title={'Interacting with Renters'}
                    link={'/help/hosting/interactrenters/'}
                    description={'Best practices for communicating with renters and building positive relationships on SpareLot.'}
                />
                <LinkToArticle
                    title={'Reservation Cancellation (Hosts)'}
                    link={'/help/hosting/reservationcancellationhosts/'}
                    description={'Understand the process and policies for canceling a reservation as a host on SpareLot.'}
                />
                <LinkToArticle
                    title={'Host Protection'}
                    link={'/help/hosting/hostprotection/'}
                    description={'Learn about the protection plans and measures in place to safeguard hosts on SpareLot.'}
                />
                {/* <LinkToArticle
                    title={'Elite Host Program'}
                    link={'/help/hosting/elitehost/'}
                    description={'Discover the benefits and criteria for joining SpareLot\'s Elite Host program.'}
                /> */}
            </Container>
        </>
    )
}

export default HostingHelp;