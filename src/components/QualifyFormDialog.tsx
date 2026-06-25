import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Loader2, CheckCircle, Phone, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

interface QualifyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recruiter?: string;
}

const truckBrands = [
  "Freightliner", "Kenworth", "Peterbilt", "Volvo", "International",
  "Mack", "Western Star", "Navistar", "Other"
];

const currentYear = new Date().getFullYear();
const truckYears = Array.from({ length: 20 }, (_, i) => String(currentYear - i));

const cdlExperienceOptions = [
  "Less than 6 months",
  "6 months - 1 year",
  "1-2 years",
  "2-5 years",
  "5-10 years",
  "10+ years"
];

export const QualifyFormDialog = ({ open, onOpenChange, recruiter }: QualifyFormDialogProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    truckBrand: "",
    truckYear: "",
    cdlExperience: "",
    smsConsent: false,
    marketingConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = formData.fullName && formData.phone && formData.email && formData.truckBrand && formData.truckYear && formData.cdlExperience;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    const payload = {
      ...formData,
      recruiter: recruiter || "unknown",
      source: window.location.pathname,
      submittedAt: new Date().toISOString(),
    };
    const leadPayload = {
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      vehicle: [formData.truckYear, formData.truckBrand].filter(Boolean).join(" "),
      message: `CDL Experience: ${formData.cdlExperience}`,
      source: "website-qualify-form",
      recruiter: recruiter || "unknown",
      ...formData,
    };
    await Promise.all([
      fetch("/api/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {}),
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      }).catch(() => {}),
    ]);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: "", phone: "", email: "",
        truckBrand: "", truckYear: "", cdlExperience: "",
        smsConsent: false, marketingConsent: false,
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 lg:p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[480px] bg-[#0d1526] rounded-2xl border border-[#1e2a42] shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={handleClose}
              data-testid="button-close-qualify"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-accent/80 hover:bg-accent flex items-center justify-center text-white transition-colors z-50"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative p-4 pt-6 lg:p-6 lg:pt-8">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-3 lg:mb-6">
                    <h2 className="text-lg lg:text-xl font-display font-bold text-white uppercase tracking-wide">
                      See If You <span className="text-accent">Qualify</span>
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-2 lg:space-y-4">
                    <Input
                      data-testid="input-fullname"
                      placeholder="Full Name *"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      className="bg-[#0a1020] border-[#2a3654] text-white placeholder:text-[#5a6a8a] h-10 lg:h-12 rounded-lg text-sm"
                      required
                    />

                    <div className="grid grid-cols-2 gap-2 lg:gap-3">
                      <Input
                        data-testid="input-phone"
                        type="tel"
                        placeholder="Phone *"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="bg-[#0a1020] border-[#2a3654] text-white placeholder:text-[#5a6a8a] h-10 lg:h-12 rounded-lg text-sm"
                        required
                      />
                      <Input
                        data-testid="input-email"
                        type="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="bg-[#0a1020] border-[#2a3654] text-white placeholder:text-[#5a6a8a] h-10 lg:h-12 rounded-lg text-sm"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 lg:gap-3">
                      <Select value={formData.truckBrand} onValueChange={(val) => handleChange("truckBrand", val)}>
                        <SelectTrigger data-testid="select-truck-brand" className="bg-[#0a1020] border-[#2a3654] text-white h-10 lg:h-12 rounded-lg text-sm [&>span]:text-[#5a6a8a] data-[state=open]:border-primary [&[data-has-value]>span]:text-white">
                          <SelectValue placeholder="Truck Brand *" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0d1526] border-[#2a3654]">
                          {truckBrands.map((brand) => (
                            <SelectItem key={brand} value={brand} className="text-white focus:bg-[#1e2a42] focus:text-white">
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={formData.truckYear} onValueChange={(val) => handleChange("truckYear", val)}>
                        <SelectTrigger data-testid="select-truck-year" className="bg-[#0a1020] border-[#2a3654] text-white h-10 lg:h-12 rounded-lg text-sm [&>span]:text-[#5a6a8a] data-[state=open]:border-primary [&[data-has-value]>span]:text-white">
                          <SelectValue placeholder="Truck Year *" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0d1526] border-[#2a3654] max-h-60">
                          {truckYears.map((year) => (
                            <SelectItem key={year} value={year} className="text-white focus:bg-[#1e2a42] focus:text-white">
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Select value={formData.cdlExperience} onValueChange={(val) => handleChange("cdlExperience", val)}>
                      <SelectTrigger data-testid="select-cdl-experience" className="bg-[#0a1020] border-[#2a3654] text-white h-10 lg:h-12 rounded-lg text-sm [&>span]:text-[#5a6a8a] data-[state=open]:border-primary [&[data-has-value]>span]:text-white">
                        <SelectValue placeholder="CDL A Experience *" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0d1526] border-[#2a3654]">
                        {cdlExperienceOptions.map((opt) => (
                          <SelectItem key={opt} value={opt} className="text-white focus:bg-[#1e2a42] focus:text-white">
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="pt-1 space-y-2 lg:pt-2 lg:space-y-4">
                      <p className="text-[10px] lg:text-xs font-bold text-white uppercase tracking-wide">
                        SMS Communications (Optional)
                      </p>

                      <label className="flex items-start gap-2 cursor-pointer">
                        <Checkbox
                          id="smsConsent"
                          data-testid="checkbox-sms-consent"
                          checked={formData.smsConsent}
                          onCheckedChange={(checked) => handleChange("smsConsent", !!checked)}
                          className="mt-0.5 border-[#3a4a6a] data-[state=checked]:bg-primary data-[state=checked]:border-primary shrink-0"
                        />
                        <span className="text-[10px] lg:text-xs text-[#8a9ab8] leading-tight lg:leading-relaxed select-none">
                          I consent to receive text messages from <strong className="text-white">XXII Century Inc</strong> about my application and recruiting. Msg & data rates may apply. Reply STOP to opt out.
                        </span>
                      </label>

                      <label className="flex items-start gap-2 cursor-pointer">
                        <Checkbox
                          id="marketingConsent"
                          data-testid="checkbox-marketing-consent"
                          checked={formData.marketingConsent}
                          onCheckedChange={(checked) => handleChange("marketingConsent", !!checked)}
                          className="mt-0.5 border-[#3a4a6a] data-[state=checked]:bg-primary data-[state=checked]:border-primary shrink-0"
                        />
                        <span className="text-[10px] lg:text-xs text-[#8a9ab8] leading-tight lg:leading-relaxed select-none">
                          I consent to receive marketing messages from <strong className="text-white">XXII Century Inc</strong> about job openings and updates. Up to 4/month. Reply STOP to opt out.
                        </span>
                      </label>
                    </div>

                    <p className="text-[10px] lg:text-xs text-[#6a7a9a] text-center">
                      By submitting, you agree to our{" "}
                      <Link to="/privacy" data-testid="link-privacy-policy" className="underline hover:text-white transition-colors">Privacy Policy</Link>
                      {" & "}
                      <Link to="/terms" data-testid="link-terms-of-service" className="underline hover:text-white transition-colors">Terms of Service</Link>
                    </p>

                    <Button
                      type="submit"
                      data-testid="button-check-eligibility"
                      disabled={!isValid || isSubmitting}
                      className="w-full h-12 lg:h-14 text-sm lg:text-base font-bold uppercase tracking-wider bg-accent hover:bg-accent/90 text-white rounded-xl"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <ChevronRight className="w-5 h-5" />
                          Check My Eligibility
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-between">
                      <a href="tel:+16309146037" className="flex items-center gap-1.5 text-xs lg:text-sm text-accent hover:text-accent/80 transition-colors" data-testid="link-phone">
                        <Phone className="w-3.5 h-3.5" />
                        630-914-6037
                      </a>
                      <span className="flex items-center gap-1 text-xs lg:text-sm text-[#6a7a9a]">
                        <Check className="w-3.5 h-3.5" />
                        100% Confidential
                      </span>
                    </div>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">You May Qualify!</h3>
                  <p className="text-sm text-[#8a9ab8] mb-4">
                    A recruiter will reach out within 1 hour to discuss your eligibility.
                  </p>
                  <Button data-testid="button-close-success" className="bg-accent hover:bg-accent/90 text-white" onClick={handleClose}>
                    Close
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
