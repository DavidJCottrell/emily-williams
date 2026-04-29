import { Suspense } from "react";

import { BuilderLogin } from "@/components/builder/BuilderLogin";

import "@/components/builder/builder.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sign in — Project Builder",
  robots: { index: false, follow: false },
};

export default function BuilderLoginPage() {
  return (
    <Suspense fallback={null}>
      <BuilderLogin />
    </Suspense>
  );
}
