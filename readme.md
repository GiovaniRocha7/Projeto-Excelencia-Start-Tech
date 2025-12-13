# [![excelencia-logo-1-1.png](https://i.postimg.cc/Bb9J7BPk/excelencia-logo-1-1.png)](https://postimg.cc/47PCmt5Q)

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [API](#-api)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Scripts](#-scripts)
- [Contribuição](#-contribuição)

## 🎯 Visão Geral

ExcelencIA é uma plataforma desenvolvida para ajudar pessoas a se prepararem para o mercado de trabalho utilizando o poder da Inteligência Artificial.

A proposta é simples e poderosa: oferecer um ambiente seguro e realista para que candidatos possam simular entrevistas de emprego, receber feedbacks assertivos e desenvolver autoconfiança para se destacar em processos seletivos reais.

### ✨ Principais Características

As funcionalidades desse projeto são:

- 🧠 Simulação de entrevistas reais com IA no papel de recrutador

- 🗣️ Perguntas baseadas em diferentes cargos e níveis de experiência

- 📊 Feedbacks inteligentes e personalizados

- 📈 Identificação de pontos fortes e oportunidades de melhoria

- 💬 Desenvolvimento de comunicação, postura e autoconfiança

## 🚀 Funcionalidades

### 👨‍💼 Para Funcionários

#### Dashboard
- ✅ Estatísticas gerais do sistema
- ✅ Contratos expirando em 30 dias
- ✅ Gráficos de performance
- ✅ Acesso rápido às principais funcionalidades

----------------------  **Restante das funcionalidades**


## 🛠️ Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Postgres** - Banco de dados relacional

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com variáveis CSS
- **JavaScript ES6+** - Lógica da interface
- **Responsive Design** - Mobile-first

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL 17.7+

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd Projeto-Excelencia-Start-Tech
```

### 2. Instale as dependências
```bash
```

### 3. Configure o banco de dados
```bash
# Configure a variável DATABASE_URL no arquivo .env
# Exemplo: DATABASE_URL="mysql://usuario:senha@localhost:3306/dg_contracts"
```

## ⚙️ Configuração

### Configuração do Banco de Dados

O sistema utiliza PostgresSQL como Banco de dados. Segue abaixo a estrutura criada:

```sql
model Employee {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

```

## 🎮 Uso

### Login como Funcionário
1. Acesse a interface web
2. Selecione "Funcionário" no tipo de usuário
3. Use as credenciais de um funcionário cadastrado
4. Após o login, será redirecionado automaticamente para o dashboard

## 🔌 API

### Autenticação
```http
POST /auth/employee/login
POST /auth/client/login
POST /auth/employee/register
```

--------- Restante dos endpoints da API

## 📁 Estrutura do Projeto

### Frontend

```
Projeto-Excelencia-Start-Tech/
│
├── index.html                # Página inicial da aplicação
│
├── html/                     # Páginas HTML secundárias do sistema
│   ├── login.html            # Tela de login do usuário
│   ├── cadastro.html         # Tela de cadastro
│   ├── entrevista.html       # Simulação de entrevista
│   └── pagamento.html        # Página de pagamento
│
├── css/                      # Estilos principais da aplicação
│   └── style.css
│
├── estilosSecundarios/       # Estilos específicos por página/componente
│
├── js/                       # Lógica e interatividade em JavaScript
│   ├── scripts.js            # Scripts gerais
│   └── validacoes.js         # Validações de formulários
│
├── ChatIA/                   # Protótipo ou simulação do chat com IA
│
├── Pagina Pagamentos/        # Estrutura visual do fluxo de pagamentos
│
├── assets/                   # Recursos estáticos (imagens, ícones, mídias)
│
├── Font/                     # Fontes customizadas do projeto
│
├── TESTES/                   # Testes e protótipos de funcionalidades
│
├── .vscode/                  # Configurações do VS Code
│
└── README.md                 # Documentação do projeto

```

### Backend
---- Colocar estrutura da pasta



## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- **Comentários**: Sempre em português
- **Funções**: Documentação JSDoc completa
- **Variáveis**: Nomes descritivos em português
- **Estrutura**: Organização por funcionalidade

## 🆘 Suporte

Para suporte e dúvidas:
- Abra uma issue no repositório
- Consulte a documentação da API
- Verifique os logs da aplicação