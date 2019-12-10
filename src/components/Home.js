import React, { Component } from 'react';
import { Form  }  from 'antd';
 
class Home extends Component {
 
	render() {	

		return (
		<div>
			<p>Home Page - In Progress </p>
		</div>
		);
	}
	
};
 
const HomeDinamic = Form.create({ name: 'home' })(Home);
export default HomeDinamic