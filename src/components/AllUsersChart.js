import React, { Component } from 'react';
import { Form  }  from 'antd';
import axios from "axios";
import CanvasJSReact from './canvasjs.react.js';
import {BASEURL } from './Constants';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints =[];

class AllUsersChart extends Component {
 
	render() {	
    const options = {
		exportEnabled: true,
		animationEnabled: true,
			title: {
				text: "Frequencies Chart"
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
        const {data} = await axios.get(`${BASEURL}/api/history/users/frequencies/`);
        for (var i = 0; i < data.Frecuency.length; i++) {
           	dataPoints.push({
                label: data.Frecuency[i].Frecuency,
                y: data.Frecuency[i].Percentaje
            });
        }
        chart.render();
      }
};
 
const AllUsersChartDinamic = Form.create({ name: 'all_users_chart' })(AllUsersChart);
export default AllUsersChartDinamic