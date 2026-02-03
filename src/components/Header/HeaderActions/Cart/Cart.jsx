import "./Cart.css";

const Cart = () => {
  return (
    <div className="cart-container">
      <div className="cart-card">
        <span className="cart-card-icon">🛒</span>
        <h1 className="cart-title">Кошик</h1>

        <p className="cart-text">
          Тут будуть зберігатися товари, які ви плануєте придбати 
        </p>

        <p className="cart-hint">
          Функціонал кошика зараз у розробці ✨
        </p>
      </div>
    </div>
  );
};

export default Cart;
