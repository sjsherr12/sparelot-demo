import React, { useState } from 'react';
import { Container, IconButton, Box, Collapse, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';
import { useNavigate } from 'react-router-dom';

const faqData = [
  { question: 'What is SpareLot?', answer: 'SpareLot is a peer-to-peer storage and parking marketplace. Our platform connects renters searching for safe, convenient, and affordable storage to individuals and entities with a surplus of space. Whether you’re looking for a secure place to store extra furniture or trying to find a place to park your boat for the winter, SpareLot helps renters find localized, cost-effective storage solutions. On the flip side, SpareLot allows hosts to turn their unused space into an income producing asset. By choosing SpareLot, renters can browse available listings, compare prices, and book storage that meets their specific needs.' },
  { question: 'How do I find the right rental space?', answer: 'Finding the right space on SpareLot is made to be simple. First, use the search feature to filter for relevant and nearby listings–input location, what you’re storing, and dimensions of the item (optional). Next, you will be able to view all available listings that meet your specific criteria. From here, you can activate additional filters such as size, price, and type of space. Finally, choose your favorite listing and submit a request.' },
  { question: 'How can I book a rental space?', answer: 'Once you have chosen a rental space, booking is easy. Make sure the dates you’re looking to store for are available using the in-listing date picker. Then, click on “Reserve” to navigate to our booking flow, where you will input information about your booking request such as what you’re storing, personal information, and payment details. After submitting a request, the host will have up to the renter\'s designated start date to either accept or decline. ' },
  { question: 'What is the booking cancellation policy?', answer: 'SpareLot is flexible. There is no paperwork or long term contracts. Renters can cancel their reservation any month with no hidden fees.' },
  { question: 'How do I become a host and list a space?', answer: 'Any SpareLot user with a signed in account can become a host and list a space. To list, switch to the hosting view in the account section. You may be required to fill in additonal information as a host. Go to the listings tab and click the “Create Listing” button. This will direct you to our listing flow, where you will be able to fill out information about your rental space and publish.' },
  { question: 'Is it safe to store with SpareLot?', answer: '100%. SpareLot is completely committed to the safety of its user’s and their property. SpareLot rental spaces are generally much safer than traditional storage facilities. Furthermore, with our community-based business model, we are able to offer more storage options that are closer you.' },
];

const HomeFAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Container>
      <Typography variant="h1" sx={{
            fontSize:{xs:'26px', md:'42px'},
            color:'#000',
            mb:{xs:'18px', md:'26px'},
            textAlign:'center',
            mt:{xs:'5px', md:'68px'}
        }}>
        Commonly Asked Questions
      </Typography>
      <MKBox sx={{width:{xs:'100%', lg:'70%'}, justifyContent:'center', alignItems:'center', display:'flex', flexDirection:'column', mx:'auto', mb:{xs:'16px', md:'30px'}}}>
        <MKBox sx={{width:'100%'}}>
        {faqData.map((faq, index) => (
            <MKBox
            key={index}
            sx={{
                border: `2px solid ${openIndex === index ? '#2e89ff' : '#e0e0e0'}`,
                borderRadius: '14px',
                boxShadow:'0px 2px 8px rgba(0, 0, 0, 0.07)',
                padding:{xs:'14px 18px', md:'18px 24px'},
                mb: 2,
                backgroundColor: openIndex === index ? 'rgba(46, 137, 255, 0.1)' : '#fff',
                cursor: 'pointer',
                transition: 'background-color 0.3s, border-color 0.3s',
            }}
            onClick={() => handleToggle(index)}
            >
            <MKBox display="flex" alignItems="center">
                <Typography variant="h6" sx={{ flex: 1, userSelect:'none',  fontSize:{xs:'18px', md:'25px'}, color:'#464647', fontWeight:'630'}}>
                {faq.question}
                </Typography>
                <IconButton sx={{ marginLeft: 'auto' }}>
                {openIndex === index ? <RemoveIcon sx={{height:'28px', width:'auto', color:'#464647'}}/> : <AddIcon sx={{height:'28px', width:'auto', color:'#464647'}}/>}
                </IconButton>
            </MKBox>

            <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                <Typography variant="body1" sx={{ mt:{xs:'4px', md:'14px'},  fontSize:{xs:'14px', md:'19px'}, color:'#464647', fontWeight:'510' }}>
                {faq.answer}
                </Typography>
            </Collapse>
            </MKBox>
        ))}
        </MKBox>
      </MKBox>
      <Typography variant='h6' sx={{
        
        fontSize:{xs:'14px', md:'20px'},
        color:'#737373',
        mb:{xs:'12px', md:'20px'},
        textAlign:'center',
        fontWeight:'480'
      }}>
        Any more questions?
      </Typography>
      <MKBox sx={{display:'flex', width:'100%', alignItems:'center', justifyContent:'center'}}>
        <MKButton color='info' sx={{

            fontSize:{xs:'16px', md:'22px'},
            fontWeight:'600',
            textTransform:'none',
            borderRadius:'14px',
            mb:{xs:'38px', md:'60px'},
            width:{xs:'auto', md:'360px'}
        }} onClick={() => navigate('/help')}>
            Visit our Help Center
        </MKButton>
      </MKBox>
    </Container>
  );
};

export default HomeFAQs;
