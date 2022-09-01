import React,{ useState, useEffect } from "react";

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

const createData = (name, page) =>{
    return {name, page};
}

const exampleSurah =[
    createData("Al-Iknsan", 24),
    createData("Al-Fatihah", 123),
    createData("Al-Ikhlas", 112), 
]


const Property = () => {

    const [name, setName] = useState("");
    const [page, setPage] = useState();
    const [datas, setDatas] = useState();

    const handleSubmit = () =>{
        
    }

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
            </TableRow>
            </TableHead>
            <TableBody>
            {/* {datas && datas.map((data) => (
                <StyledTableRow key={data.id}>
                <StyledTableCell component="th" scope="row">
                    {data.name}
                </StyledTableCell>
                <StyledTableCell align="right">{data.page}</StyledTableCell>
                </StyledTableRow>
            ))} */}
            {exampleSurah && exampleSurah.map((example) => (
                <StyledTableRow key={example.name}>
                <StyledTableCell component="th" scope="row">
                    {example.name}
                </StyledTableCell>
                <StyledTableCell align="right">{example.page}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
            </Table>
            </TableContainer>
        </>
    )
}

export default Property;