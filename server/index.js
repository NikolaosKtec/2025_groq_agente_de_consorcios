import express, { json } from "express"
import ChatAgent from "./ChatAgent.js"
const chat = new ChatAgent();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
       res.json({message:"server ok"})
})

app.post("/api/talk", async (req, res) => {


       try {
              const { text, sender } = req.body;
              const responce = await chat.processUserInput(text);
              res.json({
                     text: responce,
                     sender: "agent"

              });


       } catch (e) {
              throw e;
       }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
       console.log(`Serve sarted on: ${port}`)
})