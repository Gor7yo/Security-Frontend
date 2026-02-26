import { useState, useEffect } from 'react';
import { ordersAPI } from '../services/api';
import OrderCard from '../components/OrderCard';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await ordersAPI.getAll(params);
      setOrders(response.data.orders);
    } catch (error) {
      setError('Ошибка при загрузке заказов');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await ordersAPI.update(orderId, { orderStatus: newStatus });
      fetchOrders();
      alert('Статус заказа обновлен');
    } catch (error) {
      alert('Ошибка при обновлении статуса');
      console.error('Error updating status:', error);
    }
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      new: orders.filter(o => o.orderStatus === 'new').length,
      confirmed: orders.filter(o => o.orderStatus === 'confirmed').length,
      inProgress: orders.filter(o => o.orderStatus === 'in_progress').length,
      completed: orders.filter(o => o.orderStatus === 'completed').length
    };
  };

  const stats = getOrderStats();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="admin-panel-page">
      <div className="container">
        <div className="page-header">
          <h1>⚙️ Админ-панель</h1>
          <p>Управление заказами и услугами</p>
        </div>

        <div className="stats-cards">
          <div className="stat-card">
            <h3>{stats.total}</h3>
            <p>Всего заказов</p>
          </div>
          <div className="stat-card">
            <h3>{stats.new}</h3>
            <p>Новые</p>
          </div>
          <div className="stat-card">
            <h3>{stats.confirmed}</h3>
            <p>Подтверждены</p>
          </div>
          <div className="stat-card">
            <h3>{stats.inProgress}</h3>
            <p>В работе</p>
          </div>
          <div className="stat-card">
            <h3>{stats.completed}</h3>
            <p>Завершены</p>
          </div>
        </div>

        <div className="filter-section">
          <label>Фильтр по статусу:</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="form-control"
          >
            <option value="all">Все заказы</option>
            <option value="new">Новые</option>
            <option value="confirmed">Подтвержденные</option>
            <option value="in_progress">В работе</option>
            <option value="completed">Завершенные</option>
            <option value="cancelled">Отмененные</option>
          </select>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="orders-list">
          {orders.map(order => (
            <OrderCard 
              key={order._id} 
              order={order} 
              onStatusChange={handleStatusChange}
              isAdmin={true}
            />
          ))}
        </div>

        {orders.length === 0 && (
          <div className="empty-state">
            <p>Заказы не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;