import { styled } from "@mui/material";
import MKButton from "components/MKButton";

export const HostOptionButton = styled(MKButton)(({theme}) => ({
    px:2,
    py:1,
    minHeight:0,
    textTransform: 'none',
    fontWeight: 520,
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    minWidth:'fit-content',
    whiteSpace:'nowrap',
    borderRadius: theme.spacing(3),
    boxShadow:0,
    '&:hover':{
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)', // Optional hover effect for better UI
    }
}));

export const DisabledTypography = {
    py:2,
    width:'100%',
    width:'100%',
    borderRadius:2,
    fontWeight:450,
    color:'#737373',
    userSelect:'none',
    fontSize:'.875rem',
    textAlign:'center',
    cursor:'not-allowed',
    border:'1px dashed #737373',
    display:'flex',
    flexDirection:'column',
    gap:2,
    alignItems:'center',
    TopIconStyles: {
        width:75,
        height:75,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    }
}