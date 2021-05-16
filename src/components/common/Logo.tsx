import { Link } from 'react-router-dom'
import LogoIcon from '../../logo.png'
function Logo() {
    return (
        <Link to="/">
        <img className="logo" alt="logo" src={LogoIcon}/>
        </Link>
    )
}

export default Logo