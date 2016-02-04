import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import DevTools from './containers/DevTools'

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument()
)
export default function () {
  return createStore(
    rootReducer,
    enhancer
  )
}
