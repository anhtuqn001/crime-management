import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

import NavigationBar from './NavigationBar.js';
import MainContent from './MainContent.js';
import LoginPage from './LoginPage.js';
import SignUpPage from './SignUpPage.js';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter,
    useHistory
} from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';



const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#1565c0"
        }
    },
});

function MainPage() {
    const [auth, setAuth] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);
    const [tendangnhap, setTendangnhap] = useState('');
    const [idTaikhoan, setIdTaikhoan] = useState('');
    let history = useHistory();

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            fetch("/api/user", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((res) => {
                    if (!res.ok) return Promise.reject(res);
                    return res.json();
                })
                .then((result) => {
                    if (result.success) {
                        setAuth(true);
                        setTendangnhap(result.user.name);
                        setIdTaikhoan(result.user.id);
                    }
                })
                .catch((err) => {
                    if (err.status == 401) {
                        setAuth(false);
                        localStorage.removeItem("token");
                        history.push('/dangnhap');
                    }
                })
                .then(() => setIsTokenValidated(true));
        } else {
            history.push('/dangnhap');
        }
    }, [])

    if (!isTokenValidated) {
        return (<LinearProgress />);
    }

    return (
        <div>
            <NavigationBar tendangnhap={tendangnhap} idTaikhoan={idTaikhoan}/>
            <MainContent history={history} />
        </div>
    );
}

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <MainPage />
                </Route>
                <Route path="/dangky">
                    <SignUpPage />
                </Route>
                <Route path="/dangnhap">
                    <LoginPage />
                </Route>

            </Switch>
        </Router>
    );
}

export default App;

if (document.getElementById('example')) {
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
        , document.getElementById('example'));
}
