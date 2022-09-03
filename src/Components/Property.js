import React,{ useState, useEffect } from "react";

/*Call API using Axios*/
import PropertyFinder from "../Apis/PropertyFinder";

/*Import from Material UI*/
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Property = () => {

    return(
        <>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 250 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="logo192.png"
                        alt="testing"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 250 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="logo192.png"
                        alt="testing"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 250 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="logo192.png"
                        alt="testing"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 250 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="logo192.png"
                        alt="testing"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        </>
    )
}

export default Property;