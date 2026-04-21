export const adminProjectKey = {
  all: ["adminProject"] as const,
  lists: () => [...adminProjectKey.all, "list"] as const,
  list: (id: string) => [...adminProjectKey.all, "list", id] as const,
  details: () => [...adminProjectKey.all, "detail"] as const,
  detail: (id: string) => [...adminProjectKey.details(), id] as const,
};

export const adminArticleKey = {
  all: ["adminArticle"] as const,
  lists: () => [...adminArticleKey.all, "list"] as const,
  list: (id: string) => [...adminArticleKey.all, "list", id] as const,
  details: () => [...adminArticleKey.all, "detail"] as const,
  detail: (id: string) => [...adminArticleKey.details(), id] as const,
};

export const adminJobKey = {
  all: ["adminJob"] as const,
  lists: () => [...adminJobKey.all, "list"] as const,
  list: (id: string) => [...adminJobKey.all, "list", id] as const,
  details: () => [...adminJobKey.all, "detail"] as const,
  detail: (id: string) => [...adminJobKey.details(), id] as const,
};

export const talentPoolKey = {
  all: ["talentPool"] as const,
  lists: () => [...talentPoolKey.all, "list"] as const,
  list: (params?: unknown) => [...talentPoolKey.all, "list", params] as const,
  details: () => [...talentPoolKey.all, "detail"] as const,
  detail: (id: string) => [...talentPoolKey.details(), id] as const,
};
