import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import MKBox from 'components/MKBox';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {

  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service",
    "url": "https://sparelot.com/terms-of-service",
    "description": "SpareLot's Terms of Service outline the rules and regulations for using our services."
  };
  

  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch('/SpareLotTermsofService.html') // Path relative to the public directory
      .then(response => response.text())
      .then(data => setHtmlContent(data))
      .catch(error => console.error('Error fetching HTML:', error));
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms of Service - SpareLot</title>
        <meta
          name="description"
          content="SpareLot's Terms of Service outline the rules and regulations for using our services."
        />
        <script type="application/ld+json">
          {JSON.stringify(termsSchema)}
        </script>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Container sx={{display:'flex',justifyContent:'center', mt:2, mb:6}}>
        <MKBox sx={{width:{xs:'100%', md:'80%', lg:'66%', xl:'50%', xxl:'40%'}}}>
        <div className="terms-of-service" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </MKBox>
      </Container>
    </>
  );
};

export default TermsOfService;
