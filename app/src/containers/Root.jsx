import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'
import DevTools from './DevTools'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <AsyncApp />
          <DevTools />
        </div>
      </Provider>
    )
  }
}
