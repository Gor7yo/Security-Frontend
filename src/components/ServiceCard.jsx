import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ServiceCard = ({ service }) => {
  const { isAuthenticated } = useAuth();
  
  const getServiceIcon = (type) => {
    switch(type) {
      case 'object_security':
        return '🏢';
      case 'event_security':
        return '🎉';
      case 'alarm_security':
        return '🚨';
      default:
        return '🛡️';
    }
  };

  return (
    <div className="service-card">
      <div className="service-icon">{getServiceIcon(service.type)}</div>
      <h3>{service.title}</h3>
      <p className="service-description">{service.description}</p>
      
      <div className="service-price">
        <span className="price-label">от</span>
        <span className="price-value">{service.basePrice} ₽</span>
      </div>
      
      <div className="service-features">
        {service.features?.slice(0, 3).map((feature, index) => (
          <div key={index} className="feature-item">
            ✓ {feature}
          </div>
        ))}
      </div>
      
      {isAuthenticated ? (
        <Link to={`/order/${service._id}`} className="btn btn-primary btn-block">
          Заказать услугу
        </Link>
      ) : (
        <Link to="/login" className="btn btn-secondary btn-block">
          Войдите для заказа
        </Link>
      )}
    </div>
  );
};

export default ServiceCard;