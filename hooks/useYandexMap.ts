import { useEffect, useRef } from "react";
import type { MapStatus } from "@/lib/types";

declare global {
  interface Window {
    ymaps: any;
  }
}

export function useYandexMap({
  isEnabled,
  apiKey,
  onStatusChange,
  onAddressSelect,
}: {
  isEnabled: boolean;
  apiKey?: string;
  onStatusChange: (status: MapStatus) => void;
  onAddressSelect: (address: string) => void;
}) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const placemarkRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (!isEnabled) return;

    if (!apiKey) {
      onStatusChange("fallback");
      return;
    }

    const initializeMap = () => {
      if (!window.ymaps || !mapContainerRef.current || mapInstanceRef.current) return;

      onStatusChange("loading");

      window.ymaps.ready(() => {
        if (!mapContainerRef.current || mapInstanceRef.current) return;

        const center = [45.03547, 38.975313];

        const map = new window.ymaps.Map(mapContainerRef.current, {
          center,
          zoom: 12,
          controls: ["zoomControl", "geolocationControl"],
        });

        const placemark = new window.ymaps.Placemark(center, {}, {
          preset: "islands#blackDotIcon",
        });

        map.geoObjects.add(placemark);

        mapInstanceRef.current = map;
        placemarkRef.current = placemark;
        onStatusChange("ready");

        map.events.add("click", (event: any) => {
          const coords = event.get("coords");

          if (placemarkRef.current) {
            placemarkRef.current.geometry.setCoordinates(coords);
          }

          window.ymaps
            .geocode(coords)
            .then((result: any) => {
              const firstGeoObject = result.geoObjects.get(0);
              const address = firstGeoObject
                ? firstGeoObject.getAddressLine()
                : `Краснодар, ${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`;

              onAddressSelect(address);
            })
            .catch(() => {
              const address = `Краснодар, ${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`;
              onAddressSelect(address);
            });
        });
      });
    };

    if (window.ymaps) {
      initializeMap();
      return;
    }

    if (scriptLoadedRef.current) return;

    scriptLoadedRef.current = true;
    onStatusChange("loading");

    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;
    script.onload = initializeMap;
    script.onerror = () => onStatusChange("fallback");
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, [apiKey, isEnabled, onAddressSelect, onStatusChange]);

  return { mapContainerRef };
}