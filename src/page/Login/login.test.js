import React from 'react'
import ReactDOM from 'react-dom'
// Component to be Test
import Login from './login'
// Test Library
import { render, cleanup } from '@testing-library/react'
import '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)
test('Report name', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Login></Login>, div)
})
// Props to send component to be rendered
const props = {
  properyName: 'Value',
}
test('Render correctly', () => {
  const { getByTestId } = render(<Login {...props}></Login>)
  expect(getByTestId('LoginTestId')).toBeInTheDocument()
})
