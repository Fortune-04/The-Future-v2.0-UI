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
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

/*Import from Material Icons*/
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';

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

const Property = () => {

    //To open and close add modal
    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    //To open and close update modal
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = (id,name,description) => {
        setId(id)
        setName(name)
        setDescription(description)
        setOpenUpdate(true)
    }
    const handleCloseUpdate = () => {
        // setId()
        setName("")
        setDescription("")
        setOpenUpdate(false)
    }

    //To open and close delete confirmation modal
    const [openDelModal, setOpenDelModal] = useState(false);
    const handleOpenDelModal = (id) => {
        setId(id)
        setOpenDelModal(true)
    }
    const handleCloseDelModal = () => setOpenDelModal(false);

    //Keep temporary data for API
    const [datas, setDatas] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [id, setId] = useState();

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const body = {name, description};
            const response = await fetch(
                "http://127.0.0.1:8000/api/property/create",
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

    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const response = await PropertyFinder.put(`/update/${id}`, {name, description})
            setDatas([])
            fetchData()
        } catch (error) {
            console.log(error)
        }
        setOpenUpdate(false)
    }
    
    const handleDelete = async() => {
        try{
            const response = await PropertyFinder.delete(`/delete/${id}`)
            setDatas(datas.filter(data => {
                return data.id !== id
            }))
            console.log(response);
            setOpenDelModal(false)
            // setOpenSnackDel(true)
        } catch(err){
            console.log(err)
        }
    }

    const fetchData = async () => {
        try {
            const response = await PropertyFinder.get("/")
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
            <Typography>My Precious Properties</Typography>
            <Button onClick={handleOpenAdd} variant="contained" startIcon={<AddSharpIcon />}>
                Property
            </Button>
        </Stack>
        <Divider/>
        <Grid container rowSpacing={1} sx={{mt:2}} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {datas && datas.map((data) => (
            <Grid item xs={3} key={data.id}>
            <Card >
                <CardMedia
                    component="img"
                    height="140"
                    image="property.jpg"
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
                <CardActions disableSpacing>
                    <IconButton color="primary" aria-label="edit-property-button" onClick={() => handleOpenUpdate(data.id, data.name, data.description)}>
                        <ModeEditSharpIcon/>
                    </IconButton>
                    <IconButton sx={{marginLeft: 'auto'}} color="error" aria-label="delete-property-button" onClick={() => handleOpenDelModal(data.id)}>
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
            Add Property
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

        {/*Modal for Update*/}
        <Modal
            open={openUpdate}
        >
        <Box sx={style}>
            <Typography variant="h6" component="h2">
                Update Property
            </Typography>
            <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 1 }}>
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
                onClick={handleCloseUpdate}
            >
                Cancel
            </Button>
            </Stack>
            </Box>
        </Box>
        </Modal>

        {/*Modal for Delete confirmation*/}
        <Modal
            open={openDelModal}
            // onClose={handleClose}
        >
        <Box sx={style}>
            <Typography variant="h6" component="h2">
            Are you sure you want to delete?
            </Typography>
            <Box sx={{ mt: 1 }}>
            <Stack direction="row" spacing={1} sx={{mt:2}} >
                <Button
                type="submit"
                fullWidth
                variant="contained"
                // sx={{ mt: 3, mb: 2 }}
                onClick={handleDelete}
                >
                Confirm
                </Button>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                // sx={{ mt: 3, mb: 2 }}
                onClick={handleCloseDelModal}
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

export default Property;