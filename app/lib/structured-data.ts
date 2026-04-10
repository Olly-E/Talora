// Structured Data (JSON-LD) for SEO

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Talora",
  alternateName: "Talora Agency",
  url: "https://talora-psi.vercel.app",
  logo: "https://talora-psi.vercel.app/images/logo.png",
  description:
    "Expert HR consulting and workforce management solutions. Specializing in recruitment, HR automation, and talent management.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-555-123-4567",
    contactType: "Customer Service",
    email: "contact@taloraagency.com",
    areaServed: "US",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://www.linkedin.com/company/talora",
    "https://twitter.com/taloraagency",
    "https://www.facebook.com/taloraagency",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Business Ave, Suite 100",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94105",
    addressCountry: "US",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Talora",
  url: "https://talora-psi.vercel.app",
  description:
    "Transform your HR operations with expert consulting and automation solutions.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://talora-psi.vercel.app/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Talora HR Solutions",
  url: "https://talora-psi.vercel.app",
  description:
    "Expert HR consulting, recruitment services, and workforce management solutions.",
  priceRange: "$$$",
  serviceType: [
    "HR Consulting",
    "Recruitment Services",
    "Talent Acquisition",
    "HR Automation",
    "Workforce Management",
  ],
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const articleSchema = (article: {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  category: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  image: article.coverImage,
  author: {
    "@type": "Organization",
    name: article.author || "Talora",
  },
  publisher: {
    "@type": "Organization",
    name: "Talora",
    logo: {
      "@type": "ImageObject",
      url: "https://talora-psi.vercel.app/images/logo.png",
    },
  },
  datePublished: article.publishedAt,
  dateModified: article.publishedAt,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://talora-psi.vercel.app/insights/${article.slug}`,
  },
});

export const jobPostingSchema = (job: {
  title: string;
  slug: string;
  description: string;
  company: string;
  location: string;
  employmentType: string;
  salary?: string;
  datePosted: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  description: job.description,
  identifier: {
    "@type": "PropertyValue",
    name: "Talora",
    value: job.slug,
  },
  datePosted: job.datePosted,
  hiringOrganization: {
    "@type": "Organization",
    name: "Talora",
    sameAs: "https://talora-psi.vercel.app",
    logo: "https://talora-psi.vercel.app/images/logo.png",
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: job.location,
      addressCountry: "US",
    },
  },
  employmentType: job.employmentType,
  ...(job.salary && {
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        value: job.salary,
        unitText: "YEAR",
      },
    },
  }),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});
