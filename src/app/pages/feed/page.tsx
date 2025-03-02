import NavIzq from "@/components/feed_c/NavIzq";
import FeedPrincipal from "@/components/feed_c/FeedPrincipal";
import PanelDerecho from "@/components/feed_c/PanelDerecho";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray-200 dark:bg-gray-950 transition-colors duration-300 flex-col lg:flex-row">
      {/* Sidebar izquierdo */}
      <div className="ml-0 md:w-[250px] flex-shrink-0 ml-6">
        <NavIzq />
      </div>

      {/* Contenedor para el feed */}
      <div className="flex flex-grow flex-col lg:flex-row">
        <div className="flex-grow">
          <FeedPrincipal />
        </div>

        {/* Panel derecho */}
        <div className="w-[350px] flex-shrink-0 mt-4 lg:mt-0 mx-auto">
          <PanelDerecho />
        </div>
      </div>
    </main>
  );
}
