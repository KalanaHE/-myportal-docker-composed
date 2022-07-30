import React from "react";
import { sentenceCase } from "change-case";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  IconButton,
} from "@mui/material";
import useSettings from "../../hooks/useSettings";
import Label from "../Label";
import Iconify from "../Iconify";
import Scrollbar from "../Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import MinimalTableHead from "./MinimalTableHead";
import MinimalTableToolbar from "./MinimalTableToolbar";

const MinimalTable = ({ onRowClick, columns, data: _data }) => {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  const [data, setData] = useState(_data);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteMultiUser = (selected) => {
    const deleteUsers = data.filter((user) => !selected.includes(user.name));
    setSelected([]);
    setData(deleteUsers);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  return (
    <>
      <MinimalTableToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        onDeleteUsers={() => handleDeleteMultiUser(selected)}
      />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <MinimalTableHead
              order={order}
              orderBy={orderBy}
              headLabel={columns}
              rowCount={data.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const { id, name, role, status, company, avatarUrl, isVerified } = row;

                return (
                  <TableRow hover key={id} tabIndex={-1}>
                    <TableCell sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />
                      <Typography variant="subtitle2" noWrap>
                        {name}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{company}</TableCell>
                    <TableCell align="left">{role}</TableCell>
                    <TableCell align="left">{isVerified ? "Yes" : "No"}</TableCell>
                    <TableCell align="left">
                      <Label
                        variant={theme.palette.mode === "light" ? "ghost" : "filled"}
                        color={(status === "banned" && "error") || "success"}
                      >
                        {sentenceCase(status)}
                      </Label>
                    </TableCell>

                    <TableCell align="right">
                      <IconButton onClick={() => onRowClick({ type: "edit", data: row })}>
                        <Iconify icon={"eva:edit-fill"} />
                      </IconButton>{" "}
                      <IconButton onClick={() => onRowClick({ type: "delete", data: row })}>
                        <Iconify icon={"eva:trash-2-outline"} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, page) => setPage(page)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default MinimalTable;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter((_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
