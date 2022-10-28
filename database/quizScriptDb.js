const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const url =
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@quizapp.uzmfysu.mongodb.net/?retryWrites=true&w=majority` ||
  "mongodb://127.0.0.1:27017";
const client = new MongoClient(url, { useUnifiedTopology: true });
const db = client.db("QuizStart");
const users = db.collection("users");
const testing = db.collection("test");
const cat = db.collection("categories");
const questions = db.collection("questions");
const singleRecord = db.collection("SingleQuizRecords");
const mulPlayerResult = db.collection("mulQuizResult");

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

async function createQuestions(data) {
  await client.connect();
  try {
    const qbank = await questions.find({ category: data.category }).toArray();
    if (qbank.length > 0) {
      qbank[0].question = [...qbank[0].question, ...data.question];

      await questions.findOneAndUpdate(
        { category: data.category },
        {
          $set: {
            question: qbank[0].question,
          },
        }
      );
    } else {
      await questions.insertOne(data);
    }
    return 200;
  } catch (error) {
    console.log(error);
    return 400;
  } finally {
    client.close();
  }
}

async function fetchCategories() {
  await client.connect();
  try {
    const data = await cat.find({});
    const final_data = await data.toArray();

    return final_data;
  } catch (error) {
    console.log(error);
    return 400;
  } finally {
    client.close();
  }
}

async function fetchQuestions(category) {
  await client.connect();
  try {
    const qbank = await questions
      .find({
        category: category,
      })
      .toArray();
    let arr = await qbank[0].question;
    return {
      data: arr.length > 0 ? arr : [],
      code: arr.length > 0 ? 200 : 500,
    };
  } catch (error) {
    console.log(error);
    return 400;
  } finally {
    client.close();
  }
}

async function sendMulQuizResult(data) {
  await client.connect();
  try {
    const userResults = await mulPlayerResult
      .find({ username: data.username })
      .toArray();
    if (userResults.length > 0) {
      userResults[0].results = [...userResults[0].results, ...data.results];

      await mulPlayerResult.findOneAndUpdate(
        { category: data.category },
        {
          $set: {
            results: userResults[0].results,
          },
        }
      );
    } else {
      await mulPlayerResult.insertOne(data);
    }
    return 200;
  } catch (error) {
    console.log(error);
    return 400;
  } finally {
  }
}
async function sendScore(user, data) {
  await client.connect();
  try {
    const user_score = await singleRecord.find({ user_id: user }).toArray();
    if (user_score.length > 0) {
      user_score[0].score = [...user_score[0].score, data];

      await user_score.findOneAndUpdate(
        { user_id: user },
        {
          $set: {
            score: user_score[0].score,
          },
        }
      );
    } else {
      await singleRecord.insertOne({ user_id: user, score: data });
    }
    return 200;
  } catch (error) {
    console.log(error);
    return 400;
  } finally {
    client.close();
  }
}

async function getQuizResult(user) {
  try {
    const user = await mulPlayerResult
      .find({
        username,
      })
      .toArray();
    return {
      data: user.length > 0 ? user : [],
      code: user.length > 0 ? 200 : 500,
    };
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
  createQuestions,
  fetchCategories,
  fetchQuestions,
  sendMulQuizResult,
  sendScore,
  getQuizResult,
};
