import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles({
    table: {
        minWidth: 650,
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#c2c2a3'
    },
    bordered: {
        borderStyle: 'solid',
        borderWidth: '1.5px',
        borderColor: '#c2c2a3'
    },
    textWrapped: {
        whiteSpace: 'pre-wrap',
    }
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function DetailsTable({ chosingDoituong }) {
    const classes = useStyles();

    return (
        <TableContainer>
            <Table className={classes.table} aria-label="simple table">
                <colgroup>
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '80%' }} />
                </colgroup>
                {/* <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead> */}
                <TableBody>
                    {/* {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" className={classes.bordered}>
                                {row.name}
                            </TableCell>
                            <TableCell align="right" className={classes.bordered}>{row.calories}</TableCell>
                        </TableRow>
                    ))} */}
                    <TableRow>
                        <TableCell component="th" className={classes.bordered}>
                            <Typography variant="subtitle2">
                            Họ Tên
                            </Typography>
                        </TableCell>
                        <TableCell align="left" className={classes.bordered}>{chosingDoituong.hovaten}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" className={classes.bordered}>
                        <Typography variant="subtitle2">
                            Tên Thường Gọi
                        </Typography>
                        </TableCell>
                        <TableCell align="left" className={classes.bordered}>{chosingDoituong.tenthuonggoi}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell component="th" className={classes.bordered}>
                        <Typography variant="subtitle2">
                            Giới Tính
                        </Typography>
                        </TableCell>
                        <TableCell align="left" className={`${classes.bordered} ${classes.textWrapped}`}>{chosingDoituong.gioitinhnam ? 'Nam' : 'Nữ'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" className={classes.bordered}>
                        <Typography variant="subtitle2">
                            Ngày Sinh
                        </Typography>
                        </TableCell>
                        <TableCell align="left" className={classes.bordered}>{chosingDoituong.ngaysinh}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" className={classes.bordered}>
                            <Typography variant="subtitle2">
                            GCNTH Án
                            </Typography>
                        </TableCell>
                        <TableCell align="left" className={`${classes.bordered} ${classes.textWrapped}`}>{chosingDoituong.gcnthan}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell component="th" className={classes.bordered}>
                            <Typography variant="subtitle2">
                            Nhân Thân
                            </Typography>
                        </TableCell>
                        <TableCell align="left" className={`${classes.bordered} ${classes.textWrapped}`}>{chosingDoituong.nhanthan}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell component="th" className={classes.bordered}>
                            <Typography variant="subtitle2">
                            Lịch Sử Nghề Nghiệp
                            </Typography>
                        </TableCell>
                        <TableCell align="left" className={`${classes.bordered} ${classes.textWrapped}`}>{chosingDoituong.lsnghe}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell component="th" className={classes.bordered}>
                            <Typography variant="subtitle2">
                            Ghi Chú
                            </Typography>
                        </TableCell>
                        <TableCell align="left" className={`${classes.bordered} ${classes.textWrapped}`}>{chosingDoituong.ghichu}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell component="th" className={classes.bordered}>
                            <Typography variant="subtitle2">
                            Hình Ảnh
                            </Typography>
                        </TableCell>
                        <TableCell align="left" className={`${classes.bordered} ${classes.textWrapped}`}>
                            {chosingDoituong.hinhanhs != null && chosingDoituong.hinhanhs.length > 0 ? chosingDoituong.hinhanhs.map(i =>
                                <React.Fragment>
                                    <Grid container>
                                        <Grid item sm={3}>  
                                            <Typography>- {i.thoigian != null && i.thoigian.split('-').reverse().join('/')}</Typography>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <img src={'/images/' + i.hinhanh} style={{ height: 'auto', width: 'auto', maxWidth: '100%' }}></img>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </React.Fragment>
                            ) : <Typography color="secondary" variant="subtitle2">Chưa có hình ảnh</Typography>}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DetailsTable;