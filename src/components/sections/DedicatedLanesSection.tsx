import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Route } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { LANE_ROUTES } from "@/data/laneRoutes";

interface DedicatedLanesSectionProps {
  onGetQuote?: () => void;
}

type LabelDir = "top" | "bottom" | "left" | "right";

interface City {
  name: string;
  lat: number;
  lng: number;
  labelDir: LabelDir;
}

const CITIES: Record<string, City> = {
  gilbertsIL: { name: "Gilberts, IL", lat: 42.104, lng: -88.376, labelDir: "top" },
  auroraCO: { name: "Aurora, CO", lat: 39.729, lng: -104.832, labelDir: "bottom" },
  goldenCO: { name: "Golden, CO", lat: 39.756, lng: -105.221, labelDir: "top" },
  rapidCitySD: { name: "Rapid City, SD", lat: 44.081, lng: -103.231, labelDir: "top" },
  jeffersonvilleOH: { name: "Jeffersonville, OH", lat: 39.654, lng: -83.564, labelDir: "bottom" },
  saginawMI: { name: "Saginaw, MI", lat: 43.42, lng: -83.951, labelDir: "top" },
  terreHauteIN: { name: "Terre Haute, IN", lat: 39.467, lng: -87.414, labelDir: "bottom" },
  holidayCityOH: { name: "Holiday City, OH", lat: 41.626, lng: -84.517, labelDir: "right" },
  ironRidgeWI: { name: "Iron Ridge, WI", lat: 43.398, lng: -88.532, labelDir: "right" },
  wyomingMI: { name: "Wyoming, MI", lat: 42.913, lng: -85.705, labelDir: "top" },
  eauClaireWI: { name: "Eau Claire, WI", lat: 44.811, lng: -91.498, labelDir: "top" },
  valleyNE: { name: "Valley, NE", lat: 41.313, lng: -96.346, labelDir: "bottom" },
  sterlingND: { name: "Sterling, ND", lat: 46.819, lng: -100.286, labelDir: "top" },
  waiteParkMN: { name: "Waite Park, MN", lat: 45.557, lng: -94.224, labelDir: "top" },
  kansasCityMO: { name: "Kansas City, MO", lat: 39.1, lng: -94.579, labelDir: "bottom" },
  westJeffersonOH: { name: "West Jefferson, OH", lat: 39.945, lng: -83.269, labelDir: "right" },
  sullivanMO: { name: "Sullivan, MO", lat: 38.208, lng: -91.16, labelDir: "bottom" },
};

const LANES: { id: number; from: keyof typeof CITIES; to: keyof typeof CITIES }[] = [
  { id: 1, from: "gilbertsIL", to: "auroraCO" },
  { id: 2, from: "goldenCO", to: "rapidCitySD" },
  { id: 3, from: "rapidCitySD", to: "jeffersonvilleOH" },
  { id: 4, from: "rapidCitySD", to: "saginawMI" },
  { id: 5, from: "rapidCitySD", to: "terreHauteIN" },
  { id: 6, from: "rapidCitySD", to: "holidayCityOH" },
  { id: 7, from: "rapidCitySD", to: "ironRidgeWI" },
  { id: 8, from: "wyomingMI", to: "eauClaireWI" },
  { id: 9, from: "wyomingMI", to: "valleyNE" },
  { id: 10, from: "wyomingMI", to: "sterlingND" },
  { id: 11, from: "waiteParkMN", to: "holidayCityOH" },
  { id: 12, from: "waiteParkMN", to: "jeffersonvilleOH" },
  { id: 13, from: "kansasCityMO", to: "rapidCitySD" },
  { id: 14, from: "westJeffersonOH", to: "sterlingND" },
  { id: 15, from: "westJeffersonOH", to: "sullivanMO" },
];

const BASE_STYLE: L.PolylineOptions = {
  color: "#007aff",
  weight: 1.75,
  opacity: 0.45,
  dashArray: "1 7",
  lineCap: "round",
};

const HOT_STYLE: L.PolylineOptions = {
  color: "#007aff",
  weight: 3,
  opacity: 1,
  dashArray: "1 7",
  lineCap: "round",
};

