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
