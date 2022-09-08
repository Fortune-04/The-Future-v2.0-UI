import React,{ useState, useEffect } from "react";

/*Call API using Axios*/
import PrayerFinder from "../Apis/PrayerFinder";

/*Import from Material UI*/
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import KeyboardDoubleArrowLeftSharpIcon from '@mui/icons-material/KeyboardDoubleArrowLeftSharp';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

const Prayer = () => {

    // const [data, setData] = useState([]);
    const [fajr, setFajr] = useState();
    const [dhuhr, setDhuhr] = useState();
    const [asr, setAsr] = useState();
    const [maghrib, setMaghrib] = useState();
    const [isha, setIsha] = useState();

    const handleAdd = async(value) => {

        if(value === 1){
            setFajr(fajr-1);
        }
        else if(value === 2){
            setFajr(fajr+1);
        }
        else if(value === 3){
            setDhuhr(dhuhr-1);
        }
        else if(value === 4){
            setDhuhr(dhuhr+1);
        }
        else if(value === 5){
            setAsr(asr-1);
        }
        else if(value === 6){
            setAsr(asr+1);
        }
        else if(value === 7){
            setMaghrib(maghrib-1);
        }
        else if(value === 8){
            setMaghrib(maghrib+1);
        }
        else if(value === 9){
            setIsha(isha-1);
        }
        else if(value === 10){
            setIsha(isha+1);
        }
        
    }

    const handleUpdate = async() =>{

        try {
            const response = await PrayerFinder.put(`/update/4`, {fajr, dhuhr, asr, maghrib, isha})
            console.log(response);
            fetchData();
            
        } catch (err) {
            console.error(err.message);
        }
    }

    const fetchData = async () => {
        try {
            const response = await PrayerFinder.get("/")
            console.log(response);
            setFajr(response.data[0].fajr);
            setDhuhr(response.data[0].dhuhr)
            setAsr(response.data[0].asr)
            setMaghrib(response.data[0].maghrib)
            setIsha(response.data[0].isha)
            

        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {

        fetchData();

    },[])

    return(
        <Container>
            <Box>
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={2}
                    sx={{mt:4}}
                >
                    <Card sx={{ minWidth: 200 }}>
                        <CardHeader
                            title="Fajr"
                        />
                        <CardContent>
                            <Typography variant="h2" color="text.secondary">
                                {fajr}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={() => handleAdd(1)}>
                                <KeyboardDoubleArrowLeftSharpIcon />
                            </IconButton>
                            <IconButton onClick={() => handleAdd(2)}>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </IconButton>
                        </CardActions>
                    </Card>
                    <Card sx={{ minWidth: 200 }}>
                        <CardHeader
                            title="Dhuhr"
                        />
                        <CardContent>
                            <Typography variant="h2" color="text.secondary">
                                {dhuhr}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={() => handleAdd(3)}>
                                <KeyboardDoubleArrowLeftSharpIcon/>
                            </IconButton>
                            <IconButton onClick={() => handleAdd(4)}>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </IconButton>
                        </CardActions>
                    </Card>
                    <Card sx={{ minWidth: 200 }}>
                        <CardHeader
                            title="Asr"
                        />
                        <CardContent>
                            <Typography variant="h2" color="text.secondary">
                                {asr}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={() => handleAdd(5)}>
                                <KeyboardDoubleArrowLeftSharpIcon/>
                            </IconButton>
                            <IconButton onClick={() => handleAdd(6)}>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={17}
                    sx={{mt:4}}
                >
                    <Card sx={{ minWidth: 200 }}>
                        <CardHeader
                            title="Maghrib"
                        />
                        <CardContent>
                            <Typography variant="h2" color="text.secondary">
                                {maghrib}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={() => handleAdd(7)}>
                                <KeyboardDoubleArrowLeftSharpIcon/>
                            </IconButton>
                            <IconButton onClick={() => handleAdd(8)}>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </IconButton>
                        </CardActions>
                    </Card>
                    <Card sx={{ minWidth: 200 }}>
                        <CardHeader
                            title="Isha'a"
                        />
                        <CardContent>
                            <Typography variant="h2" color="text.secondary">
                                {isha}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{alignItems:"center"}}>
                            <IconButton onClick={() => handleAdd(9)}>
                                <KeyboardDoubleArrowLeftSharpIcon/>
                            </IconButton>
                            <IconButton onClick={() => handleAdd(10)}>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Stack>
            </Box>
            <IconButton sx={{mt: 3}} color="secondary" onClick={handleUpdate}>
                <SyncAltIcon/>
            </IconButton>
        </Container>
    )
}

export default Prayer;