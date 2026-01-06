import { Box, Icon, IconButton, InputBase, Modal, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import { Close } from "@mui/icons-material";
import colors from "assets/theme/base/colors";
import { useState } from "react";
import MKButton from "components/MKButton";
import report_item from "app/backend/cloud/report_item";
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import AdaptiveModal from "../Modal/Adaptive";

const ReportModal = ({open, onClose, contentType, contentId, extraData, disabled}) => {
    const [loading, setLoading] = useState(false);
    
    const [reportDescription, setReportDescription] = useState('')
    const [reportSubmittedStatus, setReportSubmittedStatus] = useState('')
    const [reportDescriptionError, setReportDescriptionError] = useState(false);
    
    const getReportingWhat = () => {
        if (contentType) {
            return contentType;
        }
        return 'content'
    }

    const getContentId = () => {
        if (contentId) {
            return contentId
        }
        return -1;
    }

    const onSubmitReport = () => {
        if (!disabled) {
            if (reportDescription) {
                setLoading(true);
                report_item({
                    itemType: getReportingWhat(),
                    contentId: getContentId(),
                    reportDescription: `${reportDescription}${extraData?` ${extraData}` : ''}`,
                }).then(res => {
                    setLoading(false);
                    if (res.data.error) {
                        setReportSubmittedStatus(`Error submitting report: ${res.data.message}`)
                    }
                    else {
                        setReportSubmittedStatus(res.data.message)
                    }
                }).catch(error => {
                    setLoading(false);
                    setReportSubmittedStatus(`Error submitting report: ${error.message}`)
                })
            }
            else {
                setReportDescriptionError(true);
            }
        }
        else {
            alert('You cannot report this user.')
        }
    }

    return (
        <AdaptiveModal
            open={open}
            onClose={onClose}
            title={`Report a ${getReportingWhat().capitalize()}`}
        >
            {loading &&
                <Box
                    sx={{
                        pt:2,
                    }}
                >
                    <LoadingSpinner />
                </Box>
            }
            {reportSubmittedStatus &&
                <Typography
                    variant='body2'
                    sx={{
                        fontSize:'1rem',
                        textAlign:'center',
                        fontWeight:500,
                    }}
                >
                    {reportSubmittedStatus}
                </Typography>
            }
            {!loading && !reportSubmittedStatus && <>
                <Typography
                    sx={{
                        fontWeight:440,
                        fontSize:'1rem'
                    }}
                >
                    {`When reporting a ${getReportingWhat()}, please clearly explain the issue, providing specific details to help us understand your concerns. Be honest and accurate in your report, as this ensures a fair review process.`}
                </Typography>

                <InputBase
                    multiline
                    minRows={3}
                    error={reportDescriptionError}
                    value={reportDescription}
                    placeholder={`Describe the issue...`}
                    onChange={(e) => setReportDescription(e.target.value)}
                    sx={{
                        width:'100%',
                        color:'#000',
                        px:1.5,
                        py:1,
                        mt:2,
                        border:'1px solid #c0bfbf',
                        borderRadius:2,
                        fontSize:16,
                        fontWeight:500,
                    }}
                    inputProps={{
                        maxLength:500,
                    }}
                />
                {reportDescriptionError &&
                    <Typography id="modal-modal-description" sx={{ color:colors.error.main, fontWeight:500,fontSize:12, }}>
                        Report must have an issue description.
                    </Typography>
                }

                <MKButton
                    color='info'
                    sx={{
                        my:2,
                        width:'100%',
                        fontWeight:500,
                        fontSize:'1rem',
                    }}
                    onClick={() => onSubmitReport()}
                >
                    Submit Report
                </MKButton>

                <Typography id="modal-modal-description" sx={{color:'#000', fontWeight:500,fontSize:12, textAlign:'center', }}>
                    {`Note that reporting a ${getReportingWhat()} does not guarantee any content removal, but helps us maintain a trustworthy platform.`}
                </Typography>
            </>}
        </AdaptiveModal>
    )
}

export default ReportModal;