import { Help, Info } from "@mui/icons-material";
import { Box, Collapse, FormLabel, IconButton, TextField, Typography } from "@mui/material";
import AdaptiveModal from "app/sections/Modal/Adaptive";
import colors from "assets/theme/base/colors";
import MKButton from "components/MKButton";
import { useState } from "react";

const StorageRequestRenterInfo = ({
    fullName,
    setFullName,
    address,
    setAddress,
    idPicture,
    setIdPicture,
    setIdPictureBase64,
}) => {

    const [readMoreId, setReadMoreId] = useState(false);
    const [vieiwngPhoto, setViewingPhoto] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setIdPicture(url);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
                setIdPictureBase64(base64String); // This is the base64 string without the Data URL prefix
                if (!vieiwngPhoto) {
                    setViewingPhoto(true)
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (<>
        <Box>
            <Typography
                sx={{
                    mb:1.5,
                    color:'#737373',
                    fontSize:'.875rem',
                    fontWeight:500,
                }}
            >
                Please fill out the following information to give your host a better idea about who you are.
            </Typography>
            
            <FormLabel
                htmlFor='full-name'
                sx={{
                    fontSize:'.875rem',
                    color:'#333',
                    fontWeight:550,
                }}
            >
                Full name
            </FormLabel>
            <TextField
                autoFocus
                id='full-name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder='John Doe'
                sx={{
                    mb:1,
                    width:'100%',
                }}
            />

            <FormLabel
                htmlFor='address'
                sx={{
                    fontSize:'.875rem',
                    color:'#333',
                    fontWeight:550,
                }}
            >
                Home or business address
            </FormLabel>
            <TextField
                id='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='123 Main Street, Anytown, CA 91234'
                sx={{
                    width:'100%',
                }}
            />

            <Box
                sx={{
                    mt:2,
                    display:'flex',
                    alignItems:'center',
                    gap:1,
                }}
            >
                <Typography
                    sx={{

                        fontSize:'.875rem',
                        color:'#333',
                        fontWeight:550,
                    }}
                >
                    Identification Picture
                </Typography>
                <Typography
                    onClick={() => setReadMoreId(!readMoreId)}
                    sx={{
                        mt:.1,
                        fontSize:'.75rem',
                        color:colors.info.main,
                        fontWeight:500,
                        cursor:'pointer',
                        userSelect:'none',
                    }}
                >
                    {readMoreId ? 'Read less' : 'Why?'}
                </Typography>
            </Box>
            <Collapse in={readMoreId}>
                <Typography
                    sx={{
                        fontSize:'.75rem',
                        color:'#737373',
                        fontWeight:500,
                    }}
                >
                    Hosts want to know and be able to identify who is storing their items in their space. This could just be a picture of yourself, or any accurate representation of the person who will ultimately be storing.
                </Typography>
            </Collapse>

            <Box
                sx={{
                    p:2,
                    borderRadius:3,
                    mt:1,
                    mb:3,
                    gap:2,
                    width:'100%',
                    border:'1px solid #ededed',
                    display:'flex',
                    flexDirection:{xs:'column',md:'row'},
                }}
            >
                <MKButton
                    onClick={() => {
                        if (!idPicture) {
                            document.getElementById('fileInput').click();
                        }
                        else {
                            setViewingPhoto(true);
                        }
                    }}
                    color={idPicture?'light':'info'}
                    sx={{
                        width:'100%',
                        fontSize:'1rem',
                        fontWeight:500,
                    }}
                >
                    {idPicture ? 'View photo' : 'Add ID photo'}
                </MKButton>

                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: 'none' }} // Hide the file input
                    onChange={handleFileChange}
                />
            </Box>
        </Box>

        <AdaptiveModal
            open={vieiwngPhoto}
            onClose={() => setViewingPhoto(false)}
            title='ID Picture'
            maxWidth={'fit-content'}
            sx={{
                gap:1.5,
                display:'flex',
                flexDirection:'column',
                overflow:'hidden',
            }}
        >
            <Box
                sx={{
                    width:400,
                    maxWidth:'100%',
                }}
            >
                <img 
                    key={idPicture}
                    src={idPicture} 
                    style={{
                        width:'100%',
                        borderRadius:'8px', 
                        userSelect:'none', 
                        aspectRatio: '1 / 1',
                        objectFit:'cover',
                        display:idPicture?'default':'none',
                    }} 
                    draggable={false}
                />
            </Box>
            <MKButton
                onClick={() => {
                    document.getElementById('fileInput').click();
                }}
                color='light'
                sx={{
                    width:'100%',
                    fontSize:'1rem',
                    fontWeight:500,
                }}
            >
                {idPicture ? 'Edit photo' : 'Add ID photo'}
            </MKButton>
            <MKButton
                onClick={() => setViewingPhoto(false)}
                color='info'
                sx={{
                    width:'100%',
                    fontSize:'1rem',
                    fontWeight:500,
                }}
            >
                Confirm
            </MKButton>
        </AdaptiveModal>
    </>)
}

export default StorageRequestRenterInfo;