# ACERVO

Plataforma pessoal de vídeos com navegação cinematográfica, desenvolvida em etapas como projeto de portfólio.

**Versão 0.1.0 — Etapa 1: frontend com dados fictícios.**

## O que já existe

- Home escura e responsiva, com hero, categorias e linhas horizontais.
- Cards com thumbnails locais, duração e progresso demonstrativo.
- Páginas de categorias, busca, lista demonstrativa e vídeo individual.
- Busca por título, descrição e categoria, sem diferenciar acentos ou maiúsculas.
- Player HTML5 com controles nativos: play/pause, volume, tempo, progresso e tela cheia conforme o navegador.
- Estado vazio, página 404 e mensagem de falha ao carregar vídeo.
- Foco de teclado, link de pular para o conteúdo e respeito a movimento reduzido.

## Limites desta entrega

O catálogo é fictício. Todos os cards usam o mesmo MP4 de flores (aproximadamente 5 segundos), apenas para validar reprodução. A duração real no player difere das durações demonstrativas dos cards. As fotos ilustram o catálogo e não são frames do MP4.

Histórico, favoritos e visualizações são dados estáticos: não há persistência, login, upload, API, PostgreSQL, FFmpeg, HLS ou seleção de qualidade. Minha lista apenas exibe uma seleção fictícia. Não há painel admin nesta etapa. A pasta backend está reservada para a próxima etapa.

## Tecnologias

React 19, Vite 8, Tailwind CSS 4, React Router e Lucide React. Consulte `frontend/package.json` e `frontend/package-lock.json` para as versões efetivamente instaladas.

React organiza a interface em componentes. Vite fornece o servidor de desenvolvimento e gera a versão de produção. Tailwind disponibiliza utilitários de estilo e tokens; o CSS do projeto define a composição visual. React Router troca as páginas sem recarregar todo o aplicativo.

## Executar o projeto pronto

Pré-requisitos: Node.js 24 e npm. O projeto foi compilado com Node 24.19.0. Não precisa instalar banco ou FFmpeg agora.

Extraia `acervo-etapa-1.zip` em `~/Documents`. A pasta resultante será `~/Documents/minha-plataforma`.

```bash
cd ~/Documents/minha-plataforma/frontend
node --version
npm --version
npm ci
npm run dev
```

Abra a URL que aparecer no terminal, normalmente `http://localhost:5173`. Mantenha esse terminal aberto enquanto usa a aplicação. Use Ctrl+C para parar. Se a porta estiver ocupada, Vite pode usar outra; siga a URL exibida.

`npm ci` usa as versões do lockfile. `npm install` é usado ao adicionar ou atualizar dependências. Não use sudo nesses comandos.

Opcional, na mesma pasta:

```bash
cp .env.example .env
```

Nenhuma variável é exigida nesta etapa. Nunca coloque senhas em variáveis `VITE_*`: elas são públicas no navegador.

## Estrutura

```text
minha-plataforma/
  .gitignore
  .nvmrc
  README.md
  CREDITS.md
  docs/
    etapa-1.md
  backend/
    README.md
  frontend/
    .env.example
    .gitignore
    package.json
    package-lock.json
    vite.config.js
    index.html
    public/
      favicon.svg
      images/
      media/demo.mp4
    src/
      main.jsx
      App.jsx
      index.css
      components/
        Header.jsx
        Hero.jsx
        VideoCard.jsx
        VideoRow.jsx
      pages/
        Home.jsx
        Catalog.jsx
        Video.jsx
        NotFound.jsx
      data/videos.js
      services/catalog.js
      utils/format.js
```

Os componentes recebem vídeos por propriedades (`props`). As páginas consultam o serviço `catalog.js`. Hoje o serviço lê o mock; na Etapa 2 ele será adaptado para chamadas assíncronas à API, com estados de carregamento e erro.

## Rotas

| Caminho | Função |
| --- | --- |
| `/` | Home |
| `/categorias` | Catálogo completo e filtros |
| `/categorias?categoria=Viagens` | Filtro por categoria |
| `/buscar?q=codigo` | Busca no catálogo fictício |
| `/minha-lista` | Favoritos fictícios |
| `/video/costa` | Página de vídeo |
| Outro endereço | Página 404 |

## Como testar

1. Abra a Home e confira hero, thumbnails e as linhas de vídeos.
2. Use as setas da seção Novos no seu acervo. No celular, deslize a linha com o dedo.
3. Clique em Assistir agora. Dê play no clipe de flores; teste pausa, volume, barra de tempo e tela cheia disponível no navegador.
4. Volte e abra Categorias → Jogos. Devem aparecer dois cards.
5. Abra a lupa e procure `codigo`: deve aparecer Por trás do código. Procure `laboratorio`: deve aparecer Ideias que saem do papel.
6. Busque `zzzz-inexistente` e confira o estado vazio.
7. Abra `/video/inexistente` e confira a página 404.
8. Abra Minha lista e confira o aviso de seleção fictícia.
9. Reduza a janela a 390 px e 320 px. Verifique navegação, textos, toque e ausência de rolagem horizontal na página inteira.
10. Use Tab para navegar sem mouse. Os controles devem ter foco visível.
11. Recarregue `/video/costa` diretamente. O servidor de desenvolvimento deve servir a aplicação nessa rota.

