import { Link } from 'react-router-dom';
import './AboutWidget.css';

export function AboutWidget() {
  return (
    <div className="about__wrapper">
      <div className="about__window">
        <span>
          Hello my name is Evgeny. Successfully completed the main course.
          Learned a lot during the RS School course.
        </span>
        <Link
          to="https://rs.school/courses/reactjs"
          className="about__link-school"
        >
          RSS React
        </Link>
      </div>
    </div>
  );
}
