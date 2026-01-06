import styled from "@emotion/styled";
import MKBox from "components/MKBox";

const Hr = styled(MKBox)(({}) => ({
    width: '100%',
    height: '1px',
    backgroundColor: '#ededed',
    display:{xs:'none', md:'block'}
}));

export default Hr;