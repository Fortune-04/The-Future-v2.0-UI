import React,{ useState, useEffect } from "react";

import SurahFinder from "../Apis/SurahFinder";

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
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/*Import from Material Icons*/
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';

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

const Property = () => {

    /*DELETE*/
    //To open and close delete confirmation modal
    const [openDelModal, setOpenDelModal] = useState(false);

    const handleOpenDelModal = (id) => {
        setId(id)
        setOpenDelModal(true)
    }

    const handleCloseDelModal = () => setOpenDelModal(false);

    //Snackbar for delete
    const [openSnackDel, setOpenSnackDel] = useState(false);

    // const handleClickSnackDel = () => {
    //     setOpenSnackDel(true)
    // };

    const handleCloseSnackDel = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenSnackDel(false);
    };

    //Keep temporary data from API
    const [name, setName] = useState("");
    const [page, setPage] = useState();
    const [datas, setDatas] = useState([]);
    const [id, setId] = useState();

    //Create Data
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const body = {name, page};
            const response = await fetch(
                "http://127.0.0.1:8000/api/surah/create",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
            console.log(response)
            setDatas([])
            setName("")
            setPage()
            fetchData();
            
        } catch (err) {
            console.error(err.message);
        }
    }

    //Delete Data
    const handleDelete = async() => {
        try{
            const response = await SurahFinder.delete(`/delete/${id}`)
            setDatas(datas.filter(data => {
                return data.id !== id
            }))
            console.log(response)
            setOpenDelModal(false)
            setOpenSnackDel(true)
            } catch(err){
            console.log(err)
        }
    }

    const fetchData = async () => {
        try {
            const response = await SurahFinder.get("/")
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

    //Display data
    useEffect(() => {

        fetchData();

    }, [])
    

    return(
        <>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Stack direction="row" spacing={1}>
                    <TextField
                        margin="normal"
                        required
                        // fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        // fullWidth
                        name="page"
                        label="Page"
                        id="page"
                        value={page}
                        onChange={e => setPage(e.target.value)}
                    />
                    <Button
                        type="submit"
                        // fullWidth
                        variant="contained"
                    >
                        Save
                    </Button>
                </Stack>
            </form>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Surah</StyledTableCell>
                            <StyledTableCell align="right">Page</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datas && datas.map((data) => (
                            <StyledTableRow key={data.id}>
                            <StyledTableCell component="th" scope="row">
                                {data.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{data.page}</StyledTableCell>
                            <StyledTableCell align="right">
                                <IconButton onClick={() => handleOpenDelModal(data.id)} color="primary" aria-label="delete surah">
                                    <DeleteSharpIcon/>
                                </IconButton>
                            </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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

            {/*Snackbar for deleted item*/}
            <Snackbar open={openSnackDel} autoHideDuration={6000} onClose={handleCloseSnackDel}>
            <Alert onClose={handleCloseSnackDel} severity="success" sx={{ width: '100%' }}>
                Successfully delete!
            </Alert>
            </Snackbar>
        </>
    )
}

export default Property;