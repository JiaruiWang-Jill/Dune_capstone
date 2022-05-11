import { NavLink } from "react-router-dom";
import './sidebar.css';

function SideBar(){
    return (
        <div>
            <div className="nav">
                <ul>
                    <li className="navlink">
                        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/viewpage">
                        Dashboard
                        </NavLink>
                    </li>

                    <li className="navlink">
                        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/homepage">
                        Command
                        </NavLink>
                    </li>

                </ul>

          </div> 
        </div>
    )
}

export default SideBar;
