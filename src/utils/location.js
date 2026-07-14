export async function getCurrentAddress() {
  if (!("geolocation" in navigator)) {
    throw new Error("Geolocation is not supported.");
  }

  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });

  const { latitude, longitude } = position.coords;

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch address.");
  }

  const data = await response.json();

  return {
    latitude,
    longitude,
    displayName:
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.state ||
      "Current Location",

    fullAddress: data.display_name,
  };
}