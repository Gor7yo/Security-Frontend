import { useState, useEffect } from 'react';
import { servicesAPI } from '../services/api';

const PriceCalculator = ({ serviceId, onCalculate }) => {
  const [calculation, setCalculation] = useState({
    duration: 1,
    durationUnit: 'hours',
    numberOfGuards: 1
  });
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (serviceId) {
      calculatePrice();
    }
  }, [calculation, serviceId]);

  const calculatePrice = async () => {
    setLoading(true);
    try {
      const response = await servicesAPI.calculate({
        serviceId,
        ...calculation
      });
      setPrice(response.data.calculation.totalPrice);
      if (onCalculate) {
        onCalculate(response.data.calculation);
      }
    } catch (error) {
      console.error('Ошибка расчета:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setCalculation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="price-calculator">
      <h3>📊 Калькулятор стоимости</h3>
      
      <div className="calculator-form">
        <div className="form-group">
          <label>Длительность</label>
          <input
            type="number"
            min="1"
            value={calculation.duration}
            onChange={(e) => handleChange('duration', parseInt(e.target.value))}
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label>Единица времени</label>
          <select
            value={calculation.durationUnit}
            onChange={(e) => handleChange('durationUnit', e.target.value)}
            className="form-control"
          >
            <option value="hours">Часы</option>
            <option value="days">Дни</option>
            <option value="months">Месяцы</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Количество охранников</label>
          <input
            type="number"
            min="1"
            max="50"
            value={calculation.numberOfGuards}
            onChange={(e) => handleChange('numberOfGuards', parseInt(e.target.value))}
            className="form-control"
          />
        </div>
      </div>
      
      {price !== null && (
        <div className="calculated-price">
          <span className="price-label">Примерная стоимость:</span>
          <span className="price-value">{price.toLocaleString('ru-RU')} ₽</span>
        </div>
      )}
      
      {loading && <p className="text-muted">Расчет...</p>}
    </div>
  );
};

export default PriceCalculator;