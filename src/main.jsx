import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store/store'
import { Provider } from 'react-redux'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Home from './pages/Home.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import Requests from './pages/Requests.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Explore from './pages/Explore.jsx'
import RequestForm from './components/RequestForm.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import RequestView from './components/RequestView.jsx'
import Rewards from './pages/Rewards.jsx'
import Profile from './pages/Profile.jsx'
import Organzation from './pages/Organzation.jsx'
import OrganizationRegistration from './components/OrganizationRegistration.jsx'
import User from './pages/User.jsx'
import AppointmentInbox from './pages/AppointmentInbox.jsx'
import AdminHistory from './pages/AdminHistory.jsx'
import News from './pages/News.jsx'

//for routing through pages

const router  =  createBrowserRouter([
  {
    path : "/",
    element :<App/>,
    children : [
      {
        path: "/",
        element: (
            <AuthLayout authentication={false}  path='/'>
                <Home />
            </AuthLayout>
        )
      },
      {
        path: "/:accountType/login",
        element: (
            <AuthLayout authentication={false}>
                <Login />
            </AuthLayout>
        ),
      },
      {
        path: "/user/registration",
        element: (
            <AuthLayout authentication={false}>
                <Signup />
            </AuthLayout>
        ),
        
      },
      {
        path: "/organization",
        element: (
          <AuthLayout authentication={false} >
            <Organzation/> 
          </AuthLayout>
           
        ),
        
      },
      {
        path: "/organization/registration",
        element: (
          <AuthLayout authentication={false} >
            <OrganizationRegistration/> 
          </AuthLayout>
           
        ),
        
      },
      {
        path: "/requests",
        element: (
            <AuthLayout authentication label={"user"} path='/requests' >
           < Requests/>
            </AuthLayout>
        ),
      },
      {
        path: "/explore",
        element: (
            <AuthLayout authentication label={"user"} path='/explore'>
              <Explore/>
            </AuthLayout>
        ),
      },
      {
        path: "form",
        element: (
            <AuthLayout authentication label={"user"} path='/explore/form'>
              <RequestForm/>
            </AuthLayout>
        ),
      },
      {
        path: "/dashboard",
        element: (
          
            <AuthLayout authentication label={"admin"} path="/dashboard">
              <AdminDashboard/>
            </AuthLayout>
            
        ),
        
      },
      {
        path: "/request/:requestId",
        element: (
          <AuthLayout authentication >
            <RequestView/> 
          </AuthLayout>
           
        ),
        
      },
      // {
      //   path: "/organization/login",
      //   element: (
      //     <AuthLayout authentication={false} >
      //       <Login/> 
      //     </AuthLayout>
           
      //   ),
        
      // },
      {
        path: "/inbox",
        element: (
          <AuthLayout authentication >
            <AppointmentInbox/> 
          </AuthLayout>
           
        ),
        
      },
      {
        path: "/history",
        element: (
          <AuthLayout authentication >
            <AdminHistory/> 
          </AuthLayout>
           
        ),
        
      },

      {
        path: "/user",
        element: (
          <AuthLayout authentication={false} >
            <User/> 
          </AuthLayout>
           
        ),
        
      },
      {
        path: "/dashboard/:requestId",
        element: (
          <AuthLayout authentication >
            <RequestView/> 
          </AuthLayout>
           
        ),
        
      },
      {
        path: "/history/:requestId",
        element: (
          <AuthLayout authentication >
            <RequestView/> 
          </AuthLayout>
           
        ),
        
      },
      {
        path: "/inbox/:requestId",
        element: (
          <AuthLayout authentication >
            <RequestView/> 
          </AuthLayout>
           
        ),
        
      },
      {
        path: "/rewards",
        element: (
          <AuthLayout authentication label={"user"} path="/rewards">
            <Rewards/> 
          </AuthLayout>
           
        ),
        
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication label={"user"} path="/rewards">
            <Profile/> 
          </AuthLayout>
           
        ),
        
      },
      {
        path: "/news",
        element: (
          <AuthLayout authentication label={"user"} path="/news">
            <News/>
          </AuthLayout>
           
        ),
        
      },
    ]
  }
])

let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
