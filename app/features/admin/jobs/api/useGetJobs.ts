import { adminJobKey } from "@/app/utils/query-key-factory";
import { fetchData } from "@/app/utils/fetchData";
import { useQuery } from "@tanstack/react-query";
import { Job } from "@/app/data/jobsData";

export const useGetJobs = () => {
  return useQuery<Job[]>({
    queryKey: adminJobKey.all,
    queryFn: () => fetchData("/api/jobs", "GET"),
  });
};
