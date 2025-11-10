import express from "express"
import ChatAgent from "./ChatAgent.js"
import cors from 'cors'
const chat = new ChatAgent();
const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://2025groqagentedeconsorciosclient.vercel.app", 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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
