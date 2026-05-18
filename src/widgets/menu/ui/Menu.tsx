import { NavLink, Outlet } from 'react-router-dom';
import './Menu.css';

export function Menu() {
  return (
    <div>
      <nav className="nav-menu">
        <NavLink to="/" className="nav-menu__button">
          Home
        </NavLink>
        <NavLink to="about" className="nav-menu__button">
          About
        </NavLink>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}
