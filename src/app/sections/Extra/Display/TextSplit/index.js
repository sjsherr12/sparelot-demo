import React from 'react';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';

const TextSplitter = ({ text }) => {
  return (
    <MKBox sx={{ display: 'flex', alignItems: 'center', width: '100%', my:1.5 }}>
      <MKBox sx={{ flex: 1, height: '1px', backgroundColor: 'grey.400' }} />
      <MKTypography sx={{ mx: 2, color: 'text.secondary', fontFamily: 'Montserrat, sans serif', userSelect: 'none' }}>
        {text}
      </MKTypography>
      <MKBox sx={{ flex: 1, height: '1px', backgroundColor: 'grey.400' }} />
    </MKBox>
  );
};

export default TextSplitter;
