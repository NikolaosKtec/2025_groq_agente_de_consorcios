import Groq from "groq-sdk";
import Pipefy_provider from "./Pipefy_provider.js";
const API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: API_KEY });

class ChatAgent {
       constructor() {
              this.model = "llama-3.1-8b-instant";
              this.messages = [
                     {
                            role: "system", content: `
Você é um agente um consórcio de veículos.
Seu objetivo é direcionar potencial clientes a encontrar o consórcio ideal,
e isso significa que você irá salvar potenciais clientes e fazer agendamento se o cliente tem interesse.
INSTRUÇÕES SOBRE O CONSORCIO:
1-Temos planos de consórcio para veiculos particulares e também veículos direto com montadoras (zero km).
2-Vale mencionar que o plano de consórcio é uma forma de compra colaborativa, onde os participantes contribuem mensalmente
para formar um fundo comum, que é utilizado para contemplar os participantes por meio de sorteios ou lances.
3-Vale mencionar também que temos planos com carta de crédito com comtemplação a partir de 4 meses,
com parcelas amortizadas ao longo de 48 meses.
4-Explique que mais detalhes são respondidas pela equipe especializada, que entrará em contato após o agendamento.
PASSOS DE INTERAÇÃO:
1- Após passar as informações fornecidas acima, colete dados do cliente, a estrutura deve ser: ${this.customerData}. 
exemplo de primeira interação: -"Olá, seja bem-vindo, poderia informar seu Nome e necessidade?"
2- Sempre colete dados úteis, como necessidade, empresa e nome, e caso falte algum campo, peça educadamente.
exemplo: -"OK <Nome>, você poderia fornecer um e-mail para contato? e empresa, ou seria para particular?"
3- Para prosseguir, salve.
exemplo:  -"Ok <Nome>, obrigado pelo interesse! vamos salvar seus dados para contato futuro!"
4- Somente faça agendamento se o cliente confirmar interesse. avise que a equipe entrará em contato, e encerre a conversa cordialmente.
 exemplo:  -"Ok <Nome>, você confirma interesse no consórcio para contato futuro?"
5- Caso o mesmo não tenha interesse em agendar com o time, encerre a conversa cordialmente.
exemplo: -"Entendemos que você não possui interesse no momento! seus dados permanecem salvos para contato! Obrigado!
CHAME FUNÇÕES QUANDO:
- save(): somente depois de TODOS os campos forem fornecidos pelo CLIENTE(<nome>,<email>,<necessidade>,<empresa>,<interesse>)
- scheduleMeet(): quando cliente confirmar seu interesse depois que for salvo.` },

              ];
              this.customerData = {
                     nome: "Joao",
                     email: "joao@mail.com",
                     empresa: "particular",
                     necessidade: "carta de crédito de 40mil",
                     interesse: Boolean()
              };
              this.tools = [{
                     type: "function",
                     function: {
                            name: "save",
                            description: "Salva os dados do que o cliente forneceu",
                            parameters: {
                                   type: "object",
                                   properties: {
                                          nome: { type: "string" },
                                          email: { type: "string" },
                                          empresa: { type: "string" },
                                          necessidade: { type: "string" },
                                          interesse: { type: "string" }
                                   },
                                   required: ["nome", "email", "necessidade", "interesse"]
                            }
                     }
              },
              {
                     type: "function",
                     function: {
                            name: "scheduleMeet",
                            description: "Agenda uma reunião com o cliente",
                            parameters: {
                                   type: "object",
                                   properties: {
                                          email: { type: "string" },
                                   },
                                   required: ["email"]
                            }
                     }
              }
              ];
              this.provider = new Pipefy_provider();
              this.availableFunctions = {
                     save: this.save.bind(this),
                     scheduleMeet: this.scheduleMeet.bind(this),
              };

       }
       // main function that handles user messages
       async processUserInput(userInput) {
              this.messages.push({ role: "user", content: userInput });

              try {
                     // first call model
                     const response = await groq.chat.completions.create({
                            model: this.model,
                            messages: this.messages,
                            tools: this.tools,
                            tool_choice: "auto",
                            max_completion_tokens: 4096,
                            temperature: 0.5
                     });
                     const responseMessage = response.choices[0].message;
                     const toolCalls = responseMessage.tool_calls || [];
                     // history messages
                     this.messages.push(responseMessage);

                      // Check if the model wants to call a function
                     if (toolCalls.length > 0) {
                            for (const toolCall of toolCalls) {
                                   const functionName = toolCall.function.name;
                                   const functionToCall = this.availableFunctions[functionName];
                                   const functionArgs = JSON.parse(toolCall.function.arguments);
                                   let functionResponse;
                                   if (typeof functionToCall === "function") {
                                          functionResponse = await functionToCall(functionArgs);
                                          if (functionResponse) {
                                                 this.messages.push({
                                                        role: "tool",
                                                        content: functionResponse,
                                                        tool_call_id: toolCall.id,
                                                 });
                                          } else {
                                                 console.warn(`Function ${functionName} did not return a value: ${functionResponse}`)
                                          }
                                   } else {
                                          console.warn(`Function "${functionName}" is not defined in availableFunctions.`);
                                   }
                            }
                            // Make the final request with the results of the tool calls.
                            const secondResponse = await groq.chat.completions.create({
                                   model: this.model,
                                   messages: this.messages,
                                   tools: this.tools,
                                   tool_choice: "auto",
                                   temperature: 0.5,
                                   max_completion_tokens: 4096
                            });
                            
                            let text = secondResponse.choices[0].message.content;
                            // Remove as tags de function e o conteúdo entre elas
                            text = text.split(/<function=.*?>[\s\S]*?<\/function>/).join('').trim();
                            return text;
                     }
                     return responseMessage.content;
              } catch (error) {
                     throw error;
              }

       }
       async save(params) {
              return this.saveToPipefy(params);
       }
       scheduleMeet(params) {
              //Logical parts here
              
              return "reunião agendada com sucesso";
       }
       async saveToPipefy(params) {
              return await this.provider.updateCard(params)
       }
} export default ChatAgent;
