import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo1 from '../../../public/images/logo1.png';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useHistory } from "react-router-dom";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Bản quyền © '}
      <Link color="inherit" href="https://material-ui.com/">
        Lihanet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loader: {
    color: 'white'
  }
}));

function LoginPage() {
  const classes = useStyles();
  const [tendangnhap, setTendangnhap] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setLoader] = useState();
  const [isErrorShowed, setError] = useState(false);
  let history = useHistory();

  function handleTendangnhapChange(e) {
    e.preventDefault();
    setTendangnhap(e.target.value);
  }

  function handlePasswordChange(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function doLogin(e) {
    e.preventDefault();
    setLoader(true);
    let data = {
      tendangnhap,
      password
    }
    fetch('/api/login', {
      method: 'post',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) return Promise.reject(response);
        return response.json();
      })
      .then((resData) => {
        console.log(resData);
        localStorage.setItem('token', resData['access_token']);
        history.push('/');
        setLoader(false);
      })
      .catch((error) => {
        if(error.status == 401){
        setError(true);
        }
        setLoader(false);
      });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <IconButton edge="start" color="inherit" aria-label="menu">
          <img src={logo1} style={{ width: '75px', height: '75px' }} />
        </IconButton>
        <Typography component="h1" variant="h5">
          PHẦN MỀM QUẢN LÝ ĐỐI TƯỢNG
        </Typography>
        <Box mt={2}>
          <Typography component="h1" variant="h5" color="primary">
            ĐĂNG NHẬP
          </Typography>
        </Box>
        <form className={classes.form} noValidate onSubmit={doLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Tên Đăng Nhập"
            autoFocus
            onChange={handleTendangnhapChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Mật Khẩu"
            type="password"
            onChange={handlePasswordChange}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Ghi Nhớ"
          /> */}
          {isErrorShowed
           ? <Alert variant="filled" severity="error">
            Tên đăng nhập hoặc mật khẩu không đúng — <strong>Vui lòng kiểm tra lại!</strong>
          </Alert> : ''}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} className={classes.loader} /> : "Đăng Nhập"}
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default LoginPage;