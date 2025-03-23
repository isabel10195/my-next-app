'use client'
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MessageSquare } from "lucide-react"
import Link from "next/link"
import BackButton from "@/components/ui/BackButton" 

export default function ContactPage() {
  // Estados para los campos del formulario
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  // Handler para el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()

    // URL de la API externa
    const url = 'https://magicloops.dev/api/loop/042f3fc8-1aba-4750-a69e-a6e119769783/run'

    // Payload con los campos requeridos: usuario, correo, asunto y mensaje
    const payload = {
      usuario: name,
      correo: email,
      asunto: subject,
      mensaje: message
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const responseJson = await response.json()
        console.log("Mensaje enviado con éxito:", responseJson)
        toast.success("Mensaje enviado con éxito!")
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        console.error("Error al enviar el mensaje. Código:", response.status)
        toast.error("Error al enviar el mensaje. Inténtalo de nuevo.")
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error)
      toast.error("Error al enviar el mensaje. Inténtalo de nuevo.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-950 text-white flex items-center justify-center py-12 w-full">
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <BackButton href="/" />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Contacta con LURE
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-400">
              Estamos aquí para ayudarte. Elige cómo quieres contactar con nosotros.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="border-0 p-6 bg-white hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors">
              <div className="space-y-4">
                <Phone className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold">Soporte telefónico</h3>
                <p className="text-gray-700 dark:text-gray-400">
                  Habla con nuestro equipo de soporte en directo
                </p>
                <Button variant="outline" className="w-full text-white dark:text-gray-300 dark:hover:text-blue-700">
                  Llamar ahora
                </Button>
              </div>
            </Card>

            <Card className="border-0 p-6 bg-white hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors">
              <div className="space-y-4">
                <Mail className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold">Envíanos un email</h3>
                <p className="text-gray-700 dark:text-gray-400">
                  Obtén ayuda por correo electrónico
                </p>
                <Button variant="outline" className="w-full text-white dark:text-gray-300 dark:hover:text-blue-700">
                  Enviar email
                </Button>
              </div>
            </Card>

            <Card className="border-0 p-6 bg-white hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white transition-colors">
              <div className="space-y-4">
                <MessageSquare className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold">Chat en directo</h3>
                <p className="text-gray-700 dark:text-gray-400">
                  Chatea con nuestro equipo de soporte
                </p>
                <Button variant="outline" className="w-full text-white dark:text-gray-300 dark:hover:text-blue-700">
                  Iniciar chat
                </Button>
              </div>
            </Card>
          </div>

          <Card className="bg-white dark:bg-gray-900 border-0 p-8 mt-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Formulario de contacto
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Usuario</Label>
                  <Input
                    id="name"
                    placeholder="Nombre del usuario"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  placeholder="¿Sobre qué quieres hablar?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="Escribe tu mensaje aquí..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white min-h-[150px]"
                />
              </div>

              <Button type="submit" className="w-250 md:w-auto bg-blue-600 hover:bg-blue-700">
                Enviar mensaje
              </Button>
              
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
