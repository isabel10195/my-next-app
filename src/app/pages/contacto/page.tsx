'use client'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MessageSquare } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-white flex items-center justify-center py-12">
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Contacta con LURE</h1>
            <p className="text-lg text-gray-400">
              Estamos aquí para ayudarte. Elige cómo quieres contactar con nosotros.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-[#1a1d24] border-0 p-6 hover:bg-[#252a35] transition-colors">
              <div className="space-y-4">
                <Phone className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold">Soporte telefónico</h3>
                <p className="text-gray-400">Habla con nuestro equipo de soporte en directo</p>
                <Button variant="outline" className="w-full">
                  Llamar ahora
                </Button>
              </div>
            </Card>

            <Card className="bg-[#1a1d24] border-0 p-6 hover:bg-[#252a35] transition-colors">
              <div className="space-y-4">
                <Mail className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold">Envíanos un email</h3>
                <p className="text-gray-400">Obtén ayuda por correo electrónico</p>
                <Button variant="outline" className="w-full">
                  Enviar email
                </Button>
              </div>
            </Card>

            <Card className="bg-[#1a1d24] border-0 p-6 hover:bg-[#252a35] transition-colors">
              <div className="space-y-4">
                <MessageSquare className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold">Chat en directo</h3>
                <p className="text-gray-400">Chatea con nuestro equipo de soporte</p>
                <Button variant="outline" className="w-full">
                  Iniciar chat
                </Button>
              </div>
            </Card>
          </div>

          <Card className="bg-[#1a1d24] border-0 p-8 mt-12">
            <form className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Formulario de contacto</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Tu nombre" className="bg-[#252a35] border-0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" className="bg-[#252a35] border-0" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input id="subject" placeholder="¿Sobre qué quieres hablar?" className="bg-[#252a35] border-0" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="Escribe tu mensaje aquí..."
                  className="bg-[#252a35] border-0 min-h-[150px]"
                />
              </div>

              <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">Enviar mensaje</Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

