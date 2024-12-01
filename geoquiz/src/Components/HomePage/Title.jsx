"use client"
import React from 'react'
import {motion} from 'framer-motion'
import '../../Styles/HomePage/TitleStyles.css'

function Title() {
  return (
    <motion.div
        initial = {{x: '-100vw'}}
        animate = {{x: 0}}
        transition = {{
            type: "spring",
            stiffness: 150,
            damping: 25,
            mass: 0.8,
        }}
        className='bouncing-title-container'
    >
        GeoQuiz
    </motion.div>
  )
}

export default Title