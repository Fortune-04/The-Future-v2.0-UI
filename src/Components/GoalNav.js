import React,{ useState, useEffect } from "react";
import PropTypes from 'prop-types';

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
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import LinearProgress from '@mui/material/LinearProgress';

/*Import from Material Icons*/
import AddSharpIcon from '@mui/icons-material/AddSharp';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import DriveFileRenameOutlineSharpIcon from '@mui/icons-material/DriveFileRenameOutlineSharp';

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

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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

const GoalNav = () => {

    //Tab
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //To open and close add modal
    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    //To open and close Complete Modal
    const [openComp, setOpenComp] = useState(false);
    const handleCloseComp = () => setOpenComp(false);

    //To open and close update modal
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = (id,name,description,type,current) => {
        setId(id)
        setName(name)
        setDescription(description)
        setType(type)
        setCurrent(current)
        setOpenUpdate(true)
    }
    const handleCloseUpdate = () => {
        setName("")
        setDescription("")
        setType("")
        setCurrent("")
        setOpenUpdate(false)
    }

    //Progress Bar
    const [progress, setProgress] = useState(0);
    
    //Keep temporary data for API
    const [datas, setDatas] = useState([]);
    const [id, setId] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [current, setCurrent] = useState(0);
    const [target, setTarget] = useState(0);

    const handleTaskComplete = async(id) => {
        try{
            const response = await GoalFinder.delete(`/delete/${id}`)
            setDatas(datas.filter(data => {
                return data.id !== id
            }))
            console.log(response);
            setOpenComp(true)

        } catch(err){
            console.log(err)
        }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const body = {name, description, type, current, target};
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
            setType("")
            setCurrent("")
            setTarget("")
            setDatas([])
            fetchData();
          
        } catch (err) {
          console.error(err.message);
        }
    }

    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const response = await GoalFinder.put(`/update/${id}`, {name, description, type, current})
            setDatas([])
            fetchData()
        } catch (error) {
            console.log(error)
        }
        setOpenUpdate(false)
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

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //       setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    //     }, 800);
    //     return () => {
    //       clearInterval(timer);
    //     };
    // }, []);

    return(
        <>
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{mb:1}}
        >
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Ultimate" {...a11yProps(0)} />
                <Tab label="Normie" {...a11yProps(1)} />
                <Tab label="Knowledge" {...a11yProps(2)} />
                <Tab label="Game" {...a11yProps(3)} />
            </Tabs>
            <Button onClick={handleOpenAdd} variant="contained" startIcon={<AddSharpIcon />}>
                Goal
            </Button>
        </Stack>
        <Divider/>
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
                label="Goal"
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
            <FormControl margin="normal" fullWidth required>
                <InputLabel id="type-user">Type</InputLabel>
                <Select
                    labelId="type-user"
                    id="type"
                    value={type}
                    label="Type"
                    onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem value={"ultimate"}>Ultimate</MenuItem>
                    <MenuItem value={"normie"}>Normie</MenuItem>
                    <MenuItem value={"knowledge"}>Knowledge</MenuItem>
                    <MenuItem value={"game"}>Game</MenuItem>
                </Select>
            </FormControl>
            <Stack direction="row" spacing={1} sx={{mt:2}} >
            <TextField
                required
                fullWidth
                name="current"
                label="Current"
                id="current"
                value={current}
                onChange={e => setCurrent(e.target.value)}
            />
            <TextField
                required
                fullWidth
                name="target"
                label="Target"
                id="target"
                value={target}
                onChange={e => setTarget(e.target.value)}
            />
            </Stack>
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

        {/*Modal for Update*/}
        <Modal
            open={openUpdate}
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Update Goal
                </Typography>
                <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Goal"
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
                    <FormControl margin="normal" fullWidth required>
                        <InputLabel id="type-user">Type</InputLabel>
                        <Select
                            labelId="type-user"
                            id="type"
                            value={type}
                            label="Type"
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value={"ultimate"}>Ultimate</MenuItem>
                            <MenuItem value={"normie"}>Normie</MenuItem>
                            <MenuItem value={"knowledge"}>Knowledge</MenuItem>
                            <MenuItem value={"game"}>Game</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="current"
                        label="Current"
                        id="current"
                        value={current}
                        onChange={e => setCurrent(e.target.value)}
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
                            onClick={handleCloseUpdate}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>

        {/*Modal for Complete*/}
        <Modal
            open={openComp}
        >
        <Box sx={style}>
            <Typography variant="h6" component="h2">
                Congratulations! You have completed one of your goal.
            </Typography>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt:2}}
                onClick={handleCloseComp}
            >
                Confirm
            </Button>
        </Box>
        </Modal>
        </>
    )
}

export default GoalNav;