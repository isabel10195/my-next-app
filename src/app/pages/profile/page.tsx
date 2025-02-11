'use client'; 

import { useEffect, useState, useCallback } from 'react';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from 'lucide-react';
import { Card, Avatar, List, Button, Tag, Tabs, Row, Col, Menu, Badge, message, Input, Popconfirm } from 'antd';
import { 
  MailOutlined, 
  EnvironmentOutlined, 
  CalendarOutlined, 
  TeamOutlined, 
  LikeOutlined, 
  CommentOutlined, 
  ShareAltOutlined, 
  SaveOutlined, 
  SettingOutlined,
  MessageOutlined,
  BellOutlined,
  StopOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined 
} from '@ant-design/icons';

import toast, { Toaster } from 'react-hot-toast';

//import 'antd/dist/antd.css';
import 'antd/es/style/reset.css';
import './profile.css'; // Importa el archivo CSS

const { Meta } = Card;

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
    user_handle: ""
  });

  const [seguidores, setSeguidores] = useState([]);
  const [seguidos, setSeguidos] = useState([]);
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [tweets, setTweets] = useState([]); // Estado para los tweets del usuario
  const [editingTweetId, setEditingTweetId] = useState(null); // Tweet en edición
  const [editedTweetText, setEditedTweetText] = useState(''); // Texto editado del tweet

  const fetchProfileData = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/users/data', {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            const data = await response.json();
            setProfileData({
                avatar: data.avatarUrl || 'https://via.placeholder.com/150',
                name: `${data.first_name} ${data.last_name}`,
                bio: data.bio || 'No hay biografía disponible',
                location: data.location || 'Ubicación no disponible',
                birthday: data.date_of_birth || 'Fecha de nacimiento no disponible',
                email: data.email_address || 'Correo no disponible',
                followers: data.followers || 0,
                following: data.following || 0,
                user_handle: data.user_handle || 'usuario'
            });
        } else {
            console.error('Error al obtener los datos del perfil');
        }
    } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
    }
};

  useEffect(() => {
    fetchProfileData();
  }, []);

  const followUser = useCallback(async (follow_user_id) => {
    try {
      const response = await fetch('http://localhost:3001/api/followers/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ follow_user_id }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success(`Has seguido a ${data.user.user_handle}`);
        setSeguidores(prevSeguidores => [...prevSeguidores, data.user]);
        setSeguidos(data.followedUsers);
        setRecomendaciones(prevRecomendaciones => 
          prevRecomendaciones.filter(user => user.user_id !== follow_user_id)
        );
      } else {
        message.error('Error al seguir al usuario');
      }
    } catch (error) {
      console.error('Error al seguir al usuario:', error);
      message.error('Error al seguir al usuario');
    }
  }, []);

  const unfollowUser = useCallback(async (follow_user_id) => {
    try {
      const response = await fetch('http://localhost:3001/api/followers/unfollow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ follow_user_id }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success(`Has dejado de seguir a ${data.user.user_handle}`);
        setSeguidos(prevSeguidos => prevSeguidos.filter(user => user.user_id !== follow_user_id));
        setSeguidores(prevSeguidores => prevSeguidores.filter(user => user.user_id !== follow_user_id));
        setRecomendaciones(prevRecomendaciones => [...prevRecomendaciones, data.user]);
      } else {
        message.error('Error al dejar de seguir al usuario');
      }
    } catch (error) {
      console.error('Error al dejar de seguir al usuario:', error);
      message.error('Error al dejar de seguir al usuario');
    }
  }, []);

  useEffect(() => {
    const fetchRecomendaciones = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/followers/recommendations', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          if (data.recommendations && Array.isArray(data.recommendations)) {
            setRecomendaciones(data.recommendations);
          } else {
            console.error('La propiedad "recommendations" no es un array o está vacía', data);
          }
        } else {
          console.error('Error al obtener recomendaciones');
        }
      } catch (error) {
        console.error('Error al obtener recomendaciones:', error);
      }
    };

    fetchRecomendaciones();
  }, []);

  useEffect(() => {
    // Obtener seguidores
    const fetchSeguidores = async () => {
      const response = await fetch('http://localhost:3001/api/followers/followers', {
        method: 'GET',
        credentials: 'include', // Asegura que las cookies se incluyan
      });
      if (response.ok) {
        const data = await response.json();
        setSeguidores(data.seguidores);
      } else {
        console.error('Error al obtener seguidores');
      }
    };

    // Obtener seguidos
    const fetchSeguidos = async () => {
      const response = await fetch('http://localhost:3001/api/followers/following', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setSeguidos(data.seguidos);
      } else {
        console.error('Error al obtener seguidos');
      }
    };

    fetchSeguidores();
    fetchSeguidos();
  }, []);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Realiza la petición al backend para cerrar sesión
      const response = await fetch('http://localhost:3001/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Incluye cookies
      });

      if (response.ok) {
        localStorage.removeItem('token'); // Elimina el token local
        router.push('/'); // Redirige al login
      } else {
        console.error("Error al cerrar sesión", await response.text());
      }
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const fetchTweets = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tweets', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setTweets(data.tweets);
      } else {
        console.error("Error al obtener los tweets", await response.text());
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
    }
  };

  useEffect(() => {

    fetchTweets();
    
  }, [fetchTweets]);

  const handleEditTweet = (tweet_id, currentText) => {
    setEditingTweetId(tweet_id); // Activar el modo edición para este tweet
    setEditedTweetText(currentText); // Prellenar el texto actual
  };
  
