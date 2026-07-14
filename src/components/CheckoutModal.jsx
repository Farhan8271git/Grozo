import { useEffect, useState } from "react";
import {
  FiCheck,
  FiChevronLeft,
  FiCreditCard,
  FiMapPin,
  FiTruck,
  FiX,
} from "react-icons/fi";

function CheckoutModal({
  isOpen,
  onClose,
  subtotal,
  currentLocation,
  currentAddress,
  cart,
  onOrderSuccess,
}) {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = useState("");

  const deliveryFee = subtotal >= 299 ? 0 : 25;
  const handlingFee = subtotal > 0 ? 5 : 0;
  const total = subtotal + deliveryFee + handlingFee;

  useEffect(() => {
    if (!isOpen) {
      setPaymentMethod("cod");
      setError("");
    }
  }, [isOpen]);

  const handlePlaceOrder = () => {
    if (!currentAddress) {
      setError("Unable to detect your delivery address.");
      return;
    }

    const order = {
      id: `GRZ${Date.now().toString().slice(-8)}`,
      total,
      paymentMethod,
      address: currentAddress,
      location: currentLocation,
      placedAt: new Date().toISOString(),
    };

    onOrderSuccess(order);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={onClose}
      role="presentation"
    >
      <section
        className="checkout-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="checkout-header">
          <div>
            <span className="section-eyebrow">CHECKOUT</span>
            <h2 id="checkout-title">Complete your order</h2>
          </div>

          <button
            className="modal-close-button"
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
          >
            <FiX />
          </button>
        </div>

        <div className="checkout-content">
          <section className="checkout-block">
            <div className="checkout-block-title">
              <FiTruck />

              <div>
                <h3>Express Delivery</h3>
                <p>Estimated delivery in 10 minutes</p>
              </div>
            </div>
          </section>

          <section className="checkout-block">
            <div className="checkout-block-title">
              <FiMapPin />

              <div>
                <h3>Delivery Address</h3>
                <p>{currentLocation}</p>
                <small>{currentAddress}</small>
              </div>
            </div>

            {error && (
              <p className="form-error">{error}</p>
            )}
          </section>

          {cart.length > 0 && (
            <section className="checkout-block">
              <h3>Your Order</h3>

              <div className="checkout-items">
                {cart.map((item) => (
                  <div
                    className="checkout-item"
                    key={item.id}
                  >
                    <div
                      className="checkout-item-image"
                      style={{
                        background: item.background,
                      }}
                    >
                      {item.image}
                    </div>

                    <div className="checkout-item-details">
                      <h4>{item.name}</h4>
                      <p>{item.quantity}</p>
                    </div>

                    <strong>
                      ₹
                      {item.price *
                        item.cartQuantity}
                    </strong>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="checkout-block">
            <div className="checkout-block-title">
              <FiCreditCard />

              <div>
                <h3>Payment Method</h3>
                <p>Select how you want to pay.</p>
              </div>
            </div>

            <div className="payment-options">
              <button
                className={`payment-option ${
                  paymentMethod === "cod"
                    ? "payment-option-active"
                    : ""
                }`}
                type="button"
                onClick={() =>
                  setPaymentMethod("cod")
                }
              >
                <span>Cash on Delivery</span>

                {paymentMethod === "cod" && (
                  <FiCheck />
                )}
              </button>

              <button
                className={`payment-option ${
                  paymentMethod === "upi"
                    ? "payment-option-active"
                    : ""
                }`}
                type="button"
                onClick={() =>
                  setPaymentMethod("upi")
                }
              >
                <span>UPI on Delivery</span>

                {paymentMethod === "upi" && (
                  <FiCheck />
                )}
              </button>
            </div>
          </section>

          <section className="checkout-summary">
            <div>
              <span>Item subtotal</span>
              <strong>₹{subtotal}</strong>
            </div>

            <div>
              <span>Delivery fee</span>

              <strong>
                {deliveryFee === 0
                  ? "FREE"
                  : `₹${deliveryFee}`}
              </strong>
            </div>

            <div>
              <span>Handling fee</span>
              <strong>₹{handlingFee}</strong>
            </div>

            <div className="checkout-total">
              <span>Grand Total</span>
              <strong>₹{total}</strong>
            </div>
          </section>
        </div>

        <div className="checkout-footer">
          <button
            className="checkout-back-button"
            type="button"
            onClick={onClose}
          >
            <FiChevronLeft />
            Back
          </button>

          <button
            className="place-order-button"
            type="button"
            onClick={handlePlaceOrder}
          >
            Place Order · ₹{total}
          </button>
        </div>
      </section>
    </div>
  );
}

export default CheckoutModal;