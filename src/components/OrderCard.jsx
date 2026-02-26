const OrderCard = ({ order, onStatusChange, isAdmin }) => {
  const getStatusBadge = (status) => {
    const badges = {
      new: { text: 'Новый', class: 'badge-new' },
      confirmed: { text: 'Подтвержден', class: 'badge-confirmed' },
      in_progress: { text: 'В работе', class: 'badge-progress' },
      completed: { text: 'Завершен', class: 'badge-completed' },
      cancelled: { text: 'Отменен', class: 'badge-cancelled' }
    };
    return badges[status] || badges.new;
  };

  const getPaymentBadge = (status) => {
    const badges = {
      pending: { text: 'Ожидает оплаты', class: 'badge-pending' },
      paid: { text: 'Оплачено', class: 'badge-paid' },
      failed: { text: 'Ошибка', class: 'badge-failed' },
      refunded: { text: 'Возврат', class: 'badge-refunded' }
    };
    return badges[status] || badges.pending;
  };

  const statusBadge = getStatusBadge(order.orderStatus);
  const paymentBadge = getPaymentBadge(order.paymentStatus);

  return (
    <div className="order-card">
      <div className="order-header">
        <div>
          <h3>{order.service?.title}</h3>
          <p className="order-date">
            Создан: {new Date(order.createdAt).toLocaleDateString('ru-RU')}
          </p>
        </div>
        <div className="order-badges">
          <span className={`badge ${statusBadge.class}`}>{statusBadge.text}</span>
          <span className={`badge ${paymentBadge.class}`}>{paymentBadge.text}</span>
        </div>
      </div>
      
      <div className="order-details">
        <div className="detail-row">
          <span className="detail-label">Адрес:</span>
          <span>{order.location.address}, {order.location.city}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Дата начала:</span>
          <span>{new Date(order.schedule.startDate).toLocaleDateString('ru-RU')}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Длительность:</span>
          <span>{order.schedule.duration} {order.schedule.durationUnit === 'hours' ? 'часов' : order.schedule.durationUnit === 'days' ? 'дней' : 'месяцев'}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Охранников:</span>
          <span>{order.numberOfGuards}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Контакт:</span>
          <span>{order.contactInfo.phone}</span>
        </div>
      </div>
      
      <div className="order-footer">
        <div className="order-price">
          <span className="price-label">Стоимость:</span>
          <span className="price-value">{order.calculatedPrice} ₽</span>
        </div>
        
        {isAdmin && onStatusChange && (
          <div className="admin-actions">
            <button 
              onClick={() => onStatusChange(order._id, 'confirmed')}
              className="btn btn-sm btn-success"
              disabled={order.orderStatus !== 'new'}
            >
              Подтвердить
            </button>
            <button 
              onClick={() => onStatusChange(order._id, 'completed')}
              className="btn btn-sm btn-primary"
              disabled={order.orderStatus === 'completed' || order.orderStatus === 'cancelled'}
            >
              Завершить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;