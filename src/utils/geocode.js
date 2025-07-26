export async function getLocationName(lat, lng) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      console.error("No address found for coordinates.");
      return "Unknown location";
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    return "Error getting location";
  }
}