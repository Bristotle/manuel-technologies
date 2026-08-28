import type { Metadata } from "next";
import { PillarHub, pillarMetadata } from "@/components/PillarHub";
import { ScaleIntro } from "@/components/ScaleIntro";
import { Integrations } from "@/components/Integrations";

export const metadata: Metadata = pillarMetadata("scale");

export default function Page() {
  return (
    <PillarHub
      slug="scale"
      afterHero={
        <>
          <ScaleIntro />
          <Integrations variant="surface" />
        </>
      }
    />
  );
}
