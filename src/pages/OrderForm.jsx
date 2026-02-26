import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { servicesAPI, ordersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PriceCalculator from '../components/PriceCalculator';

const OrderForm = () => {
  const { serviceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  
  const [formData, setFormData] = useState({
    contactInfo: {
      fullName: user?.fullName || '',
      phone: user?.phone || '',
      email: user?.email || ''
    },
    location: {
      address: '',
      city: '',
      description: ''
    },
    schedule: {
      startDate: '',
      duration: 1,
      durationUnit: 'hours'
    },
    numberOfGuards: 1,
    additionalServices: [],
    notes: ''
  });

  useEffect(() => {
    fetchService();
  }, [serviceId]);

  const fetchService = async () => {
    try {
      const response = await servicesAPI.getById(serviceId);
      setService(response.data.service);
    } catch (error) {
      setError('Ошибка при загрузке услуги');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleCalculation = (calculation) => {
    setCalculatedPrice(calculation.totalPrice);
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        duration: calculation.duration,
        durationUnit: calculation.durationUnit
      },
      numberOfGuards: calculation.numberOfGuards
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!calculatedPrice) {
      setError('Пожалуйста, рассчитайте стоимость перед отправкой заказа');
      setSubmitting(false);
      return;
    }

    try {
      const orderData = {
        ...formData,
        service: serviceId,
        calculatedPrice
      };

      await ordersAPI.create(orderData);
      alert('Заказ успешно создан!');
      navigate('/my-orders');
    } catch (error) {
      setError(error.response?.data?.message || 'Ошибка при создании заказа');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="error-container">
        <p>Услуга не найдена</p>
      </div>
    );
  }

  return (
    <div className="order-form-page">
      <div className="container">
        <div className="page-header">
          <h1>Заказ услуги: {service.title}</h1>
          <p>{service.description}</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="order-form-container">
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <div className="form-card">
                <h3>Контактная информация</h3>
                
                <div className="form-group">
                  <label>Полное имя</label>
                  <input
                    type="text"
                    value={formData.contactInfo.fullName}
                    onChange={(e) => handleChange('contactInfo', 'fullName', e.target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Телефон</label>
                  <input
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={(e) => handleChange('contactInfo', 'phone', e.target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => handleChange('contactInfo', 'email', e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="form-card">
                <h3>Информация об объекте</h3>
                
                <div className="form-group">
                  <label>Город</label>
                  <input
                    type="text"
                    value={formData.location.city}
                    onChange={(e) => handleChange('location', 'city', e.target.value)}
                    className="form-control"
                    placeholder="Москва"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Адрес объекта</label>
                  <input
                    type="text"
                    value={formData.location.address}
                    onChange={(e) => handleChange('location', 'address', e.target.value)}
                    className="form-control"
                    placeholder="ул. Примерная, д. 1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Описание объекта (опционально)</label>
                  <textarea
                    value={formData.location.description}
                    onChange={(e) => handleChange('location', 'description', e.target.value)}
                    className="form-control"
                    rows="3"
                    placeholder="Дополнительная информация об объекте"
                  />
                </div>
              </div>

              <div className="form-card">
                <h3>График работы</h3>
                
                <div className="form-group">
                  <label>Дата начала</label>
                  <input
                    type="date"
                    value={formData.schedule.startDate}
                    onChange={(e) => handleChange('schedule', 'startDate', e.target.value)}
                    className="form-control"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              <div className="form-card">
                <h3>Дополнительная информация</h3>
                
                <div className="form-group">
                  <label>Примечания (опционально)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange(null, 'notes', e.target.value)}
                    className="form-control"
                    rows="4"
                    placeholder="Дополнительные пожелания или требования"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg btn-block"
                disabled={submitting || !calculatedPrice}
              >
                {submitting ? 'Отправка...' : 'Отправить заказ'}
              </button>
            </form>
          </div>

          <div className="calculator-section">
            <PriceCalculator 
              serviceId={serviceId} 
              onCalculate={handleCalculation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;