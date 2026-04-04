import { CaseStudy } from "../types";

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Revolutionizing Recruitment for Tech Startup",
    client: "TechFlow Solutions",
    industry: "Technology",
    description:
      "A fast-growing tech startup needed to scale their team rapidly while maintaining quality and cultural fit.",
    challenge:
      "TechFlow was struggling with a 45-day average time-to-hire and losing top candidates to competitors. Their manual recruitment process couldn't keep up with growth demands.",
    solution:
      "We implemented an AI-powered applicant tracking system, automated initial screening, and created a structured interview process with scorecards.",
    results: [
      "Reduced time-to-hire from 45 to 18 days",
      "Increased offer acceptance rate by 35%",
      "Improved candidate quality score by 40%",
      "Saved 30 hours per week in manual screening",
    ],
    image:
      "https://img.freepik.com/free-photo/colleagues-working-together-project_23-2148388768.jpg",
    tags: ["Recruitment", "AI Automation", "Tech"],
  },
  {
    id: 2,
    title: "HR Automation for Manufacturing Giant",
    client: "Industrial Dynamics Corp",
    industry: "Manufacturing",
    description:
      "A multinational manufacturing company needed to streamline HR operations across 15 facilities and 5,000+ employees.",
    challenge:
      "Managing employee records, payroll, and compliance across multiple locations was creating bottlenecks, errors, and compliance risks.",
    solution:
      "Deployed a comprehensive HRIS platform with automated workflows, self-service portals, and real-time analytics dashboards.",
    results: [
      "92% reduction in manual paperwork",
      "99.8% payroll accuracy achieved",
      "85% employee adoption of self-service portal",
      "100% compliance audit success rate",
    ],
    image:
      "https://img.freepik.com/free-photo/business-people-analyzing-statistics_23-2147837746.jpg",
    tags: ["HR Automation", "HRIS", "Manufacturing"],
  },
  {
    id: 3,
    title: "Employee Engagement Transformation",
    client: "RetailMax Group",
    industry: "Retail",
    description:
      "A national retail chain with 200+ stores faced declining employee satisfaction and high turnover rates.",
    challenge:
      "Employee turnover rate was at 68% annually, costing the company millions in recruitment and training expenses.",
    solution:
      "Implemented engagement surveys, career development programs, recognition systems, and improved communication channels.",
    results: [
      "Reduced turnover from 68% to 32%",
      "Employee satisfaction score increased to 8.2/10",
      "Saved $2.4M annually in recruitment costs",
      "Productivity increased by 25%",
    ],
    image:
      "https://img.freepik.com/free-photo/people-office-analyzing-checking-finance-graphs_23-2150377108.jpg",
    tags: ["Employee Engagement", "Retention", "Retail"],
  },
  {
    id: 4,
    title: "Compliance Framework for Healthcare",
    client: "HealthCare Partners Network",
    industry: "Healthcare",
    description:
      "A healthcare network needed to ensure strict compliance with evolving regulations across multiple facilities.",
    challenge:
      "Keeping up with changing healthcare regulations and ensuring all staff maintained required certifications was overwhelming.",
    solution:
      "Created automated compliance tracking, certification renewal alerts, and digital training modules with progress monitoring.",
    results: [
      "100% certification compliance maintained",
      "Zero regulatory violations in 18 months",
      "40% reduction in training administration time",
      "Real-time compliance dashboard for executives",
    ],
    image:
      "https://img.freepik.com/free-photo/medical-team-analyzing-patient-data_23-2149349825.jpg",
    tags: ["Compliance", "Healthcare", "Training"],
  },
  {
    id: 5,
    title: "Performance Management Overhaul",
    client: "FinServe Global",
    industry: "Financial Services",
    description:
      "A financial services firm wanted to replace annual reviews with continuous performance management.",
    challenge:
      "Traditional annual reviews were demotivating, provided little actionable feedback, and didn't align with business goals.",
    solution:
      "Rolled out continuous feedback tools, OKR framework, quarterly check-ins, and 360-degree feedback systems.",
    results: [
      "88% manager participation in regular check-ins",
      "Goal alignment improved by 65%",
      "Employee performance scores up 30%",
      "Promotion readiness visibility increased 4x",
    ],
    image:
      "https://img.freepik.com/free-photo/business-team-meeting-presentation_23-2148898394.jpg",
    tags: ["Performance Management", "OKRs", "Finance"],
  },
  {
    id: 6,
    title: "Diversity & Inclusion Initiative",
    client: "Global Tech Innovations",
    industry: "Technology",
    description:
      "A tech company committed to building a more diverse and inclusive workforce at all levels.",
    challenge:
      "Despite good intentions, diverse hiring remained below industry benchmarks and retention of underrepresented groups was poor.",
    solution:
      "Implemented blind resume screening, diverse interview panels, inclusive job descriptions, and mentorship programs.",
    results: [
      "Diverse hiring increased from 22% to 47%",
      "Leadership diversity improved by 38%",
      "Retention of diverse talent up 55%",
      "Inclusion score reached 8.7/10",
    ],
    image:
      "https://img.freepik.com/free-photo/diverse-team-brainstorming-together_23-2149345678.jpg",
    tags: ["Diversity & Inclusion", "Tech", "Culture"],
  },
];

export const industries = [
  "All Industries",
  "Technology",
  "Manufacturing",
  "Retail",
  "Healthcare",
  "Financial Services",
];
