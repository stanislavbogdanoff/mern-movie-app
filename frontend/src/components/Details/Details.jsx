import React from 'react'
import './Details.css'

const Details = ({title, origTitle, length, genres, studios, countries, languages}) => {
  return (
    <div className="details-box">
      {origTitle !== title &&
        <span className="details-row">
          <span><p>Original Title</p></span>
          <div>
            <div className="details-card">
              {origTitle}
            </div>
          </div>
        </span>
      }
      <span className="details-row">
        <span><p>Length</p></span>
        <div>
          <div className="details-card">
            {length} min
          </div>
        </div>
      </span>
      <span className="details-row">
        <span><p>Genres</p></span>
        <div>
          {genres.map(genre => {
            return (
              <div className="details-card">
                {genre.name}
              </div>
            )
          })}
        </div>
      </span>
      <span className="details-row">
        <span><p>Studios</p></span>
        <div>
          {studios.map(studio => {
            return (
              <div className="details-card">
                {studio.name}
              </div>
            )
          })}
        </div>
      </span>
      <span className="details-row">
        <span><p>Countries</p></span>
        <div>
          {countries.map(country => {
            return (
              <div className="details-card">
                {country.name}
              </div>
            )
          })}
        </div>
      </span>
      <span className="details-row">
        <span><p>Languages</p></span>
        <div>
          {languages.map(language => {
            return (
              <div className="details-card">
                {language.name}
              </div>
            )
          })}
        </div>
      </span>
    </div>
  )
}

export default Details