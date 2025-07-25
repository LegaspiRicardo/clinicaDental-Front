import React from 'react'
import ReactDOM from 'react-dom/client';
import DemoApp from './DemoApp'
import './index.css'

document.addEventListener('DOMContentLoaded', function() {
  const container = document.body.appendChild(document.createElement('div'))
  const root = ReactDOM.createRoot(container)
  root.render(<DemoApp />)
})
