
class Pipefy_provider {
       constructor() {
              this.PIPEFY_TOKEN = process.env.PIPEFY_KEY;
              this.PIPE_ID = 306763270;
              this.NOME_FIELD_ID = "nome";
              this.EMAIL_FIELD_ID = "email";
              this.NECESSIDADE_FIELD = "necessidade";
              this.INTERESSE_FIELD = "interesse";
       }
       // cria ou atualiza um card
       async updateCard(params) {
              const mutation =`
                     mutation {
                            createCard(input: {
                                   pipe_id: "${this.PIPE_ID}",
                                   title: "PRE-VENDAS",
                                   fields_attributes: [
                                          { field_id: "${this.NOME_FIELD_ID}", field_value: "${params.nome}" },
                                          { field_id: "${this.EMAIL_FIELD_ID}", field_value: "${params.email}" },
                                          { field_id: "${this.NECESSIDADE_FIELD}", field_value: "${params.necessidade}" },
                                          { field_id: "empresa", field_value: "particular" },
                                          { field_id: "${this.INTERESSE_FIELD}", field_value: "${params.interesse}" }]
                            }) {
                            card {
                                   id
                                   title
                            }}
                     }`;
       const data = { query: mutation };

       fetch("https://api.pipefy.com/graphql", {
              method: "POST",
              headers: {
                     "Authorization": `Bearer ${this.PIPEFY_TOKEN} `,
                            "Content-Type": "application/json"
                     },
                     body: JSON.stringify(data)
              }).then(response => response.json())
              .then(result => {
                            console.log("Novo card criado:", result.data);
                     }).catch(error => console.error("Erro na requisição:", error));
       };


} export default Pipefy_provider;
// console.log("rodando teste");
// const provider = new Pipefy_provider()
// provider.updateCard({nome:'test_II', email:'teste@mail.com', necessidade:'sla', interesse:true})

