import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import MKBox from 'components/MKBox';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {

  const privacyPolicySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "url": "https://sparelot.com/privacy-policy",
    "description": "SpareLot's Privacy Policy explains how we collect, use, and protect your data."
  };
  

  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch('/SpareLotPrivacyPolicy.html') // Path relative to the public directory
      .then(response => response.text())
      .then(data => setHtmlContent(data))
      .catch(error => console.error('Error fetching HTML:', error));
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy - SpareLot</title>
        <meta
          name="description"
          content="SpareLot's Privacy Policy explains how we collect, use, and protect your data."
        />
        <script type="application/ld+json">
          {JSON.stringify(privacyPolicySchema)}
        </script>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Container sx={{display:'flex',justifyContent:'center', mt:2, mb:6}}>
        <MKBox sx={{width:{xs:'90%', md:'80%', lg:'66%', xl:'50%'}}}>
        <div className="privacy-policy" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </MKBox>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
