import React, { useState ,useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  News.defaultProps = {
    country : 'us',
    pageSize : 10,
    category : 'general'
  }

  News.propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults , setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
  const updateNews = async() =>{
    const api = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(0);
    setLoading(true);
    let data = await fetch(api);
    props.setProgress(30);
    let parsedData  = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.articles);
    setLoading(false);
    props.setProgress(100);
  }

 const fetchMoreData = async () =>{
    setPage(page + 1);
    const api = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(api);
    let parsedData  = await data.json()
    setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      setLoading(false)
    };

    useEffect(() => {
      updateNews();
  }, [])

  // handleNextClick = async ()=>{
  //     setState({
  //       page : state.page + 1
  //     })
  //     updateNews();
  //   }

  // handlePrevClick = async() =>{
  //   setState({
  //     page : state.page - 1
  //   })
  //   updateNews();
  // }
  
    return (
      <>
        <h1 className='text-center' style={{margin:'35px 0px' ,marginTop:'90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines </h1>
       {/* {state.loading && <Spinner></Spinner>} */}
       <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner></Spinner>}
        >
          <div className='container'>
        <div className='row'>
          {articles.map((element) => {
            return <div className='col-md-4' key = {element.url}>
            <NewsItem title={element.title !=='[Removed]'?element.title:"Not Available"} description={element.description!=='[Removed]'?element.description:"Not Available"} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}></NewsItem>
            </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
}

export default News
