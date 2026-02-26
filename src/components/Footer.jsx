const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>О компании</h3>
            <p>Профессиональные охранные услуги с 2013 года. Гарантируем безопасность вашего бизнеса и личного имущества.</p>
          </div>
          
          <div className="footer-section">
            <h3>Контакты</h3>
            <p>📞 8 (383) 266-08-09</p>
            <p>📧 info@security.ru</p>
            <p>📍 г Новосибирск, Московская улица, 163А</p>
          </div>
          
          <div className="footer-section">
            <h3>Услуги</h3>
            <p>Охрана объектов</p>
            <p>Охрана мероприятий</p>
            <p>Пультовая охрана</p>
          </div>
          
          <div className="footer-section">
            <h3>Режим работы</h3>
            <p>09:00–17:00</p>
            <p>Без выходных</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Охранные Услуги. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;