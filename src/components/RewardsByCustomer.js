import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { calculateReward, month } from "../helpers";
import MonthlyTransactions from "./MonthlyTransactions";

const RewardsByCustomer = (props) => {
  const [data, setTableData] = useState([]);
  const tableTitle = `Monthly history and reward points for customer ${props.data[0].customerName}`;
  const columns = [
    {
      title: "Month",
      field: "month",
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
    const resByMonth = [];
    data.sort((a, b) => {
      if (a.transCreatedAt < b.transCreatedAt) {
        return -1;
      }
      if (a.transCreatedAt > b.transCreatedAt) {
        return 1;
      }
      return 0;
    });
    let hash = {};
    data.forEach((t, idx) => {
      if (hash["month"] !== month(new Date(t.transCreatedAt).getMonth())) {
        if (
          idx !== 0 &&
          hash["month"] ===
            month(new Date(data[idx - 1].transCreatedAt).getMonth())
        ) {
          resByMonth.push(hash);
        }
        hash = {};
        hash.month = month(new Date(t.transCreatedAt).getMonth());
      }
      hash.transCount = (hash.transCount || 0) + 1;
      hash.reward = (hash.reward || 0) + calculateReward(t.amount);
      if (idx === data.length - 1) resByMonth.push(hash);
    });
    setTableData(resByMonth);
  }, [props.data]);

  // const onRowClick = (row) => {
  //   const data = props.data.filter((t) => {
  //     return new Date(t.transCreatedAt).getMonth() === row.month;
  //   });
  //   monthlyTrans = data;
  //   console.log(monthlyTrans);
  // };

  return (
    <div style={{ maxWidth: "100%" }}>
      <div className="ui green segment">
        {"// Ideal I would open it in a different route or fullscreen modal"}
      </div>
      <MaterialTable
        columns={columns}
        data={data}
        title={tableTitle}
        options={{
          search: false,
          paging: false,
          headerStyle: {
            textAlign: "center",
          },
          cellStyle: {
            textAlign: "center",
          },
        }}
        detailPanel={(rowData) => {
          return (
            <MonthlyTransactions
              data={props.data.filter((t) => {
                return (
                  month(new Date(t.transCreatedAt).getMonth()) === rowData.month
                );
              })}
            />
          );
        }}
      />
    </div>
  );
};

export default RewardsByCustomer;
