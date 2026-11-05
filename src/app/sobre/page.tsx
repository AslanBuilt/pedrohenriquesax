import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { Chrome } from "@/components/Chrome";
import { About } from "@/components/home/About";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Sobre",
  alternates: { canonical: "/sobre" },
  description: "Trajetória e formação de Pedro Lucena. Souza Lima & Berklee, Orquestra Jovem Tom Jobim, Berklee Global Jazz Institute.",
};

export default async function Sobre() {
  const settings = await getSettings();
  return (
    <Chrome>
      <About settings={settings} />
    </Chrome>
  );
}
