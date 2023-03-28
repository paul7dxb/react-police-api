import { NavLink } from "react-router-dom"
import classes from "./Navigation.module.css"

const Navigation = () => {
return (
    <header className={classes.header}>
        <nav>
            <ul>
                <li>
                    <NavLink to="/" className={({isActive}) => isActive ? classes.active : undefined} >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/forces" className={({isActive}) => isActive ? classes.active : undefined} >
                        Forces
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/testground" className={({isActive}) => isActive ? classes.active : undefined} >
                        TestGroundPage
                    </NavLink>
                </li>
            </ul>
        </nav>
    </header>
)
}

export default Navigation