import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class News extends Component {
    PAGE_SIZE = this.props.pageSize;
    NEWS_API = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=cf1c8fc27675493fb97fb2542a73a8cd&pageSize=${this.PAGE_SIZE}`;
    
    static defaultProps = {
      pageSize: 6,
      category: "general"
    }
    static propTypes = {
      pageSize: PropTypes.number,
      category: PropTypes.string
    }
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading:false,
            page:1
        }
    }

    fetchResults = async (API)=>{
      let url = API;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles:parsedData.articles,
        totalResults:parsedData.totalResults,
        loading:false
      });
    }

    async componentDidMount(){
      this.fetchResults(this.NEWS_API);
    }

    handlePrevClick = async ()=>{
      let API = `${this.NEWS_API}&page=${this.state.page-1}`;
      this.fetchResults(API);
      this.setState({
        page: this.state.page-1
      })
    }

    handleNextClick = async ()=>{
      let API = `${this.NEWS_API}&page=${this.state.page+1}`;
      this.fetchResults(API);
      this.setState({
      page: this.state.page+1
      })
    }
    
    render() {
      return (
        <>
          <div className="container my-3 py-5">
            <p className='text-center' style={{fontFamily:'Helvetica',fontSize:'22pt',fontWeight:'bold'}}>NewsMonkey - Top Headlines</p>
            {this.state.loading && <Spinner/>}
            <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageURL={element.urlToImage} url={element.url}/>
                    </div>
                })}
            </div>
          </div>
          <div className="container fixed-bottom d-flex justify-content-center" style={{backgroundColor:'white',paddingTop:'15px',paddingBottom:'15px'}}>
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-2" onClick={this.handlePrevClick}>&larr;Previous</button>
            <button disabled={(this.state.page+1)*this.PAGE_SIZE>100 | this.state.page+1 > Math.ceil(this.state.totalResults/this.PAGE_SIZE)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
          </div>
        </>
      )
  }
}

export default News
