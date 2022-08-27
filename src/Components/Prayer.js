import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';

const Prayer = () => {

    return(
        <Container>
            <Box
                display="flex"  
            >
                <Box m="auto">
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                    <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        title="200"
                    />
                        <CardContent >
                            <Box
                                display="flex"  
                            >
                                <Box m="auto">
                                    <Typography variant="h5">
                                        Fajr
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={2}>
                    <Paper variant="outlined">
                        <Typography>Dhuhr</Typography>
                    </Paper>
                    </Grid>
                    <Grid item xs={2}>
                    <Paper variant="outlined">
                        <Typography>Asr</Typography>
                    </Paper>
                    </Grid>
                    <Grid item xs={2}>
                    <Paper variant="outlined">
                        <Typography>Maghrib</Typography>
                    </Paper>
                    </Grid>
                    <Grid item xs={2}>
                    <Paper variant="outlined">
                        <Typography>Isha'a</Typography>
                    </Paper>
                    </Grid>
                </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Prayer;