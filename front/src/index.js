import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppComp from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
// import "jquery/dist/jquery.js";
//import "bootstrap/dist/js/bootstrap.min.js";
// import purple from '@material-ui/core/colors/purple';
// import green from '@material-ui/core/colors/green';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//     palette: {
//         primary: purple,
//         secondary: green,
//       },
//       status: {
//         danger: 'orange',
//       },
//       root: {
//         background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//         borderRadius: 3,
//         border: 0,
//         color: 'white',
//         height: 48,
//         padding: '0 30px',
//         boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//       },
// });

// function App() {
//   return (
//     <MuiThemeProvider theme={theme}>
//       <AppComp />
//     </MuiThemeProvider>
//   );
// }

ReactDOM.render(<AppComp />, document.getElementById("root"));

registerServiceWorker();
