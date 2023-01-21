import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/*Import from Material UI*/
import { ThemeProvider, createTheme } from '@mui/material/styles';

// import './App.css';
import Networth from './Components/Networth';
import GoalNav from './Components/GoalNav';
import Donation from './Components/Donation';
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import Property from "./Components/Property";
import Investment from "./Components/Investment";
import Prayer from "./Components/Prayer";
import Surah from "./Components/Surah";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0582CA'
    },
    secondary: {
      main: '#64b5f6'
    }
  },
  typography: {
    fontFamily: '"Segoe UI"',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='networth' element={<Networth/>}/>
            <Route path='investment' element={<Investment/>}/>
            <Route path='goal' element={<GoalNav/>}/>
            <Route path='property' element={<Property/>}/>
            <Route path='prayer' element={<Prayer/>}/>
            <Route path='surah' element={<Surah/>}/>
            <Route path='donation' element={<Donation/>}/>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
