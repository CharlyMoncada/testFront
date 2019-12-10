import React, { Component } from 'react';
import { Form  }  from 'antd';
 
class FrecuencyTrainingGenerator extends Component {
 
	render() {	

		return (
		<div>
			<p>Frecuency Training Generator - In Progress </p>
		</div>
		);
	}
	
};
 
const FrecuencyTrainingGeneratorDinamic = Form.create({ name: 'frecuency_training_generator' })(FrecuencyTrainingGenerator);
export default FrecuencyTrainingGeneratorDinamic