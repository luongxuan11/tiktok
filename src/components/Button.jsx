import React, {memo} from 'react'

const Button = ({text, btnClass, onClick, iconSearch, onKeydown}) => {
  return (
    <button className={`btn ${btnClass}`} onKeyDown={onKeydown} onClick={onClick}>{iconSearch} {text}</button>
  )
}

export default memo(Button)