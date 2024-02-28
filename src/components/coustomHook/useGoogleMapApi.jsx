import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
const api_key = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const useGoogleMapApi = () => {
  const libraries = useMemo(() => ["places"], []);
  const [isLoaded, setIsLoaded] = useState(false);

  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: api_key,
    libraries: libraries,
  });

  useEffect(() => {
    if (scriptLoaded) {
      setIsLoaded(true);
    }
  }, [scriptLoaded]);
  return { isLoaded, loadError };
};

export default useGoogleMapApi;
