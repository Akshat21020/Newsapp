import React from 'react'

 const NewsItem = (props) => {

    let {title,description,imageUrl,newsUrl,author,date} = props;
    return (
        <div className="card" style= {{width: '18rem'}}>
  <img src={imageUrl!==null?imageUrl:'https://cdn.vectorstock.com/i/500p/32/45/no-image-symbol-missing-available-icon-gallery-vector-45703245.jpg'} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toUTCString()}</small></p>
    <a href={newsUrl} target="_blank" className="btn btn-primary" rel="noopener noreferrer">Read More</a>
  </div>
</div>
    )
  
}

export default NewsItem
