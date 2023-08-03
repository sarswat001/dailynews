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
        progress: 0,
        search:''
    }
    //this.toggleCountry = this.toggleCountry.bind(this);
  }
  
  setProgress = (progress)=>{
    this.setState({progress:progress});
  }

  toggleCountry = (country)=>{
    this.setState({country:country});
  }

  setSearch = (input)=>{
    this.setState({search:input})
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
            countryName={this.countryMap.get(this.state.country)}
            toggleCountry={this.toggleCountry}
            search={this.state.search}
            setSearch={this.setSearch}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="main" country={this.state.country} search={this.state.search}/>} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" category="general" country={this.state.country}  search={this.state.search} />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" category="business" country={this.state.country}  search={this.state.search} />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" category="entertainment" country={this.state.country}  search={this.state.search} />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" category="health" country={this.state.country}  search={this.state.search} />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" category="science" country={this.state.country}  search={this.state.search} />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" category="sports" country={this.state.country}  search={this.state.search} />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" category="technology" country={this.state.country}  search={this.state.search} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
