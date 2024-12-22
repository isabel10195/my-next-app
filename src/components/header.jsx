import { Icons } from "./ui/icons"
import FAQsPage from "@/app/faqs/page"
export function Header() {
  return (
    <header className="border-b bg-white dark:bg-gray-950">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Icons.play className="h-5 w-5" />
            <span className="text-gray-900 dark:text-white">5,810</span> {/* Cambié el color de texto */}
          </div>
          <nav className="hidden space-x-6 md:block">
          <a href="/faqs" className="text-sm text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-400">
            FAQs
          </a>

            <a href="/feed" className="text-sm text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-400">
              Feed
            </a>
            <a href="/music" className="text-sm text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-400">
              Musica
            </a>
          </nav>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-serif text-gray-900 dark:text-white">
            THE VIEW ISLAND
          </h1>
        </div>
        <button className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50">
          Subscribe for €2.50
        </button>
      </div>
    </header>
  )
}
