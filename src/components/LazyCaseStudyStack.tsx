"use client";

import dynamic from "next/dynamic";

const CaseStudyStack = dynamic(() => import("@/components/CaseStudyStack"), {
  ssr: false,
  loading: () => <div className="min-h-[50vh]" aria-hidden />,
});

export default function LazyCaseStudyStack() {
  return <CaseStudyStack />;
}
