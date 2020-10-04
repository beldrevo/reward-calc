import React, { useEffect, useState } from "react";
import "./App.css";
import transactionList from "./appService/transactionList";
import RewardsTotal from "./components/RewardsTotal";
import RewardsByCustomer from "./components/RewardsByCustomer";

const App = () => {
  const [data, setData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [isCustomerDataTableVisible, setCustomerDataTableVisibility] = useState(
    false
  );

  useEffect(() => {
    // imitating API call get all transactions
    const fetchData = async () => {
      // wait api response
      await Promise.resolve(transactionList);
      setData(transactionList);
    };
    fetchData();
  }, []);

  const renderUserDataTable = (customerName) => {
    // it might be customerId instead
    const result = data.filter((trans) => trans.customerName === customerName);
    setCustomerData(result);
    setCustomerDataTableVisibility(true);
  };

  const showCustomerDataTable = () => {
    if (isCustomerDataTableVisible) {
      return (
        <div style={{ marginTop: "40px" }}>
          <RewardsByCustomer data={customerData} />;
        </div>
      );
    }
  };

  return (
    <div className="App">
      <div className="ui green segment">
        {"// I would add here search/filter by user, date range, rewards. etc."}
      </div>
      <RewardsTotal data={data} onRowClick={renderUserDataTable} />
      {showCustomerDataTable()}
    </div>
  );
};

export default App;
