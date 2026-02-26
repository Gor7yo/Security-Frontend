import { useState, useEffect } from 'react';
import { ordersAPI } from '../services/api';
import OrderCard from '../components/OrderCard';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getMy();
      setOrders(response.data.orders);
    } catch (error) {
      setError('Ошибка при загрузке заказов');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка заказов...</p>
      </div>
    );
  }

  return (
    <div className="my-orders-page">
      <div className="container">
        <div className="page-header">
          <h1>Мои заказы</h1>
          <p>История всех ваших заказов</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="orders-list">
          {orders.map(order => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>

        {orders.length === 0 && !loading && (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>У вас пока нет заказов</h3>
            <p>Перейдите в раздел "Услуги" чтобы сделать первый заказ</p>
            <a href="/services" className="btn btn-primary">
              Выбрать услугу
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;