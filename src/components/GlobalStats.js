import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic } from "antd";
import axios from "axios";

const GlobalStats = () => {
  const [globalStats, setGlobalStats] = useState({});

  useEffect(() => {
    const fetchGlobalStats = async () => {
      const response = await axios.get("https://corona.lmao.ninja/v2/all");
      setGlobalStats(response.data);
    };

    fetchGlobalStats();
  }, []);

  return (
    <div className="global-stats">
      <h2 className="global-stats__title">Global Statistics</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Cases" value={globalStats.cases} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Active Cases" value={globalStats.active} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Deaths" value={globalStats.deaths} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Recovered" value={globalStats.recovered} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default GlobalStats;
