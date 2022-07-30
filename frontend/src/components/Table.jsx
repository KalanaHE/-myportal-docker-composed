import React, { forwardRef } from "react";
import MaterialTable from "@material-table/core";
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@mui/icons-material";
import { TableContainer } from "@mui/material";
import Scrollbar from "./Scrollbar";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const Table = (props) => {
  return (
    <>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <MaterialTable
            title={props.title}
            icons={tableIcons}
            columns={props.columns}
            data={props.data}
            detailPanel={props.detailPanel}
            components={props.components}
            actions={props.actions}
            options={props.options}
            onRowClick={props.rowClick}
            onSelectionChange={props.onSelectionChange}
            style={props.style}
            localization={{
              body: {
                emptyDataSourceMessage: props.emptyDataSourceMessage
                  ? props.emptyDataSourceMessage
                  : "No records to display",
              },
            }}
          />
        </TableContainer>
      </Scrollbar>
    </>
  );
};

export default Table;
