import React from "react";
import Navbar from "../Navbar";
import { getDatabase, onValue, ref } from "@firebase/database";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import { useState } from "react";
import "./Profiteloss.css";

const firebaseConfig = {
  apiKey: "AIzaSyCTx_3eqVT0URoasobI1DDcsezpu5AYkiI",
  authDomain: "crm-backend-cabb3.firebaseapp.com",
  databaseURL: "https://crm-backend-cabb3-default-rtdb.firebaseio.com",
  projectId: "crm-backend-cabb3",
  storageBucket: "crm-backend-cabb3.appspot.com",
  messagingSenderId: "797388480962",
  appId: "1:797388480962:web:2dfce140d39330eb6bf65b",
  measurementId: "G-RY90BSPDV0",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const ProfiteLoss = () => {
  const [serviceTypeData, setServiceTypeData] = useState([]);
  const [revenueMap, setRevenueMap] = useState({});
  const [profitLossMap, setProfitLossMap] = useState({});
  const [data, setData] = useState({}); // Your paymentsystem data
  const [siteRevenue, setSiteRevenue] = useState({}); // Store revenue for all four sites
  const [selectedServiceType, setSelectedServiceType] = useState(""); // Step 1: State for selected service type
  const [selectedDriverWeek, setSelectedDriverWeek] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");

  // Define separate functions to find the highest and lowest drivers
  const findHighestDriver = (data, selectedDriverWeek) => {
    let highestDriver = null;
    let highestRate = 0;
    for (const key in data) {
      const driver = data[key];
      const unitRate = parseFloat(
        driver?.unitrate?.replace("£", "").trim() || 0
      );
      const byod = parseFloat(driver?.brate?.replace("£", "").trim() || 0);
      const totalRate = unitRate + byod;

      if (!isNaN(totalRate) && totalRate > highestRate) {
        if (
          !selectedDriverWeek ||
          getWeekNumber(driver.paymentdate).toString() === selectedDriverWeek
        ) {
          highestRate = totalRate;
          highestDriver = driver;
        }
      }
      console.log("Driver Payment Date:", getWeekNumber(driver.paymentdate).toString());
      console.log("Selected Driver Week:", selectedDriverWeek);
      console.log("Highest Driver:", highestDriver);
}
    return highestDriver;
  };

  const findLowestDriver = (data, selectedDriverWeek) => {
    let lowestDriver = null;
    let lowestRate = Number.MAX_VALUE;

    for (const key in data) {
      const driver = data[key];
      const unitRate = parseFloat(
        driver?.unitrate?.replace("£", "").trim() || 0
      );
      const byod = parseFloat(driver?.brate?.replace("£", "").trim() || 0);
      const totalRate = unitRate + byod;

      if (!isNaN(totalRate) && totalRate < lowestRate) {
        if (
          !selectedDriverWeek ||
          getWeekNumber(driver.paymentdate).toString() === selectedDriverWeek
        ) {
          lowestRate = totalRate;
          lowestDriver = driver;
        }
      }
      console.log("Driver Payment Date:", driver.paymentdate);
      console.log("Selected Driver Week:", selectedDriverWeek);
      console.log("Lowest Driver:", lowestDriver);
    }
    return lowestDriver;
  };

  const filterPaymentsByWeek = (paymentsData, selectedWeek) => {
    if (!selectedWeek) {
      return paymentsData;
    }

    return Object.values(paymentsData).filter((payment) => {
      // Extract the week number from the paymentdate (assuming it's in a specific format)
      const paymentWeek = getWeekNumber(payment.paymentdate).toString();
      console.log(paymentWeek, selectedWeek);
      // Compare the selected week with the payment's week
      return paymentWeek === selectedWeek;
    });
  };

  useEffect(() => {
    const paymentsRef = ref(database, "Paymentsystem");

    const unsubscribePayments = onValue(paymentsRef, (snapshot) => {
      const paymentsData = snapshot.val();
      setData(paymentsData);

      const serviceTypeDataMap = {};
      const siteRevenueMap = {};

      const filteredPaymentsData = filterPaymentsByWeek(
        paymentsData,
        selectedWeek
      );

      for (const key in filteredPaymentsData) {
        const payment = filteredPaymentsData[key];
        const serviceType = payment.servicestypeday1;
        const rate = payment.rate;
        const site = payment.site;

        if (serviceType && rate !== undefined) {
          const amount = parseFloat(rate.replace("£", "").trim());

          if (!isNaN(amount)) {
            if (serviceTypeDataMap[serviceType]) {
              serviceTypeDataMap[serviceType].count++;
              serviceTypeDataMap[serviceType].totalAmount += amount;
            } else {
              serviceTypeDataMap[serviceType] = {
                count: 1,
                totalAmount: amount,
              };
            }
          }

          if (site) {
            siteRevenueMap[site] = (siteRevenueMap[site] || 0) + amount;
          }
        }
      }

      const serviceTypeDataArray = Object.keys(serviceTypeDataMap).map(
        (serviceType) => ({
          serviceType: serviceType,
          count: serviceTypeDataMap[serviceType].count,
          totalAmount: serviceTypeDataMap[serviceType].totalAmount.toFixed(2),
        })
      );

      setServiceTypeData(serviceTypeDataArray);
      setSiteRevenue(siteRevenueMap);
    });

    return () => {
      unsubscribePayments();
    };
  }, [database, selectedWeek]);

  const handleRevenueChange = (event, serviceType) => {
    const newRevenue = parseFloat(event.target.value);
    setRevenueMap((prevRevenueMap) => ({
      ...prevRevenueMap,
      [serviceType]: newRevenue,
    }));
  };

  useEffect(() => {
    const profitLossData = {};
    serviceTypeData.forEach((item) => {
      const totalAmount = parseFloat(item.totalAmount);
      const revenue = revenueMap[item.serviceType] || 0;
      const profitLossValue = totalAmount - revenue;
      profitLossData[item.serviceType] = profitLossValue.toFixed(2);
    });
    setProfitLossMap(profitLossData);
  }, [serviceTypeData, revenueMap]);

  // Find the highest and lowest drivers
  const highestDriver = findHighestDriver(data, selectedDriverWeek);
  const lowestDriver = findLowestDriver(data, selectedDriverWeek);

  const filteredServiceTypeData = selectedServiceType
    ? serviceTypeData.filter((item) => item.serviceType === selectedServiceType)
    : serviceTypeData;


    
  return (
    <div className="container">
      <Navbar />
      <div>
        <h1 className="profileData">Profite Loss </h1>
        <div className="service-type-filter">
          <label htmlFor="serviceTypeFilter">Filter by Service Type:</label>
          <select
            id="serviceTypeFilter"
            onChange={(e) => setSelectedServiceType(e.target.value)}
            value={selectedServiceType}
          >
            <option value="">All</option>
            {serviceTypeData.map((item) => (
              <option key={item.serviceType} value={item.serviceType}>
                {item.serviceType}
              </option>
            ))}
          </select>

          <label htmlFor="weekFilter">Filter by Week:</label>
          <select
            id="serviceTypeFilter"
            onChange={(e) => setSelectedWeek(e.target.value)}
            value={selectedWeek}
          >
            <option value="">All</option>
            {Array.from({ length: 52 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                Week {index + 1}
              </option>
            ))}
          </select>
        </div>
        {filteredServiceTypeData.length === 0 ? (
          <p>Available Data</p>
        ) : (
          <table>
            <div id="paymentsystemtopheader">
              <div>S:No</div>
              <div>Services</div>
              <div>How many times</div>
              <div>Expenses</div>
              <div>Revenue</div>
              <div>P/L</div>
            </div>

            <tbody>
              {filteredServiceTypeData.map((item, index) => (
                <tr key={index}>
                  <div id="paymentsystem">
                    <div>{index + 1}</div>
                    <div>{item.serviceType}</div>
                    <div>{item.count}</div>
                    <div>£ {item.totalAmount}</div>
                    <div className="inputcontainer">
                      <input
                        className="inputlength"
                        type="number"
                        value={revenueMap[item.serviceType] || ""}
                        onChange={(event) =>
                          handleRevenueChange(event, item.serviceType)
                        }
                      />
                    </div>
                    <div>£ {profitLossMap[item.serviceType]}</div>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div>
          <label htmlFor="driverWeekFilter">Filter by Driver Week:</label>
          <select
  id="serviceTypeFilter"
  onChange={(e) => {
    console.log("Selected Week:", e.target.value);
    setSelectedDriverWeek(e.target.value);
  }}
  value={selectedDriverWeek}
>
            <option value="">All</option>
            {Array.from({ length: 52 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                Week {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="driver-details">
          <h2>Driver Highest Earner of the Week</h2>
          {highestDriver ? (
            <table className="driver-table">
              <div id="paymentsystemtopheader">
                <div>Driver Name</div>
                <div>Revenue Generate</div>
              </div>
              <div id="paymentsystem">
                <div>
                  {highestDriver.drivefirstname} {highestDriver.drivelastname}
                </div>
                <div>
                  £{" "}
                  {parseFloat(highestDriver.unitrate.replace("£", "").trim())}
                </div>
              </div>
            </table>
          ) : (
            <p>No data available</p>
          )}

          <h2>Driver Lowest Earner of the Week </h2>
          {lowestDriver ? (
            <table>
              <div id="paymentsystemtopheader">
                <div>Driver Name</div>
                <div>Revenue Generate</div>
              </div>
              <div id="paymentsystem">
                <div>
                  {lowestDriver.drivefirstname} {lowestDriver.drivelastname}
                </div>
                <div>
                  £{" "}
                  {parseFloat(lowestDriver.unitrate.replace("£", "").trim())}
                </div>
              </div>
            </table>
          ) : (
            <p>No data available</p>
          )}
        </div>

        <div className="site-revenue">
          <h2>Site's Revenue Analysis</h2>
          {Object.keys(siteRevenue).map((site, index) => (
            <table>
              <div id="paymentsystemtopheader">
                <div>Site</div>
                <div>Revenue Generate</div>
              </div>
              <div id="paymentsystem">
                <div>{site}</div>
                <div>£ {siteRevenue[site].toFixed(2)}</div>
              </div>
            </table>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfiteLoss;

function getWeekNumber(dateString) {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(((date - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
  );
}
