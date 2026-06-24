import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { surveyQuestions, SurveyQuestion } from "@/data/surveyQuestions";
import { SurveyForm } from "@/components/portal/SurveyForm";

export default function NewCheckIn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const preselectedDriverId = searchParams.get("driverId");
  const preselectedType = searchParams.get("type") || "week1";

  const [selectedDriverId, setSelectedDriverId] = useState(preselectedDriverId || "");
  const [selectedType, setSelectedType] = useState(preselectedType);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [started, setStarted] = useState(false);

  const { data: drivers = [] } = useQuery({
    queryKey: ["/api/portal/drivers"],
  });

  const survey = surveyQuestions[selectedType];

  const createCheckIn = useMutation({
    mutationFn: (data: any) =>
      apiRequest("/api/portal/check-ins", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portal/check-ins"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portal/drivers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portal/stats"] });
      navigate("/portal/retention");
    },
  });

  const handleSubmit = () => {
    createCheckIn.mutate({
      driverId: Number(selectedDriverId),
      checkInType: selectedType,
      status: "completed",
      completedAt: new Date().toISOString(),
      submittedBy: user?.id,
      responses,
    });
  };

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto space-y-6" data-testid="checkin-setup">
        <div className="flex items-center gap-3">
          <Link to="/portal/retention" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-back">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground font-display tracking-tight">New Check-In</h1>
        </div>

        <div className="bg-card/80 backdrop-blur border border-border rounded-xl p-6 space-y-5">
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Select Driver</label>
            <select
              value={selectedDriverId}
              onChange={(e) => setSelectedDriverId(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-primary focus:outline-none"
              data-testid="select-driver"
            >
              <option value="">Choose a driver...</option>
              {drivers.filter((d: any) => d.status === "active").map((d: any) => (
                <option key={d.id} value={d.id}>{d.firstName} {d.lastName} - Truck #{d.truckNumber || "N/A"}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Check-In Week</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(surveyQuestions).map(([key, sq]) => (
                <button
                  key={key}
                  onClick={() => setSelectedType(key)}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    selectedType === key
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-border/80"
                  }`}
                  data-testid={`button-type-${key}`}
                >
                  <div className={`text-sm font-medium font-display ${selectedType === key ? "text-primary" : "text-foreground"}`}>
                    {sq.title.split(" - ")[0]}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{sq.questions.length} questions</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-4">
            <div className="text-xs text-muted-foreground/50 uppercase tracking-wider mb-1">Focus</div>
            <div className="text-sm text-muted-foreground">{survey?.focus}</div>
          </div>

          <button
            onClick={() => setStarted(true)}
            disabled={!selectedDriverId}
            data-testid="button-start"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Begin Check-In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6" data-testid="checkin-form">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setStarted(false)} className="text-muted-foreground hover:text-foreground transition-colors" data-testid="button-back">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground font-display tracking-tight">{survey.title}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{survey.focus}</p>
          </div>
        </div>
      </div>

      <SurveyForm
        questions={survey.questions}
        responses={responses}
        onChange={setResponses}
      />

      <div className="sticky bottom-4 bg-card/95 backdrop-blur border border-border rounded-xl p-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {Object.keys(responses).length} of {survey.questions.length} answered
        </span>
        <button
          onClick={handleSubmit}
          disabled={createCheckIn.isPending}
          data-testid="button-submit"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2.5 rounded-lg text-sm transition-all disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
          {createCheckIn.isPending ? "Submitting..." : "Submit Check-In"}
        </button>
      </div>
    </div>
  );
}
