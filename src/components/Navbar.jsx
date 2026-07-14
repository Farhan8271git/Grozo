import {
  FiChevronDown,
  FiLogOut,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX,
} from "react-icons/fi";

function Navbar({
  cartItemCount,
  cartSubtotal,
  onCartOpen,
  searchQuery,
  onSearchChange,
  currentLocation,
  currentAddress,
  onLocationOpen,
  user,
  onLoginOpen,
  onLogout,
}) {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <span className="logo-main">gro</span>
        <span className="logo-highlight">zo</span>
      </div>

      <div className="delivery-location">
        <h3>Delivery in 10 minutes</h3>

        <button
          className="location-button"
          type="button"
          onClick={onLocationOpen}
        >
          <span>
            {currentLocation || currentAddress}
            </span>
          <FiChevronDown />
        </button>
      </div>

      <div className="search-container">
        <FiSearch className="search-icon" />

        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder='Search "milk"'
          aria-label="Search products"
        />

        {searchQuery && (
          <button
            className="clear-search-button"
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
      </div>

      {user ? (
        <div className="user-menu">
          <button
            className="user-button"
            type="button"
            title={user.phone}
          >
            <FiUser />
            <span>{user.name}</span>
          </button>

          <button
            className="logout-button"
            type="button"
            onClick={onLogout}
            aria-label="Logout"
            title="Logout"
          >
            <FiLogOut />
          </button>
        </div>
      ) : (
        <button
          className="login-button"
          type="button"
          onClick={onLoginOpen}
        >
          Login
        </button>
      )}

      <button
        className="cart-button"
        type="button"
        onClick={onCartOpen}
      >
        <FiShoppingCart />

        {cartItemCount === 0 ? (
          <span>My Cart</span>
        ) : (
          <div className="cart-button-info">
            <span>
              {cartItemCount}{" "}
              {cartItemCount === 1 ? "item" : "items"}
            </span>

            <small>₹{cartSubtotal}</small>
          </div>
        )}
      </button>
    </header>
  );
}

export default Navbar;