import React , { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';
import BlockIcon from '@material-ui/icons/Block';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
    imageStyle: {
        width: '100%'
    },
    progressStyle: {
        width: '100%'
    },
    noDisplay : {
        display: 'none'
    },
    blockDisplay : {
        display: 'block'
    }
});

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
        maxWidth: 200
    },
}))(Tooltip);

function ImageIcon({hinhanh , gioitinhnam}) {
    const classes = useStyles();
    const [hinhanhState, setHinhanh] = useState(null);
    const [open, setOpen] = useState(false);

    function handleOpen() {
        setOpen(true);
        if(!!hinhanh) {
            setHinhanh(hinhanh);
        }
    }

    function handleClose() {
        setOpen(false);
    }

    return(
        <LightTooltip open={open} onClose={handleClose} onOpen={handleOpen} 
        title={ !hinhanhState ? <BlockIcon color="secondary"/> : 
        <img src={'/images/' + hinhanhState } className={classes.imageStyle}/>} placement="right-start">
            <AccountCircleIcon color={!!gioitinhnam ? "primary" : "secondary"} />
        </LightTooltip>
    )
}

export default ImageIcon;



