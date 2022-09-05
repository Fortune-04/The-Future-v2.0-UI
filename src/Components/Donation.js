import React,{ useState, useEffect } from "react";

/*Call API using Axios*/
import DonationFinder from "../Apis/DonationFinder";

/*Import from Material UI*/
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';

const Donation = () => {

    const [amount_donated, setAmount] = useState();
    const [temp, setTemp] = useState();
    const [toUpdate, setToUpdate] = useState(false);

    const handleSubmit = async(e) =>{
        e.preventDefault()
        let total = temp - amount_donated;
        try {
            const response = await DonationFinder.put(`/update/1`, {amount_donated, total})
            setToUpdate(true);
            setAmount(0);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        const fetchData = async () => {
        try {
            const response = await DonationFinder.get("/")
            console.log(response.data.length);
            setTemp(response.data[0].total);
            setToUpdate(false);
        } catch (err) {
            console.error(err.message);
        }
        };

        fetchData();

    },[toUpdate])

    return(
        <>
        <Box 
            display="flex" 
            height={500} 
        >
            <Box m="auto">
                <Paper elevation={0} sx={{p:2}}>
                    <Typography variant="h2">{temp}</Typography>
                </Paper >
            </Box>
        </Box>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Stack direction="row" spacing={1}>
                <TextField
                    margin="normal"
                    required
                    id="amount"
                    label="Amount"
                    name="amount"
                    value={amount_donated}
                    onChange={e => setAmount(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                >
                    Donate
                </Button>
            </Stack>
        </form>
        </>
    )
}

export default Donation;