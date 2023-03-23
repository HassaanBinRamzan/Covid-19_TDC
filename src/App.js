import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import GlobalStats from "./components/GlobalStats";
import CountryTable from "./components/CountryTable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout selectedKey="global">
              <GlobalStats />
            </AppLayout>
          }
        />
        <Route
          path="/countries"
          element={
            <AppLayout selectedKey="countries">
              <CountryTable />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
