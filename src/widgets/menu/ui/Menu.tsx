import { NavLink, Outlet } from 'react-router-dom';
import './Menu.css';
import { crash, ErrorViewButton } from '@/features/error-view-toggle';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { ThemeToggleButton } from '@/features/theme-toggle';

export function Menu() {
  const dispatch = useAppDispatch();

  const shouldCrash = useAppSelector((state) => state.errorView.shouldCrash);

  if (shouldCrash) {
    throw new Error('Test error from Error Button');
  }

  function handleErrorView() {
    dispatch(crash());
  }

  return (
    <div className="layout">
      <header className="layout__header">
        <nav className="nav-menu">
          <NavLink to="/" className="button">
            Home
          </NavLink>

          <NavLink to="about" className="button">
            About
          </NavLink>
        </nav>

        <div className="button-actions">
          <ThemeToggleButton />
          <ErrorViewButton onClick={handleErrorView} />
        </div>
      </header>

      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  );
}
