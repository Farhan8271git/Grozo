import { useEffect, useMemo, useState } from "react";

import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import CategoryGrid from "./components/CategoryGrid";
import ProductSection from "./components/ProductSection";
import ProductResults from "./components/ProductResults";
import CartDrawer from "./components/CartDrawer";
import LoginModal from "./components/LoginModal";
import LocationModal from "./components/LocationModal";
import CheckoutModal from "./components/CheckoutModal";
import OrderSuccessModal from "./components/OrderSuccessModal";
import { getCurrentAddress } from "./utils/location";

import products from "./data/products";

function getSavedData(key, fallback) {
  try {
    const savedData = localStorage.getItem(key);

    return savedData ? JSON.parse(savedData) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [cart, setCart] = useState(() =>
    getSavedData("grozo-cart", [])
  );

  const [user, setUser] = useState(() =>
    getSavedData("grozo-user", null)
  );

  const [currentLocation, setCurrentLocation] = useState(() =>
    getSavedData("grozo-location", "Bhagalpur, Bihar")
  );

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(() =>
    getSavedData("grozo-address", "")
  );
  const [locationLoading, setLocationLoading] = useState(false);


  useEffect(() => {
    localStorage.setItem("grozo-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("grozo-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("grozo-user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(
      "grozo-location",
      JSON.stringify(currentLocation)
    );
  }, [currentLocation]);

  useEffect(() => {
  if (!currentAddress) {
    detectCurrentLocation();
  }
}, []);

  const hasOpenOverlay =
    isCartOpen || isLoginOpen || isLocationOpen || isCheckoutOpen || completedOrder !== null;

  useEffect(() => {
    document.body.style.overflow = hasOpenOverlay ? "hidden" : "";



    return () => {
      document.body.style.overflow = "";
    };
  }, [hasOpenOverlay]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      setIsCartOpen(false);
      setIsLoginOpen(false);
      setIsLocationOpen(false);
      setIsCheckoutOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeAllOverlays = () => {
    setIsCartOpen(false);
    setIsLoginOpen(false);
    setIsLocationOpen(false);
    setIsCheckoutOpen(false);
  };

  const openCart = () => {
    closeAllOverlays();
    setIsCartOpen(true);
  };

  const openLogin = () => {
    closeAllOverlays();
    setIsLoginOpen(true);
  };

  const openLocation = () => {
    closeAllOverlays();
    setIsLocationOpen(true);
  };

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cartQuantity: item.cartQuantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          cartQuantity: 1,
        },
      ];
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                cartQuantity: item.cartQuantity - 1,
              }
            : item
        )
        .filter((item) => item.cartQuantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getProductQuantity = (productId) => {
    return (
      cart.find((item) => item.id === productId)?.cartQuantity || 0
    );
  };

  const cartItemCount = cart.reduce(
    (total, item) => total + item.cartQuantity,
    0
  );

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        !selectedCategory ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const hasActiveFilters =
    searchQuery.trim() !== "" || selectedCategory !== "";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

  const productSections = [
    {
      title: "Dairy, Bread & Eggs",
      category: "Dairy, Bread & Eggs",
    },
    {
      title: "Fresh Fruits & Vegetables",
      category: "Fruits & Vegetables",
    },
    {
      title: "Snacks & Munchies",
      category: "Snacks & Munchies",
    },
    {
      title: "Cold Drinks & Juices",
      category: "Cold Drinks & Juices",
    },

    {title: "chain smoker mohsin nawaz",
      category:"chain smoker mohsin nawaz",
    },
  ];



  const handleCheckout = () => {
  setIsCartOpen(false);

  if (!user) {
    setIsLoginOpen(true);
    return;
  }

  setIsCheckoutOpen(true);
};

const handleOrderSuccess = (order) => {
  setIsCheckoutOpen(false);
  setCompletedOrder(order);
  setCart([]);
};

  function handleContinueShopping() {
    setCompletedOrder(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }


  
const detectCurrentLocation = async () => {
  try {
    setLocationLoading(true);

    const location = await getCurrentAddress();

    setCurrentLocation(location.displayName);
    setCurrentAddress(location.fullAddress);

    localStorage.setItem(
      "grozo-location",
      JSON.stringify(location.displayName)
    );

    localStorage.setItem(
      "grozo-address",
      JSON.stringify(location.fullAddress)
    );
  } catch (error) {
    console.error(error);
  } finally {
    setLocationLoading(false);
  }
};

  return (
    <>
      <Navbar
        cartItemCount={cartItemCount}
        cartSubtotal={cartSubtotal}
        onCartOpen={openCart}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentLocation={currentLocation}
        currentAddress={currentAddress}
        onLocationOpen={openLocation}
        user={user}
        onLoginOpen={openLogin}
        onLogout={() => setUser(null)}
      />

      <main className="page-container">
        <HeroBanner />

        <CategoryGrid
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {hasActiveFilters ? (
          <ProductResults
            products={filteredProducts}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            addToCart={addToCart}
            decreaseQuantity={decreaseQuantity}
            getProductQuantity={getProductQuantity}
            onClearFilters={clearFilters}
          />
        ) : (
          productSections.map((section) => (
            <ProductSection
              key={section.category}
              title={section.title}
              products={products.filter(
                (product) =>
                  product.category === section.category
              )}
              addToCart={addToCart}
              decreaseQuantity={decreaseQuantity}
              getProductQuantity={getProductQuantity}
            />
          ))
        )}
      </main>

      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        addToCart={addToCart}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subtotal={cartSubtotal}
        onCheckout={handleCheckout}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={setUser}
      />

      <LocationModal
        isOpen={isLocationOpen}
        currentLocation={currentLocation}
        onLocationSelect={setCurrentLocation}
        onClose={() => setIsLocationOpen(false)}
        detectLocation={detectCurrentLocation}
        locationLoading={locationLoading}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        subtotal={cartSubtotal}
        currentLocation={currentLocation}
        currentAddress={currentAddress}
        cart={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderSuccessModal
        order={completedOrder}
        onClose={handleContinueShopping}
      />
    </>
  );
}

export default App;