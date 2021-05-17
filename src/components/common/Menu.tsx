import { Link } from 'react-router-dom'
import Logo from './Logo'
function Menu () {
  return (
        <nav className="main-nav flex-row-between">
            <Logo/>
            <ul className="main-nav__menu menu d-flex-row">
                <li className="menu__item">
                    <Link to={'/login'}>
                        Login
                    </Link>
                </li>
                <li className="menu__item">
                    <Link to={'/catched'}>
                        Catched
                    </Link>
                </li>
            </ul>
        </nav>
  )
}

export default Menu
