import React from 'react'
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails, Container } from '@mui/material';

const FAQItem = ({ question, answer }) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <MKTypography>{question}</MKTypography>
    </AccordionSummary>
    <AccordionDetails>
      <MKTypography>{answer}</MKTypography>
    </AccordionDetails>
  </Accordion>
);

const FAQContainer = ({ faqData }) => (
  <MKBox my={4} >
    {faqData.map((faq, index) => (
      <FAQItem key={index} question={faq.question} answer={faq.answer} />
    ))}
  </MKBox>
);

const FAQ = ({title, faqData}) => {
  return (
    <Container sx={{padding: 2 }}>
      <MKBox my={2} sx={{textAlign: 'center'}}>
        <MKTypography variant="h2" component="h2" gutterBottom >
          {title}
        </MKTypography>
      </MKBox>
      <FAQContainer faqData={faqData} />
    </Container>
  );
};

export default FAQ;