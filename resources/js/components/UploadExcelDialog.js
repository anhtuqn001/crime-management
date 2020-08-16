import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {ExcelRenderer} from 'react-excel-renderer';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function UploadExcelDialog({ isOpen, hideUploadExcelDialog, showSuccessSnackBar, prepenDoituongs }) {
    const [cols, setCols] = useState([]);
    const [rows, setRows] = useState([]);
    const [isLoading, setLoader] = useState(false);
    
    function handleFileUploadChange(e) {
        e.preventDefault();
        let fileObj = event.target.files[0];
        ExcelRenderer(fileObj, (err, resp) => {
            if(err){
              console.log(err);            
            }
            else{
            //   this.setState({
            //     cols: resp.cols,
            //     rows: resp.rows
            //   });
              setCols([...resp.cols])
              setRows([...resp.rows]);
            }
          });   
    }

    function submitFileUploaded(e) {
      e.preventDefault();
      setLoader(true);
      let keysObj = {
        0 : "hovaten",
        1 : "tenthuonggoi",
        2 : "ngaysinh",
        3 : "gioitinhnam",
        4 : "gcnthan",
        5 : "nhanthan",
        6 : "lsnghe",
        7 : "ghichu"
      }
      let dataArr = [];
      for(let i = 1; i < rows.length; i++) {
        let dataObj = {};
        for(let j = 0; j < rows[i].length ; j++) {
          dataObj[keysObj[j]] = rows[i][j];
        }
        dataArr.push(dataObj);
      }
      // console.log(dataArr);

      fetch('/api/doituongs', {
        method: 'post',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataArr)
      })
        .then((response) => response.json())
        .then((data) => {
          setLoader(false);
          console.log('response below');
          console.log(data.success);
          hideUploadExcelDialog();
          showSuccessSnackBar("Tạo mới đối tượng từ file thành công !");
          prepenDoituongs(data.success);
        })
        .catch((error) => {
          console.log('Request failed', error);
        });
    }


    return (
      <div>
        <Dialog onClose={hideUploadExcelDialog} aria-labelledby="customized-dialog-title" open={isOpen}>
          <DialogTitle id="customized-dialog-title" onClose={hideUploadExcelDialog}>
            Tải Excel
          </DialogTitle>
          <DialogContent dividers>
          <TextField type="file" onChange={handleFileUploadChange} />
          </DialogContent>
          <DialogActions>
          {/* <Button autoFocus onClick={submitFileUploaded} color="primary">
              Tải
          </Button> */}
          <Button variant="outlined" color="primary" onClick={submitFileUploaded} disabled={isLoading}>
            {isLoading ? <CircularProgress color="primary" size={24}/> : "Tải file"}
          </Button>
            <Button variant="outlined" onClick={hideUploadExcelDialog} disabled={isLoading}>
              Hủy bỏ
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default UploadExcelDialog;