// Decode an encoded polyline (precision 5) into [lat, lng] pairs
function decodePolyline(str: string): [number, number][] {
  let index = 0;
  let lat = 0;
  let lng = 0;
  const coords: [number, number][] = [];
  while (index < str.length) {
    for (const which of [0, 1] as const) {
      let result = 0;
      let shift = 0;
      let b: number;
      do {
        b = str.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const delta = result & 1 ? ~(result >> 1) : result >> 1;
      if (which === 0) lat += delta;
      else lng += delta;
    }
    coords.push([lat / 1e5, lng / 1e5]);
  }
  return coords;
}

// Real road geometry for a lane; falls back to a straight line if missing
function lanePoints(id: number, a: City, b: City): [number, number][] {
  const encoded = LANE_ROUTES[id];
  if (!encoded) return [[a.lat, a.lng], [b.lat, b.lng]];
  return decodePolyline(encoded);
}

export const DedicatedLanesSection = ({ onGetQuote }: DedicatedLanesSectionProps) => {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const laneLayers = useRef<globalThis.Map<number, L.Polyline>>(new globalThis.Map());
  const hitLayers = useRef<globalThis.Map<number, L.Polyline>>(new globalThis.Map());
  const allBounds = useRef<L.LatLngBounds | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);
  const [hintVisible, setHintVisible] = useState(true);
  const interactedRef = useRef(false);
  const cycleRef = useRef<number | null>(null);

  const highlight = (id: number, hot: boolean) => {
    const lane = laneLayers.current.get(id);
    if (!lane) return;
    lane.setStyle(hot ? HOT_STYLE : BASE_STYLE);
    if (hot) lane.bringToFront();
  };

  // First real interaction: stop the attract loop and hide the hint pill
  const markInteracted = () => {
    if (interactedRef.current) return;
    interactedRef.current = true;
    setHintVisible(false);
    if (cycleRef.current != null) {
      highlight(cycleRef.current, false);
      hitLayers.current.get(cycleRef.current)?.closeTooltip();
      cycleRef.current = null;
    }
  };

  useEffect(() => {
    if (!mapEl.current || mapRef.current) return;

    // On touch devices the map stays static so it never hijacks page scrolling;
    // lanes are still tappable and zoom the view programmatically.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const map = L.map(mapEl.current, {
      scrollWheelZoom: false,
      zoomSnap: 0.25,
      zoomControl: false,
      dragging: !isTouch,
      touchZoom: !isTouch,
      boxZoom: !isTouch,
    });
    mapRef.current = map;
    if (!isTouch) L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 12,
    }).addTo(map);

    LANES.forEach((lane) => {
      const from = CITIES[lane.from];
      const to = CITIES[lane.to];
      const pts = lanePoints(lane.id, from, to);
      const line = L.polyline(pts, { ...BASE_STYLE, interactive: false }).addTo(map);
      laneLayers.current.set(lane.id, line);
      // Wide invisible twin so the thin dotted line is easy to hover
      const hit = L.polyline(pts, { color: "#000", opacity: 0.001, weight: 16 })
        .bindTooltip(`${from.name} → ${to.name}`, { sticky: true, className: "lane-tooltip" })
        .on("mouseover", () => {
          markInteracted();
          highlight(lane.id, true);
        })
        .on("mouseout", () => highlight(lane.id, activeRef.current === lane.id))
        .on("click", () => {
          markInteracted();
          setActive((prev) => (prev === lane.id ? null : lane.id));
        })
        .addTo(map);
      hitLayers.current.set(lane.id, hit);
    });

    Object.values(CITIES).forEach((city) => {
      L.circleMarker([city.lat, city.lng], {
        radius: 3.5,
        color: "#007aff",
        weight: 1.5,
        fillColor: "#ffffff",
        fillOpacity: 1,
        interactive: false,
      })
        .bindTooltip(city.name, {
          permanent: true,
          direction: city.labelDir,
          className: "lane-city-label",
        })
        .addTo(map);
    });

    const bounds = L.latLngBounds(Object.values(CITIES).map((c) => [c.lat, c.lng]));
    allBounds.current = bounds;
    map.fitBounds(bounds.pad(0.12));

    return () => {
      map.remove();
      mapRef.current = null;
      laneLayers.current.clear();
      hitLayers.current.clear();
    };
  }, []);

  // Attract loop: pulse one lane at a time (with its name) until the user interacts
  useEffect(() => {
    const tick = () => {
      if (interactedRef.current || activeRef.current != null || !mapRef.current) return;
      const prev = cycleRef.current;
      if (prev != null) {
        highlight(prev, false);
        hitLayers.current.get(prev)?.closeTooltip();
      }
      const nextIdx = prev == null ? 0 : (LANES.findIndex((l) => l.id === prev) + 1) % LANES.length;
      const id = LANES[nextIdx].id;
      cycleRef.current = id;
      highlight(id, true);
      const hit = hitLayers.current.get(id);
      if (hit) hit.openTooltip(hit.getCenter());
    };
    const iv = setInterval(tick, 1800);
    const start = setTimeout(tick, 900);
    return () => {
      clearInterval(iv);
      clearTimeout(start);
    };
  }, []);

  useEffect(() => {
    activeRef.current = active;
    const map = mapRef.current;
    if (!map) return;
    LANES.forEach((lane) => highlight(lane.id, lane.id === active));
    if (active != null) {
      const lane = laneLayers.current.get(active);
      if (lane) map.flyToBounds(lane.getBounds().pad(0.35), { maxZoom: 7, duration: 0.6 });
    } else if (allBounds.current) {
      map.flyToBounds(allBounds.current.pad(0.12), { duration: 0.6 });
    }
  }, [active]);

  return (
    <section className="py-14 sm:py-20 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-primary">Dedicated Lanes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contracted freight we run week in, week out — 15 dedicated lanes connecting the Rockies, the Plains, and the Midwest.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-[400px_1fr] rounded-3xl overflow-hidden border border-border shadow-2xl"
        >
          {/* Lane list */}
          <div className="bg-[#0d1e36] text-white p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                <Route className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">
                Dedicated Freight Network
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-3 mb-5">
              Click a lane to see it on the map.
            </p>

            <ul className="space-y-1 overflow-y-auto max-h-[320px] lg:max-h-none lg:flex-1 pr-1">
              {LANES.map((lane) => {
                const isActive = active === lane.id;
                return (
                  <li key={lane.id}>
                    <button
                      type="button"
                      onClick={() => {
                        markInteracted();
                        setActive(isActive ? null : lane.id);
                      }}
                      onMouseEnter={() => {
                        markInteracted();
                        highlight(lane.id, true);
                      }}
                      onMouseLeave={() => highlight(lane.id, isActive)}
                      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 sm:py-2 text-left text-sm transition-colors ${
                        isActive ? "bg-primary/25 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center ${
                          isActive ? "bg-primary text-white" : "bg-white/10 text-gray-300"
                        }`}
                      >
                        {lane.id}
                      </span>
                      <span className="flex items-center gap-1.5 min-w-0">
                        <span className="truncate">{CITIES[lane.from].name}</span>
                        <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                        <span className="truncate">{CITIES[lane.to].name}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-sm">
              <div>
                <div className="font-display text-2xl font-bold text-white">15</div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">Dedicated Lanes</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white">11</div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">States Covered</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white">100%</div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">Drop &amp; Hook</div>
              </div>
            </div>

            {onGetQuote && (
              <Button variant="hero" size="lg" className="w-full mt-5" onClick={onGetQuote}>
                <ChevronRight className="w-5 h-5" />
                Get Your Quote
              </Button>
            )}
          </div>

          {/* Map */}
          <div className="relative z-0 h-[420px] lg:h-auto lg:min-h-[640px]">
            <div ref={mapEl} className="absolute inset-0" />
            <div
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[500] pointer-events-none flex items-center gap-2 rounded-full bg-white/95 shadow-lg px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-slate-600 transition-opacity duration-500"
              style={{ opacity: hintVisible ? 1 : 0 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007aff] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007aff]" />
              </span>
              <span className="hidden sm:inline">Hover over a lane to explore</span>
              <span className="sm:hidden">Tap a lane to explore</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
