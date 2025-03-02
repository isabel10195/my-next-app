'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Button } from "@/components/ui/button"
import { Clock, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import CombinedNavbar from "@/components/navbar/combinednavbar"

interface NewsPost {
  id: number
  title: string
  excerpt: string
  author: {
    name: string
    avatar: string
  }
  date: string
  readTime: string
  views: number
  image?: string
  tags?: string[] // Nueva propiedad opcional
}

const newsPosts: NewsPost[] = [
  {
    id: 1,
    title: "Actualización importante: Nuevas características añadidas",
    excerpt:
      "Hemos implementado nuevas funcionalidades que mejorarán significativamente la experiencia del usuario en nuestra plataforma.",
    author: {
      name: "Miguel Torres",
      avatar: "/placeholder.svg",
    },
    date: "Enero 28, 2024",
    readTime: "7 min read",
    views: 38,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nL65ZOk3gfkkn7Z5M8xwA7rDfbZZRk.png",
  },
  {
    id: 2,
    title: "Mejoras en el rendimiento del sistema",
    excerpt: "Optimizaciones realizadas para aumentar la velocidad y eficiencia de la plataforma.",
    author: {
      name: "Ana García",
      avatar: "/placeholder.svg",
    },
    date: "Enero 27, 2024",
    readTime: "5 min read",
    views: 42,
  },
  {
    id: 3,
    title: "Diseño UI/UX completado en Figma",
    excerpt:
      "Hemos finalizado el diseño completo de la interfaz de usuario en Figma, incluyendo un sistema de diseño coherente, componentes reutilizables y flujos de usuario detallados.",
    author: {
      name: "Laura Diseño",
      avatar: "/placeholder.svg",
    },
    date: "Enero 25, 2024",
    readTime: "4 min read",
    views: 156,
    image: "/placeholder.svg?height=400&width=600",
    tags: ["UI/UX", "Figma", "Design System"],
  },
  {
    id: 4,
    title: "Implementación de SQL Server como Base de Datos",
    excerpt:
      "Se ha completado la configuración e implementación de SQL Server como nuestra base de datos principal. Incluye esquemas optimizados, procedimientos almacenados y medidas de seguridad.",
    author: {
      name: "Carlos DB",
      avatar: "/placeholder.svg",
    },
    date: "Enero 23, 2024",
    readTime: "6 min read",
    views: 89,
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Database", "SQL Server", "Backend"],
  },
  {
    id: 5,
    title: "Despliegue exitoso en v0",
    excerpt:
      "Hemos completado el despliegue inicial en v0, aprovechando sus capacidades de IA y optimización de rendimiento. La plataforma ahora está disponible con tiempo de respuesta mejorado.",
    author: {
      name: "Elena DevOps",
      avatar: "/placeholder.svg",
    },
    date: "Enero 20, 2024",
    readTime: "5 min read",
    views: 203,
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Deployment", "v0", "Performance"],
  },
]

export default function noticiasDesarrollo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <CombinedNavbar />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Noticias y Actualizaciones</h1>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid gap-6">
            {newsPosts.map((post) => (
              <Card key={post.id} className="bg-gray-900/50 border-gray-800 text-white">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">{post.author.name}</span>
                    <span className="text-sm text-gray-400">{post.date}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {post.image && (
                    <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                    <p className="text-gray-400">{post.excerpt}</p>
                    {post.tags && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}

