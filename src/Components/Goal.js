import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

/*Call API using Axios*/
import GoalFinder from "../Apis/GoalFinder";

/*Import from Material UI*/
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';

/*Import from Material Icons*/
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import DriveFileRenameOutlineSharpIcon from '@mui/icons-material/DriveFileRenameOutlineSharp';


//Progress bar
function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

const Goal = ({type, handleOpenUpdate, handleTaskComplete}) => {

    //Keep temporary data for API
    const [datas, setDatas] = useState([]);

    const fetchData = async () => {
        try {
            const response = await GoalFinder.get(`/${type}`)
            console.log(response.data.length);
            if(response.data.length !==0 ){
                for(let i=0;i<response.data.length;i++){
                    setDatas(data => [...data, response.data[i]])
                }
            }
        } catch (err) {
            console.error(err.message);
        }
        console.log(type)
    };

    useEffect(() => {

        fetchData();
    
    },[])

    return(
        <>
        <Grid container rowSpacing={1} sx={{mt:2}}>
            {datas && datas.map((data) => (
                <Grid item xs={12} key={data.id}>
                <Card  >
                    <Box sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image="goal-image2.jpg"
                        alt="property-image"
                        sx={{ width: 300 }}
                    />
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {data.description}
                        </Typography>
                        <IconButton color="primary" onClick={() => handleOpenUpdate(data.id,data.name,data.description,data.type,data.current)}>
                            <DriveFileRenameOutlineSharpIcon/>
                        </IconButton>
                        <LinearProgressWithLabel value={data.current/data.target*100} />
                    </CardContent>
                    <CardActions>
                        <IconButton sx={{marginLeft: 'auto'}} aria-label="delete-goal-button" color="success" onClick={() => handleTaskComplete(data.id)}>
                            <TaskAltSharpIcon/>
                        </IconButton>
                    </CardActions>
                    </Box>
                </Card>
                </Grid>
            ))}
        </Grid>
        </>
    )

}

export default Goal;