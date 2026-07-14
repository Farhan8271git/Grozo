import { FiClock, FiMinus, FiPlus } from "react-icons/fi";

function ProductCard({
  product,
  quantity,
  addToCart,
  decreaseQuantity,
}) {
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  );

  return (
    <article className="product-card">
      <div
        className="product-image-container"
        style={{ backgroundColor: product.background }}
      >
        {product.originalPrice > product.price && (
          <span className="discount-badge">
            {discountPercentage}% OFF
          </span>
        )}

        <span
          className="product-image"
          role="img"
          aria-label={product.name}
        >
          {product.image}
        </span>
      </div>

      <div className="product-info">
        <div className="delivery-time">
          <FiClock />
          <span>{product.deliveryTime}</span>
        </div>

        <h3>{product.name}</h3>

        <p className="product-quantity">
          {product.quantity}
        </p>

        <div className="product-bottom">
          <div className="price-container">
            <span className="product-price">
              ₹{product.price}
            </span>

            {product.originalPrice > product.price && (
              <span className="original-price">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {quantity === 0 ? (
            <button
              className="add-button"
              type="button"
              onClick={() => addToCart(product)}
            >
              ADD
            </button>
          ) : (
            <div className="quantity-control">
              <button
                type="button"
                onClick={() => decreaseQuantity(product.id)}
                aria-label={`Decrease ${product.name} quantity`}
              >
                <FiMinus />
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() => addToCart(product)}
                aria-label={`Increase ${product.name} quantity`}
              >
                <FiPlus />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;