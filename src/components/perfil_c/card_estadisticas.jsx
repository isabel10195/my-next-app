import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function CardEstadisticas({ stats }) {
  return (
    <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Estadísticas de actividad</CardTitle>
      </CardHeader>
      <Separator className="bg-gray-300 dark:bg-gray-800" />
      <CardContent className="pt-6">
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-gray-700 dark:text-gray-300">Publicaciones: {stats.posts}</li>
          <li className="text-gray-700 dark:text-gray-300">Comentarios: {stats.comments}</li>
          <li className="text-gray-700 dark:text-gray-300">Interacciones: {stats.interactions}</li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default CardEstadisticas

