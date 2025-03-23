import Link from "next/link"
import BackButton from "@/components/ui/BackButton"; 


export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <BackButton href="/" />
        <h1 className="text-4xl font-bold text-center mb-16">Política de Privacidad de LURE</h1>

        <div className="max-w-5xl mx-auto space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-6">Información general sobre privacidad</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Recopilación de datos</h3>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  En LURE, recopilamos y procesamos información personal para proporcionar nuestros servicios. Accede a
                  los detalles sobre qué datos recopilamos y cómo los utilizamos en nuestra{" "}
                  <Link href="/privacy/data-collection" className="text-blue-500 hover:underline">
                    política de recopilación de datos
                  </Link>
                  .
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Uso de la información</h3>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  Tu información se utiliza para mejorar tu experiencia y nuestros servicios. Consulta cómo gestionamos
                  tus datos en nuestra{" "}
                  <Link href="/privacy/data-usage" className="text-blue-500 hover:underline">
                    política de uso de datos
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Tus derechos y opciones</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Control de tu privacidad</h3>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  Gestiona tus preferencias de privacidad y datos personales a través de tu{" "}
                  <Link href="/settings/privacy" className="text-blue-500 hover:underline">
                    panel de control de privacidad
                  </Link>
                  . Puedes modificar, exportar o eliminar tus datos en cualquier momento.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Configuración de cookies</h3>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  Controla cómo se utilizan las cookies en tu dispositivo. Ajusta tus preferencias en la{" "}
                  <Link href="/settings/cookies" className="text-blue-500 hover:underline">
                    configuración de cookies
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Seguridad y protección de datos</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Medidas de seguridad</h3>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  Implementamos medidas técnicas y organizativas para proteger tu información. Conoce más sobre nuestras{" "}
                  <Link href="/security" className="text-blue-500 hover:underline">
                    prácticas de seguridad
                  </Link>
                  .
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Transferencias de datos</h3>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  Cuando transferimos datos, lo hacemos siguiendo estrictos protocolos de seguridad. Más información
                  sobre{" "}
                  <Link href="/privacy/data-transfers" className="text-blue-500 hover:underline">
                    transferencias internacionales de datos
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Contacto y soporte</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Consultas sobre privacidad</h3>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  Para cualquier pregunta sobre nuestra política de privacidad, contacta con nuestro equipo de
                  privacidad en{" "}
                  <Link href="mailto:privacy@lure.com" className="text-blue-500 hover:underline">
                    privacy@lure.com
                  </Link>
                  .
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Delegado de Protección de Datos</h3>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  Nuestro DPO está disponible para consultas relacionadas con la protección de datos en{" "}
                  <Link href="mailto:dpo@lure.com" className="text-blue-500 hover:underline">
                    dpo@lure.com
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-700 dark:text-gray-400 text-center">Última actualización: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </div>
    </div>
  )
}

