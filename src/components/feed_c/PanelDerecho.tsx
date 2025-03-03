"use client";

import StoriesSection from "./StoriesSection";
import TopicsSection from "./TopicsSection";
import CommunitiesSection from "./CommunitiesSection";

export default function PanelDerecho() {
  return (
    <aside className="w-full md:w-80 mt-4 md:mt-0 p-2 bg-gray-200 dark:bg-gray-950 rounded-2xl overflow-y-auto">
      <StoriesSection />
      <TopicsSection />
      <CommunitiesSection />
    </aside>
  );
}
