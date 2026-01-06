import { ArrowBackIosNew, Delete } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import AdaptiveModal from "app/sections/Modal/Adaptive";
import WarnedAction from "app/sections/Options/Action";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StepsProgress = ({maxSteps, step, setStep, canAdvance, onFinalStep}) => {
    const navigate = useNavigate();
    const [warn, setWarn] = useState(false);
    
    return (<>
        <Box
            sx={{
                height:{xs:100,lg:75},
                position:'fixed',
                bottom:0,
                left:0,
                zIndex:2,
                width:'100%',
                pb:2,
                backgroundColor:'#fff',
            }}
        >
            <Box
                sx={{
                    gap:{xs:.25,lg:1},
                    mb:{xs:0,lg:1},
                    width:'100%',
                    display:'flex',
                }}
            >
                {
                    (Array.from({ length: maxSteps }, (_, i) => i + 1).map((useless, idx) => (
                        <Box
                            sx={{
                                width:'100%',
                                height:'100%',
                                borderTop:`2px solid ${step > idx ? colors.gradients.info.main : '#c0bfbf'}`
                            }}
                        />
                    )))
                }
            </Box>

            <Box
                sx={{
                    px:2,
                    width:'100%',
                    height:'100%',
                    display:'flex',
                    alignItems:'center',
                }}
            >
                <MKButton
                    sx={{
                        px:0,
                        color:'#000',
                        fontSize:'1rem',
                        textDecoration:'underline',
                        '&:hover':{
                            bgcolor:'#ededed',textDecoration:'underline',
                        },
                        '&:active':{
                            scale:.95,
                        },
                    }}
                    onClick={() => {
                        if (step > 1 && step <= maxSteps) {
                            setStep(step-1)
                        }
                        else {
                            setWarn(true)
                        }
                    }}
                >
                    {step<=1?'Exit':'Back'}
                </MKButton>
                <MKButton
                    color='info'
                    disabled={(canAdvance !== null && canAdvance() === false)}
                    sx={{
                        py:.25,
                        ml:'auto',
                        fontSize:'1.2rem',
                        '&:active':{
                            scale:.95,
                        }
                    }}
                    onClick={() => {
                        if (step < maxSteps) {
                            setStep(step+1)
                        }
                        else if (step === maxSteps) {
                            onFinalStep();
                        }
                    }}
                >
                    {step === maxSteps ? 'Finish' : 'Next'}
                </MKButton>
            </Box>
        </Box>

        <WarnedAction
            color='error'
            open={warn}
            onClick={() => navigate(-1)}
            onClose={() => setWarn(false)}
            warningTitle='Are you sure you want to exit?'
            warningDescription='Your progress will not be saved.'
            actionTitle='Exit'
        />
    </>)
}

export default StepsProgress;