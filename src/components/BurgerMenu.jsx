import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const BurgerMenu = ({ isAuthenticated, isAdmin, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Блокируем прокрутку body при открытом меню
    document.body.style.overflow = !isOpen ? "hidden" : "unset";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  const handleLogoutClick = () => {
    onLogout();
    closeMenu();
  };

  // Очищаем стиль body при размонтировании
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="burger-menu">
      {/* Бургер иконка - скрываем когда меню открыто */}
      <button
        className={`burger-menu__button ${isOpen ? "burger-menu__button--hidden" : ""}`}
        onClick={toggleMenu}
        aria-label="Меню"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        className={`burger-menu__overlay ${isOpen ? "burger-menu__overlay--active" : ""}`}
        onClick={closeMenu}
      ></div>

      <div
        className={`burger-menu__container ${isOpen ? "burger-menu__container--active" : ""}`}
      >
        <div className="burger-menu__header">
          <span className="burger-menu__logo">СБ - ДЕРЖАВА</span>
          <button className="burger-menu__close" onClick={closeMenu}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <nav className="burger-menu__nav">
          <Link to="/" className="burger-menu__link" onClick={handleLinkClick}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Главная</span>
          </Link>

          <Link
            to="/services"
            className="burger-menu__link"
            onClick={handleLinkClick}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>Услуги</span>
          </Link>

          {isAuthenticated ? (
            <>
              <div className="burger-menu__divider"></div>

              <Link
                to="/dashboard"
                className="burger-menu__link"
                onClick={handleLinkClick}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span>Личный кабинет</span>
              </Link>

              <Link
                to="/my-orders"
                className="burger-menu__link"
                onClick={handleLinkClick}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>Мои заказы</span>
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="burger-menu__link"
                  onClick={handleLinkClick}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span>Админ-панель</span>
                </Link>
              )}
            </>
          ) : null}
        </nav>

        <div className="burger-menu__footer">
          {isAuthenticated ? (
            <>
              <div className="burger-menu__user">
                <div className="burger-menu__user-avatar">
                  {user?.fullName?.charAt(0) || "U"}
                </div>
                <div className="burger-menu__user-info">
                  <span className="burger-menu__user-name">
                    {user?.fullName}
                  </span>
                  <span className="burger-menu__user-email">{user?.email}</span>
                </div>
              </div>
              <button
                onClick={handleLogoutClick}
                className="burger-menu__logout"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Выйти</span>
              </button>
            </>
          ) : (
            <div className="burger-menu__auth">
              <Link
                to="/login"
                className="burger-menu__login"
                onClick={handleLinkClick}
              >
                Вход
              </Link>
              <Link
                to="/register"
                className="burger-menu__register"
                onClick={handleLinkClick}
              >
                Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
