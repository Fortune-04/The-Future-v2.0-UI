import React,{ useState, useEffect } from "react";

/*Call API using Axios*/
import GoalFinder from "../Apis/GoalFinder";

/*Import from Material UI*/
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

/*Import from Material Icons*/
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';

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

const Goal = () => {

    //To open and close add modal
    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    //Keep temporary data for API
    const [datas, setDatas] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    // const [id, setId] = useState();

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const body = {name, description};
            const response = await fetch(
                "http://127.0.0.1:8000/api/goal/create",
                {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
                }
            );
            console.log(response);
            setOpenAdd(false)
            setName("")
            setDescription("")
            setDatas([])
            fetchData();
          
        } catch (err) {
          console.error(err.message);
        }
    }

    const fetchData = async () => {
        try {
            const response = await GoalFinder.get("/")
            console.log(response.data.length);
            if(response.data.length !==0 ){
                for(let i=0;i<response.data.length;i++){
                    setDatas(data => [...data, response.data[i]])
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
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{mb:1}}
        >
            <Typography>Goal</Typography>
            <Button onClick={handleOpenAdd} variant="contained" startIcon={<AddSharpIcon />}>
                Goal
            </Button>
        </Stack>
        <Divider/>
        <Grid container rowSpacing={1} sx={{mt:2}}>
        {datas && datas.map((data) => (
            <Grid item xs={12} key={data.id}>
            <Card >
                <CardMedia
                    component="img"
                    height="100"
                    image="logo192.png"
                    alt="property-image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {data.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton sx={{marginLeft: 'auto'}} aria-label="delete-goal-button">
                        <DeleteOutlineSharpIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
        ))} 
        </Grid>

        {/*Modal for Add*/}
        <Modal
            open={openAdd}
        >
        <Box sx={style}>
            <Typography variant="h6" component="h2">
            Add Goal
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <Stack direction="row" spacing={1} sx={{mt:2}} >
            <Button
                type="submit"
                fullWidth
                variant="contained"
            >
                Confirm
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleCloseAdd}
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

export default Goal;