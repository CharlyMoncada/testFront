import React, { Component } from 'react';
import { Form  }  from 'antd';
import axios from "axios";
import CanvasJSReact from './canvasjs.react.js';
import {BASEURL } from './Constants';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
var dataPoints =[];

class UserChart extends Component {
 
	render() {	
    const options = {
		exportEnabled: true,
		animationEnabled: true,
			title: {
				text: "User Frequencies Chart "
      },
      axisY: {
            title: "Ocurrency Percentage (%)",
            suffix: "%",
        		includeZero: false
                },
          axisX: {
        		title: "Frequency (hz)",
        		includeZero: false
        	},
			data: [
				{
					type: "column",
					dataPoints: dataPoints
				}
			]
		}

		return (
		<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
		</div>
		);
	}
	
    async componentDidMount() {
        var chart = this.chart
        dataPoints =[]
        const {data} = await axios.get(`${BASEURL}/api/history/users/frequencies/1`);
        console.log(data)
        for (var i = 0; i < data.Frequency.length; i++) {
           	dataPoints.push({
				label: data.Frequency[i].Frecuency,
                y: data.Frequency[i].Percentaje
            });
        }
        chart.render();
      }
};
 
const UserChartDinamic = Form.create({ name: 'user_chart' })(UserChart);
export default UserChartDinamic