import React, { useState } from 'react'

import { FileTextFilled, FileTextOutlined, FileImageFilled, FileImageOutlined } from '@ant-design/icons'

import './ProgressBar.css'

const ProgressBar = () => {
  const scrollToContent = () => {
    let height = window.innerHeight
    window.scrollTo({
      top: height,
      left: 0,
      behavior: 'smooth'
    });
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  const [isTop, setIsTop] = useState(true)

  let height = window.innerHeight
  let distanceToTop

  window.addEventListener('scroll', () => {
    distanceToTop = window.pageYOffset
    if (distanceToTop > height/2) setIsTop(false)
    if (distanceToTop < height/2) setIsTop(true)
  })

  return (
    <div className="progress-bar">
      <span  onClick={scrollToTop} className="scroll-btn">{isTop ? <FileImageFilled  style={{fontSize: '110%'}} /> : <FileImageOutlined/>}</span>
      <span className='line'></span>
      <div onClick={scrollToContent} className="scroll-btn">{isTop ? <FileTextOutlined/> : <FileTextFilled style={{fontSize: '110%'}} />}</div>
    </div>
  )
}

export default ProgressBar