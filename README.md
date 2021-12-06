# Gerenciador Financeiro
Utilize o TDD para desenvolver um gerenciador financeiro com a segurança dos testes automatizados sempre a seu lado. Trata-se de uma alternativa bacana de testes, de forma simplificada para fácil entendimento. 

### 🔥 Para baixar:
> Clone repository:
> `git@github.com:fabioborges-ti/webapi.nodejs-knex-tdd.git`

### 💻 Tecnologias
Lista das principais tecnologias envolvidas no projeto:
- **NodeJs** https://nodejs.org/en/
- **ExpressJs** https://expressjs.com/pt-br/
- **Knex.js** https://knexjs.org/
- **Jest.js** https://jestjs.io/pt-BR/
- **Postgres** https://hub.docker.com/_/postgres

### 📋 Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git]([https://git-scm.com](https://git-scm.com/)), [Node.js]([https://nodejs.org/en/](https://nodejs.org/en/)) e o [Docker]([https://docs.docker.com/desktop/](https://docs.docker.com/desktop/)). Além disto, sugiro que você utilize um bom editor de código, como o [VSCode]([https://code.visualstudio.com/]  (https://code.visualstudio.com/)), porque irá oferecer muitas extensões que farão toda diferença.

### 📦 Dependências do projeto
Tudo instalado, vamos seguir?? Se sim, chegou a hora de baixarmos as dependências do projeto. Para isso, você deve abrir seu terminal, na pasta da solução e executar o comando abaixo; este fará o _download_ dos pacotes necessários:
```bash
$ npm install
```
### ⚡ Ah... Importante!
Observe o arquivo **connection.js** na pasta "*src/config*" do projeto; trata-se do arquivo com todas as variáveis necessárias para estabelecer conexão com o banco de dados e serão usadas ao longo do projeto. Importante ressaltar que o banco de dados deve ser criado previamente. Depois disso, você deve fornecer, neste arquivo, os dados de acesso ao banco, como o nome do banco, usuário, senha e outros...

### 🔨 Knex.js 
O knex.js é um query builder sendo que o ambiente em que ele é mais utilizado seria em Node.js, por meio do javascript ele unifica a forma de fazer querys para os banco SQL, dessa forma não dependendo de um banco específico, podendo trocar de banco a hora que quiser. Sendo assim a aplicação ainda funcionará da mesma forma sem alterar o código. O knex.js tem suporte completo ao Postgres, Sql Server, Mysql, MariaDB, Sqlite3, Oracle e Amazon Redshift, tendo também a possibilidade de utilizar junto com typescript. 

### ✔️ Vamos testar?
Agora que você já tem tudo pronto, chegou a hora de executar as migrações e testar... **vamo testar**?? Para isso, você deve abrir seu terminal e entrar na pasta da solução, onde estão os arquivos e seguir os seguintes passos:

```bash
$ npx knex --knexfile=./src/config/connection.js migrate:latest --env test
```

Se tudo correu bem, seu banco de dados foi atualizado e novas tabelas foram criadas de forma automática; e já pode começar seus estudos. Sugiro que não deixe de abrir o site oficial do Knex e conhecer uma série de recursos disponíveis, como criação de novas tabelas, novos relacionamentos e novas migrações. 

Para testar, use o comando abaixo e bons estudos

```bash
$ npm run start 
```
E para executar os testes, você deve usar o seguinte comando:

```bash
$ npm run secure-mode
```

## 📚 Para mais informações:
Se você não conhece muito sobre este processo e quer mais detalhes, consulte em: https://knexjs.org/

E bom estudos! 🚀
