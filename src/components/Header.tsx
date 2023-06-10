import { auth, logout } from '../utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink } from 'react-router-dom';
import "./Header.css";

function Header() {
  const [user, loading, error] = useAuthState(auth);
  
  return (
    <div className='header'>
      <div className='header__logo'>
        <NavLink
          to={'/'}
          className={({isActive, isPending}) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Critika
        </NavLink>
      </div>

      <div className='header__nav'>
        <NavLink
          to={'/test'}
          className={({isActive, isPending}) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          TestList
        </NavLink>
        <NavLink
          to={'/lobby'}
          className={({isActive, isPending}) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Lobby
        </NavLink>
      </div>

      <div className='header__user'>
        {loading
          ? <div className='header__user-loading'>loading...</div>
          : user
          ? <>
            <div>{user?.email}</div>
            <button onClick={logout}>
              Logout
            </button>
          </>
          : <Link to={'/auth'}>Log in</Link>
        }
        
      </div>
    </div>
  )
}

export default Header