import Draft from "app/pages/web/Draft";
import AdaptiveModal from "app/sections/Modal/Adaptive";
import isStandalone from "isStandalone";

const { Modal, Box, Backdrop, Fade, useMediaQuery } = require("@mui/material");
const { default: Listing } = require("app/pages/web/Listing");
const { useState, useRef } = require("react");
const { motion } = require("framer-motion");

const use = (new Date()).getTime()

const ListingModal = ({ listing, listingId, isDraft, host, open, setOpen }) => {
  const isMobile = useMediaQuery('(max-width:991px') || isStandalone()
  const scrollContainerRef = useRef(null);
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <AdaptiveModal
      open={open && isMobile}
      onClose={() => setOpen(false)}
      sideSwipeMobile={{
        customExtension:`viewingListing_${listingId}_${use}`
      }}
      title={isDraft?'Draft':'Listing'}
      parent_sx={{
        borderRadius:0,
      }}
      sx={{
        p:0,
        pb:isDraft*8,
      }}
      maxWidth='100vw'
    >
      {
        isDraft ? 

        <Draft
          customListingId={listingId}
          onClickBack={handleCloseModal}
        />

        :

        <Listing
            customListingInfo={listing}
            customHostInfo={host}
            customListingId={listingId}
            onClickBack={handleCloseModal}
            isDraft={isDraft}
            scrollContainerRef={scrollContainerRef}
        />
      }
    </AdaptiveModal>
  );
};

export default ListingModal;
