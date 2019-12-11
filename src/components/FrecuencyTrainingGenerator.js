import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASEURL } from "./Constants";

import { Form, Radio, Button } from "antd";
import Player from "./player";

function FrecuencyTrainingGenerator() {
  const [testStatus, setTestStatus] = useState("non-answered");
  const [frequencies, setFrequencies] = useState([]);
  const [selectedFreq, setSelected] = useState(null);
	const [testFreq, setTestFreq] = useState(null);
	async function getData() {
		const { data } = await axios.get(`${BASEURL}/api/training/frequencies`);
		setFrequencies(data);
		const freq = data.filter(f => f.Assert);
		setTestFreq(freq[0].Freq);
	}
  useEffect(() => {
    setSelected(null);
  }, [frequencies]);
  useEffect(() => {
    async function setData() {
      await axios.post(`${BASEURL}/api/training`, {
        Frequency: selectedFreq,
        userID: 1,
        AppType: 3,
        Assert: selectedFreq === testFreq
			});
			setTestStatus("non-answered")
    }
    if (testStatus === "answered") {
			setData();
    } else {
			getData();
		}
  }, [testStatus]);
  const generateStyle = currentValue => {
    if (testStatus === "non-answered") {
      return {};
    } else {
      if (selectedFreq !== currentValue) {
        return {};
			}
      return {
        color: testFreq !== currentValue ? "lightCoral" : "lightGreen"
      };
    }
  };
  return (
    Boolean(frequencies) && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <div>
          <Radio.Group
            disabled={testStatus === "answered"}
            onChange={e => {
              setSelected(e.target.value);
            }}
            value={selectedFreq}
          >
            {Boolean(frequencies) &&
              frequencies.map(f => (
                <Radio.Button style={generateStyle(f.Freq)} value={f.Freq}>
                  {f.Freq}
                </Radio.Button>
              ))}
          </Radio.Group>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            marginBottom: "20px",
            width: "20%",
            justifyContent: "space-around"
          }}
        >
          <Player freq={selectedFreq} />
        </div>
        <Button
          onClick={() => setTestStatus("answered")}
          disabled={!selectedFreq || testStatus === "answered"}
        >
          Enviar
        </Button>
      </div>
    )
  );
}

const FrecuencyTrainingGeneratorDinamic = Form.create({
  name: "frecuency_training_generator"
})(FrecuencyTrainingGenerator);
export default FrecuencyTrainingGeneratorDinamic;
