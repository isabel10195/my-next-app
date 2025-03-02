import NavIzq from "@/components/feed_c/NavIzq";
import FeedPrincipal from "@/components/feed_c/FeedPrincipal";
import PanelDerecho from "@/components/feed_c/PanelDerecho";

export default function FeedPage() {
  return (
    <main className="flex min-h-screen bg-gray-200 dark:bg-gray-950 transition-colors duration-300">
      {/* Sidebar izquierdo */}
      <aside className="hidden md:flex md:w-[250px] flex-shrink-0">
        <NavIzq />
      </aside>

      {/* Contenedor principal del feed */}
      <section className="flex flex-grow justify-center px-4">
        <div className="w-full max-w-[700px]">
          <FeedPrincipal />
        </div>
      </section>

      {/* Panel derecho */}
      <aside className="hidden lg:flex w-[350px] flex-shrink-0">
        <PanelDerecho />
      </aside>
    </main>
  );
}