import React, { Component } from 'react';
import { Form  }  from 'antd';
 
class FrecuencyGenerator extends Component {
 
	render() {	

		return (
		<div>
			<p>Frecuency Generator - In Progress </p>
		</div>
		);
	}
	
};
 
const FrecuencyGeneratorDinamic = Form.create({ name: 'frecuency_generator' })(FrecuencyGenerator);
export default FrecuencyGeneratorDinamic