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

const AccountHelp = () => {
    return (
        <>
            <Helmet>
                <title>Account - SpareLot Help Center</title>
                <meta
                    name="description"
                    content="Get fast answers to questions regarding your SpareLot account."
                />
            </Helmet>

            <Container
                sx={{
                    my: 2,
                }}
            >
                <DirectoryHeader
                    title='Account'
                    parent='Help Center'
                    parentPath='/help/'
                    child='Account'
                    childPath='/help/account/'
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
                    title={'Account Setup'}
                    link={'/help/account/accountsetup/'}
                    description={'See how you can create an account on SpareLot and verify it using your email.'}
                />
                <LinkToArticle
                    title={'Account Deletion'}
                    link={'/help/account/accountdeletion/'}
                    description={'Learn how to delete your SpareLot account and what steps are involved in the process.'}
                />
                <LinkToArticle
                    title={'Account Verification'}
                    link={'/help/account/accountverification/'}
                    description={'Understand the process for verifying your SpareLot account to ensure its security.'}
                />
                <LinkToArticle
                    title={'Account Updates'}
                    link={'/help/account/accountupdates/'}
                    description={'Find out how to update your account information, including your email address and payment details.'}
                />
            </Container>
        </>
    )
}

export default AccountHelp;