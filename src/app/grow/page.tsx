import type { Metadata } from "next";
import { PillarHub, pillarMetadata } from "@/components/PillarHub";

export const metadata: Metadata = pillarMetadata("grow");

export default function Page() {
  return <PillarHub slug="grow" />;
}
