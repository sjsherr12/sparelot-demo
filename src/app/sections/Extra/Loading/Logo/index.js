import React, {useState, useEffect} from 'react';
import { Container } from '@mui/material';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import { styled, keyframes } from '@mui/system';

import { company_logo } from 'const';
import colors from 'assets/theme/base/colors';

// Styled components
const FullScreenContainer = styled(MKBox)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100dvh',
    textAlign: 'center',
    flexDirection: 'column',
    transition: 'opacity 0.5s ease-in-out',
    backgroundColor: colors.background.theme
}));

const Logo = styled('img')({
    maxWidth: '100%',
    height: 'auto',
});

const LogoLoadingScreen = ({timeout_length_ms, fadeout_length_ms}) => {
    const [showLoading, setShowLoading] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
        setTimeout(() => setShowLoading(false), fadeout_length_ms); // Delay must match animation duration
    }, timeout_length_ms); // Time before fade out starts

        return () => clearTimeout(timer);
    }, []);

    if (!showLoading) {
        return null;
    }

    return (
        <FullScreenContainer>
            <MKBox>
                <Logo src={company_logo} alt="Logo" />
                <MKTypography variant="h6" mt={2}>
                Loading, please wait...
                </MKTypography>
            </MKBox>
        </FullScreenContainer>
    );
};

export default LogoLoadingScreen;