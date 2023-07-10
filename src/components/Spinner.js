import React, { Component } from 'react'
import loading from '../loader.gif'
export class Spinner extends Component {
  render() {
    return (
      <div className='text-center mt-5'>
        <img className='mt-5 pt-5 pb-3' src={loading} alt="loading..." />
      </div>
    )
  }
}

export default Spinner
