import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";

export class Navbar extends Component {

  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" aria-current="page" to="/">NewsMonkey</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
                    </ul>
                    <div className="dropdown mx-2 my-2">
                      <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <span style={{fontSize:'10px'}}>country :</span>&nbsp;<strong>{this.props.countryName}</strong>
                      </button>

                      <ul className="dropdown-menu">
                        <li className="dropdown-item" onClick = {() => this.props.toggleCountry('in')}>India</li>
                        <li className="dropdown-item" onClick = {() => this.props.toggleCountry('us')}>USA</li>
                        <li className="dropdown-item" onClick = {() => this.props.toggleCountry('gb')}>United Kingdom</li>
                        <li className="dropdown-item" onClick = {() => this.props.toggleCountry('jp')}>Japan</li>
                        <li className="dropdown-item" onClick = {() => this.props.toggleCountry('ru')}>Russia</li>
                      </ul>
                    </div>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
