import Image from 'next/image'
import { ChevronRight, Search, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import BackButton from "@/components/ui/BackButton"; // Ajusta la ruta según tu estructura de carpetas

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-950 text-gray-900 dark:text-white">
      <BackButton href="/" />

      {/* Global Banner */}
      <div className="bg-gray-100 dark:bg-gray-900 text-sm py-3 px-4 text-center text-gray-900 dark:text-white">
        <p>Elige otro país o región para ver contenido específico de tu ubicación</p>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-[980px] mx-auto text-center">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-400 mb-4">Sobre Nosotros</h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
            La innovación está en
            <br />
            nuestro ADN.
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Creemos en desafiar el statu quo y pensar de manera diferente.
            Nuestra misión es brindar la mejor experiencia de usuario a través de hardware, 
            software y servicios innovadores.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-[980px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Nuestra Historia</h3>
              <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400 leading-relaxed">
                Fundada en un garaje en 1976, nuestra compañía ha crecido hasta convertirse en una de 
                las empresas de tecnología más valiosas del mundo. Estamos comprometidos a 
                ofrecer la mejor experiencia de usuario a nuestros clientes a través de hardware, 
                software y servicios innovadores.
              </p>
              <Link 
                href="/pages/login" 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                Inicia sesion y empieza tu aventura
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Nuestros Valores</h3>
              <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400 leading-relaxed">
                Creemos que la tecnología debe ser accesible para todos y que 
                los mejores productos provienen de la intersección entre la tecnología y las artes liberales.
                Nuestro compromiso con la responsabilidad ambiental nos impulsa a 
                innovar de manera sostenible.
              </p>
              <Link 
                href="/pages/feed" 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                Descubre nuestras comunidades
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-[#f5f5f7] dark:bg-gray-900">
        <div className="max-w-[980px] mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h4 className="text-4xl font-semibold text-gray-900 dark:text-white">100K+</h4>
              <p className="text-gray-500 dark:text-gray-400">Empleados en todo el mundo</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-4xl font-semibold text-gray-900 dark:text-white">50+</h4>
              <p className="text-gray-500 dark:text-gray-400">Países</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-4xl font-semibold text-gray-900 dark:text-white">1B+</h4>
              <p className="text-gray-500 dark:text-gray-400">Dispositivos activos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
        <div className="max-w-[980px] mx-auto text-sm text-gray-500 dark:text-gray-400">
          <p>Copyright © 2024 Lure, Inc. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
