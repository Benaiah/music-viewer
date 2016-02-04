import "babel-polyfill"

import Promise from 'bluebird'
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'

ReactDOM.render(
  <Root />,
  document.getElementById('app')
)
