import { Link } from "react-router-dom"
import SearchOrder from "../features/Order/SearchOrder"

function Header() {
    return (
        <header>
            <Link to="/">FastReact Pizza</Link>
            <SearchOrder />
        </header>
    )
}

export default Header
