import React, { useState, useEffect } from "react";

function useCurrencyInfo(Currency) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!Currency) return;

    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${Currency}.json`
    )
      .then((res) => res.json())
      .then((res) => setData(res[Currency]))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData(null); // Handle error appropriately
      });
  }, [Currency]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return data;
}

export default useCurrencyInfo;
