import React from 'react'
// import {Container, Logo, LogoutBtn} from '../index'
// import{ Container } from '../index'

import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import LogoutBtn from './LogoutBtn.jsx'
import Container from '../container/Container'
import Logo from '../Logo'
import SearchInput from '../SearchInput'

function Header({currentSlug}) {
  const authStatus = useSelector((state) => state.auth.status)
  

  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: authStatus,

    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
        name: "Create Account",
        slug: "/signup",
        active: !authStatus,
    },
    {
      name: "Profile",
      slug: "/profile",
      active: authStatus,
    },
  ]


  return (
    <header className='py-2 px-2  w-full  text-gray-800 '>
      <Container>
        <nav className='flex items-center flex-wrap justify-between'>
            {/* <Link to='/' className=' flex justify-center inline-bock  py-1.5 border border-transparent'>
              <Logo />
              </Link> */}
              {/* <div className='flex-1 max-w-screen-sm'>
                  <SearchInput/>
              </div> */}

              <div className='border py-1.5'>
              <ul className='flex  gap-1 max-sm:hidden px-4 py-1   duration-200 transition-all  justify-center'>
               
                {/* {navItems.map((item) => 
                item.active ? (
                  <li key={item.name}>
                    <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-bock  py-1.5 duration-200 border border-transparent  rounded-lg `}
                    >{(item.name == "Login" ) ? item.name+" / " : item.name}
                    
                    </button>
                  </li>
                ) : null
                )} */}
                {!authStatus && (
                  <ul className='flex flex-row gap-1'>
                    <li>
                      Login
                    </li>
                     /
                    <li>
                      New Account
                    </li>
                  </ul>
                 
                  
                )}
                {/* {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )} */}
              </ul>
              </div>
         
        </nav>
        </Container>
    </header>
  )
}

export default Header