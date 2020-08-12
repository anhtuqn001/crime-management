import React, {forwardRef, useImperativeHandle} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ImageIcon from './ImageIcon.js';
import GcnthanItem from './GcnthanItem.js';
import NhanthanItem from './NhanthanItem.js';
import LsngheItem from './LsngheItem.js';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  imageStyle: {
    width: '100%'
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


function SimpleTable({ doituongs, showEditDialog, showDeleteDialog }, ref) {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const setToFirstPage = () => {
    if(page !== 0) {
      setPage(0);
    }
  }
 
  useImperativeHandle(ref, () => ({
    setToFirstPage
  }));
  return (
    <React.Fragment>
      <TableContainer>
        <Table className={classes.table} size="small" aria-label="simple table">
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '5%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '5%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Họ Tên</TableCell>
              <TableCell>Tên Thường Gọi</TableCell>
              <TableCell>Ngày Sinh</TableCell>
              <TableCell>GCNTH Án</TableCell>
              <TableCell>Nhân Thân</TableCell>
              <TableCell>Lịch Sử Nghề Nghiệp</TableCell>
              <TableCell>Hình Ảnh</TableCell>
              <TableCell>Ghi Chú</TableCell>
              <TableCell></TableCell>
              {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {doituongs.length > 0 && doituongs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((doituong) => (
              <TableRow key={doituong.id}>
                <TableCell>{doituong.hovaten}</TableCell>
                <TableCell>{doituong.tenthuonggoi}</TableCell>
                <TableCell>{doituong.ngaysinh}</TableCell>
                <TableCell>
                  <GcnthanItem gcnthan={doituong.gcnthan} />
                </TableCell>
                <TableCell>
                  <NhanthanItem nhanthan={doituong.nhanthan} />
                </TableCell>
                <TableCell>
                  <LsngheItem lsnghe={doituong.lsnghe} />
                </TableCell>
                <TableCell>
                  <ImageIcon hinhanh={doituong.hinhanhs.length > 0 ? doituong.hinhanhs[doituong.hinhanhs.length - 1].hinhanh : null} gioitinhnam={doituong.gioitinhnam} />
                </TableCell>
                <TableCell>{doituong.ghichu}</TableCell>
                <TableCell padding="none">
                  <IconButton aria-label="edit" size="small" color="primary" onClick={(e) => { showEditDialog(e, doituong.id) }}>
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="delete" size="small" color="secondary" onClick={(e) => { showDeleteDialog(e, doituong.id, doituong.hovaten) }}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={doituongs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang"
        labelDisplayedRows={({from, to, count}) => `${from}-${to} trên ${count}`}
      />
    </React.Fragment>
  );
}

const SimpleTableWithRef = forwardRef(SimpleTable)

export default SimpleTableWithRef;