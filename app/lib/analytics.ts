// Google Analytics event tracking utilities

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>,
    ) => void;
  }
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Common event helpers
export const trackButtonClick = (buttonName: string) => {
  event({
    action: "click",
    category: "Button",
    label: buttonName,
  });
};

export const trackFormSubmission = (formName: string) => {
  event({
    action: "submit",
    category: "Form",
    label: formName,
  });
};

export const trackJobApplication = (jobTitle: string) => {
  event({
    action: "apply",
    category: "Job",
    label: jobTitle,
  });
};

export const trackBookCall = () => {
  event({
    action: "book_call",
    category: "Conversion",
    label: "Book Call CTA",
  });
};
