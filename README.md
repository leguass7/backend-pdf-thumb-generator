# Miniaturas de arquivos PDF (thumbnail)
![standard-image](https://img.shields.io/badge/code%20style-standard-brightgreen.svg) <img src="https://badgen.net/badge/powered%20by/typescript/blue" alt="Powered by TypeScript" />

Esse exemplo foi contruído para gerar miniaturas `*.png` de arquivos `*.pdf` do **lado do servidor (backend)**.
A aplicação acompanha um servidor http `espress` simples para simular o upload do arquivo, armazenar os arquivo PFD bem como a minuatura PNG.

## Considerações importantes
Se você está procurando uma forma manipular arquivos PDF apenas para gerar minuaturas do lado do servidor, essa prova de conceito é desaconselhada. Para biblioteca canvas funcionar é preciso algumas instalações no servidor que você pode verificar no arquivo `.Dockerfile`. Instalações essas que se motram incômodas no deploy, porém, se você estiver realmente precisando é perfeitamente possível, mesmo você **"matando formiga com bazuca"**

Caso a utilização seja para uma aplicação web é altamente recomendado que você gere as miniaturas do **lado do cliente**, utilizando os recursos de canvas e pdf dos navegadores modernos; 
*(colocarei um link para o exemplo aqui assim que o repositório estiver pronto)*

### Code (Como funciona?)
O principal objetivo é obter um arquivo PDF qualquer, carrega-lo, e gerar uma miniatura PNG da primeira página.

As principais funcionalidades são: 
 - A função `pdfThumbGenerate`
   - A classe `NodeCanvasFactory`

Todo o resto trata-se de um servidor `express` simples que utiliza o `multer` como middleware de upload.

```javascript
// ./src/helpers
await pdfThumbGenerate('path/to/file.pdf', 'output/to/thumb.png')
```

### Bibliotacas Utilizadas
- Manipulação de PDF [pdfjs-dist](https://github.com/mozilla/pdfjs-dist)
- Manipulação de imagem [node-canvas](https://github.com/Automattic/node-canvas)
- Servidor HTTP [express](https://expressjs.com/)
  - Upload de arquivos [multer](https://github.com/expressjs/multer#readme)

## Instalação
Para facilitar sua vida, antes de começar é necessário a instalação completa do [NodeJs](https://nodejs.org/) incluindo ferramentas de build adicionais conforme o seu sistema operacional como por exemplo: `python`, `cmake`, `chocolatey`, `node-gyp`, etc. Veja o guia de instalaçao do `node-canvas` em https://github.com/Automattic/node-canvas

- `git clone https://github.com/leguass7/backend-pdf-thumb-generator.git` 
- `cd backend-pdf-thumb-generator` 
- `yarn install`
  - Aqui pode demorar um pouquinho para fazer o build do `canvas` *(no meu caso uso Windows)*
- `yarn start`

Depois disso, se aparecer no console *"Server is listening on port 3000!"* abra o navegador em `http://localhost:3000`
 - GET `http://localhost:3000/`
 - GET (uploaded static files) `http://localhost:3000/assets/files`
 - POST `http://localhost:3000/pdf`

### Docs
- Arquivo `./docs/Insomnia.yaml` de rotas do **Insomnia**
- `./Dockerfile` e `./docker-compose.yml`

Trecho importante para funcionar o `canvas` no container do docker:
```Dockerfile
RUN apk add --no-cache \
    python \
    g++ \
    build-base \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    && yarn install
```

### Referêcias
- https://github.com/mozilla/pdf.js/tree/master/examples/node
- https://github.com/mozilla/pdf.js/blob/master/examples/node/pdf2png/pdf2png.js
- https://github.com/sionelt/PDF-thumb-generator
- https://stackoverflow.com/questions/57088230/node-canvas-on-alpine-within-docker
