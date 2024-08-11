import { Outlet, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { logout, selectIsAuthenticated, selectUser } from './state/authSlice'

const Layout = () => {
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 10)
      console.log('scrolling')
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)

  const handleLogout = () => {
    dispatch(logout())
  }

  window.onload = () => {
    const navPosition = document.getElementById('navPosition')
    navPosition.style.height = document.querySelector('nav').offsetHeight + 'px'
  }

  return (
    <>
      <div id='navPosition'></div>
      <nav className={isScrolling ? 'scrolled' : ''}>
        <ul>  
          {!isAuthenticated &&
          <>
            <div className='nav-container'>
              <li id='logo'>
                <Link to='/'></Link>
              </li>
              <li>
                <Link to='/'>Home</Link>
              </li>
            </div>
            <div className='nav-container'>
              <li>
                <Link to='/login'>Sign in</Link>
              </li>
              <li id='register'>
                <Link to='/register'>Sign up</Link>
              </li>
            </div>
          </>
          }
          {isAuthenticated &&
            <>
              <div className='nav-container'>
                <li id='logo'>
                  <Link to='/'></Link>
                </li>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                {user.role === 'company' &&
                <li>
                  <Link to='/create'>Add new job</Link>
                </li>
                }
              </div>
              <div className='nav-container'>
                <li>
                  <Link to='/profile'>Profile</Link>
                </li>
                <li id='logout' onClick={handleLogout}>
                  <Link to='/'>Logout</Link>
                </li>
              </div>
            </>
          }
        </ul>
      </nav>

      <Outlet />

      <footer></footer>
    </>
  )
}

export default Layout