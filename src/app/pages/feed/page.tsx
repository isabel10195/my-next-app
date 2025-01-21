import NavIzq from "@/components/feed_c/NavIzq";
import FeedPrincipal from "@/components/feed_c/FeedPrincipal";
import PanelDerecho from "@/components/feed_c/PanelDerecho";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray-50">
      <NavIzq />
      <FeedPrincipal />
      <PanelDerecho />
    </main>
  )
}