import React,{ useState, useEffect } from "react";

import NetworthFinder from "../Apis/NetworthFinder";

/*Import from Material UI*/
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


//Table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

//Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

const Networth = () => {

  //To open and close add modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //To open and close update modal
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = (id,name,value,exvalue,invest) => {
    setId(id)
    setName(name)
    setValue(value)
    setexvalue(exvalue)
    setInvest(invest)
    setOpenUpdate(true)
  }
  const handleCloseUpdate = () => {
    setId()
    setName("")
    setValue()
    setOpenUpdate(false)
  }

  //To open and close delete confirmation modal
  const [openDelModal, setOpenDelModal] = useState(false);
  const handleOpenDelModal = (id) => {
    setId(id)
    setOpenDelModal(true)
  }
  const handleCloseDelModal = () => setOpenDelModal(false);

  //Snackbar for update
  const [openSnackUp, setOpenSnackUp] = useState(false);
  const handleClickSnackUp = () => {
    setOpenSnackUp(true)
  };
  const handleCloseSnackUp = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackUp(false);
  };

  //Snackbar for delete
  const [openSnackDel, setOpenSnackDel] = useState(false);
  const handleClickSnackDel = () => {
    setOpenSnackDel(true)
  };
  const handleCloseSnackDel = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackDel(false);
  };

  //Keep temporary data from API
  const [datas, setDatas] = useState([]);
  const [names, setName] = useState("");
  const [values, setValue] = useState();
  const [exvalue, setexvalue] = useState();
  const [invest, setInvest] = useState();
  const [id, setId] = useState();

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      const body = {names, values, exvalue, invest};
      const response = await fetch(
        "http://127.0.0.1:8000/api/networth/create",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      console.log(response);
      setOpen(false)
      
    } catch (err) {
        console.error(err.message);
    }
  }	


  const handleDelete = async() => {
    try{
      const response = await NetworthFinder.delete(`/delete/${id}`)
      setDatas(datas.filter(data => {
        return data.id !== id
      }))
      console.log(response);
      setOpenDelModal(false)
      setOpenSnackDel(true)
    } catch(err){
      console.log(err)
    }
  }

  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
        const response = await NetworthFinder.put(`/update/${id}`, {names, values, exvalue, invest})
    } catch (error) {
        console.log(error)
    }
    setOpenUpdate(false)
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await NetworthFinder.get("/")
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

    fetchData();

  },[])

  console.log(names)
  console.log(values)
  console.log(id)
  console.log(exvalue)
  console.log(invest)

  return(
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
        <TableRow>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell align="right">Value</StyledTableCell>
          <StyledTableCell align="right">Edit</StyledTableCell>
          <StyledTableCell align="right">Delete</StyledTableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {datas && datas.map((data) => (
          <StyledTableRow key={data.id}>
          <StyledTableCell component="th" scope="row">
              {data.names}
          </StyledTableCell>
          <StyledTableCell align="right">{data.values}</StyledTableCell>
          {/* <StyledTableCell align="right">
            <Stack direction="row-reverse" spacing={1} >
              <IconButton onClick={handleOpenUpdate} color="secondary" aria-label="add an alarm">
                <EditSharpIcon />
              </IconButton>
              <IconButton color="primary" aria-label="add to shopping cart">
                <DeleteSharpIcon />
              </IconButton>
            </Stack>
          </StyledTableCell> */}
          <StyledTableCell align="right">
            <IconButton onClick={() => handleOpenUpdate(data.id, data.names, data.values, data.exvalue, data.invest)} color="secondary" aria-label="add an alarm">
              <EditSharpIcon />
            </IconButton>
          </StyledTableCell>
          <StyledTableCell align="right">
            <IconButton onClick={() => handleOpenDelModal(data.id)} color="primary" aria-label="add to shopping cart">
              <DeleteSharpIcon />
            </IconButton>
          </StyledTableCell>
          </StyledTableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Box
      display="flex" 
      sx={{mt:2}} 
    >
      <Box m="auto">
        <Stack direction="row" spacing={1} >
          <Button onClick={handleOpen} variant="contained">Add</Button>
          <Button variant="contained">Update</Button>
        </Stack>
      </Box>
    </Box>
    
    {/*Modal for Add*/}
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Wealth
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={names}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="value"
            label="Value"
            id="value"
            value={values}
            onChange={e => setValue(e.target.value)}
            autoComplete="current-password"
            InputProps={{
              startAdornment: <InputAdornment position="start">MYR</InputAdornment>,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="exvalue"
            label="Expected Value"
            id="exvalue"
            value={exvalue}
            onChange={e => setexvalue(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">MYR</InputAdornment>,
            }}
          />
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="invest-id">Investment?</InputLabel>
            <Select
              labelId="invest-id"
              id="demo-simple-select"
              value={invest}
              label="Investment?"
              onChange={e => setInvest(e.target.value)}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" spacing={1} sx={{mt:2}} >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // sx={{ mt: 3, mb: 2 }}
            // onClick={handleClose}
          >
            Confirm
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // sx={{ mt: 3, mb: 2 }}
            onClick={handleClose}
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
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Wealth
        </Typography>
        <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={names}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="value"
            label="Value"
            id="value"
            value={values}
            onChange={e => setValue(e.target.value)}
            autoComplete="current-password"
            InputProps={{
              startAdornment: <InputAdornment position="start">MYR</InputAdornment>,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="exvalue"
            label="Expected Value"
            id="exvalue"
            value={exvalue}
            onChange={e => setexvalue(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">MYR</InputAdornment>,
            }}
          />
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="invest-id">Investment?</InputLabel>
            <Select
              labelId="invest-id"
              id="demo-simple-select"
              value={invest}
              label="Investment?"
              onChange={e => setInvest(e.target.value)}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" spacing={1} sx={{mt:2}} >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // sx={{ mt: 3, mb: 2 }}
              onClick={handleClickSnackUp}
            >
              Confirm
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // sx={{ mt: 3, mb: 2 }}
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
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
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

    {/*Snackbar for updated item*/}
    <Snackbar open={openSnackUp} autoHideDuration={6000} onClose={handleCloseSnackUp}>
      <Alert onClose={handleCloseSnackUp} severity="success" sx={{ width: '100%' }}>
        Successfully update!
      </Alert>
    </Snackbar>

    {/*Snackbar for deleted item*/}
    <Snackbar open={openSnackDel} autoHideDuration={6000} onClose={handleCloseSnackDel}>
      <Alert onClose={handleCloseSnackDel} severity="success" sx={{ width: '100%' }}>
        Successfully delete!
      </Alert>
    </Snackbar>
    </>
  );
}

export default Networth;