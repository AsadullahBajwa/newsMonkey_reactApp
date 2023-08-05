import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import NewsItem from '.Components/NewsItem'

export default class News extends Component {
  
  static defaultProps={
    country:'us',
    pageSize:6,
    category:'technology',
  }
  
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  
  
  constructor(){
    super()
    this.state={
      articles:[],
      loading:false,
      page:1
    }
  }


  async updateNews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=058807d03ec1446fa262758a4713fc4f&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parseData=await data.json();
    this.setState({articles:parseData.articles,
      totalResults:parseData.totalResults,
      loading:false
    });

  }

  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=058807d03ec1446fa262758a4713fc4f&page=1&pagesize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parseData=await data.json();
    this.setState({articles:parseData.articles,
      totalResults:parseData.totalResults,
      loading:false
    });
  }

  handlePreviousClick = async ()=>{
    // console.log("previous");
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=058807d03ec1446fa262758a4713fc4f&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data=await fetch(url);
    // let parseData=await data.json();
    // this.setState({
    //   page:this.state.page+1,
    //   articles:parseData.articles,
    //   loading:false
    // });
    await this.setState({page:this.state.page-1});
    this.updateNews();
  }

  handleNextClick = async ()=>{
    // console.log("next");
    //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=058807d03ec1446fa262758a4713fc4f&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    //     this.setState({loading:true});
    //     let data=await fetch(url);
    //     let parseData=await data.json();
    //     this.setState({
    //       page:this.state.page+1,
    //       articles:parseData.articles,
    //       loading:false
    //     });
    await this.setState({page:this.state.page+1});
    this.updateNews(); 
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center">
        Top Headlines of today
        </h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading &&this.state.articles.map((element)=>{
            return(
              <div key={element.url} className="col-md-4 my-3">
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
            )
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
