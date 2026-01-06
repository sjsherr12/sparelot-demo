import Hr from "app/utils/Hr";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

export const CommonFooter = ({handleApply, handleReset}) => (
    <MKBox 
        sx={{
            mt:'auto',
            padding:1,
            pt:2,
            pb:1,
            bgcolor:'#fff',
            alignItems:'center',
            display:'flex',
            position:'relative',
            bottom:0,
            left:0,
            width:'100%',
            borderTop:'1px solid #ededed',
        }}
    >
        <MKButton
            sx={{
                fontFamily:'Montserrat, sans-serif',
                color:'#000',
                fontWeight:500,
                fontSize:18,
                textTransform:'none',
                '&:hover':{
                    bgcolor:'#eee',
                },
                ml:'auto',
                borderRadius:2,
            }}
            onClick={handleReset}
        >
            Clear
        </MKButton>
        <MKButton
            color='info'
            sx={{
                fontFamily:'Montserrat, sans-serif',
                color:'#fff',
                fontWeight:500,
                fontSize:18,
                textTransform:'none',
                ml:1,
                borderRadius:2,
            }}
            onClick={handleApply}
        >
            Apply
        </MKButton>
    </MKBox>
)