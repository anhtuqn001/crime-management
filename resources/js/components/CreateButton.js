import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateDialog from './CreateDialog.js';
import UploadExcelDialog from './UploadExcelDialog.js';
import PostAddIcon from '@material-ui/icons/PostAdd';
const useStyles = makeStyles((theme) => ({
  createButton: {
    margin: theme.spacing(1),
    backgroundColor: 'green',
    color: 'white',
    borderColor: 'green',
    '&:hover': {
      backgroundColor: '#004d00',
    },
  },
  excelButton: {
    margin: theme.spacing(1),
    backgroundColor: 'green',
    color: 'white',
    borderColor: 'green',
    '&:hover': {
      backgroundColor: '#004d00',
    },
  },
}));

function CreateButton({ showCreateModal, showSuccessSnackBar, prependDoituong, prepenDoituongs}) {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [isUploadExcelDialogOpen, setIsUploadExcelDialogOpen] = useState(false);

    function showCreateDialog(e) {
        e.preventDefault();
        setIsOpen(true);
    }

    function hideCreateDialog() {
      setIsOpen(false);
    }

    function showUploadExcelDialog(e) {
      e.preventDefault();
      setIsUploadExcelDialogOpen(true);
    }

    function hideUploadExcelDialog() {
      setIsUploadExcelDialogOpen(false);
    }
    return (
      <div>
        <Button
          variant="outlined"
          className={classes.createButton}
          startIcon={<AddCircleIcon />}
          onClick={showCreateDialog}
        >
          Tạo Mới
        </Button>
        <Button
          variant="outlined"
          className={classes.excelButton}
          startIcon={<PostAddIcon />}
          onClick={showUploadExcelDialog}
        >
          Tải Excel
        </Button>
        <CreateDialog isOpen={isOpen} hideCreateDialog={hideCreateDialog} showSuccessSnackBar={showSuccessSnackBar} prependDoituong={prependDoituong}/>
        <UploadExcelDialog isOpen={isUploadExcelDialogOpen} hideUploadExcelDialog={hideUploadExcelDialog} showSuccessSnackBar={showSuccessSnackBar} prepenDoituongs={prepenDoituongs}/>
      </div>
    );
  }

export default CreateButton;