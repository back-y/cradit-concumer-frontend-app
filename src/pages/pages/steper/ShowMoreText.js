import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useState } from 'react';

const ShowMoreText = () => {

    const [more, setMore] = useState(false)

    const toggler = () => {
        setMore(true);
    }

    const untoggler = () => {
        setMore(false);
    }

    return (
        <Grid >
            <Typography>By clicking <span style={{ color: 'green' }}> "Finish" </span>you are agreed for terms and policies of KEGEBEREW Credit Consumer Management system</Typography>
            {more && <>
                <br />
                <br />

                <Typography><b> አንቀጽ  አምስት </b>
                    <br />
                    <br />
                    የአከፋፈል ሁኔታ

                    5.1  ውል  ተቀባይ  ምርቱን  በተረከበ  በወሩ  ማግስት  (በወሩ  ቀጣይ  ቀን)  የሚጠበቅበትን  ክፍያ  የሚፈጽም
                    ይሆናል፡፡ የክፍያ ጊዜው በሁለቱ ድርጅቶች የጋራ ስምምነት ለተጨማሪ 5 (አምስት) ቀን ሊራዘም ይችላል።
                    5.2  ውል  ሰጪ  ላቀረበው  ምርት  ክፍያ  የሚጠይቀው  ለውል  ተቀባይ  በሰጠው  ጊዜ  ገደብ  ይሆናል፡፡  ከተሠጠው
                    የግዜ ገደብ በኋላ ለዘገየበት ጊዜያት በዚህ ውል አንቀፅ 4.6 መሠረት ከነቅጣቱ መጠየቅ ይችላል

                    5.3. የአከፋፈሉም ሂደት በውል ሰጪ ድርጅት (ፐርፐዝ ብላክ ኢቲ ኤች ትሬዲንግ አ.ማ.) ስም የሚዘጋጅ ሲሆን
                    ክፍያ በሚከናወንበት ጊዜ የድርጅቱ ስም መጠቀስ ግዴታ ነው፡፡

                    5.4. ውል ተቀባይ የመጀመርያ ዙር ክፍያ ሳይፈፀም ሁለተኛ ዙር ብድር መጠየቅ አይቻልም።
                </Typography>
                <br />
                <br />
                <Typography>


                    <b> አንቀጽ ስድስት</b>
                    <br />
                    <br />
                    ውሉ የሚቋረጥበት ምክንያት

                    6.1 ይህ ውል በሁለቱም ወገኖች በሁለቱ ወገኖች የጋራ ስምምነት ሊቋረጥ ይችላል፤
                    6.2  በኢትዮጰያ  የፍትሐብሔር  ሕግ  ቁጥር  1793  ከአቅም  በላይ  ተብሎ  በተገለፀው  ሁኔታ  መሰረት  ሊቋረጥ
                    ይችላል
                    6.3 ውል ተቀባይ ክፍያ ባለመፈፀሙ ውሉ ሊቋረጥ ይችላል
                    6.3  ከላይ  በንዑስ  አንቀፅ  6.3  የተገለፀው  የተጠበቀ  ሆኖ ውል  ተቀባይ  ውሉ  በመቋረጡ  ምክንያት  ያለበት  ቀሪ
                    እዳ ከነቅጣቱ የመክፈል ግዴታ አለበት</Typography>

                <br />
                <br />

            </>}
            {!more && <Button variant='contained' className='pbeth' sx={{ marginRight: 3.5 }} onClick={toggler}>
                Show More...
            </Button>}
            {more && <Button variant='contained' className='pbeth' sx={{ marginRight: 3.5 }} onClick={untoggler}>
                Show Less...
            </Button>}
        </Grid >
    );
};

export default ShowMoreText;
