import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import OwnerOperators from "./pages/OwnerOperators";
import OwnerOperatorState from "./pages/OwnerOperatorState";
import CompanyDrivers from "./pages/CompanyDrivers";
import FleetProgram from "./pages/FleetProgram";
import FreightServices from "./pages/FreightServices";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import DriverFunnel from "./pages/DriverFunnel";
import PortalLayout from "./components/portal/PortalLayout";
import Login from "./pages/portal/Login";
import Dashboard from "./pages/portal/Dashboard";
import Drivers from "./pages/portal/Drivers";
import DriverDetail from "./pages/portal/DriverDetail";
import Retention from "./pages/portal/Retention";
import NewCheckIn from "./pages/portal/NewCheckIn";
import CheckInDetail from "./pages/portal/CheckInDetail";
import SurveyLinks from "./pages/portal/SurveyLinks";
import PublicSurvey from "./pages/PublicSurvey";
import PublicRegister from "./pages/PublicRegister";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/owner-operators" element={<OwnerOperators />} />
          <Route path="/owner-operators/:state" element={<OwnerOperatorState />} />
          <Route path="/company-drivers" element={<CompanyDrivers />} />
          <Route path="/fleet-program" element={<FleetProgram />} />
          <Route path="/freight-shipping-services" element={<FreightServices />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:slug" element={<CareerDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />

          <Route path="/survey" element={<Navigate to="/survey/register" replace />} />
          <Route path="/survey/register" element={<PublicRegister />} />
          <Route path="/survey/:token/:week" element={<PublicSurvey />} />
          <Route path="/survey/:token" element={<PublicSurvey />} />

          <Route path="/portal/login" element={<Login />} />
          <Route path="/portal" element={<PortalLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="drivers/:id" element={<DriverDetail />} />
            <Route path="retention" element={<Retention />} />
            <Route path="retention/new" element={<NewCheckIn />} />
            <Route path="retention/:id" element={<CheckInDetail />} />
            <Route path="survey-links" element={<SurveyLinks />} />
          </Route>

          <Route path="/:recruiter" element={<DriverFunnel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
