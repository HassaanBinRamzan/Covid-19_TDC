import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";
import axios from "axios";

const CountryTable = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortBy] = useState("cases");

  const columns = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      sorter: (a, b) => a.country.localeCompare(b.country),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Total Cases",
      dataIndex: "cases",
      key: "cases",
      sorter: (a, b) => a.cases - b.cases,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total Deaths",
      dataIndex: "deaths",
      key: "deaths",
      sorter: (a, b) => a.deaths - b.deaths,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total Recovered",
      dataIndex: "recovered",
      key: "recovered",
      sorter: (a, b) => a.recovered - b.recovered,
      sortDirections: ["descend", "ascend"],
    },
  ];

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    if (typeof confirm === "function") {
      confirm();
    }
    if (selectedKeys && selectedKeys[0]) {
      setSearchText(selectedKeys[0].toLowerCase());
    } else {
      setSearchText("");
    }
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://corona.lmao.ninja/v2/countries"
        );
        const countriesData = response.data.map((country) => ({
          key: country.countryInfo._id,
          country: country.country,
          cases: country.cases,
          deaths: country.deaths,
          recovered: country.recovered,
        }));
        setCountriesData(countriesData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchCountriesData();
  }, []);

  const filteredData = searchText
    ? countriesData.filter((country) =>
        country.country.toLowerCase().includes(searchText.toLowerCase())
      )
    : countriesData;

  const searchedCountryData =
    searchText &&
    countriesData.find((country) =>
      country.country.toLowerCase().includes(searchText)
    );

  const dataToShow = searchText ? [searchedCountryData] : filteredData;

  const sortedData = dataToShow.sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="country-table">
      <h2 className="country-table__title">Countries Table</h2>
      <Input.Search
        placeholder="Search by country"
        allowClear
        enterButton
        style={{ width: 300, marginBottom: 16 }}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <Table columns={columns} dataSource={sortedData} loading={loading} />
    </div>
  );
};

export default CountryTable;
