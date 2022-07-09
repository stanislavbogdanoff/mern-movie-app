import React from 'react'
import './CastMember.css'

const CastMember = ({name, role}) => {
  return (
    <div className="cast-card">
      <p>{name}</p>
      <span className="tooltip">
        {role}
      </span>
    </div>
  )
}

export default CastMember