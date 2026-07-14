import { useState } from "react";
import {
  FiMapPin,
  FiNavigation,
  FiSearch,
  FiX,
} from "react-icons/fi";

const locations = [
  "Gopalganj, Bihar",
  "Patna, Bihar",
  "Kolkata, West Bengal",
  "Delhi, NCR",
  "Bengaluru, Karnataka",
  "Mumbai, Maharashtra",
];

function LocationModal({
  isOpen,
  currentLocation,
  onLocationSelect,
  onClose,
  detectLocation,
  locationLoading,
}) {
  const [query, setQuery] = useState("");

  if (!isOpen) {
    return null;
  }

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(query.trim().toLowerCase())
  );

  const handleSelect = (location) => {
    onLocationSelect(location);
    setQuery("");
    onClose();
  };

  const handleDetectLocation = async () => {
    if (!detectLocation) return;

    await detectLocation();
    setQuery("");
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={onClose}
      role="presentation"
    >
      <section
        className="location-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="location-modal-header">
          <div>
            <span className="section-eyebrow">
              DELIVERY LOCATION
            </span>

            <h2 id="location-modal-title">
              Choose your location
            </h2>
          </div>

          <button
            className="modal-close-button"
            type="button"
            onClick={onClose}
            aria-label="Close location modal"
          >
            <FiX />
          </button>
        </div>

        <div className="location-search">
          <FiSearch />

          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search city or area"
            autoFocus
          />
        </div>

        <button
          className="detect-location-button"
          type="button"
          onClick={handleDetectLocation}
          disabled={locationLoading}
        >
          <FiNavigation />

          <div>
            <strong>
              {locationLoading
                ? "Detecting..."
                : "Use my current location"}
            </strong>

            <span>
              {locationLoading
                ? "Please wait..."
                : "Get your device location"}
            </span>
          </div>
        </button>

        <div className="location-list">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <button
                className={`location-option ${
                  currentLocation === location
                    ? "location-option-active"
                    : ""
                }`}
                key={location}
                type="button"
                onClick={() => handleSelect(location)}
              >
                <FiMapPin />
                <span>{location}</span>
              </button>
            ))
          ) : (
            <div className="location-empty-state">
              No matching locations found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default LocationModal;