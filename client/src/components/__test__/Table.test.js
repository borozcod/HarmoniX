import React from 'react'
import ReactDOM from 'react-dom'
import Table from './../Table'
import Search from './../Search'

import {render} from '@testing-library/react'
//import "jest-dom/extend-expect"
import {expect} from '@testing-library/jest-dom'

it("renders table without crashing", () => {
    const div = document.createElement('div')
    ReactDOM.render(<Table></Table>, div)
})

it("render table correctly", ()=>{
    render(<table></table>)
})

it("renders search without crashing", () => {
    const div = document.createElement('div')
    ReactDOM.render(<Search></Search>, div)
})


it("render search correctly", ()=>{
    const {getByValue} = render(<Search></Search>)
    expect(getByValue('none')).toHaveTextContent("Choose your option")
})

