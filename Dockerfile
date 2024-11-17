# Use uma imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho na imagem
WORKDIR /app

# Copie o package.json e package-lock.json (caso exista)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta que a aplicação usa (substitua pela porta da sua API, ex: 3000)
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:docker"]
