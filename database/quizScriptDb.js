
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
dotenv.config();




function dbConnector() {
  let dbObj = {};

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

  dbObj.login = async (userData) => {
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
  };

  dbObj.createUser = async (userData) => {
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
  };

  dbObj.testData = async (data) => {
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
  };

  dbObj.createCategories = async (data) => {
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
  };

  dbObj.createQuestions = async (data) => {
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
  };

  dbObj.fetchCategories = async () => {
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
  };

  dbObj.fetchQuestions = async (category) => {
    await client.connect();
    try {
      const qbank = await questions
        .find({
          category: category,
        })
        .toArray();

      let arr = [];
      arr = await qbank[0].question;

      if (arr.length > 0) {
        return { data: arr, code: 200 };
      } else {
        return { data: [], code: 500 };
      }
    } catch (error) {
      console.log(error);
      return 400;
    } finally {
      client.close();
    }
  };

  dbObj.sendMulQuizResult = async (data) => {
    await client.connect();
    try {
      const userResults = await mulPlayerResult
        .find({ username: data.username })
        .toArray();

      console.log("userResult", userResults);
      if (userResults.length > 0) {
        userResults[0].result = [...userResults[0].result, ...data.result];

        await mulPlayerResult.findOneAndUpdate(
          { username: data.username },
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
  };

  dbObj.sendScore = async (data) => {
    await client.connect();
    try {
      const user_score = await singleRecord
        .find({ username: data.username })
        .toArray();
      console.log(user_score[0]);
      if (user_score.length > 0) {
        user_score[0].results = [...user_score[0].results, ...data.results];

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
  };

  dbObj.fetchSingleScore = async (user) => {
    await client.connect();
    try {
      const user_score = await singleRecord.find({ username: user }).toArray();
      const data = user_score[0].results;
      return data;
    } catch (error) {
      console.log(error);
      return 400;
    } finally {
      client.close();
    }
  };

  dbObj.fetchMulScore = async (user) => {
    await client.connect();
    try {
      const user_score = await mulPlayerResult
        .find({ username: user })
        .toArray();
      const data = user_score[0].result;
      return data;
    } catch (error) {
      console.log(error);
      return 400;
    } finally {
      client.close();
    }
  };

  dbObj.getQuizResult = async (username) => {
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
  };

  dbObj.deleteUser = async (username) => {
    await client.connect();
    try {
      await users.deleteMany({ email: username });
      await singleRecord.deleteMany({ username: username });
      await mulPlayerResult.deleteMany({ username: username });
      return 200;
    } catch (error) {
      console.log(error);
      return 400;
    } finally {
      client.close();
    }
  };

  return dbObj;
}

export default dbConnector();
