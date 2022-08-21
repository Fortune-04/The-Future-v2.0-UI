import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/*Import from Material UI*/
import { ThemeProvider, createTheme } from '@mui/material/styles';

// import './App.css';
import Networth from './Components/Networth';
import Goal from './Components/Goal';
import Donation from './Components/Donation';
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import Property from "./Components/Property";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0582CA'
    },
    secondary: {
      main: '#64b5f6'
    }
  },
  // typography: {
  //   fontFamily: 'Quicksand',
  //   fontWeightLight: 400,
  //   fontWeightRegular: 500,
  //   fontWeightMedium: 600,
  //   fontWeightBold: 700,
  // }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='networth' element={<Networth/>}/>
            <Route path='goal' element={<Goal/>}/>
            <Route path='property' element={<Property/>}/>
            <Route path='donation' element={<Donation/>}/>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
