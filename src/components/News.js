import PropTypes from "prop-types";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  
  NEWS_API = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf1c8fc27675493fb97fb2542a73a8cd`;

  static defaultProps = {
    category: "global",
  };
  static propTypes = {
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    if (this.props.category === "global") {
      this.NEWS_API = this.NEWS_API.replace("&category=global", "");
    }
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title =
      this.props.category === "global"
        ? "NewsMonkey - Get Daily News Here"
        : `NewsMonkey - ${this.camelCase(this.props.category)}`;
  }

  camelCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  fetchResults = async (API) => {
    this.props.setProgress(10);
    let url = API;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  async componentDidMount() {
    this.fetchResults(this.NEWS_API);
  }

  fetchMoreData = async () => {
    let url = `${this.NEWS_API}&page=${this.state.page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: this.state.page+1
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.country !== prevProps.country) {
      this.NEWS_API = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf1c8fc27675493fb97fb2542a73a8cd`;
      this.fetchResults(this.NEWS_API);
    }
  }

  render() {
    return (
      <>
        <div className="container">
          <div
            className="container fixed-top text-center mt-5 pt-4 pb-3"
            style={{
              fontFamily: "Helvetica",
              fontSize: "18pt",
              fontWeight: "bold",
              zIndex: 100,
              backgroundColor: "white",
            }}
          >
            {`${this.camelCase(this.props.category)} - Top Headlines`}
          </div>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
            key={`infinteScroll-${Math.ceil(Math.random*100)}`}
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          >
            <div className="container mt-5 pt-5">
              <div className="row">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-3" key={element.url}>
                      <NewsItem
                        title={element.title}
                        description={element.description}
                        imageURL={element.urlToImage}
                        url={element.url}
                        author={element.author}
                        publishedAt={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default News;
