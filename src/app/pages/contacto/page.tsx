'use client'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MessageSquare } from "lucide-react"
import Link from "next/link"
import BackButton from "@/components/ui/BackButton"; // Ajusta la ruta según tu estructura de carpetas


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-950 text-white flex items-center justify-center py-12 w-full">
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <BackButton href="/" />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Contacta con LURE</h1>
            <p className="text-lg text-gray-700 dark:text-gray-400">
              Estamos aquí para ayudarte. Elige cómo quieres contactar con nosotros.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="border-0 p-6 bg-white hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors">
          <div className="space-y-4">
                <Phone className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold">Soporte telefónico</h3>
                <p className="text-gray-700 dark:text-gray-400">Habla con nuestro equipo de soporte en directo</p>
                <Button variant="outline" className="w-full text-gray-500 dark:text-gray-300 dark:hover:text-blue-700">
                  Llamar ahora
                </Button>
              </div>
            </Card>

            <Card className="border-0 p-6 bg-white hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors">
              <div className="space-y-4">
                <Mail className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold">Envíanos un email</h3>
                <p className="text-gray-700 dark:text-gray-400">Obtén ayuda por correo electrónico</p>
                <Button variant="outline" className="w-full text-gray-500 dark:text-gray-300 dark:hover:text-blue-700">
                  Enviar email
                </Button>
              </div>
            </Card>

            <Card className="border-0 p-6 bg-white hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors">
              <div className="space-y-4">
                <MessageSquare className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold">Chat en directo</h3>
                <p className="text-gray-700 dark:text-gray-400">Chatea con nuestro equipo de soporte</p>
                <Button variant="outline" className="w-full text-gray-500 dark:text-gray-300 dark:hover:text-blue-700">
                  Iniciar chat
                </Button>
              </div>
            </Card>
          </div>

          <Card className="bg-white dark:bg-gray-900 border-0 p-8 mt-12">
            <form className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Formulario de contacto</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Tu nombre" className="border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" className="border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input id="subject" placeholder="¿Sobre qué quieres hablar?" className="border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="Escribe tu mensaje aquí..."
                  className="border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white min-h-[150px]"
                />
              </div>

              <Button className="w-250 md:w-auto bg-blue-600 hover:bg-blue-700">Enviar mensaje</Button>
              
              <Link href="/" style={{ marginLeft: "5px" }}>
                <Button className="w-250 md:w-auto bg-blue-600 hover:bg-blue-700">
                    Volver a inicio
                </Button>
            </Link>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

