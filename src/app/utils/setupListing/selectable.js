import styled from "@emotion/styled";
import MKButton from "components/MKButton";

const Selectable = styled(MKButton)(({ theme, toggled }) => ({
    padding:theme.spacing(2, 3),
    color:'#000',
    borderRadius:8,
    fontWeight:500,
    width:'100%',
    border:`2px solid #${toggled?'000':'ededed'}`,
    textTransform:'none',
    cursor:'pointer',
    display:'flex',
    alignItems:'center',
    textAlign:'start',
    '&:active':{
        scale:.99,
    },
    '&:hover':{
        border:`${2}px solid #${toggled?'000':'ababab'}`,
    }
}))

export default Selectable;