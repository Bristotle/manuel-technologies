import type { Metadata } from "next";
import { PillarHub, pillarMetadata } from "@/components/PillarHub";
import { BuildIntro } from "@/components/BuildIntro";

export const metadata: Metadata = pillarMetadata("build");

export default function Page() {
  return <PillarHub slug="build" afterHero={<BuildIntro />} />;
}
