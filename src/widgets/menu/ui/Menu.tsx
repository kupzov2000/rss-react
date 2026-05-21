import { NavLink, Outlet } from 'react-router-dom';
import './Menu.css';
import { ErrorViewButton } from '@/features/error-view-toggle';
import { useState } from 'react';

export function Menu() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error('Test error from Error Button');
  }

  function handleErrorView() {
    setShouldCrash(true);
  }

  return (
    <div>
      <div className="button-actions">
        <nav className="nav-menu">
          <NavLink to="/" className="button">
            Home
          </NavLink>
          <NavLink to="about" className="button">
            About
          </NavLink>
        </nav>
        <ErrorViewButton onClick={handleErrorView} />
      </div>
      <Outlet></Outlet>
    </div>
  );
}
