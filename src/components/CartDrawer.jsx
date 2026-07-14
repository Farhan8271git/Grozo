import {
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
  FiX,
} from "react-icons/fi";

function CartDrawer({
  cart,
  isOpen,
  onClose,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  subtotal,
  onCheckout,
}) {
  const deliveryFee = subtotal >= 299 || subtotal === 0 ? 0 : 25;

  const handlingFee = subtotal === 0 ? 0 : 5;

  const total = subtotal + deliveryFee + handlingFee;

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "cart-overlay-open" : ""}`}
        onClick={onClose}
      />

      <aside
        className={`cart-drawer ${isOpen ? "cart-drawer-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="cart-drawer-header">
          <div>
            <h2>My Cart</h2>

            {cart.length > 0 && (
              <p>{cart.length} unique products</p>
            )}
          </div>

          <button
            className="cart-close-button"
            type="button"
            onClick={onClose}
            aria-label="Close cart"
          >
            <FiX />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FiShoppingBag />
            </div>

            <h3>Your cart is empty</h3>

            <p>Add products to start building your order.</p>

            <button type="button" onClick={onCheckout}>
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-content">
              <div className="cart-delivery-card">
                <strong>Delivery in 10 minutes</strong>

                <span>Your order is ready to be packed.</span>
              </div>

              <div className="cart-items">
                {cart.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <div
                      className="cart-item-image"
                      style={{ backgroundColor: item.background }}
                    >
                      <span>{item.image}</span>
                    </div>

                    <div className="cart-item-details">
                      <h3>{item.name}</h3>

                      <p>{item.quantity}</p>

                      <div className="cart-item-price">
                        <strong>
                          ₹{item.price * item.cartQuantity}
                        </strong>

                        {item.originalPrice > item.price && (
                          <span>
                            ₹
                            {item.originalPrice *
                              item.cartQuantity}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="cart-item-actions">
                      <div className="cart-quantity-control">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                        >
                          <FiMinus />
                        </button>

                        <span>{item.cartQuantity}</span>

                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                        >
                          <FiPlus />
                        </button>
                      </div>

                      <button
                        className="remove-cart-item"
                        type="button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        aria-label={`Remove ${item.name}`}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <button
                className="clear-cart-button"
                type="button"
                onClick={clearCart}
              >
                Clear Cart
              </button>

              <div className="bill-details">
                <h3>Bill details</h3>

                <div>
                  <span>Item subtotal</span>
                  <strong>₹{subtotal}</strong>
                </div>

                <div>
                  <span>Delivery fee</span>

                  <strong>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </strong>
                </div>

                <div>
                  <span>Handling fee</span>
                  <strong>₹{handlingFee}</strong>
                </div>

                <div className="bill-total">
                  <span>Grand total</span>
                  <strong>₹{total}</strong>
                </div>
              </div>
            </div>

            <div className="cart-checkout">
              <button type="button" onClick={onCheckout}>
                <div>
                  <strong>₹{total}</strong>
                  <span>TOTAL</span>
                </div>

                <span>Proceed to Checkout →</span>
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;