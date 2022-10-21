const { MongoClient } = require("mongodb");
const url =
  `mongodb+srv://quizscript:webdev@quizapp.uzmfysu.mongodb.net/?retryWrites=true&w=majority` ||
  "mongodb://127.0.0.1:27017";
const client = new MongoClient(url, { useUnifiedTopology: true });
const db = client.db("QuizStart");
const users = db.collection("users");
const testing = db.collection("test");
const cat = db.collection("categories");
const ques = db. collection("questions");
//const cat_test = db.getCollection("categories");

async function login(userData) {
  await client.connect();
  try {
    const user = await users
      .find({
        email: userData.email,
        password: userData.password,
      })
      .toArray();

    console.log("user is", user);
    return user.length > 0 ? 200 : 500;
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

async function testData(data){
  await client.connect();
  try{
    await testing.insertOne(data);
    return 200;
  } catch (error){
    console.log(error)
    return 400
  } finally {
    client.close()
  }
}

async function createCategories(data){
  await client.connect();
  try {
    await cat.insertOne(data);
    return 200
  }
  catch (error){
    console.log(error)
    return 400
  }
  finally {
    client.close()
  }
}

async function fetchCategories(){
  await client.connect();
  try{
    
    const data = await cat.find({})
    const final_data = await data.toArray()
    
    return final_data;
  }
  catch (error) {
    console.log(error)
    return 400
  }
  finally{
    client.close()
  }
  
}

async function fetchQuestions(query) {
  await client.connect();
  try{
    
    const data = await ques.find({category:query})
    const final_data = await data.toArray()
    console.log(final_data);
    return final_data;
  }
  catch (error) {
    console.log(error)
    return 400
  }
  finally{
    client.close()
  }
}

module.exports = {
  login,
  createUser,
  createCategories,
  fetchCategories,

};
