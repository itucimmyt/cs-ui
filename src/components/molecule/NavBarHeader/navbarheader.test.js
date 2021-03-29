import React from 'react'
import ReactDOM from 'react-dom'
// Component to be Test
import NavBarHeader from './navbarheader'
// Test Library
import { render, cleanup } from '@testing-library/react'
import '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)
test('Report name', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NavBarHeader></NavBarHeader>, div)
})
// Props to send component to be rendered
const props = {
  properyName: 'Value',
}
test('Render correctly', () => {
  const { getByTestId } = render(<NavBarHeader {...props}></NavBarHeader>)
  expect(getByTestId('NavBarHeaderTestId')).toBeInTheDocument()
})
