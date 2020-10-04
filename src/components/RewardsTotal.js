import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { calculateReward } from "../helpers";

const RewardsTotal = (props) => {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});

  const columns = [
    {
      title: "User",
      field: "customerName",
    },
    {
      title: "Number of transactions",
      field: "transCount",
    },
    {
      title: "Reward points",
      field: "reward",
    },
  ];

  useEffect(() => {
    const data = [...props.data];
    const resByUser = [];
    data.sort((a, b) => {
      if (a.customerName.toLowerCase() < b.customerName.toLowerCase()) {
        return -1;
      }
      if (a.customerName.toLowerCase() > b.customerName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    let hash = {};
    data.forEach((item, idx) => {
      if (hash["customerName"] !== item.customerName) {
        if (idx !== 0 && hash["customerName"] === data[idx - 1].customerName) {
          resByUser.push(hash);
        }
        hash = {};
        hash.customerName = item.customerName;
      }
      hash.transCount = (hash.transCount || 0) + 1;
      hash.reward = (hash.reward || 0) + calculateReward(item.amount);
      if (idx === data.length - 1) resByUser.push(hash);
    });
    setTableData(resByUser);
  }, [props.data]);

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={columns}
        data={tableData}
        title="Rewards total by customer (select customer to see detail information)"
        onRowClick={(evt, selectedRow) => {
          setSelectedRow(selectedRow.tableData.id);
          props.onRowClick(selectedRow.customerName);
        }}
        options={{
          search: false,
          headerStyle: {
            textAlign: "center",
          },
          cellStyle: {
            textAlign: "center",
          },
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
          }),
        }}
      />
    </div>
  );
};

export default RewardsTotal;
