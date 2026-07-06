import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Loader2, CheckCircle, User, Phone, Mail, Building2, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface QuoteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuoteFormDialog = ({ open, onOpenChange }: QuoteFormDialogProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    phone: "",
    email: "",
    origin: "",
    destination: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = formData.fullName && formData.phone && formData.email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    const laneText =
      formData.origin || formData.destination
        ? `Lane: ${formData.origin || "?"} -> ${formData.destination || "?"}. `
        : "";
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        message: `FREIGHT QUOTE REQUEST. Company: ${formData.company || "n/a"}. ${laneText}${formData.details || ""}`,
        source: "website-freight-quote",
        company: formData.company,
        origin: formData.origin,
        destination: formData.destination,
      }),
    }).catch(() => {});
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: "", company: "", phone: "", email: "", origin: "", destination: "", details: "" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md glass-strong rounded-2xl border border-border/50 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 p-6">
              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                      </span>
                      Freight Quote
                    </div>
                    <h2 className="text-xl font-display font-bold text-foreground">Get Your Quote</h2>
                    <p className="text-sm text-muted-foreground mt-1">Takes 30 seconds &bull; our logistics team will follow up</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="q-fullName" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                        <User className="w-3 h-3" /> Full Name
                      </Label>
                      <Input
                        id="q-fullName"
                        placeholder="John Smith"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        className="bg-muted/50 border-border/50 focus:border-primary/50 h-11"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="q-company" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                        <Building2 className="w-3 h-3" /> Company
                      </Label>
                      <Input
                        id="q-company"
                        placeholder="Your company"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        className="bg-muted/50 border-border/50 focus:border-primary/50 h-11"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="q-phone" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                          <Phone className="w-3 h-3" /> Phone
                        </Label>
                        <Input
                          id="q-phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          className="bg-muted/50 border-border/50 focus:border-primary/50 h-11"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="q-email" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                          <Mail className="w-3 h-3" /> Email
                        </Label>
                        <Input
                          id="q-email"
                          type="email"
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          className="bg-muted/50 border-border/50 focus:border-primary/50 h-11"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="q-origin" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" /> Pickup (City, State)
                        </Label>
                        <Input
                          id="q-origin"
                          placeholder="Chicago, IL"
                          value={formData.origin}
                          onChange={(e) => handleChange("origin", e.target.value)}
                          className="bg-muted/50 border-border/50 focus:border-primary/50 h-11"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="q-destination" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" /> Delivery (City, State)
                        </Label>
                        <Input
                          id="q-destination"
                          placeholder="Columbus, OH"
                          value={formData.destination}
                          onChange={(e) => handleChange("destination", e.target.value)}
                          className="bg-muted/50 border-border/50 focus:border-primary/50 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="q-details" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                        <Package className="w-3 h-3" /> Freight Details (optional)
                      </Label>
                      <Textarea
                        id="q-details"
                        placeholder="Commodity, weight, frequency, timing..."
                        value={formData.details}
                        onChange={(e) => handleChange("details", e.target.value)}
                        className="bg-muted/50 border-border/50 focus:border-primary/50 min-h-[70px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      disabled={!isValid || isSubmitting}
                      className="w-full h-12 text-base font-semibold"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <ChevronRight className="w-5 h-5" />
                          Get My Quote
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Or call directly:{" "}
                      <a href="tel:+16309146037" className="text-primary hover:underline font-medium">
                        630-914-6037
                      </a>
                    </p>
                  </form>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">Quote Request Received!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our logistics team will reach out with your custom rate shortly.
                  </p>
                  <Button variant="heroOutline" onClick={handleClose}>
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
