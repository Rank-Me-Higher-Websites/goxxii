export interface SurveyQuestion {
  key: string;
  label: string;
  sublabel?: string;
  type: "textarea" | "yesno" | "select" | "rating";
  options?: { value: string; label: string }[];
  condition?: string;
}

export interface SurveySection {
  title: string;
  focus: string;
  questions: SurveyQuestion[];
}

export const surveyQuestions: Record<string, SurveySection> = {
  week1: {
    title: "Week 1 - Orientation and Onboarding",
    focus: "Ensuring the driver has everything needed to start smoothly and without friction.",
    questions: [
      { key: "tools_access", label: "Did you receive access to all necessary apps and tools before your first load?", sublabel: "Open Road, Relay fuel card, ELD, CAT Scale access, etc.", type: "textarea" },
      { key: "stress_source", label: "If you experienced stress, where did it come from?", type: "textarea" },
      { key: "promise_match", label: "Did the terms you were promised match reality?", sublabel: "Miles, pay, home time, freight quality", type: "select", options: [
        { value: "fully", label: "Fully matched" },
        { value: "partially", label: "Partially matched" },
        { value: "not_matched", label: "Did not match" },
      ]},
      { key: "promise_mismatch_detail", label: "If not fully matched, please explain:", type: "textarea", condition: "promise_match:partially,not_matched" },
      { key: "first_load_explained", label: "Was your first load/route clearly explained, including pickup, delivery requirements and paperwork?", type: "yesno" },
      { key: "orientation_clarity", label: "Was the orientation structured and clear, or was there confusion?", type: "textarea" },
      { key: "missing_first_day", label: "What was missing on your first day?", type: "textarea" },
      { key: "wish_known", label: "Is there one specific piece of information you wish you had known before starting your first trip?", type: "textarea" },
    ],
  },
  week2: {
    title: "Week 2 - First Week with XXII Century",
    focus: "Identifying communication or equipment bottlenecks that may cause frustration.",
    questions: [
      { key: "feel_supported", label: "During your first week, did you feel supported by the team?", type: "yesno" },
      { key: "tech_issues", label: "Are you experiencing any technical issues with Stellar ELD, Open Road, or communication tools?", sublabel: "Phone, Telegram, WhatsApp", type: "textarea" },
      { key: "pay_understanding", label: "Do you clearly understand how your pay is calculated?", sublabel: "Rate per mile, deductions, fuel, escrow, etc.", type: "yesno" },
      { key: "dispatcher_responsiveness", label: "How would you rate the responsiveness of your primary dispatcher?", type: "select", options: [
        { value: "excellent", label: "Excellent" },
        { value: "good", label: "Good" },
        { value: "average", label: "Average" },
        { value: "poor", label: "Poor" },
      ]},
      { key: "dispatcher_responsiveness_detail", label: "What could your dispatcher do better?", sublabel: "Please share specific examples so we can improve.", type: "textarea", condition: "dispatcher_responsiveness:good,average,poor" },
      { key: "unexpected_delays", label: "Have you encountered any unexpected delays at regular pickup or drop-off locations?", type: "textarea" },
      { key: "feel_respected", label: "Do you feel respected by dispatch, safety, payroll, and management?", type: "yesno" },
      { key: "tension_detail", label: "If there is tension, where exactly?", type: "textarea", condition: "feel_respected:no" },
      { key: "lanes_match", label: "Does the workload and assigned lanes match what was discussed during your initial contract phase?", type: "yesno" },
      { key: "comfortable_reporting", label: "Do you feel comfortable bringing problems or mistakes to management without fear of punishment?", type: "yesno" },
      { key: "company_support", label: "When issues happen (breakdown, delay, broker problem), do you feel the company supports you or leaves you alone?", type: "select", options: [
        { value: "fully_supports", label: "Fully supports me" },
        { value: "somewhat_supports", label: "Somewhat supports" },
        { value: "leaves_alone", label: "Leaves me alone" },
      ]},
      { key: "support_example", label: "Provide a recent example:", type: "textarea" },
    ],
  },
  week3: {
    title: "Week 3 - Second Week with XXII Century",
    focus: "Checking if the driver is building momentum and feeling part of the team.",
    questions: [
      { key: "routine_established", label: "Do you feel like you've established a good daily/weekly routine?", type: "yesno" },
      { key: "routine_blockers", label: "If not, what's getting in the way?", type: "textarea", condition: "routine_established:no" },
      { key: "communication_quality", label: "How would you rate the overall communication from the company?", type: "select", options: [
        { value: "excellent", label: "Excellent - I feel well-informed" },
        { value: "good", label: "Good - Most things are communicated" },
        { value: "average", label: "Average - Could be better" },
        { value: "poor", label: "Poor - I'm often in the dark" },
      ]},
      { key: "miles_consistent", label: "Are you consistently getting the miles you were promised?", type: "yesno" },
      { key: "miles_detail", label: "If not, what's the gap?", type: "textarea", condition: "miles_consistent:no" },
      { key: "team_relationship", label: "How would you describe your relationship with dispatch and the office team?", type: "select", options: [
        { value: "great", label: "Great - We work well together" },
        { value: "good", label: "Good - Getting there" },
        { value: "neutral", label: "Neutral - Just business" },
        { value: "strained", label: "Strained - Some tension" },
      ]},
      { key: "safety_concerns", label: "Do you have any safety concerns that haven't been addressed?", type: "textarea" },
      { key: "overall_satisfaction", label: "Overall, how satisfied are you at this point?", type: "select", options: [
        { value: "very_satisfied", label: "Very Satisfied" },
        { value: "satisfied", label: "Satisfied" },
        { value: "neutral", label: "Neutral" },
        { value: "dissatisfied", label: "Dissatisfied" },
        { value: "very_dissatisfied", label: "Very Dissatisfied" },
      ]},
      { key: "week3_feedback", label: "Anything else you'd like us to know?", type: "textarea" },
    ],
  },
  week4: {
    title: "Week 4 - Partnership Fit with XXII Century",
    focus: "Evaluating long-term profitability and overall satisfaction.",
    questions: [
      { key: "pay_aligned", label: "Based on your first month, is your take-home pay aligning with your initial expectations?", type: "select", options: [
        { value: "yes", label: "Yes, fully aligned" },
        { value: "somewhat", label: "Somewhat aligned" },
        { value: "no", label: "No, below expectations" },
      ]},
      { key: "home_time_satisfaction", label: "How satisfied are you with the frequency and predictability of your home time or downtime?", type: "select", options: [
        { value: "very_satisfied", label: "Very Satisfied" },
        { value: "satisfied", label: "Satisfied" },
        { value: "neutral", label: "Neutral" },
        { value: "dissatisfied", label: "Dissatisfied" },
        { value: "very_dissatisfied", label: "Very Dissatisfied" },
      ]},
      { key: "settlement_clarity", label: "Are your settlement (payment) statements clear, easy to read, and accurate?", type: "yesno" },
      { key: "top_improvement", label: "What is the #1 thing we could improve to make your partnership with us more successful?", type: "textarea" },
      { key: "nps_score", label: "On a scale of 1–10, how likely are you to recommend our company to other owner-operators?", type: "rating" },
      { key: "profitable_long_term", label: "Are you making enough profit to justify staying with this company long term?", type: "select", options: [
        { value: "yes", label: "Yes" },
        { value: "somewhat", label: "Somewhat" },
        { value: "no", label: "No" },
      ]},
      { key: "considered_leaving", label: "In your first 30 days, was there a moment you considered leaving?", type: "yesno" },
      { key: "leaving_reason", label: "If yes, what caused it?", type: "textarea", condition: "considered_leaving:yes" },
      { key: "dream_feature", label: "What would you like to see in our company that you have never had in any other company - something that would make you stay long term?", type: "textarea" },
    ],
  },
  exit: {
    title: "Exit Survey - Departure Feedback",
    focus: "Understanding why a driver is leaving so we can reduce future turnover and improve the experience for current drivers.",
    questions: [
      { key: "primary_reason", label: "What was the primary reason you decided to leave the company?", type: "select", options: [
        { value: "better_pay", label: "Better pay elsewhere" },
        { value: "home_time", label: "Home time / schedule" },
        { value: "equipment", label: "Truck / equipment issues" },
        { value: "dispatch_management", label: "Dispatch or management" },
        { value: "miles_freight", label: "Miles / freight quality" },
        { value: "safety", label: "Safety concerns" },
        { value: "other_opportunity", label: "Found another opportunity" },
        { value: "personal", label: "Personal / family reasons" },
        { value: "retiring", label: "Retiring / leaving the industry" },
        { value: "other", label: "Other" },
      ]},
      { key: "primary_reason_detail", label: "Tell us more about your primary reason for leaving.", type: "textarea" },
      { key: "influencing_events", label: "Were there any specific events or issues that influenced your decision?", type: "textarea" },
      { key: "job_satisfaction", label: "How would you rate your overall job satisfaction? (1 = very low, 10 = very high)", type: "rating" },
      { key: "liked_most", label: "What did you like MOST about your role as a truck driver here?", type: "textarea" },
      { key: "liked_least", label: "What did you like LEAST about your role as a truck driver here?", type: "textarea" },
      { key: "pay_competitiveness", label: "How competitive was your pay, bonuses, and benefits compared to other trucking companies?", type: "select", options: [
        { value: "much_better", label: "Much better than others" },
        { value: "better", label: "Somewhat better" },
        { value: "same", label: "About the same" },
        { value: "worse", label: "Somewhat worse" },
        { value: "much_worse", label: "Much worse than others" },
      ]},
      { key: "equipment_rating", label: "How would you rate the condition and reliability of the trucks and equipment?", type: "select", options: [
        { value: "excellent", label: "Excellent" },
        { value: "good", label: "Good" },
        { value: "average", label: "Average" },
        { value: "poor", label: "Poor" },
      ]},
      { key: "schedule_reasonable", label: "Were the routes, schedules, home time, and workload reasonable?", type: "select", options: [
        { value: "yes_reasonable", label: "Yes, reasonable" },
        { value: "mostly", label: "Mostly reasonable" },
        { value: "sometimes", label: "Sometimes unreasonable" },
        { value: "no", label: "No, unreasonable" },
      ]},
      { key: "management_support", label: "How well supported did you feel by your dispatcher, fleet manager, or supervisors?", type: "select", options: [
        { value: "excellent", label: "Excellent" },
        { value: "good", label: "Good" },
        { value: "average", label: "Average" },
        { value: "poor", label: "Poor" },
      ]},
      { key: "communication_effective", label: "Was communication from the company to drivers effective?", type: "yesno" },
      { key: "felt_safe", label: "Did you feel safe on the road?", type: "yesno" },
      { key: "safety_concerns", label: "Any safety concerns or suggestions?", type: "textarea" },
      { key: "improvement_suggestions", label: "What one or two changes would most improve the experience for future drivers?", type: "textarea" },
      { key: "would_recommend", label: "Would you recommend our company to other truck drivers?", type: "yesno" },
      { key: "recommend_reason", label: "Why or why not?", type: "textarea" },
    ],
  },
};
