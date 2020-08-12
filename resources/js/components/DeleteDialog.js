import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { createMuiTheme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const defaultMaterialTheme = createMuiTheme({
  spacing: 2,
});

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    // backgroundColor: 'white',
    // color: 'green',
    // borderColor: 'green'
  },
  // loader: {
  //   color: 'green'
  // }
}));
//, showSuccessSnackBar, getAllDoituongs
function DeleteDialog ({ isOpen, hideDeleteDialog, showSuccessSnackBar, id, hovaten, removeDoituong }) {
  const classes = useStyles();


  const [isLoading, setLoader] = useState(false);

//   const hovatenInputRef = useRef();
//   const tenthuonggoiInputRef = useRef();
//   const gioitinhnamInputRef = useRef();
//   const gcnthanInputRef = useRef();
//   const nhanthanInputRef = useRef();
//   const ghichuInputRef = useRef();
//   const hinhanhInputRef = useRef();


  function deleteDoituong(event) {
    event.preventDefault();
    setLoader(true);
    var data = new FormData();
    data.append('_method', 'DELETE');
    fetch('/api/doituong/' + id, {
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: data
    })
    .then((response) => response.json())
    .then((data) => {
      setLoader(false);
      hideDeleteDialog();
      showSuccessSnackBar("Xóa đối tượng thành công !");
      removeDoituong(id);
    })
    .catch((error) => {
      console.log('Request failed', error);
    });
  }
  
  return (
    <Dialog open={isOpen} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
      <DialogTitle id="form-dialog-title">Xóa Đối Tượng</DialogTitle>
      <DialogContent>
        <DialogContentText>
        Bạn có chắc chắn muốn xóa đối tượng: {hovaten} ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={deleteDoituong} className={classes.button} disabled={isLoading}>
        {isLoading ? <CircularProgress color="secondary" size={24}/> : "Xóa"}
        </Button>
        <Button variant="outlined" onClick={hideDeleteDialog}>
          Hủy Bỏ
            </Button>
      </DialogActions>
    </Dialog>
  );
}



export default DeleteDialog;