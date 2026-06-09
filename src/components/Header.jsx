import '../assets/styles/global.css';
import NavRuta from './navigation/NavRuta';

const Header = ({
  title,
  subtitle,
  actionText,
  onAction,
  breadcrumbs = []
}) => {
  return (
    <header className="app-header">

      <div>
        {breadcrumbs.length > 0 && (
          <NavRuta items={breadcrumbs} />
        )}
        
        <h2 className="app-header-title">
          {title}
        </h2>

        {subtitle && (
          <p className="app-header-subtitle">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && (
        <button
          className="add-course-btn"
          onClick={onAction}
        >
          {actionText}
        </button>
      )}

    </header>
  );
};

export default Header;