import type { Metadata } from "next";
import { PillarHub, pillarMetadata } from "@/components/PillarHub";
import { ScaleIntro } from "@/components/ScaleIntro";
import { Integrations } from "@/components/Integrations";
import { ManuelPosProof } from "@/components/ManuelPosProof";

export const metadata: Metadata = pillarMetadata("scale");

export default function Page() {
  return (
    <PillarHub
      slug="scale"
      afterHero={
        <>
          <ScaleIntro />
          <ManuelPosProof accent="amber" />
          <Integrations variant="surface" />
        </>
      }
    />
  );
}
