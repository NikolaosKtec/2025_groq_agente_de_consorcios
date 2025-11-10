
class Pipefy_provider {
       constructor() {
              this.PIPEFY_TOKEN = process.env.PIPEFY_KEY;
              this.PIPE_ID = 306763270;
              this.NOME_FIELD_ID = "nome";
              this.EMAIL_FIELD_ID = "email";
              this.EMPRESA_FIELD_ID = "empresa";
              this.NECESSIDADE_FIELD = "necessidade";
              this.INTERESSE_FIELD = "interesse";
       }
       /**
        * Creates a new card in Pipefy with the provided parameters
        * @async
        * @param {Object} params - The parameters for creating the card
        * @param {string} params.nome - The name to be added to the card
        * @param {string} params.email - The email to be added to the card
        * @param {string} params.empresa - The enterprise to be added to the card
        * @param {string} params.necessidade - The need/requirement to be added to the card
        * @param {string} params.interesse - The interest to be added to the card
        * @returns {Promise<void>} - A promise that resolves when the card is created
        * @throws {Error} - If there's an error during the API request
        */
       async updateCard(params) {
              const mutation = `
                     mutation {
                            createCard(input: {
                                   pipe_id: "${this.PIPE_ID}",
                                   title: "PRE-VENDAS",
                                   fields_attributes: [
                                          { field_id: "${this.NOME_FIELD_ID}", field_value: "${params.nome}" },
                                          { field_id: "${this.EMAIL_FIELD_ID}", field_value: "${params.email}" },
                                          { field_id: "${this.NECESSIDADE_FIELD}", field_value: "${params.necessidade}" },
                                          { field_id: "${this.EMPRESA_FIELD_ID}", field_value: "${params.empresa}" },
                                          { field_id: "${this.INTERESSE_FIELD}", field_value: "${params.interesse}" }]
                            }) {
                            card {
                                   id
                                   title
                            }}
                     }`;
              const data = { query: mutation };

              try {
                     const response = await fetch("https://api.pipefy.com/graphql", {
                            method: "POST",
                            headers: {
                                   "Authorization": `Bearer ${this.PIPEFY_TOKEN} `,
                                   "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                     });
                     const result = await response.json();
                     // console.log("Novo card criado:", result.data);
                     return "Salvo com sucesso!";
              } catch (error) {
                     console.error("Erro na requisição:", error);
                     throw error;
              }
       };


} export default Pipefy_provider;
// console.log("rodando teste");
// const provider = new Pipefy_provider()
// provider.updateCard({nome:'test_II', email:'teste@mail.com', necessidade:'sla', interesse:true})

