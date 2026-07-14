import { FiCheck, FiShoppingBag, FiX } from "react-icons/fi";

function OrderSuccessModal({ order, onClose }) {
  if (!order) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <section
        className="order-success-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-success-title"
      >
        <button
          className="modal-close-button"
          type="button"
          onClick={onClose}
          aria-label="Close order success"
        >
          <FiX />
        </button>

        <div className="order-success-icon">
          <FiCheck />
        </div>

        <span className="section-eyebrow">ORDER CONFIRMED</span>

        <h2 id="order-success-title">
          Your groceries are on the way!
        </h2>

        <p className="order-success-description">
          Your order has been placed successfully and is being prepared
          for delivery.
        </p>

        <div className="order-success-details">
          <div>
            <span>Order ID</span>
            <strong>{order.id}</strong>
          </div>

          <div>
            <span>Delivery time</span>
            <strong>10 minutes</strong>
          </div>

          <div>
            <span>Payment</span>
            <strong>
              {order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : "UPI on Delivery"}
            </strong>
          </div>

          <div>
            <span>Total paid</span>
            <strong>₹{order.total}</strong>
          </div>
        </div>

        <button
          className="continue-shopping-button"
          type="button"
          onClick={onClose}
        >
          <FiShoppingBag />
          Continue Shopping
        </button>
      </section>
    </div>
  );
}

export default OrderSuccessModal;