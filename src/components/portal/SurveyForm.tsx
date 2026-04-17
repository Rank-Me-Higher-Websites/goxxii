import { SurveyQuestion } from "@/data/surveyQuestions";

interface SurveyFormProps {
  questions: SurveyQuestion[];
  responses: Record<string, any>;
  onChange: (responses: Record<string, any>) => void;
}

export function SurveyForm({ questions, responses, onChange }: SurveyFormProps) {
  const isVisible = (q: SurveyQuestion) => {
    if (!q.condition) return true;
    const [field, values] = q.condition.split(":");
    return values.split(",").includes(responses[field]);
  };

  const updateResponse = (key: string, value: any) => {
    onChange({ ...responses, [key]: value });
  };

  return (
    <div className="space-y-4">
      {questions.map((q, idx) => {
        if (!isVisible(q)) return null;
        return (
          <div key={q.key} className="bg-card/80 backdrop-blur border border-border rounded-xl p-5" data-testid={`question-${q.key}`}>
            <div className="flex gap-3 mb-3">
              <span className="text-xs text-muted-foreground/50 font-display mt-0.5 shrink-0 w-5 text-right">
                {idx + 1}.
              </span>
              <div className="flex-1">
                <label className="text-sm text-foreground font-medium leading-snug">{q.label}</label>
                {q.sublabel && <p className="text-xs text-muted-foreground mt-1">{q.sublabel}</p>}
              </div>
            </div>
            <div className="ml-8">
              <QuestionInput question={q} value={responses[q.key]} onChange={(v) => updateResponse(q.key, v)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QuestionInput({ question, value, onChange }: { question: SurveyQuestion; value: any; onChange: (v: any) => void }) {
  switch (question.type) {
    case "textarea":
      return (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          data-testid={`input-${question.key}`}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none resize-none transition-all"
          placeholder="Enter response..."
        />
      );

    case "yesno":
      return (
        <div className="flex gap-3">
          {(["yes", "no"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              data-testid={`button-${question.key}-${opt}`}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                value === opt
                  ? opt === "yes"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-destructive bg-destructive/10 text-destructive"
                  : "border-border text-muted-foreground hover:border-border/80"
              }`}
            >
              {opt === "yes" ? "Yes" : "No"}
            </button>
          ))}
        </div>
      );

    case "select":
      return (
        <div className="space-y-1.5">
          {question.options?.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              data-testid={`button-${question.key}-${opt.value}`}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm border transition-all ${
                value === opt.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-border/80"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      );

    case "rating":
      return (
        <div className="space-y-2">
          <div className="flex gap-1.5 flex-wrap">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onChange(n)}
                data-testid={`button-${question.key}-${n}`}
                className={`w-9 h-9 rounded-lg text-sm font-medium border transition-all ${
                  value === n
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-border/80"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground/50 px-1">
            <span>Not likely</span>
            <span>Very likely</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
