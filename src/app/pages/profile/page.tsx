'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, Avatar, List, Button, Tag, Tabs, Row, Col, Menu, Badge, message, Input, Popconfirm } from 'antd';
import { 
  EnvironmentOutlined, 
  CalendarOutlined, 
  TeamOutlined, 
  MailOutlined, 
  EditOutlined, 
  SaveOutlined, 
  DeleteOutlined, 
  CloseOutlined, 
  BellOutlined, 
  MessageOutlined, 
  StopOutlined, 
  UsergroupAddOutlined, 
  SettingOutlined 
} from '@ant-design/icons';
import toast from 'react-hot-toast';
import 'antd/es/style/reset.css';
import './profile.css';

import { fetchUserData, fetchUserDetails } from '@/server/service/userService';
import { fetchRecommendations, fetchFollowers, fetchFollowing, followUser, unfollowUser } from '@/server/service/followerService';
import { fetchTweets, editTweet, deleteTweet } from '@/server/service/tweetService';
import { logout } from '@/server/service/authService';

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
  const [tweets, setTweets] = useState([]);
  const [editingTweetId, setEditingTweetId] = useState(null);
  const [editedTweetText, setEditedTweetText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [userDetails, setUserDetails] = useState({
    achievements: [],
    interests: [],
    skills: [],
  });

  const router = useRouter();

  // Cargar datos básicos del perfil
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await fetchUserData();
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
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
      }
    };
    getProfileData();
  }, []);

  // Cargar detalles del usuario
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const data = await fetchUserDetails();
        setUserDetails({
          achievements: data.achievement || [],
          interests: data.interest || [],
          skills: data.skill || [],
        });
      } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
      }
    };
    getUserDetails();
  }, []);

  // Cargar recomendaciones
  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const data = await fetchRecommendations();
        if (data.recommendations && Array.isArray(data.recommendations)) {
          setRecomendaciones(data.recommendations);
        } else {
          console.error('La propiedad "recommendations" no es un array o está vacía', data);
        }
      } catch (error) {
        console.error('Error al obtener recomendaciones:', error);
      }
    };
    getRecommendations();
  }, []);

  // Cargar seguidores y seguidos
  useEffect(() => {
    const getFollowersAndFollowing = async () => {
      try {
        const followersData = await fetchFollowers();
        setSeguidores(followersData.seguidores);
        const followingData = await fetchFollowing();
        setSeguidos(followingData.seguidos);
      } catch (error) {
        console.error('Error al obtener seguidores y seguidos:', error);
      }
    };
    getFollowersAndFollowing();
  }, []);

  // Cargar tweets
  useEffect(() => {
    const getTweets = async () => {
      try {
        const data = await fetchTweets();
        setTweets(data.tweets);
      } catch (error) {
        console.error('Error al obtener los tweets:', error);
      }
    };
    getTweets();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      router.push('/');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const handleFollowUser = useCallback(async (follow_user_id) => {
    try {
      const data = await followUser(follow_user_id);
      message.success(`Has seguido a ${data.user.user_handle}`);
      setSeguidores(prev => [...prev, data.user]);
      setSeguidos(data.followedUsers);
      setRecomendaciones(prev => prev.filter(user => user.user_id !== follow_user_id));
    } catch (error) {
      message.error(error.message || 'Error al seguir al usuario');
    }
  }, []);

  const handleUnfollowUser = useCallback(async (follow_user_id) => {
    try {
      const data = await unfollowUser(follow_user_id);
      message.success(`Has dejado de seguir a ${data.user.user_handle}`);
      setSeguidos(prev => prev.filter(user => user.user_id !== follow_user_id));
      setSeguidores(prev => prev.filter(user => user.user_id !== follow_user_id));
      setRecomendaciones(prev => [...prev, data.user]);
    } catch (error) {
      message.error(error.message || 'Error al dejar de seguir al usuario');
    }
  }, []);

  const handleEditTweet = (tweet_id, currentText) => {
    setEditingTweetId(tweet_id);
    setEditedTweetText(currentText);
  };

  const handleSaveTweet = async (tweet_id) => {
    try {
      setIsSaving(true);
      await editTweet(tweet_id, editedTweetText);
      toast.success('Tweet actualizado correctamente');
      setEditingTweetId(null);
      setEditedTweetText('');
      const data = await fetchTweets();
      setTweets(data.tweets);
    } catch (error) {
      toast.error(error.message || 'Error al actualizar el tweet');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingTweetId(null);
    setEditedTweetText('');
  };

  const handleDeleteTweet = async (tweet_id) => {
    try {
      await deleteTweet(tweet_id);
      toast.success('Tweet eliminado correctamente');
      setTweets(prevTweets => prevTweets.filter(tweet => tweet.tweet_id !== tweet_id));
    } catch (error) {
      toast.error(error.message || 'Error al eliminar el tweet');
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

  const colors = ['blue', 'green', 'purple', 'gold', 'red', 'orange', 'lime', 'gray'];
  const renderTagsWithColors = (interests) =>
    interests.map((interest, index) => {
      const color = colors[index % colors.length];
      return (
        <Tag key={index} color={color}>
          {interest}
        </Tag>
      );
    });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="profile-page">
        <div className="content">
          {/* Card 1: Datos del usuario */}
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
            <div className="about-card">
              <Card title="Sobre mí">
                <p>{profileData.bio}</p>
              </Card>
            </div>
          </div>

          {/* Cards adicionales */}
          <div className="other-cards">
            {/* Card de Tweets */}
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
                              disabled={editingTweetId !== null}
                              aria-label="Editar tweet"
                            />
                            <Popconfirm
                              title="¿Estás seguro de que deseas eliminar este tweet?"
                              onConfirm={() => handleDeleteTweet(tweet.tweet_id)}
                              okText="Sí"
                              cancelText="No"
                            >
                              <Button type="text" icon={<DeleteOutlined />} aria-label="Eliminar tweet" />
                            </Popconfirm>
                          </>
                        ),
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={tweet.avatar_url || "https://via.placeholder.com/50"} alt="Avatar del usuario" />}
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

            {/* Card de Multimedia y Seguidores/Seguidos */}
            <div className="media-content">
              <div className="media-content-card">
                <Card>
                  <Tabs defaultActiveKey="1" centered>
                    {/* Tab de Seguidores */}
                    <Tabs.TabPane tab="Seguidores" key="1">
                      <List
                        dataSource={seguidores}
                        renderItem={(item) => (
                          <List.Item
                            actions={[
                              seguidos.some(user => user.user_id === item.user_id) ? (
                                <Button type="default" shape="round" onClick={() => handleUnfollowUser(item.user_id)}>
                                  Dejar de seguir
                                </Button>
                              ) : (
                                <Button type="primary" shape="round" onClick={() => handleFollowUser(item.user_id)}>
                                  Seguir
                                </Button>
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
                        renderItem={(item) => (
                          <List.Item
                            actions={[
                              <Button type="default" shape="round" onClick={() => handleUnfollowUser(item.user_id)}>
                                Dejar de seguir
                              </Button>
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
                    {/* Tab de Recomendaciones */}
                    <Tabs.TabPane tab="Recomendaciones" key="3">
                      {recomendaciones.length === 0 ? (
                        <p>No hay recomendaciones disponibles.</p>
                      ) : (
                        <List
                          dataSource={recomendaciones}
                          renderItem={(item) => (
                            <List.Item
                              actions={[
                                <Button type="primary" shape="round" onClick={() => handleFollowUser(item.user_id)}>
                                  Seguir
                                </Button>
                              ]}
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

              {/* Cards de Logros, Intereses, Estadísticas y Habilidades */}
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
                        <div>{renderTagsWithColors(userDetails.interests)}</div>
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
            {/* Menú inferior */}
            <div className="menu-bar">
              <Menu mode="horizontal">
                <Menu.Item key="1"><a href="/">Inicio</a></Menu.Item>
                <Menu.Item key="2">Perfil</Menu.Item>
                <Menu.Item key="3"><a href="/page/settings">Configuración</a></Menu.Item>
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
