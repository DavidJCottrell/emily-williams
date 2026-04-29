import { Builder } from "@/components/builder/Builder";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Project Builder — Emily Williams",
  robots: { index: false, follow: false },
};

export default function BuilderPage() {
  return <Builder />;
}
