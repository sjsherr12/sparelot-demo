import { ArrowForwardIos } from "@mui/icons-material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import isStandalone from "isStandalone";
import { useNavigate } from "react-router-dom";

const DirectoryHeader = ({ title, parent, parentPath, child, childPath, secondChild = null, sx}) => {
    const navigate = useNavigate();

    if (isStandalone()) {
        return <></>
    }

    return (
        <>
            <MKBox sx={{ my:2, }}>
                <MKBox
                    sx={{
                        display: 'flex',
                        gap: 1,
                        fontSize: 13,
                        ...sx,
                    }}
                >
                    {parent && (
                        <>
                            <MKTypography
                                sx={{
                                    color: '#6c6b6b',
                                    fontWeight: '640',
                                    fontFamily: "Montserrat, sans serif",
                                    '&:hover': {
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                    },
                                }}
                                onClick={() => navigate(parentPath)}
                            >
                                {parent}
                            </MKTypography>
                        </>
                    )}

                    {child && (
                        <>
                            <ArrowForwardIos
                                fontSize='inherit'
                                sx={{ mt: 1.25, color:'#6c6b6b' }}
                            />
                            <MKTypography
                                sx={{
                                    color: '#6c6b6b',
                                    fontWeight: '640',
                                    fontFamily: "Montserrat, sans serif",
                                    '&:hover': {
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                    },
                                }}
                                onClick={() => navigate(childPath)}
                            >
                                {child}
                            </MKTypography>
                        </>
                    )}

                    {secondChild && (
                        <>
                            <ArrowForwardIos
                                fontSize='inherit'
                                sx={{ mt: 1.25, color:'#6c6b6b' }}
                            />
                            <MKTypography
                                sx={{
                                    color: '#929191',
                                    fontWeight: '600',
                                    fontFamily: "Montserrat, sans serif",
                                }}
                            >
                                {secondChild}
                            </MKTypography>
                        </>
                    )}
                </MKBox>

                <MKTypography
                    variant='h2'
                    sx={{
                        my: 1,
                        color: '#464646',
                        fontWeight: 'bold',
                        fontFamily: "Montserrat, sans serif"
                    }}
                >
                    {title}
                </MKTypography>
            </MKBox>
        </>
    );
}

export default DirectoryHeader;
