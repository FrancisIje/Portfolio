import React from 'react'
import { createRoot } from 'react-dom/client'
import Portfolio from '../francis-portfolio'
import './styles.css'

const root = document.getElementById('root') as HTMLElement
createRoot(root).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
)
