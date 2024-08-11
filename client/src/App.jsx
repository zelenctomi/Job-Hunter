import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Layout from './Layout'
import Home from './Home'
import Login from './authentication/Login'
import Register from './authentication/Register'
import Job from './Job'
import EditJob from './EditJob'
import CreateJob from './CreateJob'
import { ProtectedRoute } from './routing/ProtectedRoute'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/job/:id" element={<Job />} />
      <Route path="/edit/:id" element={<ProtectedRoute redirectTo="/login"><EditJob /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute redirectTo="/login"><CreateJob /></ProtectedRoute>} />

      <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  )
}

export default App
