import React, { useEffect, useRef } from 'react';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import { useModal } from 'app/sections/Modal/Parent/context';
import { useNavigate, useLocation } from 'react-router-dom';
import colors from 'assets/theme/base/colors';
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  height: '75px',
  maxHeight: '75px',
  width: '100%',
  backgroundColor: '#fff',
  zIndex: 10000,
  borderTop: '1px solid #ededed',
  padding: '10px 8px',
}));

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  minWidth: '40px',
  padding: '6px 0',
  borderRadius: '10px',
  '&.Mui-selected': {
    color: '#2e89ff',
  },
  '& .MuiBottomNavigationAction-label': {
    marginTop: '4px',
    fontSize: '10px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 650,
  },
  '&:active': {
    transform: 'scale(0.8)',
    transition: 'transform 0.05s ease-in-out',
  },
  transition: 'transform .25s ease-in-out',
  WebkitTapHighlightColor: 'transparent',
}));

const FooterOptions = ({ tabs }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useModal();
  const { user } = useUserAuthState();

  const currentFullPath = location.pathname + location.search;

  // Memory of last visited URL per tab base (includes search parameters)
  const lastVisitedRef = useRef({});

  useEffect(() => {
    const currentTab = tabs.find(tab =>
      location.pathname.startsWith(tab.base || tab.route)
    );
    if (currentTab) {
      lastVisitedRef.current[currentTab.base] = currentFullPath;
    }
  }, [currentFullPath, location.pathname, tabs]);

  const findActiveTabIndex = () => {
    if (location.pathname === '/') {
      const homeTabIndex = tabs.findIndex(tab => tab.route === '/');
      return homeTabIndex !== -1 ? homeTabIndex : -1;
    }

    const activeTabIndex = tabs.findIndex(tab => {
      return location.pathname.startsWith(tab.base);
    });

    return activeTabIndex !== -1 ? activeTabIndex : -1;
  };

  const activeTabIndex = findActiveTabIndex();

  const handleChange = (event, newValue) => {
    const selectedTab = tabs[newValue];

    if (user !== null && selectedTab.loggedIn) {
      navigate(selectedTab.loggedInPage);
      return;
    }

    if (selectedTab.modalTitle && selectedTab.modalChildren && selectedTab.modalCondition) {
      openModal(selectedTab.modalTitle, selectedTab.modalChildren);
    } else {
      const lastPath = lastVisitedRef.current[selectedTab.base];
      navigate(lastPath || selectedTab.base || selectedTab.route);
    }
  };

  return (
    <StyledBottomNavigation
      value={activeTabIndex}
      onChange={handleChange}
      showLabels
    >
      {tabs.map((tab, index) => {
        const isActive = index === activeTabIndex;
        const Icon = isActive ? tab.activeIcon : tab.baseIcon;

        return (
          <StyledBottomNavigationAction
            key={index}
            label={tab.name}
            icon={
              <Icon
                style={{
                  height: '30px',
                  width: 'auto',
                  fontWeight: 100,
                  color: isActive ? '#2e89ff' : '#737373',
                }}
              />
            }
            sx={{
              color: isActive ? '#2e89ff' : '#737373',
            }}
          />
        );
      })}
    </StyledBottomNavigation>
  );
};

export default FooterOptions;
