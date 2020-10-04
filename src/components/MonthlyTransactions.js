import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { calculateReward } from "../helpers";

const MonthlyTransactions = (props) => {
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      title: "Trans ID",
      field: "transId",
    },
    {
      title: "Trans date",
      field: "transCreatedAt",
    },
    {
      title: "Trans amount",
      field: "amount",
    },
    {
      title: "Reward points",
      field: "reward",
    },
  ];

  useEffect(() => {
    const data = [...props.data];
    data.sort((a, b) => {
      if (a.transCreatedAt < b.transCreatedAt) {
        return -1;
      }
      if (a.transCreatedAt > b.transCreatedAt) {
        return 1;
      }
      return 0;
    });
    data.forEach((item) => {
      item.reward = (item.reward || 0) + calculateReward(item.amount);
    });
    setTableData(data);
  }, [props.data]);

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={columns}
        data={tableData}
        options={{
          showTitle: false,
          search: false,
          paging: false,
          padding: "dense",
          toolbar: false,
          rowStyle: () => ({
            backgroundColor: "#EEE",
          }),
          headerStyle: {
            backgroundColor: "#EEE",
            textAlign: "center",
          },
          cellStyle: {
            textAlign: "center",
          },
        }}
      />
    </div>
  );
};

export default MonthlyTransactions;
