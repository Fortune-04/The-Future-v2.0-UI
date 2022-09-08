import React, {useState, useEffect} from 'react';

import NetworthFinder from "../Apis/NetworthFinder";

/*Import from Material UI*/
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';

const Home = () => {

    //Keep temporary data from API
    const [total, setTotal] = useState();

    useEffect(() => {

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
        };
    
        fetchData();
    
    },[])

    return(
        <>
        {/* <Stack direction="row" spacing={2}> */}
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Card >
                    <CardHeader
                        title="Total Networth"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {total}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardHeader
                        title="Monthly Income"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            16000
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardHeader
                        title="Total Donation"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            20000
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        {/* </Stack> */}
        <Paper>
        </Paper>
        </>
    )
}

export default Home;