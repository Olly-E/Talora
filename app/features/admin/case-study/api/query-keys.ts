export const CASE_STUDY_QUERY_KEYS = {
  all: ["case-studies"] as const,
  detail: (id: number) => ["case-studies", id] as const,
};
