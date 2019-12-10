import React, { Component } from 'react';
import { Form  }  from 'antd';
import axios from "axios";
import CanvasJSReact from './canvasjs.react.js';
import {BASEURL } from './Constants';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
var dataPoints =[];
var dataPointsSecondary = [];
var userName = '';

class UserTrainingChart extends Component {
 
	render() {	
    const options = {
	    exportEnabled: true,
	    animationEnabled: true,
	    title:{
		    text: `Training Frequencies Chart by ${userName}`
	    },
	    subtitles: [{
		    text: "Click Legend to Hide or Unhide Data Series"
	    }], 
	    axisX: {
		    title: "Frequency (hz)"
	    },
	    axisY: {
		    title: "Asserts (%)",
		    titleFontColor: "#4F81BC",
		    lineColor: "#4F81BC",
		    labelFontColor: "#4F81BC",
		    tickColor: "#4F81BC"
	    },
	        axisY2: {
		    title: "Fails (%)",
		    titleFontColor: "#C0504E",
		    lineColor: "#C0504E",
		    labelFontColor: "#C0504E",
		    tickColor: "#C0504E"
	    },
	    toolTip: {
		    shared: true
	    },
	    legend: {
		    cursor: "pointer",
		    itemclick: toggleDataSeries
	    },
        data: 
        [
            {
		        type: "column",
		        name: "Asserts (%)",
		        showInLegend: true,      
                dataPoints: dataPoints
	        },
	        {
		        type: "column",
		        name: "Fails (%)",
		        axisYType: "secondary",
		        showInLegend: true,
                dataPoints: dataPointsSecondary
            }
        ]
    };

function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else {
		e.dataSeries.visible = true;
	}
	e.chart.render();
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
        dataPoints = [];
        dataPointsSecondary = [];

        const {data} = await axios.get(`${BASEURL}/api/training/users/1`);
        console.log(data)
        for (var i = 0; i < data.Frecuencies.length; i++) {
            dataPoints.push({
                label: data.Frecuencies[i].Frecuency,
                y: data.Frecuencies[i].Asserts
            });
            dataPointsSecondary.push({
                label: data.Frecuencies[i].Frecuency,
                y: data.Frecuencies[i].Fails
            });
        }
        userName = data.UserName;
        chart.render();
      }
};
 
const UserTrainingChartDinamic = Form.create({ name: 'user_training_chart' })(UserTrainingChart);
export default UserTrainingChartDinamic