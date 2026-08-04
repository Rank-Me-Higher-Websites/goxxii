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

// Solid "navigation" routes with a soft white casing underneath. The wider
// white casing leaves a clean gap where lanes overlap, so the network reads clearly.
const NET_CASE: L.PolylineOptions = { color: "#ffffff", weight: 2.8, opacity: 0.9, lineCap: "round", lineJoin: "round" };
const FEAT_CASE: L.PolylineOptions = { color: "#ffffff", weight: 4.5, opacity: 0.95, lineCap: "round", lineJoin: "round" };
const NET_STYLE: L.PolylineOptions = { color: "#2183ec", weight: 1.3, opacity: 0.9, lineCap: "round", lineJoin: "round" };
const FEAT_STYLE: L.PolylineOptions = { color: "#0060df", weight: 3, opacity: 1, lineCap: "round", lineJoin: "round" };

type Phase = "network" | "pickup" | "route" | "enroute" | "arrival";
const PHASE_MS: Record<Phase, number> = { network: 3600, pickup: 2400, route: 3000, enroute: 7600, arrival: 3000 };
// Network intro: draw the 15 routes on one-by-one, fast.
const NET_BUILD_STAGGER = 150;
const NET_BUILD_DUR = 480;
const FUEL_FRAC = 0.55;
const STEPS: { key: Phase; label: string }[] = [
  { key: "pickup", label: "Pickup" },
  { key: "route", label: "AI Route" },
  { key: "enroute", label: "En Route" },
  { key: "arrival", label: "Arrival" },
];
const STATUS: Record<Phase, string> = {
  network: "Scanning network",
  pickup: "Load picked up",
  route: "AI route + fuel planned",
  enroute: "En route",
  arrival: "Delivered",
};

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

function lanePoints(id: number, a: City, b: City): [number, number][] {
  const encoded = LANE_ROUTES[id];
  if (!encoded) return [[a.lat, a.lng], [b.lat, b.lng]];
  return decodePolyline(encoded);
}

function chaikin(pts: [number, number][]): [number, number][] {
  if (pts.length < 3) return pts;
  const out: [number, number][] = [pts[0]];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    out.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25], [a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75]);
  }
  out.push(pts[pts.length - 1]);
  return out;
}

