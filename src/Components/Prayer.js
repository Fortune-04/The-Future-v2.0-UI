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
// import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import KeyboardDoubleArrowLeftSharpIcon from '@mui/icons-material/KeyboardDoubleArrowLeftSharp';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Prayer = () => {

    // const [data, setData] = useState([]);
    const [fajr, setFajr] = useState();
    const [dhuhr, setDhuhr] = useState();
    const [asr, setAsr] = useState();
    const [maghrib, setMaghrib] = useState();
    const [isha, setIsha] = useState();

    //Snackbar for update
    const [openSnackUp, setOpenSnackUp] = useState(false);
    const handleClickSnackUp = () => {
        setOpenSnackUp(true)
    };
    const handleCloseSnackUp = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenSnackUp(false);
    };

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
            handleClickSnackUp();
            
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
        <>
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
                            style={{ textAlign: 'center' ,backgroundColor: "#64b5f6"}}
                        />
                        <CardContent >
                            <Box 
                                display="flex" 
                            >
                                <Box m="auto">
                                <Typography variant="h2" color="text.secondary" m="auto">
                                    {fajr}
                                </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={() => handleAdd(1)} fullWidth>
                                <KeyboardDoubleArrowLeftSharpIcon />
                            </Button>
                            <Button variant="contained" onClick={() => handleAdd(2)} fullWidth>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </Button>
                            {/* <IconButton onClick={() => handleAdd(1)}>
                                <KeyboardDoubleArrowLeftSharpIcon />
                            </IconButton> */}
                            {/* <IconButton onClick={() => handleAdd(2)}>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </IconButton> */}
                        </CardActions>
                    </Card>
                    <Card sx={{ minWidth: 200 }}>
                        <CardHeader
                            title="Dhuhr"
                            style={{ textAlign: 'center',backgroundColor: "#64b5f6" }}
                        />
                        <CardContent>
                            <Box 
                                display="flex" 
                            >
                                <Box m="auto">
                                <Typography variant="h2" color="text.secondary" m="auto">
                                    {dhuhr}
                                </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={() => handleAdd(3)} fullWidth>
                                <KeyboardDoubleArrowLeftSharpIcon />
                            </Button>
                            <Button variant="contained" onClick={() => handleAdd(4)} fullWidth>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </Button>
                            {/* <IconButton onClick={() => handleAdd(3)}>
                                <KeyboardDoubleArrowLeftSharpIcon/>
                            </IconButton>
                            <IconButton onClick={() => handleAdd(4)}>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </IconButton> */}
                        </CardActions>
                    </Card>
                    <Card sx={{ minWidth: 200 }}>
                        <CardHeader
                            title="Asr"
                            style={{ textAlign: 'center',backgroundColor: "#64b5f6"}}
                        />
                        <CardContent>
                            <Box 
                                display="flex" 
                            >
                                <Box m="auto">
                                <Typography variant="h2" color="text.secondary" m="auto">
                                    {asr}
                                </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={() => handleAdd(5)} fullWidth>
                                <KeyboardDoubleArrowLeftSharpIcon />
                            </Button>
                            <Button variant="contained" onClick={() => handleAdd(6)} fullWidth>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </Button>
                            {/* <IconButton onClick={() => handleAdd(5)}>
                                <KeyboardDoubleArrowLeftSharpIcon/>
                            </IconButton>
                            <IconButton onClick={() => handleAdd(6)}>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </IconButton> */}
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
                            style={{ textAlign: 'center',backgroundColor: "#64b5f6"}}
                        />
                        <CardContent>
                            <Box 
                                display="flex" 
                            >
                                <Box m="auto">
                                <Typography variant="h2" color="text.secondary" m="auto">
                                    {maghrib}
                                </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={() => handleAdd(7)} fullWidth>
                                <KeyboardDoubleArrowLeftSharpIcon />
                            </Button>
                            <Button variant="contained" onClick={() => handleAdd(8)} fullWidth>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </Button>
                            {/* <IconButton onClick={() => handleAdd(7)}>
                                <KeyboardDoubleArrowLeftSharpIcon/>
                            </IconButton>
                            <IconButton onClick={() => handleAdd(8)}>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </IconButton> */}
                        </CardActions>
                    </Card>
                    <Card sx={{ minWidth: 200 }}>
                        <CardHeader
                            title="Isha'a"
                            style={{ textAlign: 'center',backgroundColor: "#64b5f6"}}  
                        />
                        <CardContent>
                            <Box 
                                display="flex" 
                            >
                                <Box m="auto">
                                <Typography variant="h2" color="text.secondary" m="auto">
                                    {isha}
                                </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={() => handleAdd(9)} fullWidth>
                                <KeyboardDoubleArrowLeftSharpIcon />
                            </Button>
                            <Button variant="contained" onClick={() => handleAdd(10)} fullWidth>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </Button>
                            {/* <IconButton onClick={() => handleAdd(9)}>
                                <KeyboardDoubleArrowLeftSharpIcon/>
                            </IconButton>
                            <IconButton onClick={() => handleAdd(10)}>
                                <KeyboardDoubleArrowRightSharpIcon/>
                            </IconButton> */}
                        </CardActions>
                    </Card>
                </Stack>
            </Box>

            <Stack 
                justifyContent="center"
                alignItems="center"
            >
                <Button variant="contained" endIcon={<SyncAltIcon />} sx={{mt: 5}} onClick={handleUpdate}>
                    Update
                </Button>
            </Stack>
            {/* <IconButton sx={{mt: 3}} color="secondary" onClick={handleUpdate}>
                <SyncAltIcon/>
            </IconButton> */}
        </Container>

        {/*Snackbar for updated item*/}
        <Snackbar open={openSnackUp} autoHideDuration={6000} onClose={handleCloseSnackUp}>
            <Alert onClose={handleCloseSnackUp} severity="success" sx={{ width: '100%' }}>
                Successfully update!
            </Alert>
        </Snackbar>
        </>
    )
}

export default Prayer;