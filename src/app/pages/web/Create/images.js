import { Add, Close } from "@mui/icons-material";
import { Box, Icon, IconButton, Typography } from "@mui/material";
import Hr from "app/utils/Hr";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { useRef, useState } from "react";

const bullet_points = [
    'Remove objects from the space',
    'Ensure the pictures have good lighting',
    'Landscape (wide) photos are best',
    'Take photos of both the inside and outside of the space',
]

const SpaceImages = ({photos, setPhotos}) => {

    const fileInputRef = useRef(null);
    const [draggedIndex, setDraggedIndex] = useState(null);

    const compressImage = (file, minWidth = 1920, minHeight = 1080, quality = 1) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();
            const canvas = document.createElement('canvas');
    
            reader.onload = (e) => {
                img.src = e.target.result;
            };
    
            img.onload = () => {
                let width = img.width;
                let height = img.height;
    
                // Check if the image is smaller than the minimum dimensions
                if (width < minWidth || height < minHeight) {
                    // Do not upscale the image, resolve with the original
                    canvas.width = width;
                    canvas.height = height;
                } else {
                    // Resize if larger than the minimum dimensions
                    if (width > height) {
                        height *= minWidth / width;
                        width = minWidth;
                    } else {
                        width *= minHeight / height;
                        height = minHeight;
                    }
    
                    // Set canvas dimensions to resized image
                    canvas.width = width;
                    canvas.height = height;
                }
    
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
    
                // Convert the resized image to a blob
                canvas.toBlob(
                    (blob) => {
                        // Convert the compressed blob to base64
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            resolve({
                                image: reader.result,
                                base64: reader.result.replace("data:", "").replace(/^.+,/, ""),
                            });
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(blob); // Convert blob to base64
                    },
                    'image/jpeg', // Output format
                    quality // Compression quality
                );
            };
    
            img.onerror = reject;
            reader.readAsDataURL(file); // Load the file as a data URL
        });
    };    
    
    const handleFiles = (files) => {
        const newPhotos = Array.from(files).map(file => compressImage(file));
    
        Promise.all(newPhotos).then(res => {
            setPhotos(prevPhotos => [...prevPhotos, ...res]);
        }).catch(err => {
            console.error('Error processing images:', err);
        });
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleFiles(event.dataTransfer.files);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };
  
    const handleDragOver = (index) => {
        const draggedOverPhoto = photos[index];
        if (draggedOverPhoto === photos[draggedIndex]) {
            return;
        }
        const items = [...photos];
        items.splice(index, 0, items.splice(draggedIndex, 1)[0]);
        setDraggedIndex(index);
        setPhotos(items);
    };
  
    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const removePhoto = (indexToRemove) => {
        const copy = [...photos]
        copy.splice(indexToRemove, 1);
        setPhotos(copy);
    };

    return (
        <>
            <Box
                sx={{
                    mt:2,
                    mb:4,
                    width: "100%",
                    maxWidth: 600,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography
                    sx={{
                        color: "#000",
                        fontSize: { xs: "1.25rem", lg: "2rem" },
                        fontWeight: 550,
                        textAlign: "center",
                        lineHeight: '25px',
                    }}
                >
                    Space Pictures
                </Typography>
                <Typography
                    sx={{
                        my:2,
                        color: "#737373",
                        fontSize: { xs: "1rem", lg: "1.25rem" },
                        fontWeight: 500,
                        textAlign: "left",
                    }}
                >
                    {photos.length ? `A minimum of 5 photos is required. Feel free to add more!` : `Take a minimum of 5+ photos to show renters what your space is like. Make sure to:`}
                </Typography>

                { !photos.length &&
                    <MKBox
                        sx={{
                            display:'flex',
                            flexDirection:'column',
                            pl:2,
                            mb:4,
                            gap:.5,
                        }}
                    >
                        {
                            bullet_points.map((point, idx) => (
                                <Typography
                                    key={idx}
                                    variant='h5'
                                    sx={{
                                        color:'#737373',
                                        fontWeight:500,
                                    }}
                                >
                                    • {point}
                                </Typography>
                            ))
                        }
                    </MKBox>
                }

                { !photos.length &&
                    <MKBox
                        onDragOver={(e) => e.preventDefault()} 
                        onDrop={handleDrop}
                        sx={{
                            my:2,
                            width:'100%',
                            padding:4,
                            border:'2px dashed #ababab',
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'center',
                            gap:3,
                            borderRadius:4,
                        }}
                    >
                        <MKButton
                            color='info'
                            sx={{
                                textTransform:'none',
                                fontSize:20,
                                width:'100%',
                                borderRadius:4,
                                py:2,
                            }}
                            onClick={handleButtonClick}
                        >
                            Add Photos
                        </MKButton>

                        <input 
                            type="file" 
                            multiple 
                            accept="image/*" 
                            ref={fileInputRef} 
                            onChange={(e) => handleFiles(e.target.files)} 
                            style={{ display: 'none' }}
                        />

                        <Typography
                            variant='h5'
                            sx={{
                                color:'#737373',
                                fontWeight:500,
                            }}
                        >
                            (or drag and drop photos here)
                        </Typography>
                    </MKBox>
                }

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0px 10px', marginTop: 16 }}>
                    {photos.map((photo, index) => (
                        <div 
                            key={index} 
                            style={{ 
                                position: 'relative', 
                                borderRadius: '8px', 
                                cursor: 'grab'
                            }}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => {
                                e.preventDefault();
                                handleDragOver(index);
                            }}
                            onDragEnd={handleDragEnd}
                        >
                            <img 
                                src={photo.image} // Use photo.base64 to display the image
                                alt={`Photo ${index + 1}`} 
                                style={{
                                    width: '100%',
                                    height: '125px',
                                    objectFit: 'cover',
                                    borderRadius: '8px', 
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}
                            />
                            <IconButton 
                                onClick={() => removePhoto(index)}
                                style={{
                                    position: 'absolute',
                                    top: '-6px',
                                    left: '-6px',
                                    zIndex: 2,
                                    backgroundColor: '#000',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <Close fontSize='small' />
                            </IconButton>

                            { index === 0 &&
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: 8,
                                        borderRadius: '0px 0px 8px 8px',
                                        left: 0,
                                        width: '100%',
                                        backgroundColor: 'rgba(0,0,0,0.66)',
                                        height: 25,
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#fff',
                                            fontSize: 16,
                                        }}
                                    >
                                        Cover Photo
                                    </Typography>
                                </div>
                            }
                        </div>
                    ))}

                    { (photos.length > 0) &&
                        <MKBox
                            sx={{
                                border: '1.5px dashed #a5a4a4',
                                display: 'flex',
                                borderRadius: 2,
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 125,
                                fontSize: 40,
                                gap: 1,
                                cursor: 'pointer',
                                '&:hover':{
                                    bgcolor:'rgba(250,250,255,1)',
                                },
                                '&:active':{
                                    scale:.99,
                                },
                                transition:'all .2s ease'
                            }}
                            onDragOver={(e) => e.preventDefault()} 
                            onDrop={handleDrop}
                            onClick={handleButtonClick}
                        >
                            <Icon
                                sx={{
                                    color: '#1A73E8',
                                }}
                            >
                                <Add fontSize='inherit'/>
                            </Icon>

                            <input 
                                type="file" 
                                multiple
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={(e) => handleFiles(e.target.files)} 
                                style={{ display: 'none' }}
                            />

                            <Typography
                                variant='body1'
                                sx={{
                                    color: '#1A73E8',
                                    fontSize: 18,
                                    userSelect:'none',
                                }}
                            >
                                Add photo
                            </Typography>
                        </MKBox>
                    }
                </div>
            </Box>
        </>
    )
}

export default SpaceImages;