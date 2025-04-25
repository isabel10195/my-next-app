const axios = require("axios");
const { faker } = require("@faker-js/faker");

const BASE_URL = "http://localhost:3000/api/register"; // Cambia si es otro puerto o ruta

const generateUser = (index) => ({
  user_handle: `user${index}`,
  email_address: `user${index}@example.com`,
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  phone_number: `600${String(index).padStart(6, "0")}`,
  password: "test1234", // Será hasheada automáticamente en tu backend
});

const registerManyUsers = async (cantidad = 100) => {
  for (let i = 1; i <= cantidad; i++) {
    const user = generateUser(i);

    try {
      const res = await axios.post(BASE_URL, user);
      console.log(`✅ Registrado: ${user.user_handle}`);
    } catch (err) {
      console.error(`❌ Error con ${user.user_handle}:`, err.response?.data || err.message);
    }
  }

  console.log("🎉 Proceso terminado.");
};

registerManyUsers();
