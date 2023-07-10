import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  countryMap = new Map([
    ['in','India'],
    ['us','USA'],
    ['ru','Russia'],
    ['jp','Japan'],
    ['gb','United Kingdom']
  ]);
  
  constructor(props){
    super(props);
    this.state = {
        country:'in',
        progress: 0
    }
    this.toggleCountry = this.toggleCountry.bind(this);
  }
  
  setProgress = (progress)=>{
    this.setState({progress:progress});
  }

  toggleCountry = (country)=>{
    this.setState({country:country});
  }
  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar
            history={this.props.history}
            countryName={this.countryMap.get(this.state.country)}
            toggleCountry={this.toggleCountry}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="main" pageSize={12} country={this.state.country} />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={8} category="general" country={this.state.country} />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={8} category="business" country={this.state.country} />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={8} category="entertainment" country={this.state.country} />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={8} category="health" country={this.state.country} />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={8} category="science" country={this.state.country} />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={8} category="sports" country={this.state.country} />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={8} category="technology" country={this.state.country} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
