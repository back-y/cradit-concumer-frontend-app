import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Approve from 'src/pages/pages/steper/Approve';
import Cookies from 'js-cookie';
import axios from 'axios';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const CustomGallery = () => {

  const [images, setImages] = useState([])
  const [userInfos, setUserInfos] = useState([])

  useEffect(async () => {
    const id = Cookies.get('new-user_id')
    const url = process.env.NEXT_PUBLIC_API_URL + 'new-user/' + id
    await axios.get(url)
      .then(resp => {
        const ID_name = resp.data.documents.ID
        console.log('iiiidddd data', resp.data.documents)
        const userInfo = resp.data
        setUserInfos(userInfo)
        console.log('iiiidddd resp userInfo', userInfo)
        console.log('ID image name: ', ID_name)
        const L_name = resp.data.documents.License
        const T_name = resp.data.documents.TIN
        const R_name = resp.data.documents.R_Cert

        const imgUrl = process.env.NEXT_PUBLIC_API_URL + 'file/'
        setImages([imgUrl + ID_name, imgUrl + T_name, imgUrl + L_name, imgUrl + R_name])

      })
      .catch(err => {
        console.log(err)
      })

    console.log('Images urls: ', images)

  }, [])

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Box>

      <Grid container spacing={2}>
        <div className='tm_invoice_info tm_mb25' style={{ backgroundColor: 'white', padding: '10px', display: 'flex', width: '100%' }}>
          <div className='tm_card_note tm_mobile_hide' style={{ width: '100%', display: 'block', justifyContent: 'space-between' }}>
            <div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
              <h6 className='tm_primary_color'>Name: </h6> &nbsp;&nbsp; <span> <h6 style={{ color: 'red' }}> {userInfos.name}</h6></span>
            </div>
            <div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
              <h6 className='tm_primary_color'>Email: </h6>&nbsp;&nbsp; <span> <h6 style={{ color: 'red' }}> {userInfos.email}</h6></span>
            </div>
          </div>
          <div className='tm_card_note tm_mobile_hide' style={{ width: '100%', display: 'block', justifyContent: 'space-between' }}>
            <div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
              <h6 className='tm_primary_color'>Phone number: </h6> &nbsp;&nbsp;<span> <h6 style={{ color: 'red' }}> {userInfos.phone}</h6></span>
            </div>
            <div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
              <h6 className='tm_primary_color'>Company: </h6>&nbsp;&nbsp; <span> <h6 style={{ color: 'red' }}> {userInfos.company}</h6></span>
            </div>
          </div>

          <div className='tm_invoice_seperator tm_accent_bg'></div>
        </div>

      </Grid>
      <Grid container spacing={2}>
        <Gallery
          items={images.map((image) => ({
            original: image,
            thumbnail: image,
          }))}
          showNav={true}
          showFullscreenButton={true}
          showPlayButton={false}
          startIndex={currentIndex}
          onSlide={handleSlide}
        />
      </Grid>
      <Approve />
    </Box>
  );
};

export default CustomGallery;


// import React, { useState } from 'react';
// import Gallery from 'react-image-gallery';
// import 'react-image-gallery/styles/css/image-gallery.css';
// import Zoom from 'react-medium-image-zoom';
// import 'react-medium-image-zoom/dist/styles.css';

// const CustomGallery = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div>
//       <Gallery
//         items={images.map((image) => ({
//           original: image,
//           thumbnail: image,
//         }))}
//         showNav={true}
//         showFullscreenButton={false}
//         showPlayButton={false}
//         startIndex={currentIndex}
//         onSlide={handleSlide}
//         renderCustomControls={({ currentSlide }) => (
//           <div>
//             <Zoom
//               image={{
//                 src: images[currentSlide],
//                 alt: '',
//                 className: 'img-zoom',
//               }}
//               zoomImage={{
//                 src: images[currentSlide],
//                 alt: '',
//               }}
//             />
//             <a
//               href={images[currentSlide]}
//               download={`image_${currentSlide + 1}`}
//             >
//               Download
//             </a>
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default CustomGallery;


