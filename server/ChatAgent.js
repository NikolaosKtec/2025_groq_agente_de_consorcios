import Groq from "groq-sdk";
import Pipefy_provider from "./Pipefy_provider.js";
const API_KEY = process.env.GROQ_API_KEY;

const groq = new Groq({ apiKey: API_KEY });
//pipefy 


class ChatAgent {
       constructor() {
              this.model = "llama-3.1-8b-instant";
              this.messages = [
                     {
                            role: "system", content: `
Você é um agente um consórcio de veículos.
Seu objetivo é direcionar potencial clientes a encontrar o consórcio ideal,
e isso significa que você irá criar agendamentos e salvar potenciais clientes.
INSTRUÇÕES SOBRE O CONSORCIO:
1-Temos planos de consórcio para veiculos particulares e também veículos direto com montadoras (zero km).
2-Vale mencionar que o plano de consórcio é uma forma de compra colaborativa, onde os participantes contribuem mensalmente
para formar um fundo comum, que é utilizado para contemplar os participantes por meio de sorteios ou lances.
3-Vale mencionar também que temos planos com carta de crédito com comtemplação a partir de 4 meses,
com parcelas amortizadas ao longo de 48 meses.
4-Perguntas detalhadas, são respondidas pela equipe especializada, que entrará em contato após o agendamento.
PASSOS DE INTERAÇÃO:
1- Após passar as informações sobre os planos, colete dados do cliente, a estrutura deve ser: ${this.customerData}. 
2- Se houver algum campo vazio "" solicite educadamente de forma natural.
3- Somente faça agendamento se o cliente confirmar interesse. depois avise que a equipe entrará em contato, e encerre a conversa cordialmente.
4- O campo: ${this.customerData.interesse} será "true" ou "false".
5- Caso interesse seja "false", salve e encerre a conversa cordialmente.
CHAME FUNÇÕES SOMENTE:
- Depois de extrair todos os dados do cliente
- save(): somente se TODOS os campos forem fornecidos pelo CLIENTE(nome,email,necessidade,interesse)
- scheduleMeet(): quando cliente confirmar seu interesse depois que for salvo.` },

              ];
              this.customerData = {
                     nome: "Joao",
                     email: "joao@mail.com",
                     empresa: "particular",
                     necessidade: "veiculo para uso pessoal",
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
                                          interesse: { type: "boolean" }
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
       // funcao principal trata mensagens do usuario
       async processUserInput(userInput) {
              this.messages.push({ role: "user", content: userInput });

              try {
                     // Primeira chamada ao modelo
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
                     // historico de mensagens
                     this.messages.push(responseMessage);

                     // Verifica se o modelo quer chamar uma função
                     for (const toolCall of toolCalls) {
                            const functionName = toolCall.function.name;
                            const functionToCall = this.availableFunctions[functionName];
                            const functionArgs = JSON.parse(toolCall.function.arguments);

                            const functionResponse = await functionToCall?.(functionArgs);

                            if (functionResponse) {
                                   this.messages.push({
                                          role: "tool",
                                          content: functionResponse,
                                          tool_call_id: toolCall.id,
                                   });
                            }
                            // Faça a solicitação final com os resultados da chamada da ferramenta.
                            const secondResponse = await groq.chat.completions.create({
                                   model: this.model,
                                   messages: this.messages,
                                   tools: this.tools,
                                   tool_choice: "auto",
                                   temperature: 0.5,
                                   max_completion_tokens: 4096
                            });

                            return secondResponse.choices[0].message.content;

                     }
                     return responseMessage.content;
              } catch (error) {
                     // log("An error occurred:", error);
                     throw error;
              }

       }
       // funções disponíveis para o modelo
       save(params) {
              this.pipefyConnector(params)
       }
       scheduleMeet(params) {
              // log("📅 Agendando reunião...");
              // Simulando agendamento

              // log("✅ Reunião agendada:", params);
              return "reunião agendada com sucesso";
       }
       // conecta com a api do  Pipefy
       pipefyConnector(params) {
              this.provider.updateCard(params)
       }
} export default ChatAgent;