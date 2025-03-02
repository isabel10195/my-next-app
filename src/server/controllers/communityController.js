const { executeQuery } = require("../config/database");
const db = require("mssql");

const joinCommunity = async (req, res) => {
  const { communityId } = req.body;
  const userId = req.user.id;
  try {
    const query = `
      INSERT INTO community_members (community_id, user_id)
      VALUES (@communityId, @userId)
    `;
    const inputs = [
      { name: "communityId", type: db.Int, value: communityId },
      { name: "userId", type: db.Int, value: userId },
    ];
    await executeQuery(query, inputs);
    res.status(200).json({ message: "Te has unido a la comunidad" });
  } catch (error) {
    console.error("Error al unirse a la comunidad:", error);
    res.status(500).json({ message: "Error al unirse a la comunidad", error: error.message });
  }
};

const getUserCommunities = async (req, res) => {
  const userId = req.user.id;
  try {
    const query = `
      SELECT c.community_id, c.name, c.category, c.description
      FROM communities c
      INNER JOIN community_members cm ON c.community_id = cm.community_id
      WHERE cm.user_id = @userId
    `;
    const inputs = [{ name: "userId", type: db.Int, value: userId }];
    const result = await executeQuery(query, inputs);
    res.status(200).json({ communities: result.recordset });
  } catch (error) {
    console.error("Error al obtener las comunidades del usuario:", error);
    res.status(500).json({ message: "Error al obtener las comunidades", error: error.message });
  }
};

const getExploreCommunities = async (req, res) => {
  const userId = req.user.id;
  const category = req.query.category;
  try {
    let query = `
      SELECT c.community_id, c.name, c.category, c.description
      FROM communities c
      WHERE c.community_id NOT IN (
        SELECT community_id FROM community_members WHERE user_id = @userId
      )
    `;
    const inputs = [{ name: "userId", type: db.Int, value: userId }];
    if (category) {
      query += " AND c.category = @category";
      inputs.push({ name: "category", type: db.NVarChar, value: category });
    }
    const result = await executeQuery(query, inputs);
    res.status(200).json({ communities: result.recordset });
  } catch (error) {
    console.error("Error al obtener las comunidades para explorar:", error);
    res.status(500).json({ message: "Error al obtener las comunidades", error: error.message });
  }
}; 

  const getCategories = async () => {
    try {
      const query = `
        SELECT DISTINCT category
        FROM communities
      `;
      const result = await executeQuery(query);
      return result.recordset.map(row => row.category);
    } catch (error) {
      console.error("Error al obtener las categorías únicas:", error);
      throw error;
    }
  };

module.exports = {
  getUserCommunities,
  getExploreCommunities,
  joinCommunity,
  getCategories
};