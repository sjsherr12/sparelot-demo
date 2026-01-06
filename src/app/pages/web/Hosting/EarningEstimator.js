import React, { useState } from "react";
import { Modal, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import { motion } from "framer-motion"; // For spinning effect
import MKBox from "components/MKBox"
import MKButton from "components/MKButton"

const EarningEstimator = () => {
  const [weeks, setWeeks] = useState(42);
  const [modalOpen, setModalOpen] = useState(false);
  const estimatedPricePerWeek = 26;

  const handleSliderChange = (event, newValue) => {
    setWeeks(newValue);
  };

  const handleMouseDown = () => {
    // Add any additional functionality for when the user clicks and holds the slider
  };

  const handleMouseUp = () => {
    // Add any additional functionality for when the user releases the slider
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <MKBox textAlign="center" p={4}>
      {/* Earnings Display */}
      <Typography variant="h4" gutterBottom sx={{
        fontSize:{xs:'60px', md:'95px'},

        fontWeight:'890px',
        color:'#000'
      }}>
        <motion.span
          initial={{ rotateX: 0 }}
          animate={{ rotateX: [0, 360] }}
          transition={{ duration: 0.5 }}
        >
          ${weeks * estimatedPricePerWeek}
        </motion.span>
      </Typography>

      <Typography variant="h6" sx={{
        fontSize:{xs:'20px', md:'27px'},
        
        fontWeight:'580',
        color:'#464647',
        mt:'-5px',
        mb:'50px'
      }}>
        {weeks} weeks at an estimated ${estimatedPricePerWeek} per week
      </Typography>

      {/* Slider */}
      <MKBox mt={4} mb={2}>
      <Slider
          value={weeks}
          onChange={handleSliderChange}
          min={1}
          max={52}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          valueLabelDisplay="auto"
          sx={{
            width: '100%',
            color: '#B0B0B0', // Grey color for the slider
            '& .MuiSlider-thumb': {
              width: 25,
              height: 25,
              boxShadow: 'none', // Remove any shadow
              backgroundColor: '#fff', // Initial grey color
              '&:hover, &:focus, &:active': {
                backgroundColor: '#2e89ff', // Light blue when interacted with
              },
            },
            '& .MuiSlider-track': {
              height: 4, // Set height for the slider track
              borderRadius: 2, // Rounded edges
              color: '#B0B0B0', // Grey color for the track
            },
            '& .MuiSlider-rail': {
              height: 4, // Set height for the rail
              borderRadius: 2, // Rounded edges
              opacity: 1, // Ensure it's visible
              color: '#B0B0B0', // Grey color for the rail
            },
            '& .MuiSlider-valueLabel':{
              color:'#fff',
              bgcolor:'#737373',
              
              fontWeight:'550'
            }
          }}
        />
      </MKBox>

      {/* Modal Link */}
      <Typography
        variant="body2"
        sx={{ cursor: "pointer", textDecoration: "underline", mt: 2, fontSize:'17px' , color:'#838282',  fontWeight:'530', mt:'30px'}}
        onClick={openModal}
      >
        Learn how we estimate your earnings
      </Typography>

      {/* Modal */}
      <Modal open={modalOpen} onClose={closeModal}>
        <MKBox
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width:{xs:'90%', md:'600px'},
            bgcolor: "background.paper",
            borderRadius: 5,
            boxShadow: 24,
            p:{xs:3, md:5},
          }}
        >
          <Typography variant="h4" mb={2} sx={{
            fontSize:{xs:'32px', md:'40px'} ,
            
            fontWeight:'720',
            color:'#000'
          }}>
            How We Estimate Your Earnings
          </Typography>
          <Typography variant="body1" sx={{
            fontSize:{xs:'16px', md:'18px'},
            fontWeight:'550',
            
            color:'#464647'
          }}>
            We estimate your earnings based on various factors such as the
            market demand for storage space/parking and the average listing price on SpareLot. The earnings shown are just an estimate and can vary depending on several conditions.
          </Typography>
          <MKButton onClick={closeModal} color='info' sx={{
             mt: 4,
             p:'10px 30px',
             fontSize:'16px',
             fontWeight:'600px',
             
          }}>
            Close
          </MKButton>
        </MKBox>
      </Modal>
    </MKBox>
  );
};

export default EarningEstimator;