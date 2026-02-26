import { useState, useEffect } from 'react';
import { servicesAPI } from '../services/api';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll();
      setServices(response.data.services);
    } catch (error) {
      setError('Ошибка при загрузке услуг');
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка услуг...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="services-page">
      <div className="container">
        <div className="page-header">
          <h1>Наши услуги</h1>
          <p>Выберите подходящую охранную услугу для вашего объекта</p>
        </div>

        <div className="services-grid">
          {services.map(service => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>

        {services.length === 0 && (
          <div className="empty-state">
            <p>Услуги пока не добавлены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;