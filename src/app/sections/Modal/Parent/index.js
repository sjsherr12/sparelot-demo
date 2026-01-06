import React, {useEffect, useRef, useState, useReducer} from 'react';
import { Modal, Box, Tabs, Tab, IconButton, Fade, Drawer, SwipeableDrawer, useMediaQuery, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import { useModal } from './context'; // Adjust the path accordingly
import colors from 'assets/theme/base/colors';
import { useTheme } from '@emotion/react';
import InterchangeableSwipeable from 'app/sections/Swipeable';
import AdaptiveModal from '../Adaptive';

const ParentModal = () => {
  const { isOpen, modalContent, openModal, closeModal } = useModal();
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    openModal();
  }, [])


  if (modalContent?.children?.length) {
    return (
        <AdaptiveModal
          maxWidth={500}
          open={isOpen}
          onClose={closeModal}
          title={modalContent?.children[activeTab]?.title}
          noSwipedownMobile
          header_sx={{
            flexDirection:{xs:'row-reverse',lg:'row'}
          }}
        >
          {/* Content Section */}
          <MKBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {modalContent.children.length > 1 && (
              <Tabs value={activeTab} onChange={handleTabChange}>
                {modalContent.children.map((child, index) => (
                  <Tab
                    key={index}
                    label={child.component[1]}
                    sx={{ fontWeight: 'bold',}}
                  />
                ))}
              </Tabs>
            )}

            {/* CHILDREN RENDER */}
            <MKBox
              style={{
                zIndex:1,
                flexDirection: 'column',
                display: 'flex',
                overflowY: 'auto',
              }}
              sx={{ mt: 3, mb:2, px: 1.5 }}
            >
              {modalContent?.children[activeTab]?.component[0]()}
            </MKBox>
            {/* CHILDREN RENDER */}
          </MKBox>
        </AdaptiveModal>
    );
  }
};

export default ParentModal;