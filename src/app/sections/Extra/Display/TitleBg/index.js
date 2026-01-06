import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import { Container, Typography } from "@mui/material";
import colors from "assets/theme/base/colors";

const TitleBackground = ({title, imageUrl, AboveTitleContent, BelowTitleContent, desktopContentHeight, subtitle}) => {
    return (
        <MKBox
            sx={{
                position: "relative",
                height: { xs: `calc(75dvh - 82px)`, lg: `${desktopContentHeight}px` },
                backgroundImage: `url(${imageUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                '::before': {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.18 )", // Adjust the opacity to your preference
                    zIndex: 1,
                }
            }}
        >
            <Container
                sx={{
                    textAlign: "center",
                    justifyContent: 'center',
                    alignItems: "center",
                    display: 'flex',
                    zIndex: 2, // Ensure the content is above the overlay
                }}
            >
                <MKBox
                    sx={{
                        width: { xs: '100%', md: '80%' },
                    }}
                >
                    {AboveTitleContent && <AboveTitleContent />}
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight:650,
                            fontSize: { xs: '36px', lg: '3em' },
                            color: "#ffffff",
                            mb: subtitle ? 3 : 6
                        }}
                    >
                        {title}
                    </Typography>
                    {subtitle && 
                        <Typography
                            variant='h2'
                            sx={{
                                mb:{xs:6, md:8},
                                color: '#fff',
                                fontWeight:500,
                                fontSize:{xs:'20px', md:'32px'}
                            }}
                        >
                            {subtitle}
                        </Typography>
                    }

                    {BelowTitleContent && <BelowTitleContent />}
                </MKBox>
            </Container>
        </MKBox>
    )
}

export default TitleBackground;