const { MongoClient } = require("mongodb");
const url =
  `mongodb+srv://quizscript:webdev@quizapp.uzmfysu.mongodb.net/?retryWrites=true&w=majority` ||
  "mongodb://127.0.0.1:27017";
const client = new MongoClient(url, { useUnifiedTopology: true });
const db = client.db("QuizStart");
const users = db.collection("users");
const testing = db.collection("test");
const cat = db.collection("categories");

async function login(userData) {
  await client.connect();
  try {
    const user = await users
      .find({
        email: userData.email,
        password: userData.password,
      })
      .toArray();
    return {
      data: user.length ? user : [],
      code: user.length > 0 ? 200 : 500,
    };
  } catch (error) {
    console.log(error);
    return 400;
  } finally {
    client.close();
  }
}

async function createUser(userData) {
  await client.connect();
  try {
    await users.insertOne(userData);
    return 200;
  } catch (error) {
    console.log(error);
    return 400;
  } finally {
    client.close();
  }
}

async function testData(data) {
  await client.connect();
  try {
    await testing.insertOne(data);
    return 200;
  } catch (error) {
    console.log(error);
    return 400;
  } finally {
    client.close();
  }
}

async function createCategories(data) {
  await client.connect();
  try {
    await cat.insertOne(data);
    return 200;
  } catch (error) {
    console.log(error);
    return 400;
  } finally {
    client.close();
  }
}

module.exports = {
  login,
  createUser,
  createCategories,
};
