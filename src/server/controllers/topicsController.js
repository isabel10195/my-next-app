const db = require("mssql");
const { executeQuery } = require("../config/database");

const fetchDynamicTopics = async (req, res) => {
    try {
      const query = `
        SELECT topic_id, name, created_at
        FROM topics
        ORDER BY created_at DESC
      `;
      const result = await executeQuery(query);
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error("Error fetching topics:", error);
      res.status(500).json({ message: "Error al obtener los topics" });
    }
  };

module.exports = { fetchDynamicTopics };
