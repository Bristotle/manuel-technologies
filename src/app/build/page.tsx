import type { Metadata } from "next";
import { PillarHub, pillarMetadata } from "@/components/PillarHub";

export const metadata: Metadata = pillarMetadata("build");

export default function Page() {
  return <PillarHub slug="build" />;
}