interface Geom {
  pts: [number, number][];
  cum: number[];
  total: number;
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
const smooth = (t: number) => t * t * (3 - 2 * t);

const SVG = {
  truck:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
  pickup:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V8.5L12 3l9 5.5V21"/><path d="M3 21h18"/><path d="M9.5 21v-5.5h5V21"/></svg>',
  fuel:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>',
  drop:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>',
};
type WpKind = "pickup" | "fuel" | "drop";

export const DedicatedLanesSection = ({ onGetQuote }: DedicatedLanesSectionProps) => {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const jumpRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<Phase>("network");
  const [featuredId, setFeaturedId] = useState<number | null>(null);

  useEffect(() => {
    if (!mapEl.current || mapRef.current) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const map = L.map(mapEl.current, {
      scrollWheelZoom: false,
      zoomSnap: 0.25,
      zoomControl: false,
      dragging: !isTouch,
      touchZoom: !isTouch,
      boxZoom: !isTouch,
      keyboard: false,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 12,
    }).addTo(map);

    // Routes (casing pass, then coloured pass) + geometry
    const routeLines = new globalThis.Map<number, L.Polyline>();
    const casings = new globalThis.Map<number, L.Polyline>();
    const geoms = new globalThis.Map<number, Geom>();
    const laneRaw = new globalThis.Map<number, [number, number][]>();
    LANES.forEach((lane) => {
      const pts = lanePoints(lane.id, CITIES[lane.from], CITIES[lane.to]);
      laneRaw.set(lane.id, pts);
      geoms.set(lane.id, buildGeom(chaikin(chaikin(pts))));
      casings.set(lane.id, L.polyline(pts, { ...NET_CASE, interactive: false }).addTo(map));
    });
    LANES.forEach((lane) => {
      const from = CITIES[lane.from];
      const to = CITIES[lane.to];
      const pts = laneRaw.get(lane.id)!;
      const line = L.polyline(pts, { ...NET_STYLE, interactive: false }).addTo(map);
      routeLines.set(lane.id, line);
      L.polyline(pts, { color: "#000", opacity: 0.001, weight: 16 })
        .bindTooltip(`${from.name} → ${to.name}`, { sticky: true, className: "lane-tooltip" })
        .on("click", () => {
          jumpRef.current = lane.id;
        })
        .addTo(map);
    });

    // Plain city dots + labels (shown in network view, hidden while focused)
    const cityMarkers: L.CircleMarker[] = [];
    Object.values(CITIES).forEach((city) => {
      const m = L.circleMarker([city.lat, city.lng], { radius: 3.2, color: "#0a84ff", weight: 1.4, fillColor: "#ffffff", fillOpacity: 1, interactive: false })
        .bindTooltip(city.name, { permanent: true, direction: city.labelDir, className: "lane-city-label" })
        .addTo(map);
      cityMarkers.push(m);
    });

    // Featured pins + hero truck (hidden until a load plays)
    const wpIcon = (kind: WpKind) => L.divIcon({ className: "", html: `<div class="lane-wp lane-wp-${kind}">${SVG[kind]}</div>`, iconSize: [18, 18], iconAnchor: [9, 9] });
    const pins: Record<WpKind, L.Marker> = {
      pickup: L.marker([0, 0], { icon: wpIcon("pickup"), interactive: false, opacity: 0, zIndexOffset: 600 }).addTo(map),
      fuel: L.marker([0, 0], { icon: wpIcon("fuel"), interactive: false, opacity: 0, zIndexOffset: 600 }).addTo(map),
      drop: L.marker([0, 0], { icon: wpIcon("drop"), interactive: false, opacity: 0, zIndexOffset: 600 }).addTo(map),
    };
    const hero = L.marker([0, 0], {
      icon: L.divIcon({ className: "", html: `<div class="lane-truck">${SVG.truck}</div>`, iconSize: [26, 26], iconAnchor: [13, 13] }),
      interactive: false,
      opacity: 0,
      zIndexOffset: 1200,
    }).addTo(map);

    const allBounds = L.latLngBounds(Object.values(CITIES).map((c) => [c.lat, c.lng]));
    map.fitBounds(allBounds.pad(0.12));

    const popWp = (kind: WpKind) => {
      const el = pins[kind].getElement()?.firstElementChild as HTMLElement | undefined;
      if (el) {
        el.classList.remove("wp-pop");
        void el.offsetWidth;
        el.classList.add("wp-pop");
      }
    };
    const heroState = { px: null as number | null, flipped: false };
    const setHeroPos = (geom: Geom, d: number) => {
      const ll = L.latLng(posAt(geom, d));
      hero.setLatLng(ll);
      const el = hero.getElement();
      if (!el) return;
      const p = map.latLngToLayerPoint(ll);
      L.DomUtil.setPosition(el, p);
      if (heroState.px != null) {
        const dx = p.x - heroState.px;
        if (Math.abs(dx) > 0.05) {
          const flip = dx < 0;
          if (flip !== heroState.flipped) {
            heroState.flipped = flip;
            (el.querySelector(".lane-truck") as HTMLElement | null)?.classList.toggle("flip", flip);
          }
        }
      }
      heroState.px = p.x;
    };
    const pathsOf = (id: number) =>
      [routeLines.get(id), casings.get(id)]
        .map((l) => l && (l as unknown as { _path?: SVGPathElement })._path)
        .filter(Boolean) as SVGPathElement[];
    // Draw the blue route AND its white casing on together, so the lane is
    // blank until the routing stage, then grows cleanly from the pickup.
    const setRouteDraw = (id: number, frac: number) => {
      pathsOf(id).forEach((p) => {
        try {
          const len = p.getTotalLength();
          p.style.strokeDasharray = String(len);
          p.style.strokeDashoffset = String(len * (1 - frac));
        } catch {
          /* noop */
        }
      });
    };
    const clearRouteDraw = (id: number) => {
      pathsOf(id).forEach((p) => {
        p.style.strokeDasharray = "";
        p.style.strokeDashoffset = "";
      });
    };

    let curFeat: number | null = null;
    let fuelPassed = false;

    const enterNetwork = () => {
      if (curFeat != null) clearRouteDraw(curFeat);
      curFeat = null;
      routeLines.forEach((l) => l.setStyle(NET_STYLE));
      casings.forEach((c) => c.setStyle(NET_CASE));
      // start every lane blank — the frame loop draws them on one-by-one
      LANES.forEach((l) => setRouteDraw(l.id, 0));
      cityMarkers.forEach((m) => {
        m.setStyle({ opacity: 1, fillOpacity: 1 });
        m.openTooltip();
      });
      pins.pickup.setOpacity(0).unbindTooltip();
      pins.fuel.setOpacity(0);
      pins.drop.setOpacity(0).unbindTooltip();
      hero.setOpacity(0);
      map.flyToBounds(allBounds.pad(0.12), { duration: 1.1 });
    };

    const enterFeature = (id: number) => {
      curFeat = id;
      fuelPassed = false;
      heroState.px = null;
      const lane = LANES.find((l) => l.id === id)!;
      const from = CITIES[lane.from];
      const to = CITIES[lane.to];
      const geom = geoms.get(id)!;
      // Isolate the featured lane: hide every other route, casing and city marker.
      routeLines.forEach((l, lid) => l.setStyle(lid === id ? FEAT_STYLE : { opacity: 0 }));
      casings.forEach((c, lid) => c.setStyle(lid === id ? FEAT_CASE : { opacity: 0 }));
      cityMarkers.forEach((m) => {
        m.setStyle({ opacity: 0, fillOpacity: 0 });
        m.closeTooltip();
      });
      routeLines.get(id)?.bringToFront();
      // pins with endpoint labels
      pins.pickup.setLatLng(geom.pts[0]).bindTooltip(from.name, { permanent: true, direction: "bottom", offset: [0, 4], className: "lane-city-label" });
      pins.fuel.setLatLng(posAt(geom, geom.total * FUEL_FRAC));
      pins.drop.setLatLng(geom.pts[geom.pts.length - 1]).bindTooltip(to.name, { permanent: true, direction: "bottom", offset: [0, 4], className: "lane-city-label" });
      pins.pickup.setOpacity(1);
      pins.fuel.setOpacity(0);
      pins.drop.setOpacity(0);
      popWp("pickup");
      setRouteDraw(id, 0);
      setHeroPos(geom, 0);
      hero.setOpacity(1);
      map.flyToBounds(routeLines.get(id)!.getBounds().pad(0.35), { duration: 1.1, maxZoom: 7.5 });
    };

    // ---- director ----
    let started = false;
    let phaseName: Phase = "network";
    let phaseStart = 0;
    let idx = 0;
    let lastPhaseSet: Phase | "" = "";

    const sync = () => {
      if (lastPhaseSet !== phaseName) {
        lastPhaseSet = phaseName;
        setPhase(phaseName);
        setFeaturedId(curFeat);
      }
    };

    const advance = (ts: number) => {
      switch (phaseName) {
        case "network":
          enterFeature(LANES[idx % LANES.length].id);
          phaseName = "pickup";
          break;
        case "pickup":
          if (curFeat != null) {
            pins.fuel.setOpacity(1);
            popWp("fuel");
          }
          phaseName = "route";
          break;
        case "route":
          if (curFeat != null) clearRouteDraw(curFeat);
          phaseName = "enroute";
          break;
        case "enroute":
          if (curFeat != null) {
            pins.drop.setOpacity(1);
            popWp("drop");
          }
          phaseName = "arrival";
          break;
        case "arrival":
          idx = (idx + 1) % LANES.length;
          enterNetwork();
          phaseName = "network";
          break;
      }
      phaseStart = ts;
    };

    const frame = (ts: number) => {
      if (!started) {
        started = true;
        phaseStart = ts;
        enterNetwork();
        sync();
      }
      // Manual jump: clicking a lane spotlights it immediately, from any phase.
      if (jumpRef.current != null) {
        const jid = jumpRef.current;
        jumpRef.current = null;
        idx = Math.max(0, LANES.findIndex((l) => l.id === jid));
        enterFeature(LANES[idx].id);
        phaseName = "pickup";
        phaseStart = ts;
      }

      const dur = PHASE_MS[phaseName];
      const t = Math.min(1, (ts - phaseStart) / dur);

      if (phaseName === "network") {
        const el = ts - phaseStart;
        LANES.forEach((lane, i) => setRouteDraw(lane.id, Math.max(0, Math.min(1, (el - i * NET_BUILD_STAGGER) / NET_BUILD_DUR))));
      } else if (phaseName === "route" && curFeat != null) {
        setRouteDraw(curFeat, smooth(t));
      } else if (phaseName === "enroute" && curFeat != null) {
        const geom = geoms.get(curFeat)!;
        const d = smooth(t) * geom.total;
        setHeroPos(geom, d);
        if (!fuelPassed && d >= geom.total * FUEL_FRAC) {
          fuelPassed = true;
          popWp("fuel");
        }
      }

      if (ts - phaseStart >= dur) {
        advance(ts);
      }
      sync();
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const featLane = featuredId != null ? LANES.find((l) => l.id === featuredId) : undefined;
  const featFrom = featLane ? CITIES[featLane.from].name : "";
  const featTo = featLane ? CITIES[featLane.to].name : "";
  const stepIndex = STEPS.findIndex((s) => s.key === phase);

  return (
    <section className="py-14 sm:py-20 bg-background">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
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
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                <Route className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">Dedicated Freight Network</span>
            </div>

            <ul className="space-y-1 overflow-y-auto max-h-[320px] lg:max-h-none lg:flex-1 pr-1">
              {LANES.map((lane) => {
                const isActive = featuredId === lane.id;
                return (
                  <li key={lane.id}>
                    <button
                      type="button"
                      onClick={() => {
                        jumpRef.current = lane.id;
                      }}
                      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 sm:py-2 text-left text-sm transition-colors ${
                        isActive ? "bg-primary/25 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center ${isActive ? "bg-primary text-white" : "bg-white/10 text-gray-300"}`}>
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
          <div className="relative z-0 h-[440px] lg:h-auto lg:min-h-[640px]">
            <div ref={mapEl} className="absolute inset-0" />

            {/* Live tracker — centered, symmetrical */}
            <div className="absolute inset-x-0 bottom-4 z-[500] flex justify-center px-4 pointer-events-none">
              <div className="w-full max-w-md rounded-2xl bg-[#0d1e36] ring-1 ring-white/10 shadow-2xl px-5 py-3.5 text-white">
                {phase === "network" ? (
                  <div className="flex items-center justify-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-sm font-semibold">Live Network · 15 Dedicated Lanes</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="relative flex h-2 w-2 flex-shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-70" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
                        </span>
                        <span className="text-sm font-semibold truncate">
                          {featFrom} <span className="text-white/40 font-normal">→</span> {featTo}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-sky-300 whitespace-nowrap">{STATUS[phase]}</span>
                    </div>
                    <div className="relative grid grid-cols-4">
                      <span className="absolute top-[5px] left-[12.5%] right-[12.5%] h-0.5 bg-white/15 rounded-full" />
                      <span
                        className="absolute top-[5px] left-[12.5%] h-0.5 bg-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${(Math.max(0, stepIndex) / 3) * 75}%` }}
                      />
                      {STEPS.map((s, i) => {
                        const done = i < stepIndex;
                        const activeStep = i === stepIndex;
                        return (
                          <div key={s.key} className="relative flex flex-col items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full z-10 transition-colors ${activeStep ? "bg-sky-400 ring-4 ring-sky-400/25" : done ? "bg-emerald-400" : "bg-white/25"}`} />
                            <span className={`text-[10px] leading-tight text-center transition-colors ${activeStep ? "text-white font-semibold" : done ? "text-white/70" : "text-white/40"}`}>{s.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
