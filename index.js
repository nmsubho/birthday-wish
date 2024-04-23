require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 8080;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@friends.vcgmji7.mongodb.net/?retryWrites=true&w=majority&appName=friends`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("friends_assignment");
    const customerCollection = db.collection("customers");

    app.get("/api/customers", async (req, res) => {
      try {
        const cursor = customerCollection.find({}).sort({ _id: -1 });
        const customers = await cursor.toArray();

        res.send({ status: true, data: customers });
      } catch (error) {
        console.log(error);
      }
    });

    app.post("/api/customers", async (req, res) => {
      const { name, email, birthdate } = req.body;
      try {
        const result = await customerCollection.insertOne({
          name,
          email,
          birthdate: new Date(birthdate),
        });
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    app.get("/api/customers/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const result = await customerCollection.findOne({ _id: ObjectId(id) });
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    app.put("/api/customers/:id", async (req, res) => {
      const id = req.params.id;
      const { name, email, birthdate } = req.body;

      try {
        const result = await customerCollection.findOneAndUpdate(
          { _id: ObjectId(id) },
          {
            $set: {
              name,
              email,
              birthdate: new Date(birthdate),
            },
          }
        );
        res.send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.delete("/api/customers/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const result = await customerCollection.deleteOne({ _id: ObjectId(id) });
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Friends Assignment API!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
