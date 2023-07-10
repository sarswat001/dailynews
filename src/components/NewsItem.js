import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let {title,description,imageURL,url,author,publishedAt,source} = this.props;
    return (
    <div className="my-5">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill" style={{left:'50%',zIndex:'1',color:'#198754',backgroundColor:'whitesmoke',border:'1px solid #198754'}}>{source}</span>
            <img src={imageURL} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(publishedAt).toLocaleDateString()}</small></p>
                <a rel='noreferrer' href={url} target='_blank' className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
    </div>
    )
  }
}

export default NewsItem