Verificação técnica, dentro de `frontend/`:

```bash
npm run lint
npm run build
npm run preview
```

O último comando serve o build localmente; abra a URL informada. Não use `vite preview` como servidor público de produção. Ao futuramente hospedar a SPA, configure fallback para `index.html` para as rotas do React Router.

## Resultado da verificação desta entrega

- `npm run build`: passou.
- Busca por título, descrição, categoria e termo sem acento: passou em verificação direta do serviço.
- IDs únicos, categoria válida, arquivos de imagem e MP4 referenciados: conferidos.
- MP4 inspecionado: H.264 + AAC, 960×540, aproximadamente 5 segundos.
- Interface no navegador, toque, acessibilidade prática e reprodução em dispositivos: pendentes de teste manual. Compilação não equivale a teste visual.

## Usar um MP4 seu para testar

Na pasta `frontend/public/media/`, crie `pessoais/` e coloque um MP4 H.264/AAC, por exemplo `meu-video.mp4`.

Edite **frontend/src/data/videos.js**, campo `source` de um dos objetos, para `/media/pessoais/meu-video.mp4`. O caminho público não inclui `public/`. Atualize os metadados se quiser que representem seu arquivo.

Essa pasta está ignorada pelo Git para não enviar vídeos pessoais por acidente. Isso não torna o arquivo privado: tudo em `public/` é acessível a quem tiver acesso ao servidor. O Vite copia essa pasta no build. Não publique esta demonstração com arquivos pessoais sensíveis. Armazenamento e acesso privado serão tratados nas próximas etapas.

## Criar do zero para aprender

Em outra pasta vazia, sem sobrescrever o projeto pronto:

```bash
mkdir -p ~/Documents/estudo-acervo
cd ~/Documents/estudo-acervo
mkdir minha-plataforma
cd minha-plataforma
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install react-router-dom lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

Depois use os arquivos completos de `docs/etapa-1.md` e as imagens/MP4 do ZIP. O guia explica exatamente o que substituir. Para reproduzir as versões verificadas, prefira o `package.json` e o lockfile do ZIP com `npm ci`.

Tailwind 4 usa o plugin `@tailwindcss/vite` e `@import "tailwindcss";`. Este projeto não usa o comando antigo `npx tailwindcss init -p`.

Referências oficiais: [Vite](https://vite.dev/guide/), [Tailwind com Vite](https://tailwindcss.com/docs/installation/using-vite), [React](https://react.dev/learn).

## Git e commits

Na raiz `~/Documents/minha-plataforma`, após testar:

```bash
git init
git add .
git status
git commit -m "feat(frontend): cria home e catalogo demonstrativo do Acervo"
```

Confira o `git status` antes de confirmar. O lockfile deve entrar no Git; `node_modules`, `dist`, `.env` e vídeos pessoais não devem entrar. Nenhum repositório remoto ou commit foi criado automaticamente nesta entrega.

Nas próximas mudanças, use commits pequenos por objetivo. Exemplos:

- `feat(api): adiciona catalogo de demonstracao no Fastify`
- `feat(database): adiciona schema inicial de videos`
- `fix(player): trata falha ao carregar video`
- `docs: atualiza instrucoes de desenvolvimento`

## Próximas etapas

| Etapa | Escopo | Estado |
| --- | --- | --- |
| 1 | Frontend, identidade, mock e página de vídeo | Entregue para teste local |
| 2 | Fastify, API fictícia e integração React | Planejada |
| 3 | PostgreSQL e migrations | Planejada |
| 4 | Administração e CRUD | Planejada |
| 5 | Upload MP4 | Planejada |
| 6 | Autenticação e autorização | Planejada |
| 7 | Histórico e favoritos persistidos | Planejada |
| 8 | Fila de processamento com FFmpeg | Planejada |
| 9 | HLS e múltiplas resoluções | Planejada |
| 10 | Object storage e produção | Planejada |

As etapas administrativas 4–5 serão apenas locais enquanto a autenticação não existir. A escolha inicial para autenticação é sessão validada no backend usando cookie HttpOnly, Secure em produção e SameSite, com proteção CSRF apropriada. HttpOnly impede a leitura do cookie pelo JavaScript; não substitui validação de permissões, proteção CSRF ou segurança contra XSS. JWT não é obrigatório para uma aplicação web própria. Vamos detalhar e implementar isso na Etapa 6.

A API validará dados e permissões no servidor. Originais, thumbnails e HLS ficarão fora do PostgreSQL; o banco guardará referências. Uma camada de armazenamento permitirá trocar disco local por S3/R2. Processamento pesado deverá rodar em worker/fila, e não prender a requisição de upload. Essas decisões são direcionamento futuro, não funcionalidades já implementadas.

## Créditos

Veja `CREDITS.md` para imagens, vídeo de demonstração e bibliotecas. Não há associação com Netflix; ACERVO tem identidade própria.
