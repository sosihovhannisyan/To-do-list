import {React, useState, useMemo } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddItem from './components/AddItem'
import EditItem from './components/EditItem'
import ItemList from './components/ItemList'
import {ActiveContext } from "./ActiveContext"

export const MyRoutes = () => {
    const [isActive, setActive] = useState("false")
    const value = useMemo(() => ({isActive, setActive}), [isActive, setActive])

    return (
        <BrowserRouter>
            <ActiveContext.Provider value={value} >
            <Routes>
                <Route index element={<ItemList />} />
                <Route path='/add' element={<AddItem />} />
                <Route path='/item/edit/:id' element={<EditItem />} />
                <Route path='*' element={<h1>Not Found</h1>} />
                </Routes>
            </ActiveContext.Provider> 
        </BrowserRouter>
    )
}


