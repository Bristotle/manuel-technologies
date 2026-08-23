import type { Metadata } from "next";
import { PillarHub, pillarMetadata } from "@/components/PillarHub";

export const metadata: Metadata = pillarMetadata("scale");

export default function Page() {
  return <PillarHub slug="scale" />;
}
