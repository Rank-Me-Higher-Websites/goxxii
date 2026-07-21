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

// ---- Live truck animation ----
// Lanes that get a live moving truck (chosen so no two share an endpoint city,
// which keeps the waypoint chips from overlapping).
const ACTIVE_LANES = [1, 5, 8, 11, 15];
// Per-lane fuel-stop position (fraction of the route) so the fuel chips
// spread out geographically instead of clustering.
const FUEL_FRACS: Record<number, number> = { 1: 0.55, 5: 0.48, 8: 0.64, 11: 0.4, 15: 0.74 };
const DWELL = { pickup: 2400, fuel: 2800, drop: 3200 };
const FADE_MS = 400;

interface Geom {
  pts: [number, number][];
  cum: number[];
  total: number;
}

// One pass of corner-cutting so the truck glides through bends instead of snapping
function chaikin(pts: [number, number][]): [number, number][] {
  if (pts.length < 3) return pts;
  const out: [number, number][] = [pts[0]];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    out.push(
      [a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25],
      [a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75],
    );
  }
  out.push(pts[pts.length - 1]);
  return out;
}

function buildGeom(pts: [number, number][]): Geom {
  const cum = [0];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    total += L.latLng(pts[i - 1]).distanceTo(L.latLng(pts[i]));
    cum.push(total);
  }
  return { pts, cum, total };
}

