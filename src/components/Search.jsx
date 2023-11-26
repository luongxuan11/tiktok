import React, { memo } from 'react'
import icons from '../utilities/icons'

const {BsSearch} = icons

const Search = () => {
  return (
    <div className='header__search row'>
        <input type='text' placeholder='Search...' />
        <BsSearch className='svg'/>
    </div>
  )
}

export default Search