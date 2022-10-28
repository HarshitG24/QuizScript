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

    console.log("userResult", userResults);
    if (userResults.length > 0) {
      userResults[0].result = [...userResults[0].result, ...data.result];

      await mulPlayerResult.findOneAndUpdate(
        { category: data.category },
        {
          $set: {
            result: userResults[0].result,
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

async function sendScore(data) {
  await client.connect();
  try {
    const user_score = await singleRecord
      .find({ username: data.username })
      .toArray();
    console.log(user_score[0]);
    if (user_score.length > 0) {
      user_score[0].results = [...user_score[0].results, data.results];

      await singleRecord.findOneAndUpdate(
        { username: data.username },
        {
          $set: {
            results: user_score[0].results,
          },
        }
      );
    } else {
      await singleRecord.insertOne({
        username: data.username,
        results: data.results,
      });
    }
    return 200;
  } catch (error) {
    console.log(error);
    return 400;
  } finally {
    client.close();
  }
}

async function fetchSingleScore(user) {
  await client.connect();
  try {
    const user_score = await singleRecord
      .find({ username: user })
      .sort({ date: -1 })
      .toArray();
    const data = user_score[0].results;
    return data[data.length - 1];
  } catch (error) {
    console.log(error);
    return 400;
  } finally {
    client.close();
  }
}

/* data format
{
  user: user_id,
  score: [{
    cat:cat_name,
    score:score,
    data:date
  }]
}
*/

async function getQuizResult(username) {
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

async function deleteUser(username) {
  await client.connect();
  try {
    await users.deleteMany({ email: username });
    // await singleRecord.deleteMany({ username: username });
    await mulPlayerResult.deleteMany({ username: username });
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
  createQuestions,
  fetchCategories,
  fetchQuestions,
  sendMulQuizResult,
  sendScore,
  fetchSingleScore,
  getQuizResult,
  deleteUser,
};