const [isSaving, setIsSaving] = useState(false);

const handleSaveTweet = async (tweet_id) => {
  try {
    const response = await fetch(`http://localhost:3001/api/tweets/edit/${tweet_id}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ tweet_text: editedTweetText }),
    });

    if (response.ok) {
      toast.success('Tweet actualizado correctamente');
      setEditingTweetId(null); // Salir del modo de edición
      setEditedTweetText(''); // Limpiar el texto editado
      await fetchTweets(); // Recargar los tweets después de la edición
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || 'Error al actualizar el tweet');
    }
  } catch (error) {
    console.error('Error al actualizar el tweet:', error);
    toast.error('Error al actualizar el tweet');
  }
};

  const handleCancelEdit = () => {
    setEditingTweetId(null); // Salir del modo edición sin guardar
    setEditedTweetText('');
  };

  const handleDeleteTweet = async (tweet_id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tweets/delete/${tweet_id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
  
      if (response.ok) {
        toast.success('Tweet eliminado correctamente');
        setTweets((prevTweets) => prevTweets.filter((tweet) => tweet.tweet_id !== tweet_id));
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al eliminar el tweet');
      }
    } catch (error) {
      console.error('Error al eliminar el tweet:', error);
      toast.error('Error al eliminar el tweet');
    }
  };
  
  const formatDateForSpain = (dateString) => {
    if (!dateString) return 'Fecha de nacimiento no disponible';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };  

  const [userDetails, setUserDetails] = useState({
    achievements: [],
    interests: [],
    skills: [],
  });
  
  const fetchUserDetails = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/details', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUserDetails({
          achievements: data.achievement || [],
          interests: data.interest || [],
          skills: data.skill || [],
        });
      } else {
        console.error('Error al obtener los detalles del usuario');
      }
    } catch (error) {
      console.error('Error al obtener los detalles del usuario:', error);
    }
  };
  
  useEffect(() => {
    fetchUserDetails();
  }, []);  
  
  const colors = ['blue', 'green', 'purple', 'gold', 'red', 'orange', 'lime', 'gray'];

const renderTagsWithColors = (interests) =>
  interests.map((interest, index) => {
    const color = colors[index % colors.length]; // Asigna colores cíclicamente
    return (
      <Tag key={index} color={color}>
        {interest}
      </Tag>
    );
  });


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="profile-page">
        <div className="content">
          {/* Card 1: Imagen y datos del usuario */}
          <div className="profile-card">
          <Card className="profile-cover-card" cover={<img alt="cover" src="https://via.placeholder.com/300x150" />}>
            <Meta
              avatar={<Avatar size={64} src={profileData.avatar} />}
              title={profileData.user_handle}
              description={profileData.name}
            />
              <List itemLayout="horizontal">
                <List.Item>
                  <List.Item.Meta
                    avatar={<EnvironmentOutlined />}
                    title="Ubicación"
                    description={profileData.location}
                  />
                </List.Item>
                <List.Item>
                <List.Item.Meta
                  avatar={<CalendarOutlined />}
                  title="Fecha de nacimiento"
                  description={formatDateForSpain(profileData.birthday)}
                />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<MailOutlined />}
                    title="Correo"
                    description={<a href={`mailto:${profileData.email}`}>{profileData.email}</a>}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<TeamOutlined />}
                    title="Seguidores y seguidos"
                    description={`${profileData.followers} seguidores · ${profileData.following} seguidos`}
                  />
                </List.Item>
              </List>
          </Card>
            {/* Card 2: Descripción del usuario */}
            <div className="about-card">
              <Card title="Sobre mí">
                <p>{profileData.bio}</p>
              </Card>
            </div>
          </div>

          {/* Cards adicionales */}   
          <div className="other-cards">
            {/* Card de Posts */}
            <div className="posts-card">
              <Card title="Tweets">
                <List
                  itemLayout="horizontal"
                  dataSource={tweets}
                  renderItem={(tweet) => (
                    <List.Item
                      key={tweet.tweet_id}
                      actions={[
                        editingTweetId === tweet.tweet_id ? (
                          <>
                            <Button
                              type="text"
                              icon={<SaveOutlined />}
                              onClick={() => handleSaveTweet(tweet.tweet_id)}
                              disabled={isSaving}
                              aria-label="Guardar cambios"
                            />
                            <Button
                              type="text"
                              icon={<CloseOutlined />}
                              onClick={handleCancelEdit}
                              aria-label="Cancelar edición"
                            />
                          </>
                        ) : (
                          <>
                            <Button
                              type="text"
                              icon={<EditOutlined />}
                              onClick={() => handleEditTweet(tweet.tweet_id, tweet.tweet_text)}
                              disabled={editingTweetId !== null} // Deshabilitar mientras se edita otro tweet
                              aria-label="Editar tweet"
                            />
                            <Popconfirm
                              title="¿Estás seguro de que deseas eliminar este tweet?"
                              onConfirm={() => handleDeleteTweet(tweet.tweet_id)}
                              okText="Sí"
                              cancelText="No"
                            >
                              <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                aria-label="Eliminar tweet"
                              />
                            </Popconfirm>
                          </>
                        ),
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={tweet.avatar_url || "https://via.placeholder.com/50"}
                            alt="Avatar del usuario"
                          />
                        }
                        title={<a href="#!">{tweet.user_handle}</a>}
                        description={
                          editingTweetId === tweet.tweet_id ? (
                            <Input
                              value={editedTweetText}
                              onChange={(e) => setEditedTweetText(e.target.value)}
                              maxLength={280}
                            />
                          ) : (
                            tweet.tweet_text
                          )
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </div>

            {/* Cards de Multimedia y Seguidores/Seguidos */}
            <div className="media-content">
              <div className="media-content-card">
                <Card>
                <Tabs defaultActiveKey="1" centered>
                  {/* Tab de Seguidores */}
                  <Tabs.TabPane tab="Seguidores" key="1">
                    <List
                      dataSource={seguidores}
                      renderItem={item => (
                        <List.Item
                          actions={[
                            seguidos.some(user => user.user_id === item.user_id) ? (
                              <Button type="default" shape="round" onClick={() => unfollowUser(item.user_id)}>Dejar de seguir</Button>
                            ) : (
                              <Button type="primary" shape="round" onClick={() => followUser(item.user_id)}>Seguir</Button>
                            )
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<Avatar src={item.avatar_url} />}
                            title={item.user_handle}
                            description={`@${item.user_handle ? item.user_handle.toLowerCase() : 'desconocido'}`}
                          />
                        </List.Item>
                      )}
                    />
                  </Tabs.TabPane>

                  {/* Tab de Seguidos */}
                  <Tabs.TabPane tab="Seguidos" key="2">
                    <List
                      dataSource={seguidos}
                      renderItem={item => (
                        <List.Item
                          actions={[<Button type="default" shape="round" onClick={() => unfollowUser(item.user_id)}>Dejar de seguir</Button>]}
                        >
                          <List.Item.Meta
                            avatar={<Avatar src={item.avatar_url} />}
                            title={item.user_handle}
                            description={`@${item.user_handle ? item.user_handle.toLowerCase() : 'desconocido'}`}
                          />
                        </List.Item>
                      )}
                    />
                  </Tabs.TabPane>

                  {/* Tab de Recomendaciones */}
                  <Tabs.TabPane tab="Recomendaciones" key="3">
                    {recomendaciones.length === 0 ? (
                      <p>No hay recomendaciones disponibles.</p>
                    ) : (
                      <List
                        dataSource={recomendaciones}
                        renderItem={item => (
                          <List.Item
                            actions={[<Button type="primary" shape="round" onClick={() => followUser(item.user_id)}>Seguir</Button>]}
                          >
                            <List.Item.Meta
                              avatar={<Avatar src={item.avatar_url || 'default-avatar-url'} />}
                              title={item.user_handle}
                              description={`@${item.user_handle ? item.user_handle.toLowerCase() : 'desconocido'}`}
                            />
                          </List.Item>
                        )}
                      />
                    )}
                  </Tabs.TabPane>
                </Tabs>
                </Card>
              </div>

              {/* Cards de Logros, Intereses y Estadísticas */}
              <div className="mid-cards">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} lg={12}>
                    <div className="achievements-card">
                      <Card title="Logros">
                        <ul>
                          {userDetails.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  </Col>

                  <Col xs={24} sm={12} lg={12}>
                    <div className="tags-card">
                      <Card title="Intereses">
                        <div>
                          {renderTagsWithColors(userDetails.interests)}
                        </div>
                      </Card>
                    </div>
                  </Col>

                  <Col xs={24} sm={12} lg={12}>
                    <div className="stats-card">
                      <Card title="Estadísticas de Actividad">
                        <ul>
                          <li>Publicaciones: 35</li>
                          <li>Comentarios: 120</li>
                          <li>Interacciones: 500</li>
                        </ul>
                      </Card>
                    </div>
                  </Col>

                  <Col xs={24} sm={12} lg={12}>
                    <div className="skills-card">
                      <Card title="Habilidades">
                        <ul>
                          {userDetails.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="menu-bar">
              <Menu mode="horizontal">
                <Menu.Item key="1"><a href="/">Inicio</a></Menu.Item>
                <Menu.Item key="2">Perfil</Menu.Item>
                <Menu.Item key="3"><a href="/page/settings">Configuracion</a></Menu.Item>
                <Menu.Item key="4">
                  <Badge count={5} dot>
                    <BellOutlined />
                  </Badge>
                </Menu.Item>
                <Menu.Item key="5">
                  <MessageOutlined />
                </Menu.Item>
                <Menu.Item key="6" onClick={handleLogout}>
                  <StopOutlined />
                </Menu.Item>
                <Menu.Item key="7"> 
                  <UsergroupAddOutlined />
                </Menu.Item>
                <Menu.Item key="8">
                  <SettingOutlined />
                </Menu.Item>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}