import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="page-header">
          <h1>Личный кабинет</h1>
          <p>Добро пожаловать, {user?.fullName}!</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">👤</div>
            <h3>Профиль</h3>
            <div className="profile-info">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Телефон:</strong> {user?.phone}</p>
              <p><strong>Роль:</strong> {user?.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
            </div>
          </div>

          <Link to="/my-orders" className="dashboard-card card-link">
            <div className="card-icon">📋</div>
            <h3>Мои заказы</h3>
            <p>Просмотр всех ваших заказов и их статусов</p>
          </Link>

          <Link to="/services" className="dashboard-card card-link">
            <div className="card-icon">🛡️</div>
            <h3>Заказать услугу</h3>
            <p>Выберите и закажите охранную услугу</p>
          </Link>

          {user?.role === 'admin' && (
            <Link to="/admin" className="dashboard-card card-link">
              <div className="card-icon">⚙️</div>
              <h3>Админ-панель</h3>
              <p>Управление заказами и услугами</p>
            </Link>
          )}
        </div>

        <div className="info-section">
          <h2>Как сделать заказ?</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Выберите услугу</h4>
              <p>Перейдите в раздел "Услуги" и выберите подходящий тип охраны</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Заполните заявку</h4>
              <p>Укажите детали объекта и желаемые параметры охраны</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>Дождитесь подтверждения</h4>
              <p>Наши менеджеры свяжутся с вами для уточнения деталей</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;