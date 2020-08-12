import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import viLocale from "date-fns/locale/vi";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {convertToRightDate} from '../Utilities/utils.js';


const defaultMaterialTheme = createMuiTheme({
  spacing: 2,
});

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: 'white',
    color: 'green',
    borderColor: 'green'
  },
  loader: {
    color: 'green'
  },
  root: {
    "&$selected": {
      outline: 0
    }
  },
  selected: {},
  addButton: {
    color: 'green'
  }
}));


function TabPanel(props) {
  const { children, value, index } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const CreateDialog = React.memo(({ isOpen, hideCreateDialog, showSuccessSnackBar, prependDoituong }) => {
  console.log('abc');
  const classes = useStyles();

  const [ngaysinh, setNgaysinh] = useState(new Date());
  const [isLoading, setLoader] = useState(false);

  const hovatenInputRef = useRef();
  const tenthuonggoiInputRef = useRef();
  const gioitinhnamInputRef = useRef();
  const gcnthanInputRef = useRef();
  const nhanthanInputRef = useRef();
  const ghichuInputRef = useRef();
  const hinhanhInputRef = useRef();


  function submitInputs(event) {
    event.preventDefault();
    setLoader(true);
    var data = new FormData();
    data.append('hovaten', hovatenInputRef.current.value);
    data.append('tenthuonggoi', tenthuonggoiInputRef.current.value);
    data.append('ngaysinh', convertToRightDate(ngaysinh).toISOString().slice(0, 10));
    data.append('gioitinhnam', gioitinhnamInputRef.current.checked);
    data.append('gcnthan', gcnthanInputRef.current.value);
    data.append('nhanthan', nhanthanInputRef.current.value);
    data.append('ghichu', ghichuInputRef.current.value);
    hinhanhInputRef.current.hinhanh.filter(i => i != null).forEach(i => {
      data.append('hinhanh[]', i);
    })
    hinhanhInputRef.current.hinhanh.forEach((item, index) => {
      if(item != null) {
        data.append('thoigian[]', convertToRightDate(hinhanhInputRef.current.times[index]).toISOString().slice(0, 10));
      }
    })

    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    fetch('/api/doituong', {
      method: 'post',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: data
    })
      .then((response) => response.json())
      .then((data) => {
        setLoader(false);
        hideCreateDialog();
        showSuccessSnackBar("Tạo mới đối tượng thành công !");
        prependDoituong(data.success);
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  }


  return (
    <Dialog open={isOpen} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
      <DialogTitle id="form-dialog-title">Tạo Mới Đối Tượng</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item sm={6} >
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              label="Họ Tên"
              type="text"
              fullWidth
              inputRef={hovatenInputRef}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              variant="outlined"
              margin="dense"
              label="Tên Thường Gọi"
              type="text"
              fullWidth
              inputRef={tenthuonggoiInputRef}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <ThemeProvider theme={defaultMaterialTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Ngày Sinh"
                  format="dd/MM/yyyy"
                  padding="small"
                  margin="dense"
                  onChange={(date) => {
                    setNgaysinh(date);
                  }}
                  value={ngaysinh}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </Grid>
          {/* <Grid item sm={2}>

          </Grid> */}
          <Grid item sm={6}>
            <Grid item xs={4}>
              <Typography variant="body2">
                Giới Tính:
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                    style={{ padding: '4px', paddingLeft: '15px' }}
                    value="Nam"
                    inputRef={gioitinhnamInputRef}
                  />
                }
                label="Nam"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <InputLabel htmlFor="my-input">GCNTH Án</InputLabel>
            <OutlinedInput
              multiline
              rows={2}
              rowsMax={4}
              color="primary"
              fullWidth
              notched={false}
              inputRef={gcnthanInputRef}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <InputLabel htmlFor="my-input">Nhân Thân</InputLabel>
            <OutlinedInput
              multiline
              rows={2}
              rowsMax={4}
              color="primary"
              fullWidth
              notched={false}
              inputRef={nhanthanInputRef}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <InputLabel htmlFor="my-input">Ghi Chú</InputLabel>
            <OutlinedInput
              multiline
              rows={1}
              rowsMax={2}
              color="primary"
              fullWidth
              notched={false}
              inputRef={ghichuInputRef}
            />
          </Grid>
        </Grid>
        <Box m={2}>
          <Divider />
        </Box>
        <HinhanhInputWithRef ref={hinhanhInputRef} />
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
          </DialogContentText> */}

      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={submitInputs} className={classes.button} disabled={isLoading}>
          {isLoading ? <CircularProgress color="primary" size={24} className={classes.loader} /> : "Tạo Mới"}
        </Button>
        <Button variant="outlined" onClick={hideCreateDialog}>
          Hủy Bỏ
            </Button>
      </DialogActions>
    </Dialog>
  );
})

const HinhanhInputWithRef = forwardRef(HinhanhInput)

function HinhanhInput(props, ref) {
  const classes = useStyles();
  const [file, setFile] = useState([null]);
  const [hinhanh, setHinhanh] = useState([null]);
  const [items, setItems] = useState(['1']);
  const [times, setTimes] = useState([new Date()]);

  function handleImgFileChange(e, index) {
    let newArrFile = [...file];
    newArrFile[index] = URL.createObjectURL(e.target.files[0]);
    setFile([...newArrFile]);
    let newArrHinhanh = [...hinhanh];
    newArrHinhanh[index] = e.target.files[0];
    setHinhanh([...newArrHinhanh]);
  }

  function handleDateChange(date, index) {
    let newArrTimes = [...times];
    newArrTimes[index] = date;
    setTimes([...newArrTimes]);
  }

  useImperativeHandle(ref, () => ({
    hinhanh: hinhanh,
    times: times
  }));

  function handleAddButton(e) {
    e.preventDefault();
      let length = items.length;
      let newItem = parseInt(items[items.length - 1]) + 1;
      setItems([...items, newItem.toString()]);
      setFile([...file, null]);
      setHinhanh([...hinhanh, null]);
      setTimes([...times, new Date()]);
  }

  return (
    <Box mt={1}>
      <Grid container spacing={2}>
        <Grid item sm={11}>
          <InputLabel>Hình Ảnh</InputLabel>
        </Grid>
        <Grid item sm={1}>
          <IconButton onClick={handleAddButton}>
            <AddCircleIcon className={classes.addButton} />
          </IconButton>
        </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
          <Grid item sm={6}>
            <InputLabel htmlFor="my-input">Hình Ảnh</InputLabel>
            <TextField type="file" onChange={handleImgFileChange} />
          </Grid>
          <Grid item sm={6}>
            <img src={file} style={{ height: 'auto', width: 'auto', maxWidth: '100%' }} />
          </Grid>
      </Grid> */}
      {items.map((item, index) =>
        <React.Fragment>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <TextField type="file" onChange={(e) => {
              e.preventDefault();
              handleImgFileChange(e, index);
            }} />
            <Box mt={1}>
            <ThemeProvider theme={defaultMaterialTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  label="Ngày"
                  format="dd/MM/yyyy"
                  padding="small"
                  margin="dense"
                  onChange={(date) => {
                    handleDateChange(date, index)
                  }}
                  value={times[index]}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <img src={file[index]} style={{ height: 'auto', width: 'auto', maxWidth: '100%' }} />
          </Grid>
        </Grid>
        <Divider />
        </React.Fragment>
        )}
    </Box>
  );
}

export default CreateDialog;