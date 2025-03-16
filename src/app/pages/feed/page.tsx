import NavIzq from "@/components/feed_c/NavIzq";
import FeedPrincipal from "@/components/feed_c/FeedPrincipal";
import PanelDerecho from "@/components/feed_c/PanelDerecho";

export default function FeedPage() {
  return (
    <div className="mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8 w-full">
      {/* Sidebar izquierdo: Visible en pantallas grandes */}
      <div className="lg:block lg:w-[250px] flex-shrink-0 mt-4 z-10">
        <NavIzq />
      </div>

      {/* Contenedor principal del feed */}
      <section className="flex-1 space-y-4 w-full mt-4">
        <FeedPrincipal />
      </section>

      {/* Panel derecho */}
      <div className="hidden lg:block lg:w-[350px] flex-shrink-0 mt-4">
        <PanelDerecho />
      </div>

      {/* Panel derecho debajo del feed pantallas medianas y pequeñas */}
      <div className=" lg:hidden w-full mt-4">
        <PanelDerecho />
      </div>
    </div>
  );
}