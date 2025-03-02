"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Tag, message } from "antd"
import CardUsuario from "@/components/perfil_c/card_usuario"
import CardLogros from "@/components/perfil_c/card_logros"
import CardIntereses from "@/components/perfil_c/card_intereses"
import CardEstadisticas from "@/components/perfil_c/card_estadisticas"
import CardHabilidades from "@/components/perfil_c/card_habilidades"
import CardTweets from "@/components/perfil_c/card_tweets"
import UserTabs from "@/components/perfil_c/tabs_perfil"
import Menu from "@/components/perfil_c/perfil_nav"
import toast, { Toaster } from "react-hot-toast"

//import 'antd/dist/antd.css';
//import 'antd/es/style/reset.css';
//import './profile.css'; // Importa el archivo CSS

//const { Meta } = Card;

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    avatar: "",
    name: "",
    bio: "",
    location: "",
    birthday: "",
    email: "",
    followers: 0,
    following: 0,
    user_handle: "",
  })

  const [seguidores, setSeguidores] = useState([])
  const [seguidos, setSeguidos] = useState([])
  const [recomendaciones, setRecomendaciones] = useState([])
  const [tweets, setTweets] = useState([]) // Estado para los tweets del usuario
  const [editingTweetId, setEditingTweetId] = useState(null) // Tweet en edición
  const [editedTweetText, setEditedTweetText] = useState("") // Texto editado del tweet
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchProfileData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/users/data", {
        method: "GET",
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setProfileData({
          avatar: data.avatarUrl || "https://via.placeholder.com/150",
          name: `${data.first_name} ${data.last_name}`,
          bio: data.bio || "No hay biografía disponible",
          location: data.location || "Ubicación no disponible",
          birthday: data.date_of_birth || "Fecha de nacimiento no disponible",
          email: data.email_address || "Correo no disponible",
          followers: data.followers || 0,
          following: data.following || 0,
          user_handle: data.user_handle || "usuario",
        })
      } else {
        console.error("Error al obtener los datos del perfil")
      }
    } catch (error) {
      console.error("Error al obtener los datos del perfil:", error)
    }
  }, [])

  useEffect(() => {
    fetchProfileData()
  }, [fetchProfileData])

  const followUser = useCallback(async (follow_user_id) => {
    try {
      const response = await fetch("http://localhost:3001/api/followers/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ follow_user_id }),
      })

      const data = await response.json()

      if (response.ok) {
        message.success(`Has seguido a ${data.user.user_handle}`)
        setSeguidores((prevSeguidores) => [...prevSeguidores, data.user])
        setSeguidos(data.followedUsers)
        setRecomendaciones((prevRecomendaciones) =>
          prevRecomendaciones.filter((user) => user.user_id !== follow_user_id),
        )
      } else {
        message.error("Error al seguir al usuario")
      }
    } catch (error) {
      console.error("Error al seguir al usuario:", error)
      message.error("Error al seguir al usuario")
    }
  }, [])

  const unfollowUser = useCallback(async (follow_user_id) => {
    try {
      const response = await fetch("http://localhost:3001/api/followers/unfollow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ follow_user_id }),
      })

      const data = await response.json()

      if (response.ok) {
        message.success(`Has dejado de seguir a ${data.user.user_handle}`)
        setSeguidos((prevSeguidos) => prevSeguidos.filter((user) => user.user_id !== follow_user_id))
        setSeguidores((prevSeguidores) => prevSeguidores.filter((user) => user.user_id !== follow_user_id))
        setRecomendaciones((prevRecomendaciones) => [...prevRecomendaciones, data.user])
      } else {
        message.error("Error al dejar de seguir al usuario")
      }
    } catch (error) {
      console.error("Error al dejar de seguir al usuario:", error)
      message.error("Error al dejar de seguir al usuario")
    }
  }, [])

  // Cargar recomendaciones
  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/followers/recommendations", {
          method: "GET",
          credentials: "include",
        })
        if (response.ok) {
          const data = await response.json()
          if (data.recommendations && Array.isArray(data.recommendations)) {
            setRecomendaciones(data.recommendations)
          } else {
            console.error('La propiedad "recommendations" no es un array o está vacía', data)
          }
        } else {
          console.error("Error al obtener recomendaciones")
        }
      } catch (error) {
        console.error("Error al obtener recomendaciones:", error)
      }
    }

    fetchRecomendaciones()
  }, [])

  // Cargar seguidores y seguidos
  useEffect(() => {
    // Obtener seguidores
    const fetchSeguidores = async () => {
      const response = await fetch("http://localhost:3001/api/followers/followers", {
        method: "GET",
        credentials: "include", // Asegura que las cookies se incluyan
      })
      if (response.ok) {
        const data = await response.json()
        setSeguidores(data.seguidores)
      } else {
        console.error("Error al obtener seguidores")
      }
    }

    // Obtener seguidos
    const fetchSeguidos = async () => {
      const response = await fetch("http://localhost:3001/api/followers/following", {
        method: "GET",
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setSeguidos(data.seguidos)
      } else {
        console.error("Error al obtener seguidos")
      }
    }

    fetchSeguidores()
    fetchSeguidos()
  }, [])

  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Realiza la petición al backend para cerrar sesión
      const response = await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include", // Incluye cookies
      })

      if (response.ok) {
        localStorage.removeItem("token") // Elimina el token local
        router.push("/") // Redirige al login
      } else {
        console.error("Error al cerrar sesión", await response.text())
      }
    } catch (error) {
      console.error("Error al cerrar sesión", error)
    }
  }

  const fetchTweets = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/tweets", {
        method: "GET",
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setTweets(data.tweets)
      } else {
        console.error("Error al obtener los tweets", await response.text())
      }
    } catch (error) {
      console.error("Error en la solicitud", error)
    }
  }, [])

  useEffect(() => {
    fetchTweets()
  }, [fetchTweets])

  const handleEditTweet = (tweet_id, currentText) => {
    setEditingTweetId(tweet_id) // Activar el modo edición para este tweet
    setEditedTweetText(currentText) // Prellenar el texto actual
  }

  const [isSaving, setIsSaving] = useState(false)

  const handleSaveTweet = async (tweet_id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tweets/edit/${tweet_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ tweet_text: editedTweetText }),
      })

      if (response.ok) {
        toast.success("Tweet actualizado correctamente")
        setEditingTweetId(null) // Salir del modo de edición
        setEditedTweetText("") // Limpiar el texto editado
        await fetchTweets() // Recargar los tweets después de la edición
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Error al actualizar el tweet")
      }
    } catch (error) {
      console.error("Error al actualizar el tweet:", error)
      toast.error("Error al actualizar el tweet")
    }
  }

  const handleCancelEdit = () => {
    setEditingTweetId(null) // Salir del modo edición sin guardar
    setEditedTweetText("")
  }

  const handleDeleteTweet = async (tweet_id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tweets/delete/${tweet_id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        toast.success("Tweet eliminado correctamente")
        setTweets((prevTweets) => prevTweets.filter((tweet) => tweet.tweet_id !== tweet_id))
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Error al eliminar el tweet")
      }
    } catch (error) {
      console.error("Error al eliminar el tweet:", error)
      toast.error("Error al eliminar el tweet")
    }
  }

  const formatDateForSpain = (dateString) => {
    if (!dateString) return "Fecha de nacimiento no disponible"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  const [userDetails, setUserDetails] = useState({
    achievements: [],
    interests: [],
    skills: [],
  })

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/users/details", {
        method: "GET",
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setUserDetails({
          achievements: data.achievement || [],
          interests: data.interest || [],
          skills: data.skill || [],
        })
      } else {
        console.error("Error al obtener los detalles del usuario")
      }
    } catch (error) {
      console.error("Error al obtener los detalles del usuario:", error)
    }
  }, [])

  useEffect(() => {
    fetchUserDetails()
  }, [fetchUserDetails])

  const colors = ["blue", "green", "purple", "gold", "red", "orange", "lime", "gray"]

  const renderTagsWithColors = (interests) =>
    interests.map((interest, index) => {
      const color = colors[index % colors.length] // Asigna colores cíclicamente
      return (
        <Tag key={index} color={color}>
          {interest}
        </Tag>
      )
    })

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-gray-200 dark:bg-gray-950 min-h-screen overflow-x-hidden"
      >
        <Toaster />

        <div className="mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 w-full">

            {/* Menu*/}
            <div className="w-full lg:w-auto lg:flex-shrink-0 space-y-4 z-10 -ml-8 -mt-4">
              <Menu />
            </div>

            <div className="flex-1 space-y-4 w-full relative">

              <div className="flex flex-col lg:flex-row gap-8 w-full">

              {/* DISPOSICION PANTALLAS PEQUEÑAS*/}

                {/* Info usuario */}
                <div className="lg:hidden w-full">
                  <CardUsuario profileData={profileData} />

                  {/* Expander para más info */}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex py-1 px-2 bg-white dark:bg-gray-800 rounded-md shadow-sm"
                    >
                    <span className="mr-2 text-xs text-gray-700 dark:text-gray-300">{isExpanded ? 'Ocultar detalles' : 'Mostrar detalles'}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform text-black dark:text-white ${isExpanded ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-2"
                  >
                    <CardLogros achievements={userDetails.achievements} />
                    <CardIntereses interests={userDetails.interests} renderTagsWithColors={renderTagsWithColors} />
                    <CardHabilidades skills={userDetails.skills} />
                    <CardEstadisticas stats={{ posts: 35, comments: 120, interactions: 500 }} />
                  </motion.div>
                </div>
                

                {/* Tweets */}
                <div className="lg:hidden w-full">
                  <CardTweets
                    tweets={tweets}
                    handleDeleteTweet={handleDeleteTweet}
                    handleEditTweet={handleEditTweet}
                    handleSaveTweet={handleSaveTweet}
                  />
                </div>

                {/* Tabs */}
                <div className="lg:hidden w-full ">
                  <UserTabs
                    seguidores={seguidores}
                    seguidos={seguidos}
                    recomendaciones={recomendaciones}
                    followUser={followUser}
                    unfollowUser={unfollowUser}
                  />
                </div>

                {/* DISPOSICION PANTALLAS GRANDES*/}

                {/* Info Usuario */}
                <div className="hidden lg:block xl:block relative w-full xl:w-[300px] xl:ml-60 mt-2 space-y-4">
                  <CardUsuario profileData={profileData} />
                  <CardLogros achievements={userDetails.achievements} />
                  <CardIntereses interests={userDetails.interests} renderTagsWithColors={renderTagsWithColors} />
                  <CardHabilidades skills={userDetails.skills} />
                  <CardEstadisticas stats={{ posts: 35, comments: 120, interactions: 500 }} />
                </div>

                {/* Tweets*/}
                <div className="hidden lg:block xl:block relative w-full xl:w-[800px] mt-2 space-y-4">
                  <CardTweets
                    tweets={tweets}
                    handleDeleteTweet={handleDeleteTweet}
                    handleEditTweet={handleEditTweet}
                    handleSaveTweet={handleSaveTweet}
                  />
                </div>

                {/* Tabs */}
                <div className="hidden lg:block xl:block relative w-full xl:w-[400px] mt-2 space-y-4">
                  <UserTabs
                    seguidores={seguidores}
                    seguidos={seguidos}
                    recomendaciones={recomendaciones}
                    followUser={followUser}
                    unfollowUser={unfollowUser}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }    