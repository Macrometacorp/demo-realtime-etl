import React from "react";
import { TableCell, TableHead, TableRow } from "@material-ui/core";

export const EnhancedTableHead = ({ tableType }) => {
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
