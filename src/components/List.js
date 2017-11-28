import React from 'react'
import { Link } from 'react-router-dom'

const List=({filmList})=>(
    <div className="sort-list">
    {
        filmList.map(item =>
            <Link to={"/detail/"+item.id} className="list-item" key= { item.id } >
                <img src= { item.cover } alt="" />
                <div className="desc">
                    <h2> { item.title } </h2><i>{item.rate}</i>                                
                </div>
            </Link>
        )
    }
    </div>
)

export default List

