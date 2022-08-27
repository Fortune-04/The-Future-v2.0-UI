import { useState, useEffect } from "react";
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


const Investment = () => {

    //Keep temporary data from API
    const [datas, setDatas] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
        try {
          const response = await NetworthFinder.get("/")
          if(response.data.length !==0 ){
            for(let i=0;i<response.data.length;i++){
              if(response.data[i].invest == true){
                  setDatas(data => [...data, response.data[i]])
              }
            }
          }
        } catch (err) {
            console.error(err.message);
        }
        };

        fetchData();

    },[])

    return(
        <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Value</StyledTableCell>
              <StyledTableCell align="right">Capital</StyledTableCell>
              <StyledTableCell align="right">Profit</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {datas && datas.map((data) => (
              <StyledTableRow key={data.id}>
              <StyledTableCell component="th" scope="row">
                  {data.names}
              </StyledTableCell>
              <StyledTableCell align="right">{data.values}</StyledTableCell>
              <StyledTableCell align="right">{data.exvalue}</StyledTableCell>
              <StyledTableCell align="right">{data.values-data.exvalue}</StyledTableCell>
              </StyledTableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
        </>
    );
}

export default Investment;