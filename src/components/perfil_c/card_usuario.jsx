import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Mail, Users } from "lucide-react"
import { Separator } from "@/components/ui/separator"


function CardUsuario({ profileData }) {
  return (
    <Card className="mb-8 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none overflow-hidden shadow-xl ">
      {/* Imagen de portada y Avatar */}
      <div className="relative">
        <img src="https://via.placeholder.com/500x200" alt="Cover" className="w-full h-28 object-cover" />
        <img
          src={profileData.avatar || "/placeholder.svg"}
          alt="Avatar"
          className="w-36 h-36 rounded-full border-2 border-gray-300 shadow-xl dark:border-gray-300 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
        />
      </div>

      {/* Información del usuario */}
      <CardContent className="mt-20 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">{profileData.name}</h2>
        <p className="text-gray-700 dark:text-gray-400">{profileData.user_handle}</p>
        <p className="mt-2 text-gray-700 dark:text-gray-300 p-2">{profileData.bio}</p>

        <Separator className="bg-gray-300 dark:bg-gray-800" />

        {/* Lista de detalles */}
        <div className="mt-6 space-y-3 text-left">
          <div className="flex items-center gap-">
            <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300 ml-3">{profileData.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">{profileData.birthday}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <a href={`mailto:${profileData.email}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-300 hover:underline">{profileData.email}</a>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              {profileData.followers} seguidores · {profileData.following} seguidos
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardUsuario

