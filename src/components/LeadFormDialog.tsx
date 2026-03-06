import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Loader2, CheckCircle, User, Phone, Mail, Award, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LeadFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recruiterName: string;
  recruiterPhone: string;
  recruiterPhoneFormatted: string;
}

export const LeadFormDialog = ({ open, onOpenChange, recruiterName, recruiterPhone, recruiterPhoneFormatted }: LeadFormDialogProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    cdlExperience: "",
    sap: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = formData.fullName && formData.phone && formData.email && formData.cdlExperience && formData.sap;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    // Simulate submission — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: "", phone: "", email: "", cdlExperience: "", sap: "" });
    }, 300);
  };

  const cdlOptions = ["Less than 1 year", "1-2 years", "2-5 years", "5-10 years", "10+ years"];

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
            className="relative w-full max-w-md glass-strong rounded-2xl border border-border/50 shadow-2xl overflow-hidden"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

            {/* Decorative blurs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-[50px] -translate-x-1/2 translate-y-1/2" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
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
                      Quick Apply
                    </div>
                    <h2 className="text-xl font-display font-bold text-foreground">Start Your Application</h2>
                    <p className="text-sm text-muted-foreground mt-1">Takes 30 seconds • {recruiterName} will follow up</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                        <User className="w-3 h-3" /> Full Name
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="John Smith"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        className="bg-muted/50 border-border/50 focus:border-primary/50 h-11"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                        <Phone className="w-3 h-3" /> Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="bg-muted/50 border-border/50 focus:border-primary/50 h-11"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                        <Mail className="w-3 h-3" /> Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="bg-muted/50 border-border/50 focus:border-primary/50 h-11"
                        required
                      />
                    </div>

                    {/* CDL Experience */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                        <Award className="w-3 h-3" /> CDL-A Experience
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        {cdlOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleChange("cdlExperience", opt)}
                            className={`px-2 py-2 rounded-lg text-xs font-medium border transition-all duration-200 ${
                              formData.cdlExperience === opt
                                ? "bg-primary/20 border-primary/50 text-primary"
                                : "bg-muted/30 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SAP */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                        <ShieldAlert className="w-3 h-3" /> SAP (Substance Abuse Program)?
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["No", "Yes"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleChange("sap", opt)}
                            className={`px-3 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                              formData.sap === opt
                                ? opt === "No"
                                  ? "bg-accent/20 border-accent/50 text-accent"
                                  : "bg-destructive/20 border-destructive/50 text-destructive"
                                : "bg-muted/30 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="hero"
                      disabled={!isValid || isSubmitting}
                      className="w-full h-12 text-base font-semibold pulse-glow-uniform"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <ChevronRight className="w-5 h-5" />
                          Submit Application
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Or call directly:{" "}
                      <a href={`tel:${recruiterPhone}`} className="text-primary hover:underline font-medium">
                        {recruiterPhoneFormatted}
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
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">Application Received!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {recruiterName} will reach out within 24 hours.
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
