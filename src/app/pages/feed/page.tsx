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
      <section className="flex flex-grow justify-center px-4 mt-4 ">
        <div className="w-full max-w-[100%]">
          <FeedPrincipal />
        </div>
      </section>

      {/* Panel derecho */}
      <div className="hidden lg:block lg:w-[350px] flex-shrink-0 mt-4">
        <PanelDerecho />
      </div>

      {/* Panel derecho debajo del feed pantallas medianas y pequeñas */}
      <div className=" lg:hidden w-full mt-4 overflow-y-auto pb-24">
        <PanelDerecho />
      </div>
    </div>
  );
}