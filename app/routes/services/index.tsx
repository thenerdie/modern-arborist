import PreservationSection from "./sections/PreservationSection";
import { TreeRemovalSection } from "./sections/TreeRemovalSection";
import CertificationsSection from "./sections/CertificationsSection";
import EmergencyServicesSection from "./sections/EmergencyServicesSection";
import StumpGrindingSection from "./sections/StumpGrindingSection";

export default function Services() {
  return (
    <div className="mx-auto bg-white dark:bg-black">
      <header className="relative flex min-h-screen flex-col items-center text-center px-4 pb-24">
        <div className="flex flex-1 w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-6">
            <h1 className="md:text-6xl text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-300 via-green-200 to-lime-200 bg-clip-text text-transparent">
              Tree care that's tailored to you.
            </h1>
            <p className="p-2 md:text-2xl text-md text-neutral-700 dark:text-neutral-100 max-w-4xl">
              We deliver comprehensive, sustainable tree care combining
              science-driven diagnostics with precision fieldwork.
            </p>
            <p className="text-neutral-600 dark:text-neutral-300">
              This is what we do, and we're proud of it.
            </p>
          </div>
        </div>

        <p className="animate-bounce absolute bottom-4 left-1/2 -translate-x-1/2 text-neutral-400">
          Scroll to learn more...
        </p>
      </header>

      <PreservationSection />
      <CertificationsSection />
      <TreeRemovalSection />
      <EmergencyServicesSection />
      <StumpGrindingSection />
    </div>
  );
}
