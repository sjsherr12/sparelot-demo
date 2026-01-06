import React, { useState, useRef, useEffect, useId } from 'react';
import { Box } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import isStandalone from 'isStandalone';

const CustomBottomSheet = ({
    // Core props
    isOpen,
    onClose,
    detent = 'content-height',
    initialSnap = 0,
    style = {},
    
    // Children
    children,
    borderRadius = '16px 16px 0px 0px',
    maxHeight, // Allow this to be passed in or calculated based on isStandalone
    snapPoints = [],
    
    // Sheet identification
    sheetId, // Optional external ID for the sheet
  }) => {
    // Generate unique ID for this sheet instance
    const internalId = useId();
    const uniqueId = sheetId || internalId;
    
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [contentHeight, setContentHeight] = useState(0);
    const sheetRef = useRef(null);
    const contentRef = useRef(null);
    const maxOverdrag = 200; // Maximum overdrag in pixels
    const dismissThreshold = 0.25; // Percentage of sheet height to trigger dismissal
    
    // Determine maxHeight based on isStandalone if not explicitly provided
    const calculatedMaxHeight = maxHeight || (isStandalone() ? `95dvh` : `85dvh`);
    
    // Track if we've measured the content
    const [measured, setMeasured] = useState(false);
    
    // Measure content height when sheet is opened
    useEffect(() => {
      if (isOpen && contentRef.current && !measured) {
        const height = Math.min(
          contentRef.current.scrollHeight,
          window.innerHeight * (isStandalone() ? 0.95 : 0.85)
        );
        setContentHeight(height);
        setMeasured(true);
      }
      
      if (!isOpen) {
        setMeasured(false);
      }
    }, [isOpen, measured]);
    
    // Calculate sheet size based on detent setting
    const getSheetHeight = () => {
      if (detent === 'content-height') {
        return contentHeight;
      } else if (detent === 'full-height') {
        return window.innerHeight * (isStandalone() ? 0.95 : 0.85);
      } else {
        return parseInt(detent, 10) || window.innerHeight * 0.5;
      }
    };
    
    // Animation spring for the sheet
    const [{ y }, api] = useSpring(() => ({
      y: window.innerHeight,
      config: {
        tension: 300,
        friction: 30,
        mass: 1,
      },
    }));
    
    // Open/close animation
    useEffect(() => {
      if (isOpen) {
        api.start({ y: 0 });
      } else {
        api.start({ y: window.innerHeight });
      }
    }, [isOpen, api]);
    
    // Backdrop animation
    const backdropSpring = useSpring({
      opacity: isOpen ? 1 : 0,
      config: {
        tension: 300,
        friction: 30,
      },
    });

    const backdropOpacity = y.to(
      [0, getSheetHeight()],
      [0.5, 0],
      {clamp:true}
    );
    
    // Touch event handlers with isolation
    const handleTouchStart = (e) => {
      // Only start dragging if we're touching the handle or the top of the sheet
      if (e.target.closest('.handle') || 
          e.target.closest('.sheet-header')) {
        setIsDragging(true);
        setStartY(e.touches[0].clientY);
        setCurrentY(e.touches[0].clientY);
        
        // Stop propagation to prevent affecting other sheets
        e.stopPropagation();
      }
    };
    
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      
      const newY = e.touches[0].clientY;
      setCurrentY(newY);
      
      const deltaY = newY - startY;
      
      // Only allow downward dragging (positive deltaY)
      if (deltaY > 0) {
        // Apply damping effect as we drag further
        const dampedDelta = Math.min(
          deltaY * 0.5, // apply 50% resistance
          maxOverdrag
        );
        
        api.start({ 
          y: dampedDelta,
          immediate: true // Update without animation during drag
        });
      } else if (deltaY < 0) {
        // Allow slight upward movement for bouncy feel
        api.start({ 
          y: Math.max(deltaY * 0.2, -20),
          immediate: true 
        });
      }
      
      // Stop propagation to prevent affecting other sheets
      e.stopPropagation();
    };
    
    const handleTouchEnd = (e) => {
      if (!isDragging) return;
      
      setIsDragging(false);
      
      const deltaY = currentY - startY;
      const sheetHeight = getSheetHeight();
      
      // Close if dragged down past threshold
      if (deltaY > sheetHeight * dismissThreshold) {
        api.start({ 
          y: window.innerHeight,
          onRest: () => onClose()
        });
      } else {
        // Snap back to position
        api.start({ y: 0 });
      }
      
      // Stop propagation to prevent affecting other sheets
      e.stopPropagation();
    };
    
    // Register and deregister global event listeners to prevent issue with multiple sheets
    useEffect(() => {
      // Global handler to check if clicking outside any active area of our sheet
      const handleGlobalClick = (e) => {
        // Only process if our sheet is open
        if (!isOpen || !sheetRef.current) return;
        
        // Check if the click is inside our sheet
        const isInSheet = sheetRef.current.contains(e.target);
        const isInBackdrop = e.target.classList.contains(`backdrop-${uniqueId}`);
        
        // If it's on our backdrop, close our sheet
        if (isInBackdrop) {
          api.start({ 
            y: window.innerHeight,
            onRest: () => onClose()
          });
        }
        
        // If it's outside our sheet and not on our backdrop, do nothing
        // This prevents clicks from passing through to other sheets
      };
      
      // Register global handlers only when sheet is open
      if (isOpen) {
        document.addEventListener('mousedown', handleGlobalClick);
        document.addEventListener('touchstart', handleGlobalClick);
      }
      
      return () => {
        document.removeEventListener('mousedown', handleGlobalClick);
        document.removeEventListener('touchstart', handleGlobalClick);
      };
    }, [isOpen, api, onClose, uniqueId]);
    
    // Prevent scrolling on body when sheet is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);
    
    if (!isOpen && y.get() === window.innerHeight) return null;
    
    return (
      <>
        {/* Full screen blocker div - unique to this sheet instance */}
        {isOpen && (
          <div 
            data-sheet-id={uniqueId}
            className={`sheet-blocker-${uniqueId}`}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'transparent',
              zIndex: 100000, // Increment by 1
              cursor: 'default',
              pointerEvents: 'none' // Let clicks through to the backdrop
            }}
          />
        )}
        
        {/* Backdrop - unique to this sheet instance */}
        <animated.div 
          data-sheet-id={uniqueId}
          className={`backdrop-${uniqueId}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: backdropOpacity.to(opacity => `rgba(0,0,0,${opacity})`),
            zIndex: 100000, // Increment by 2
            ...backdropSpring
          }}
          onClick={(e) => {
            // Make sure this only applies to this specific backdrop
            if (e.target.classList.contains(`backdrop-${uniqueId}`)) {
              api.start({ 
                y: window.innerHeight,
                onRest: () => onClose()
              });
              e.stopPropagation();
            }
          }}
        />
        
        {/* Sheet - unique to this instance */}
        <animated.div
          ref={sheetRef}
          data-sheet-id={uniqueId}
          className={`bottom-sheet-${uniqueId}`}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100000, // Increment by 3 - highest of all
            backgroundColor: '#fff',
            borderRadius: borderRadius,
            maxHeight: calculatedMaxHeight,
            transform: y.to(value => `translateY(${value}px)`),
            boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.15)',
            ...style,
            overflow: 'visible' // Important to allow the extension to be visible
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Drag handle */}
          <Box
            className="handle"
            data-sheet-id={uniqueId}
            sx={{
              width: '40px',
              height: '2px',
              backgroundColor: '#333',
              borderRadius: '16px',
              margin: '12px auto',
              cursor: 'grab',
            }}
          />
          
          {/* Content container */}
          <Box
            ref={contentRef}
            data-sheet-id={uniqueId}
            sx={{
              bgcolor: '#fff',
              position: 'relative', // Create a new stacking context
              zIndex: 1, // Any value works here since it's in its own stacking context
              maxHeight: `calc(${calculatedMaxHeight} - 24px)`,
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: '#ababab #fff',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ababab',
                borderRadius: '4px',
              },
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </Box>
          <div 
            data-sheet-id={uniqueId}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: `-${maxOverdrag}px`, // Position it below the sheet
              height: `${maxOverdrag}px`,
              backgroundColor: '#fff', // Match the sheet background
              zIndex: 1 // Lower z-index within its own stacking context
            }} 
          />
        </animated.div>
      </>
    );
  };
  
  export default CustomBottomSheet;