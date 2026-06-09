import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Check, ChevronRight, AlertCircle } from "lucide-react";
import { surveyQuestions } from "@/data/surveyQuestions";
import { SurveyForm } from "@/components/portal/SurveyForm";
import logo from "@/assets/logo.svg";

export default function PublicSurvey() {
  const { token, week } = useParams();
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const isWeekSpecific = !!week;

  const { data, isLoading, error } = useQuery({
    queryKey: isWeekSpecific ? ["/api/survey", token, week] : ["/api/survey", token],
    queryFn: async () => {
      const url = isWeekSpecific
        ? `/api/survey/${token}/${week}`
        : `/api/survey/${token}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Survey not found");
      return res.json();
    },
  });

  const submitSurvey = useMutation({
    mutationFn: async (body: any) => {
      const url = isWeekSpecific
        ? `/api/survey/${token}/${week}/submit`
        : `/api/survey/${token}/submit`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Submission failed");
      }
      return res.json();
    },
    onSuccess: () => setSubmitted(true),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <img src={logo} alt="XXII Century" className="h-12 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-foreground font-display mb-2">Survey Not Found</h1>
          <p className="text-muted-foreground text-sm">This survey link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  if (isWeekSpecific && data.alreadyCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <img src={logo} alt="XXII Century" className="h-12 mx-auto mb-6" />
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-xl font-bold text-foreground font-display mb-2" data-testid="text-already-completed">
            Already Completed
          </h1>
          <p className="text-muted-foreground text-sm">
            This week's survey has already been submitted. Thank you, {data.driver.firstName}!
          </p>
        </div>
      </div>
    );
  }

  if (data.allComplete || submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <img src={logo} alt="XXII Century" className="h-12 mx-auto mb-6" />
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-xl font-bold text-foreground font-display mb-2">
            {submitted ? "Survey Submitted!" : "All Surveys Complete"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {submitted
              ? "Thank you for your feedback. Your responses help us improve your experience at XXII Century."
              : "You've completed all your retention check-ins. Thank you for your partnership with XXII Century!"}
          </p>
        </div>
      </div>
    );
  }

  const currentWeek = isWeekSpecific ? week : data.nextWeek;
  const survey = surveyQuestions[currentWeek!];

  if (!survey) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <p className="text-muted-foreground">Survey configuration error.</p>
      </div>
    );
  }

  const handleSubmit = () => {
    if (isWeekSpecific) {
      submitSurvey.mutate({ responses });
    } else {
      submitSurvey.mutate({ checkInType: currentWeek, responses });
    }
  };

  return (
    <div className="min-h-screen bg-background" data-testid="public-survey">
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-border px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="XXII Century" className="h-8" />
            <div className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.15em]">Driver Survey</div>
          </div>
          <div className="text-sm text-muted-foreground">
            {data.driver.firstName} {data.driver.lastName}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 lg:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display tracking-tight">{survey.title}</h1>
          <p className="text-muted-foreground text-sm mt-1">{survey.focus}</p>
        </div>

        {currentWeek?.startsWith("week") && (
          <div className="flex gap-2 mb-2">
            {["week1", "week2", "week3", "week4"].map((w) => {
              const done = data.completedWeeks.includes(w);
              const current = w === currentWeek;
              return (
                <div
                  key={w}
                  className={`flex-1 h-1.5 rounded-full ${
                    done ? "bg-accent" : current ? "bg-primary" : "bg-border"
                  }`}
                />
              );
            })}
          </div>
        )}

        <SurveyForm questions={survey.questions} responses={responses} onChange={setResponses} />

        <div className="sticky bottom-4 bg-card/95 backdrop-blur border border-border rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {Object.keys(responses).length} of {survey.questions.length} answered
          </span>
          <button
            onClick={handleSubmit}
            disabled={submitSurvey.isPending}
            data-testid="button-submit-survey"
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2.5 rounded-lg text-sm transition-all disabled:opacity-50"
          >
            {submitSurvey.isPending ? "Submitting..." : "Submit"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {submitSurvey.isError && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 text-destructive text-sm" data-testid="text-error">
            {(submitSurvey.error as Error).message}
          </div>
        )}
      </main>
    </div>
  );
}
