import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { BurgerMenu } from "./BurgerMenu";

const Navbar = () => {
  const {
    user,
    isAuthenticated,
    isAdmin,
    logout,
    isMedia,
    setIsMedia,
    resizeWindow,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.onresize = () => {
      resizeWindow();
    };

    // Очистка обработчика при размонтировании
    return () => {
      window.onresize = null;
    };
  }, [resizeWindow]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          СБ - ДЕРЖАВА
        </Link>

        {isMedia ? (
          <BurgerMenu
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            user={user}
            onLogout={handleLogout}
          />
        ) : (
          <div className="navbar-menu">
            <Link to="/" className="nav-link">
              Главная
            </Link>
            <Link to="/services" className="nav-link">
              Услуги
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="nav-link">
                  Личный кабинет
                </Link>
                <Link to="/my-orders" className="nav-link">
                  Мои заказы
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="nav-link">
                    Админ-панель
                  </Link>
                )}
                <div className="nav-user">
                  <span>👤 {user?.fullName}</span>
                  <button onClick={handleLogout} className="btn btn-logout">
                    Выход
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Вход
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Регистрация
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
