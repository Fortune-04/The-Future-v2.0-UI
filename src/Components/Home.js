import React, {useState, useEffect} from 'react';

import NetworthFinder from "../Apis/NetworthFinder";
import DonationFinder from '../Apis/DonationFinder';
import HomeFinder from '../Apis/HomeFinder';

/*Import from Material UI*/
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import LineChart from './LineChart';
import IconButton from '@mui/material/IconButton';
import SyncSharpIcon from '@mui/icons-material/SyncSharp';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

//Style for modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Home = () => {

    //Keep temporary data from API
    const [total_networth, setTotal] = useState();
    const [donation, setDonation] = useState();
    const [income, setIncome] = useState();
    const [preNetworth, setPreNetworth] = useState();
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);

    //To open and close delete confirmation modal
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const handleOpenUpdateModal = () => {
        setOpenUpdateModal(true)
    }
    const handleCloseUpdateModal = () => setOpenUpdateModal(false);

    const handleUpdate = async () => {
        let monthly_income = total_networth - preNetworth;
        try {
            const body = {total_networth, monthly_income};
            const response = await fetch(
                "http://127.0.0.1:8000/api/home/create",
                {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
                }
            );
            console.log(response);
            fetchData()
            setXAxis([])
            setYAxis([])

        } catch (err) {
          console.error(err.message);
        }
        setOpenUpdateModal(false)
    }

    const fetchData = async () => {
        try {
            const response = await NetworthFinder.get("/")
            let totalValue = 0;
            if(response.data.length !==0 ){
            for(let i=0;i<response.data.length;i++){
                if(response.data[i].invest == false){
                    totalValue = totalValue + response.data[i].values
                }
            }
            setTotal(totalValue)
            }
        } catch (err) {
            console.error(err.message);
        }

        try {
            const response = await DonationFinder.get("/")
            console.log(response.data.length);
            setDonation(response.data[0].amount_donated);
        } catch (err) {
            console.error(err.message);
        }

        try {
            const response = await HomeFinder.get("/")
            console.log(response.data.length);
            setPreNetworth(response.data[response.data.length-1].total_networth);
            setIncome(response.data[response.data.length-1].monthly_income);
            if(response.data.length !==0 ){
                for(let i=0;i<response.data.length;i++){
                    // let date = response.data[i].updated_at.split("T").pop();
                    let date = response.data[i].updated_at.substring(0, response.data[i].updated_at.length - 17);;
                    console.log(date)
                    setXAxis(data => [...data, date])
                    setYAxis(data => [...data, response.data[i].total_networth])
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {

        fetchData();
    
    },[])

    return(
        <>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Card sx={{minHeight:125}}>
                    <CardHeader
                        title="Total Networth"
                    />
                    <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {total_networth}
                            </Typography>
                        </CardContent>
                        <IconButton color="primary" aria-label="add to shopping cart" sx={{p:2}} onClick={handleOpenUpdateModal}>
                            <SyncSharpIcon />
                        </IconButton>
                    </Stack>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{minHeight:125}}>
                    <CardHeader
                        title="Monthly Income"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {income}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{minHeight:125}}>
                    <CardHeader
                        title="Total Donation"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {donation}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

        <Paper sx={{mt:2}}>
            <LineChart xAxis={xAxis} yAxis={yAxis}/>
        </Paper>

        {/*Modal for Delete confirmation*/}
        <Modal
            open={openUpdateModal}
            >
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Are you sure you want to update the data?
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <Stack direction="row" spacing={1} sx={{mt:2}} >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleUpdate}
                        >
                            Confirm
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleCloseUpdateModal}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
        </>
    )
}

export default Home;