function posAt(g: Geom, d: number): [number, number] {
  if (d <= 0) return g.pts[0];
  if (d >= g.total) return g.pts[g.pts.length - 1];
  let i = 1;
  while (i < g.cum.length && g.cum[i] < d) i++;
  const a = g.pts[i - 1];
  const b = g.pts[i];
  const t = (d - g.cum[i - 1]) / (g.cum[i] - g.cum[i - 1] || 1);
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

const SVG = {
  truck:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
  pickup:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><path d="M6 10h12"/></svg>',
  fuel:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>',
  drop:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>',
};

type WpKind = "pickup" | "fuel" | "drop";

interface Truck {
  from: City;
  to: City;
  geom: Geom;
  fuelD: number;
  marker: L.Marker;
  wp: Record<WpKind, L.Marker>;
  speed: number; // meters per ms
  dist: number;
  leg: 0 | 1; // 0 = pickup -> fuel, 1 = fuel -> delivery
  target: number;
  mode: "drive" | "dwell" | "fadeOut" | "fadeIn";
  until: number;
  next: "leg1" | "reset" | "resume";
  px: number | null; // last screen x, for facing direction
  flipped: boolean;
  gpuHinted: boolean;
}

export const DedicatedLanesSection = ({ onGetQuote }: DedicatedLanesSectionProps) => {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const laneLayers = useRef<globalThis.Map<number, L.Polyline>>(new globalThis.Map());
  const hitLayers = useRef<globalThis.Map<number, L.Polyline>>(new globalThis.Map());
  const allBounds = useRef<L.LatLngBounds | null>(null);
  const rafRef = useRef<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);
  const [hintVisible, setHintVisible] = useState(true);
  const interactedRef = useRef(false);

  const highlight = (id: number, hot: boolean) => {
    const lane = laneLayers.current.get(id);
    if (!lane) return;
    lane.setStyle(hot ? HOT_STYLE : BASE_STYLE);
    if (hot) lane.bringToFront();
  };

  // First real interaction hides the hint pill
  const markInteracted = () => {
    if (interactedRef.current) return;
    interactedRef.current = true;
    setHintVisible(false);
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

    // Cities that host a pickup/delivery chip get the chip as their only marker
    // (the chip carries the city label), so nothing stacks on top of anything.
    const chipCities = new Set<string>();
    ACTIVE_LANES.forEach((laneId) => {
      const lane = LANES.find((l) => l.id === laneId)!;
      chipCities.add(lane.from);
      chipCities.add(lane.to);
    });

    Object.entries(CITIES).forEach(([key, city]) => {
      if (chipCities.has(key)) return;
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

    // ---- Live moving trucks + waypoint icons ----
    const wpIcon = (kind: WpKind) =>
      L.divIcon({ className: "", html: `<div class="lane-wp lane-wp-${kind}">${SVG[kind]}</div>`, iconSize: [20, 20], iconAnchor: [10, 10] });
    const truckIcon = () =>
      L.divIcon({
        className: "",
        html: `<div class="lane-truck-wrap"><div class="lane-truck-note"></div><div class="lane-truck">${SVG.truck}</div></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

    const trucks: Truck[] = [];
    ACTIVE_LANES.forEach((laneId, idx) => {
      const lane = LANES.find((l) => l.id === laneId)!;
      const from = CITIES[lane.from];
      const to = CITIES[lane.to];
      const raw = lanePoints(laneId, from, to);
      const geom = buildGeom(chaikin(chaikin(chaikin(raw))));
      const fuelD = geom.total * (FUEL_FRACS[laneId] ?? 0.55);
      const cityChip = (kind: WpKind, city: City, latlng: [number, number]) =>
        L.marker(latlng, { icon: wpIcon(kind), interactive: false, zIndexOffset: 400 })
          .bindTooltip(city.name, { permanent: true, direction: city.labelDir, className: "lane-city-label" })
          .addTo(map);
      const wp = {
        pickup: cityChip("pickup", from, geom.pts[0]),
        fuel: L.marker(posAt(geom, fuelD), { icon: wpIcon("fuel"), interactive: false, zIndexOffset: 400 }).addTo(map),
        drop: cityChip("drop", to, geom.pts[geom.pts.length - 1]),
      };
      // Stagger start positions along the route so the board feels alive but not synchronized
      const dist = geom.total * ((idx + 0.4) / ACTIVE_LANES.length);
      const leg: 0 | 1 = dist < fuelD ? 0 : 1;
      const marker = L.marker(posAt(geom, dist), { icon: truckIcon(), interactive: false, zIndexOffset: 1000 }).addTo(map);
      trucks.push({
        from,
        to,
        geom,
        fuelD,
        marker,
        wp,
        speed: geom.total / (52000 + idx * 9000), // full route in ~52-88s
        dist,
        leg,
        target: leg === 0 ? fuelD : geom.total,
        mode: "drive",
        until: 0,
        next: "resume",
        px: null,
        flipped: false,
        gpuHinted: false,
      });
    });

    // Sub-pixel positioning: Leaflet rounds marker positions to whole pixels,
    // which makes slow movement look twitchy. Setting the exact fractional
    // layer point keeps the glide perfectly smooth.
    const setPos = (tk: Truck, d: number) => {
      const ll = L.latLng(posAt(tk.geom, d));
      tk.marker.setLatLng(ll);
      const el = tk.marker.getElement();
      if (!el) return;
      if (!tk.gpuHinted) {
        el.style.willChange = "transform";
        tk.gpuHinted = true;
      }
      const p = map.latLngToLayerPoint(ll);
      L.DomUtil.setPosition(el, p);
      // Face the direction of travel (flip the glyph when heading west)
      if (tk.px != null) {
        const dx = p.x - tk.px;
        if (Math.abs(dx) > 0.05) {
          const flipped = dx < 0;
          if (flipped !== tk.flipped) {
            tk.flipped = flipped;
            el.querySelector<HTMLElement>(".lane-truck")?.classList.toggle("flip", flipped);
          }
        }
      }
      tk.px = p.x;
    };

    // Smoothstep speed ramp so trucks pull away and arrive gently
    const easeFor = (tk: Truck) => {
      const ramp = Math.min(tk.geom.total * 0.07, 90000);
      const legStart = tk.leg === 0 ? 0 : tk.fuelD;
      const fromStop = Math.max(0, tk.dist - legStart);
      const toStop = Math.max(0, tk.target - tk.dist);
      const t = Math.min(1, Math.min(fromStop, toStop) / ramp);
      const s = t * t * (3 - 2 * t);
      return 0.22 + 0.78 * s;
    };

    // Status pill lives inside the truck marker and fades in/out with CSS —
    // no tooltip popping, and it stays glued to the truck.
    const noteEl = (tk: Truck) => tk.marker.getElement()?.querySelector<HTMLElement>(".lane-truck-note");
    const showNote = (tk: Truck, kind: WpKind) => {
      const text =
        kind === "pickup" ? `At pickup · ${tk.from.name}` : kind === "fuel" ? "Fueling · truck stop" : `Delivered · ${tk.to.name}`;
      const el = noteEl(tk);
      if (el) {
        el.innerHTML = `<span class="lane-note-dot lane-note-${kind}"></span>${text}`;
        el.classList.add("show");
      }
      const wpEl = tk.wp[kind].getElement()?.firstElementChild as HTMLElement | undefined;
      if (wpEl) {
        wpEl.classList.remove("wp-pop");
        void wpEl.offsetWidth;
        wpEl.classList.add("wp-pop");
      }
    };
    const hideNote = (tk: Truck) => noteEl(tk)?.classList.remove("show");

    const fade = (tk: Truck, opacity: number) => {
      const el = tk.marker.getElement();
      if (el) {
        el.style.transition = `opacity ${FADE_MS}ms ease`;
        el.style.opacity = String(opacity);
      }
    };

    let last = 0;
    const animate = (ts: number) => {
      if (!last) last = ts;
      const dt = Math.min(ts - last, 50);
      last = ts;
      trucks.forEach((tk) => {
        switch (tk.mode) {
          case "drive": {
            tk.dist = Math.min(tk.dist + tk.speed * easeFor(tk) * dt, tk.target);
            setPos(tk, tk.dist);
            if (tk.dist >= tk.target) {
              if (tk.leg === 0) {
                showNote(tk, "fuel");
                tk.mode = "dwell";
                tk.until = ts + DWELL.fuel;
                tk.next = "leg1";
              } else {
                showNote(tk, "drop");
                tk.mode = "dwell";
                tk.until = ts + DWELL.drop;
                tk.next = "reset";
              }
            }
            break;
          }
          case "dwell": {
            if (ts >= tk.until) {
              hideNote(tk);
              if (tk.next === "leg1") {
                tk.leg = 1;
                tk.target = tk.geom.total;
                tk.mode = "drive";
              } else if (tk.next === "reset") {
                fade(tk, 0);
                tk.mode = "fadeOut";
                tk.until = ts + FADE_MS;
              } else {
                tk.mode = "drive";
              }
            }
            break;
          }
          case "fadeOut": {
            if (ts >= tk.until) {
              tk.dist = 0;
              tk.leg = 0;
              tk.target = tk.fuelD;
              setPos(tk, 0);
              fade(tk, 1);
              tk.mode = "fadeIn";
              tk.until = ts + FADE_MS;
            }
            break;
          }
          case "fadeIn": {
            if (ts >= tk.until) {
              showNote(tk, "pickup");
              tk.mode = "dwell";
              tk.until = ts + DWELL.pickup;
              tk.next = "resume";
            }
            break;
          }
        }
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      map.remove();
      mapRef.current = null;
      laneLayers.current.clear();
      hitLayers.current.clear();
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
            <ul className="mt-5 space-y-1 overflow-y-auto max-h-[320px] lg:max-h-none lg:flex-1 pr-1">
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
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-[500] pointer-events-none flex items-center gap-2 rounded-full bg-[#0d1e36]/95 shadow-lg px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Live Network
            </div>
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
