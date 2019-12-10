import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Tabs } from 'antd';

import HomeDinamic from './components/Home';
import FrecuencyGenerator from './components/FrecuencyGenerator';
import FrecuencyTrainingGenerator from './components/FrecuencyTrainingGenerator';
import AllUsersChartDinamic from './components/AllUsersChart';
import UserChartDinamic from './components/UserChart';
import AllUsersTrainingChartDinamic from './components/AllUsersTrainingChart';
import UserTrainingChartDinamic from './components/UserTrainingChart';

import { BrowserRouter, Route, Link } from 'react-router-dom';
const { TabPane } = Tabs;
const { Content } = Layout;

function callback(key) {
  console.log(key);
}

class App extends Component {

  render(){
    return (
      <div className="App">
        <hr></hr>
        <p>Sound Training</p>
        <hr></hr>
      <Layout>
        <Content> 
            <BrowserRouter>
                <Tabs onChange={callback} type="card">
                  <TabPane tab={ <Link to='/home'>Home</Link>} key="1"> </TabPane>
                  <TabPane tab={ <Link to='/frecuency_generator'>Frecuency Generator</Link>} key="2"> </TabPane>
                  <TabPane tab={ <Link to='/frecuency_training_generator'>Frecuency Training Generator</Link>} key="3"> </TabPane>
                  <TabPane tab={ <Link to='/allUsersChart'>History Chart - All Users</Link>} key="4"></TabPane>
                  <TabPane tab={ <Link to='/userChart'>History Chart - User</Link>} key="5"></TabPane>
                  <TabPane tab={ <Link to='/allUsersTrainingChart'>Training Chart - All Users</Link>} key="6"></TabPane>
                  <TabPane tab={ <Link to='/userTrainingChart'>Training Chart - User</Link>} key="7"></TabPane>
                </Tabs>

              <Route path='/home' component={HomeDinamic}/>
              <Route path='/frecuency_generator' component={FrecuencyGenerator}/>
              <Route path='/frecuency_training_generator' component={FrecuencyTrainingGenerator}/>
              <Route path='/allUsersChart' component={AllUsersChartDinamic}/>
              <Route path='/userChart' component={UserChartDinamic}/>
              <Route path='/allUsersTrainingChart' component={AllUsersTrainingChartDinamic}/>
              <Route path='/userTrainingChart' component={UserTrainingChartDinamic}/>
            </BrowserRouter>
        </Content>
      </Layout>
      </div>
    );
  }
};

export default App;