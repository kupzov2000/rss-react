import { NavLink, Outlet } from 'react-router-dom';
import './Menu.css';
import { crash, ErrorViewButton } from '@/features/error-view-toggle';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

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
