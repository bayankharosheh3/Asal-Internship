import React from 'react'
import './styles.css'

const Card = ({url,id,title}) => {
  return (
    <div className='cardContainer'>
        <div className="cardImg">
            <img src={url} alt=""/>
        </div>
        <div className="cardId">
            <span className='id'>{id}</span>
        </div>
        <div className="cardDesc">
            <h3 className='cardTitle'>Photo</h3>
            <p className='desc'>{title}</p>
        </div>
    </div>
  )
}

export default Card