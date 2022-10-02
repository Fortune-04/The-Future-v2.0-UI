import React,{ useState, useEffect } from "react";

/*Call API using Axios*/
import DonationFinder from "../Apis/DonationFinder";

/*Import from Material UI*/
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

const Donation = () => {

    const [amount2, setAmount2] = useState();
    const [amount, setAmount] = useState();
    const [temp, setTemp] = useState();
    // const [date, setDate] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault()

        let total = temp - amount;
        let amount_donated = parseInt(amount2)+parseInt(amount);
        console.log("amounts23: ", amount_donated)

        try {
            await DonationFinder.put(`/update/1`, {amount, amount_donated, total})
            setAmount(0);
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }

    const fetchData = async () => {
        try {
            const response = await DonationFinder.get("/")
            console.log(response.data.length);
            setTemp(response.data[0].total);
            calculateHour(response.data[0].updated_at)
            setAmount2(response.data[0].amount_donated)
        } catch (err) {
            console.error(err.message);
        }
    };

    const calculateHour = (pastDate) => {
        let today = new Date();
        let past = new Date(pastDate);
        let timeDif = (today - past)/3600000;

        // if(timeDif > 24){

        // }

    }

    useEffect(() => {

        fetchData();

    },[])

    console.log("amount", amount);
    console.log("amountdoanated", amount2);

    return(
        <>
        <Box 
            display="flex" 
            height={500} 
        >
            <Box m="auto">
                {/* <Paper  sx={{
                            backgroundImage: 'url(/donate-image.gif)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundPosition: 'center',
                            width: 400,
                            height: 400,
                        }}
                    >

                        

                </Paper> */}
                <Paper elevation={0} sx={{p:2}}>
                    <Typography variant="h2">{temp}</Typography>
                </Paper >
                
            </Box>
        </Box>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Stack
                direction="row"
                justifyContent="center"
                // alignItems="center"
                spacing={1}>
                <TextField
                    required
                    id="amount"
                    label="Amount"
                    name="amount"
                    value={amount}
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