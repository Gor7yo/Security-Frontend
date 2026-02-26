import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1>Профессиональная охранная организация</h1>
          <p className="hero-subtitle">
            Обеспечиваем безопасность объектов и территорий с 2013 года
          </p>
          <div className="hero-buttons">
            <Link to="/services" className="btn btn-primary btn-lg">
              Наши услуги
            </Link>
            {!isAuthenticated && (
              <Link to="/register" className="btn btn-secondary btn-lg">
                Начать работу
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Почему выбирают нас</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Быстрое реагирование</h3>
              <p>Быстро прибываем на объект и обеспечиваем безопасность</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Опытные специалисты</h3>
              <p>Наши сотрудники выполнят свою работу в кратчайшие сроки</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Прозрачные цены</h3>
              <p>Честные цены без скрытых платежей и доплат</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>130+</h3>
              <p>Защищенных объектов</p>
            </div>
            <div className="stat-item">
              <h3>13 лет</h3>
              <p>На рынке охранных услуг</p>
            </div>
            <div className="stat-item">
              <h3>99.9%</h3>
              <p>Удовлетворенность клиентов</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Готовы обеспечить безопасность?</h2>
          <p>Свяжитесь с нами и получите консультацию</p>
          <div className="cta-buttons">
            <Link to="/services" className="btn btn-primary btn-lg">
              Выбрать услугу
            </Link>
            <a href="tel:+79991234567" className="btn btn-outline btn-lg">
              📞 8 (383) 266-08-09
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;