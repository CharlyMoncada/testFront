import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Select } from "antd";

import { BASEURL } from "./Constants";
import Player from "./player";

const { Option } = Select;

function FrecuencyGenerator() {
  const [frequencies, setFrequencies] = useState(null);
  const [key, setKey] = useState(false);
  const [selectedFreq, setSelected] = useState(null);
  useEffect(() => {
    const sendData = async () => {
      await axios.post(`${BASEURL}/api/history`, {
        Frequency: selectedFreq,
        userID: 1,
        AppType: 3
      });
    };
    if (selectedFreq) {
      sendData();
    }
  }, [key]);
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`${BASEURL}/api/frequencies`);
      setFrequencies(data);
    }
    getData();
  }, []);
  if (!frequencies) {
    return null;
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <Select
          style={{ width: 120 }}
          onChange={value => setSelected(value)}
          value={selectedFreq}
        >
          {frequencies.map(f => (
            <Option value={f.Value}>{f.DisplayValue}</Option>
          ))}
        </Select>
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            marginBottom: "20px",
            width: "15%",
            justifyContent: "space-around"
          }}
        >
          <Player
            freq={selectedFreq}
            hitPlay={() => setKey(new Date().getTime())}
          />
        </div>
      </div>
    );
  }
}

const FrecuencyGeneratorDinamic = Form.create({ name: "frecuency_generator" })(
  FrecuencyGenerator
);
export default FrecuencyGeneratorDinamic;
