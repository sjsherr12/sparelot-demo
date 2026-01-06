import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { createContext, useContext, useState } from "react";
import './triple.css';
import './spinner.css'
import colors from "assets/theme/base/colors";
import {motion} from 'framer-motion'

export const LoadingComponent = ({compact}) => (
    <MKBox sx={{width:'100%', display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center',height:compact?'fit-content':100}}>
        <div class="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        {/* <MKTypography
            sx={{
                textAlign: 'center',
                color:colors.background.theme,
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 18,
                fontWeight: 600,
            }}
        >
            Loading...
        </MKTypography> */}
    </MKBox>
);

export const LoadingSpinner = ({compact}) => (
    <MKBox sx={{width:'100%', display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center',height:'fit-content'}}>
        <div class={compact?'loader3' : "loader2"}/>
    </MKBox>
)