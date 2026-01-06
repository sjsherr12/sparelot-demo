import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

const ArticleSummary = ({ items }) => {
    return (
        <MKBox sx={{ml:'25px', mt:'8px'}}>
            <ul style={{ paddingLeft: '20px', color:'#000' }}>
                {items.map((item, index) => (
                    <li key={index} style={{marginBottom:'3px'}}>
                        <MKTypography
                            sx={{
                                color: '#000',
                                fontFamily: "Montserrat, sans serif",
                                fontSize: '20px',
                                fontWeight:'600'
                            }}
                        >
                            {item}
                        </MKTypography>
                    </li>
                ))}
            </ul>
        </MKBox>
    );
}

export default ArticleSummary;