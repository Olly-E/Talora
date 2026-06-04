import { array, object, string } from "zod";

export const METHOD = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const EMPTY_OPTION = {
  name: "",
  id: "",
};

export const EMPTY_OPTIONS = [
  {
    name: "",
    id: "",
  },
];

export const OPTION_VALIDATION = object({
  name: string({ message: "Required" }).min(1, "Required"),
  id: string({ message: "Required" }).min(1, "Required"),
});

export const OPTION_VALIDATION_OPTIONAL = object({
  name: string().trim().optional(),
  id: string().trim().optional(),
}).optional();

export const MULTIPLE_OPTION_VALIDATION_OPTIONAL =
  OPTION_VALIDATION.array().optional();

export const OPTIONS_VALIDATION = array(OPTION_VALIDATION).min(1, {
  message: "At least one option is required",
});

// Contact Form Options
export const HELP_NEEDED_OPTIONS = [
  "Hiring employees",
  "Hiring remote talent",
  "Hiring contractors",
  "Building a new team",
  "Filling difficult-to-hire roles",
  "Recruitment process support",
  "HR operations support",
  "Not sure yet, I would like guidance",
];

export const URGENCY_OPTIONS = [
  { label: "Immediately", value: "immediately" },
  { label: "Within 30 days", value: "within-30-days" },
  { label: "Within 60 days", value: "within-60-days" },
  { label: "Just exploring options", value: "exploring" },
];

export const ROLES_COUNT_OPTIONS = [
  { label: "1 role", value: "1" },
  { label: "2–5 roles", value: "2-5" },
  { label: "6–10 roles", value: "6-10" },
  { label: "10+ roles", value: "10+" },
  { label: "Not sure", value: "not-sure" },
];

export const HIRING_LOCATION_OPTIONS = ["Locally", "Internationally", "Both"];
