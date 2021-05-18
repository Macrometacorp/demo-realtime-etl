import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  // Select,
  InputLabel,
  MenuItem,
  Typography,
  Grid,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Dropdown from "react-dropdown";
import Select from "react-select";
import "react-dropdown/style.css";
import Paper from "@material-ui/core/Paper";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Cupcake", "305", "3.7", "67", "4.3"),
//   createData("Donut", 452, 25.0, 51, 4.9),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
//   createData("Honeycomb", 408, 3.2, 87, 6.5),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Jelly Bean", 375, 0.0, 94, 0.0),
//   createData("KitKat", 518, 26.0, 65, 7.0),
//   createData("Lollipop", 392, 0.2, 98, 0.0),
//   createData("Marshmallow", 318, 0, 81, 2.0),
//   createData("Nougat", 360, 19.0, 9, 37.0),
//   createData("Oreo", 437, 18.0, 63, 4.0),
// ];

const EnhancedTableHead = ({ tableType }) => {
  const headCells = [
    {
      id: "client_name",
      numeric: false,
      disablePadding: true,
      label: "Client Name",
    },
    {
      id: tableType !== "Subscriptions" ? "date" : "date_start",
      numeric: true,
      disablePadding: false,
      label: tableType !== "Subscriptions" ? "Date" : "Start Date",
    },
    {
      id: tableType !== "Subscriptions" ? "txn_id" : "date_end",
      numeric: true,
      disablePadding: true,
      label: tableType !== "Subscriptions" ? "Transaction Id" : "End Date",
    },

    {
      id: "product_category_name",
      numeric: true,
      disablePadding: true,
      label: "Product Category Name",
    },
    { id: "amount", numeric: true, disablePadding: false, label: "Amount" },
  ];
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "default"}
            style={{ fontSize: "18px", fontWeight: "700" }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

// EnhancedTableHead.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    maxHeight: "80px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = ({
  bankClientNames,

  selectedClient,
  handleSelectClient,
}) => {
  const classes = useToolbarStyles();
  // console.log(`Logged output: bankClientNames`, bankClientNames);
  return (
    <Toolbar
      className={clsx(classes.root)}
      style={{
        backgroundColor: "rgba(51,138,208,0.6)",
      }}
    >
      {/* <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Nutrition
      </Typography> */}
      {/* <Dropdown
        options={["one", "two", "three"]}
        onChange={handleSelectClient}
        value={"one"}
        placeholder="Select an option"
      /> */}
      <Grid container>
        <Grid item xs>
          {/* <FormControl
            variant="outlined"
            className={classes.formControl}
            style={{ paddingTop: "40px", justifyContent: "start" }}
          >
            <InputLabel
              id="demo-simple-select-outlined-label"
              style={{
                width: "200px",
                paddingTop: "30px",
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              Clients
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={selectedClient}
              onChange={handleSelectClient}
              label="Clients"
              style={{ width: "200px", borderTopColor: "pink" }}
            > */}
          <Select
            options={bankClientNames}
            value={selectedClient}
            onChange={handleSelectClient}
            getOptionLabel={(option) => option.clientName}
            getOptionValue={(option) => option.clientName}
            placeholder={selectedClient ? selectedClient : "Client Name"}
          />
          {/* <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {bankClientNames.map((element, index) => (
                <MenuItem value={element.clientName} key={index.toString()}>
                  {element.clientName}
                </MenuItem>
              ))}
            </Select> */}
          {/* </FormControl> */}
        </Grid>
        <Grid
          item
          xs={10}
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontWeight: "700",
              fontSize: "30px",
              marginLeft: "-180px",
              // marginTop: "30px",
              // paddingLeft: "60px",
            }}
          >
            Client Data
          </span>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    boxShadow: "2px 5px 5px 2px #d4d4d4",
    borderRadius: "0.375rem",
    borderTopWidth: 1,
    "& .MuiTableCell-root": {
      border: " 1px solid rgba(224, 224, 224, 1)",
    },
  },

  paper: {
    width: "100%",

    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({
  bankClientNames,
  selectedClient,
  handleSelectClient,
  tableData,
  tableType,
}) {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    tableData &&
    tableData.length &&
    rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

  const renderActualTable = useMemo(() => {
    return (
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          bankClientNames={bankClientNames}
          selectedClient={selectedClient}
          handleSelectClient={handleSelectClient}
        />
        <TableContainer style={{ minHeight: "280px" }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead tableType={tableType} />
            <TableBody>
              {tableData && tableData.length ? (
                tableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._key}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row.client_name}
                        </TableCell>
                        <TableCell align="center">
                          {tableType !== "Subscriptions"
                            ? row.date
                            : row.date_start}
                        </TableCell>
                        <TableCell align="center">
                          {tableType !== "Subscriptions"
                            ? row.txn_id
                            : row.date_end}
                        </TableCell>
                        <TableCell align="center">
                          {row.product_category_name}
                        </TableCell>
                        <TableCell align="center">{row.amount}</TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <Typography
                    className={clsx(classes.content)}
                    variant="subtitle1"
                  >
                    No Data
                  </Typography>
                </TableRow>
              )}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={tableData && tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }, [
    emptyRows,
    bankClientNames,
    classes,
    handleSelectClient,
    page,
    rowsPerPage,
    selectedClient,
    tableData,
    tableType,
  ]);
  return (
    <div className={classes.root} style={{ marginTop: "2vh" }}>
      {renderActualTable}
    </div>
  );
}
