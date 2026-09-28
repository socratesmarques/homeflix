# ACERVO — Guia completo da Etapa 1

Esta entrega constrói somente o frontend. O código completo de cada arquivo está abaixo, sem trechos omitidos. As imagens, o MP4 e o lockfile estão no ZIP.

## 1. Entenda as peças

React divide a tela em componentes. Um componente é uma função que devolve a interface em JSX, uma sintaxe parecida com HTML dentro de JavaScript. Vite inicia o servidor e gera o build. Tailwind fornece classes utilitárias e tokens visuais. Os estilos de composição ficam no CSS. React Router associa cada URL a uma página.

A Home usa Hero e VideoRow. Cada VideoRow recebe uma lista e cria vários VideoCard. O serviço catalog.js centraliza o acesso aos dados. Quando chegarmos à API, trocaremos essa camada por chamadas HTTP e adicionaremos carregamento/erro nas páginas.

## 2. Rode o projeto pronto

Instale Node.js 24. Confira com `node --version` e `npm --version`. Se o comando não existir ou a versão for muito antiga, resolva a instalação antes de seguir. Se já usa nvm, na raiz do projeto execute `nvm install` e `nvm use` para ler a `.nvmrc`.

Extraia o ZIP em `~/Documents`. Depois, dentro de `~/Documents/minha-plataforma/frontend`:

```bash
cd ~/Documents/minha-plataforma/frontend
npm ci
npm run dev
```

Abra a URL informada no terminal, normalmente http://localhost:5173. Não abra index.html com duplo clique. O servidor precisa continuar rodando. Use Ctrl+C para encerrar.

## 3. Aprenda a criar a base do zero

Este caminho é alternativo ao ZIP pronto; use outra pasta para não sobrescrever arquivos.

Pasta inicial: `~/Documents/estudo-acervo`.

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

- `npm create vite` cria o esqueleto React.
- `npm install` baixa dependências para node_modules.
- React Router fornece páginas e navegação; Lucide fornece ícones.
- `-D` registra ferramentas de desenvolvimento, como o plugin Tailwind.

Crie as pastas abaixo estando em `frontend/`:

```bash
mkdir -p src/components src/pages src/data src/services src/utils
mkdir -p public/images public/media
```

Substitua os arquivos gerados pelo Vite pelos arquivos completos deste guia. Copie também `public/images/` e `public/media/` do ZIP. Não há etapa de download externo em tempo de execução.

Se usar o package.json e package-lock.json do ZIP para reproduzir exatamente as versões verificadas, execute `npm ci` depois de copiá-los.

## 4. Configure Tailwind

O arquivo `frontend/vite.config.js` carrega React e o plugin Tailwind. A primeira linha de `frontend/src/index.css` importa Tailwind. O bloco `@theme` define a paleta e fonte do projeto. Esta configuração é de Tailwind 4; não execute `npx tailwindcss init -p`.

Referências: https://vite.dev/guide/ e https://tailwindcss.com/docs/installation/using-vite.

## 5. Mapa dos arquivos

Todos os caminhos abaixo partem de `minha-plataforma/`.

| Arquivo/pasta | Função |
| --- | --- |
| frontend/src/main.jsx | Monta o React e ativa o roteador |
| frontend/src/App.jsx | Define rotas, header e rodapé |
| frontend/src/index.css | Tailwind, identidade e responsividade |
| frontend/src/components | Peças reutilizáveis da interface |
| frontend/src/pages | Home, catálogo, página de vídeo e 404 |
| frontend/src/data/videos.js | Catálogo fictício temporário |
| frontend/src/services/catalog.js | Acesso e busca nos dados |
| frontend/src/utils/format.js | Formatação de data e duração |
| frontend/public | Arquivos servidos diretamente pelo Vite |
| frontend/.env.example | Modelo de configuração sem segredos |
| backend/README.md | Pasta reservada, sem implementação |

## 6. Código completo

No projeto criado pelo Vite, substitua `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx` e `src/index.css`. Os demais arquivos de aplicação listados são novos. O template pode ter App.css e imagens próprias: esta aplicação não usa esses arquivos. O README da raiz descreve os testes, commits e próximas etapas.

### `.gitignore`

Ignora dependências, builds, segredos e vídeos pessoais.

```gitignore
node_modules/
dist/
.env
.env.*
!.env.example
*.local
*.log
.DS_Store
coverage/
backend/storage/
frontend/public/media/pessoais/
```

### `.nvmrc`

Define Node 24 para quem utiliza nvm.

```text
24
```

### `frontend/.env.example`

Documenta a ausência de configurações obrigatórias.

```dotenv
# Etapa 1: nenhuma variável de ambiente é necessária.
# Etapa 2: configuraremos a URL pública da API aqui.
# Variáveis VITE_* são visíveis ao navegador: nunca coloque senhas ou tokens.
```

### `frontend/package.json`

Registra scripts e dependências.

```json
{
  "name": "acervo-frontend",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^1.48.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.4"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "oxlint": "^1.81.0",
    "tailwindcss": "^4.3.3",
    "vite": "^8.3.0"
  },
  "engines": {
    "node": ">=22.12.0"
  }
}
```

### `frontend/vite.config.js`

Ativa React e Tailwind.

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### `frontend/index.html`

Define idioma, favicon e ponto de entrada.

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0c0e0f" />
    <meta name="description" content="ACERVO: seus vídeos, projetos e memórias em uma experiência pessoal de cinema." />
    <title>ACERVO · Seus momentos em cena</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### `frontend/public/favicon.svg`

Marca visual do projeto.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0c0e0f"/><path d="M17 48 29 16h7l12 32h-9l-3-9H27l-3 9zm12-16h5l-2.5-8z" fill="#d2f86a"/></svg>
```

### `frontend/src/main.jsx`

Inicializa React e BrowserRouter.

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

### `frontend/src/App.jsx`

Define as páginas e o layout compartilhado.

```jsx
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Video from './pages/Video'
import NotFound from './pages/NotFound'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'ACERVO · Seus momentos em cena'
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo"><Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Catalog mode="categories" />} />
        <Route path="/buscar" element={<Catalog mode="search" />} />
        <Route path="/minha-lista" element={<Catalog mode="favorites" />} />
        <Route path="/video/:id" element={<Video key={pathname} />} />
        <Route path="*" element={<NotFound />} />
      </Routes></main>
      <footer className="footer page-width"><strong>ACERVO<span>•</span></strong><p>Seus momentos merecem uma tela.</p><span>Etapa 1 · Catálogo de demonstração</span></footer>
    </>
  )
}
```

### `frontend/src/index.css`

Define identidade visual, layout e adaptação móvel.

```css
@import "tailwindcss";

@theme {
  --color-accent: #d2f86a;
  --color-base: #0c0e0f;
  --font-sans: 'Inter', 'Segoe UI', Arial, sans-serif;
}

:root { font-family: var(--font-sans); color: #f6f7f3; background: #0c0e0f; font-synthesis: none; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; color-scheme: dark; }
* { box-sizing: border-box; }
body { margin: 0; min-width: 320px; }
button, input { font: inherit; }
button, a, summary { -webkit-tap-highlight-color: transparent; }
button, summary { cursor: pointer; }
a { color: inherit; text-decoration: none; }
button { color: inherit; }
button, input { border: 0; }
button:focus-visible, a:focus-visible, summary:focus-visible, input:focus-visible, video:focus-visible { outline: 2px solid #d2f86a; outline-offset: 5px; }
::selection { background: #d2f86a; color: #0c0e0f; }
.page-width { width: min(1440px, 90%); margin-inline: auto; }
.muted { color: #a8ada9; }
.skip-link { position: fixed; left: 20px; top: -80px; z-index: 100; padding: 14px; background: #d2f86a; color: #111; }
.skip-link:focus { top: 12px; }
.header { position: relative; z-index: 20; background: #0c0e0f; }
.header-inner { min-height: 88px; display: flex; align-items: center; gap: 64px; }
.brand { display: inline-flex; align-items: center; gap: 9px; font-size: 23px; font-weight: 850; letter-spacing: -1px; }
.brand svg { color: #d2f86a; width: 26px; }
.brand > span { color: #d2f86a; margin-left: -7px; }
.navigation { display: flex; gap: 32px; height: 88px; align-items: center; }
.navigation a { font-size: 14px; color: #a5aaa7; position: relative; white-space: nowrap; }
.navigation a:hover, .navigation a.active { color: #f6f7f3; }
.navigation a.active::after { content: ''; position: absolute; width: 14px; height: 3px; background: #d2f86a; bottom: -16px; left: 0; border-radius: 2px; }
.header-actions { margin-left: auto; display: flex; align-items: center; gap: 22px; }
.icon-button { background: transparent; display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; color: #c2c6c0; }
.icon-button:hover { background: #252a26; color: #fff; }
.profile { position: relative; }
.profile summary { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: #313a29; color: #d2f86a; font-size: 14px; font-weight: 600; list-style: none; }
.profile summary::-webkit-details-marker { display: none; }
.profile-menu { position: absolute; width: 240px; right: 0; top: 50px; padding: 22px; border: 1px solid #33372f; border-radius: 10px; background: #191d19; box-shadow: 0 16px 60px #0008; }
.profile-menu strong, .profile-menu span { display: block; }
.profile-menu span, .profile-menu p { color: #b0b5ad; font-size: 14px; line-height: 1.6; margin-top: 8px; }
.search-bar { display: flex; align-items: center; gap: 16px; padding-block: 0 20px; }
.search-bar input { flex: 1; width: 0; padding: 14px; background: #191c1a; border-radius: 6px; }
.hero { position: relative; min-height: 610px; display: flex; align-items: center; isolation: isolate; }
.hero-image, .hero-shade { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; }
.hero-image { object-fit: cover; object-position: center 48%; }
.hero-shade { background: linear-gradient(0deg, #0c0e0f 0%, transparent 35%), linear-gradient(90deg, #0c0e0ff2 0%, #0c0e0f9c 42%, #0c0e0f08 100%); }
.hero-content { padding-block: 54px 92px; }
.eyebrow { color: #d2f86a; font-weight: 650; font-size: 12px; letter-spacing: 2.4px; text-transform: uppercase; display: flex; align-items: center; gap: 10px; margin: 0 0 20px; }
.eyebrow > span { background: #d2f86a; width: 18px; height: 2px; }
.hero h1 { font-size: clamp(56px, 6.6vw, 96px); line-height: 1.02; letter-spacing: -5px; font-weight: 740; margin: 0 0 23px; }
.hero h1 em { font-family: Georgia, serif; font-weight: 400; color: #e1e8cc; }
.hero-meta { display: flex; align-items: center; gap: 17px; font-size: 13px; color: #d1d5cb; }
.hero-meta strong { color: #d2f86a; font-weight: 500; }
.quality-tag { border: 1px solid #ffffff70; padding: 0 4px; font-size: 12px; }
.hero-description { color: #c1c6bf; font-size: 16px; max-width: 430px; line-height: 1.75; margin: 20px 0 27px; }
.hero-buttons { display: flex; gap: 12px; flex-wrap: wrap; }
.button { display: inline-flex; align-items: center; justify-content: center; gap: 10px; border-radius: 6px; padding: 13px 22px; font-size: 14px; font-weight: 650; min-height: 46px; transition: background 150ms, transform 150ms; }
.button:hover { transform: translateY(-2px); }
.button-accent { color: #141b09; background: #d2f86a; }
.button-accent:hover { background: #e0ff90; }
.button-glass { background: #ffffff13; backdrop-filter: blur(10px); color: #f5f5f0; }
.button-glass:hover { background: #ffffff25; }
.hero-caption { font-size: 12px; letter-spacing: 1.4px; color: #a2aa9e; margin-top: 29px; }
.hero-caption span { color: #ddd; letter-spacing: 0; margin-left: 12px; }
.hero-index { position: absolute; right: 5%; bottom: 106px; display: flex; align-items: center; gap: 10px; }
.hero-index strong { font-size: 26px; font-weight: 400; }
.hero-index span { color: #b9c1b6; font-size: 13px; }
.hero-index i { margin-left: 8px; width: 90px; height: 2px; background: linear-gradient(90deg, #d2f86a 25%, #ffffff30 25%); }
.home-content { margin-top: -15px; position: relative; }
.category-chips { display: flex; gap: 10px; padding-block: 10px 28px; overflow-x: auto; }
.chip { padding: 9px 22px; background: #1a1d1c; color: #b5bbb5; font-size: 14px; border-radius: 40px; white-space: nowrap; }
.chip:hover { color: #fff; background: #2b302a; }
.chip.selected { background: #e8eddf; color: #11170c; }
.video-section { margin: 10px 0 42px; }
.row-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; gap: 16px; }
h2 { font-size: 22px; font-weight: 600; letter-spacing: -.5px; margin: 0; }
.row-heading p { font-size: 14px; color: #838c86; margin: 7px 0 0; }
.row-controls { display: flex; gap: 4px; }
.row-controls .icon-button { background: #1a1e1b; width: 32px; height: 32px; }
.video-track { display: grid; grid-auto-flow: column; grid-auto-columns: calc((100% - 54px) / 4); gap: 18px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: thin; scrollbar-color: #343c30 transparent; padding: 5px 3px 14px; margin-inline: -3px; }
.video-card { display: block; min-width: 0; scroll-snap-align: start; }
.thumbnail { position: relative; aspect-ratio: 16 / 9; border-radius: 8px; overflow: hidden; background: #1c221c; }
.thumbnail::after { content: ''; position: absolute; inset: 0; background: linear-gradient(0deg, #0007, transparent 60%); pointer-events: none; }
.thumbnail img { width: 100%; height: 100%; object-fit: cover; transition: transform 350ms; }
.video-card:hover img, .video-card:focus-visible img { transform: scale(1.045); }
.card-play { position: absolute; z-index: 2; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 46px; height: 46px; border-radius: 50%; background: #d2f86a; color: #111; display: grid; place-items: center; opacity: 0; transition: opacity 150ms; }
.video-card:hover .card-play, .video-card:focus-visible .card-play { opacity: 1; }
.duration { position: absolute; z-index: 2; bottom: 10px; right: 10px; font-size: 12px; padding: 2px 7px; border-radius: 4px; background: #000a; }
.progress-track { position: absolute; z-index: 3; height: 3px; bottom: 0; left: 0; right: 0; background: #ffffff40; }
.progress-track span { height: 100%; display: block; background: #d2f86a; }
.card-info { padding-top: 12px; }
.card-info h3 { font-size: 15px; line-height: 1.5; font-weight: 550; margin: 0; }
.card-info p { color: #939d95; font-size: 12px; margin: 5px 0 0; }
.catalog-page, .watch-page { padding-top: 42px; min-height: 72vh; }
.catalog-page h1, .video-detail h1, .not-found h1 { font-size: clamp(28px, 4vw, 46px); font-weight: 620; letter-spacing: -1.5px; line-height: 1.15; margin: 0 0 22px; }
.catalog-search { max-width: 760px; display: flex; align-items: center; gap: 16px; padding: 10px 10px 10px 20px; border-radius: 8px; background: #1c211d; margin: 30px 0; }
.catalog-search input { background: transparent; min-width: 0; flex: 1; padding: 10px 0; }
.result-count { font-size: 14px; color: #9aa398; margin: 0 0 24px; }
.video-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 18px; margin-bottom: 70px; }
.empty-state { text-align: center; padding: 65px 0; }
.empty-state p { color: #a8afa4; margin: 16px 0 24px; }
.not-found { min-height: 65vh; }
.not-found .eyebrow { justify-content: center; }
.back-link { display: inline-flex; align-items: center; gap: 10px; font-size: 14px; color: #c6ccc0; margin-bottom: 24px; }
.player-frame { background: #000; border-radius: 10px; overflow: hidden; }
.player-frame video { display: block; width: 100%; max-height: 72vh; aspect-ratio: 16 / 9; }
.demo-notice { color: #a4ad9d; font-size: 12px; line-height: 1.7; margin-block: 14px 35px; }
.video-detail { display: grid; grid-template-columns: 1fr auto; gap: 40px; padding-bottom: 38px; }
.video-description { max-width: 700px; font-size: 16px; line-height: 1.8; color: #aeb7a9; }
.video-detail dl { display: grid; gap: 14px; align-content: start; padding-top: 12px; font-size: 14px; }
.video-detail dt { color: #889281; margin-bottom: 4px; }
.video-detail dd { margin: 0; }
.error-message { background: #582f28; padding: 18px; border-radius: 6px; }
.footer { display: flex; align-items: center; flex-wrap: wrap; gap: 20px; border-top: 1px solid #242a23; margin-top: 30px; padding-block: 30px 38px; }
.footer strong { letter-spacing: -1px; font-size: 18px; }
.footer strong span { color: #d2f86a; }
.footer p { color: #939b8f; font-size: 13px; margin: 0; }
.footer > span { margin-left: auto; color: #838c7e; font-size: 12px; }
@media (min-width: 1600px) { .hero { min-height: 690px; } }
@media (max-width: 1050px) { .header-inner { gap: 36px; } .video-track { grid-auto-columns: calc((100% - 36px) / 3); } .video-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } .hero { min-height: 590px; } .hero h1 { letter-spacing: -3px; } }
@media (max-width: 700px) {
  .page-width { width: 90%; }
  .header-inner { min-height: 112px; flex-wrap: wrap; gap: 0; padding-top: 18px; }
  .brand { font-size: 21px; }
  .navigation { order: 3; width: 100%; height: 56px; gap: 28px; }
  .navigation a.active::after { bottom: -11px; }
  .header-actions { gap: 10px; }
  .hero { min-height: 555px; align-items: flex-end; }
  .hero-image { object-position: 64% center; }
  .hero-shade { background: linear-gradient(0deg, #0c0e0f, #0c0e0f88 65%, #0c0e0f25); }
  .hero-content { padding-block: 70px 60px; }
  .hero h1 { font-size: 64px; letter-spacing: -3px; }
  .hero-description { font-size: 14px; max-width: 360px; }
  .hero-index { display: none; }
  .hero-caption { font-size: 12px; }
  .hero-buttons .button { padding: 12px 15px; }
  .video-track { grid-auto-columns: 75%; gap: 14px; }
  .video-section { margin-bottom: 28px; }
  .row-controls { display: none; }
  h2 { font-size: 20px; }
  .video-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 25px 12px; }
  .card-info h3 { font-size: 14px; }
  .category-chips { gap: 8px; }
  .chip { padding: 9px 18px; }
  .video-detail { grid-template-columns: 1fr; gap: 10px; }
  .video-detail dl { grid-template-columns: 1fr 1fr; }
  .catalog-search { gap: 10px; padding-left: 12px; }
  .catalog-search > svg { display: none; }
  .catalog-search .button { padding-inline: 15px; }
  .footer { gap: 12px; }
  .footer > span { width: 100%; margin: 0; }
}
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; } }
```

### `frontend/src/components/Header.jsx`

Arquivo de aplicação completo.

```jsx
import { Film, Search, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function search(event) {
    event.preventDefault()
    navigate(`/buscar?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
  }

  return (
    <header className="header">
      <div className="header-inner page-width">
        <Link to="/" aria-label="Acervo — início" className="brand"><Film aria-hidden="true" /> ACERVO<span>•</span></Link>
        <nav aria-label="Navegação principal" className="navigation">
          <NavLink to="/" end>Início</NavLink>
          <NavLink to="/categorias">Categorias</NavLink>
          <NavLink to="/minha-lista">Minha lista</NavLink>
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label={searchOpen ? 'Fechar busca' : 'Abrir busca'} aria-expanded={searchOpen} aria-controls="site-search" onClick={() => setSearchOpen(!searchOpen)}>{searchOpen ? <X /> : <Search />}</button>
          <details className="profile">
            <summary aria-label="Perfil de demonstração de Sócrates">S</summary>
            <div className="profile-menu"><strong>Sócrates</strong><span>Perfil de demonstração</span><p>Login e contas estarão disponíveis na Etapa 6.</p></div>
          </details>
        </div>
      </div>
      {searchOpen && <form id="site-search" onSubmit={search} className="search-bar page-width">
        <Search size={20} aria-hidden="true" />
        <input autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque títulos, descrições ou categorias" aria-label="Buscar vídeos" />
        <button type="submit" className="button button-accent">Buscar</button>
      </form>}
    </header>
  )
}
```

### `frontend/src/components/Hero.jsx`

Arquivo de aplicação completo.

```jsx
import { ArrowUpRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDuration } from '../utils/format'

export default function Hero({ video }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img className="hero-image" src={video.thumbnail} alt="Dunas e lagoas dos Lençóis Maranhenses" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="hero-content page-width">
        <p className="eyebrow"><span /> SEU PRÓXIMO PLAY</p>
        <h1 id="hero-title">O mundo<br /><em>lá fora.</em></h1>
        <div className="hero-meta"><strong>{video.category}</strong><span>2026</span><span>{formatDuration(video.duration)}</span><span className="quality-tag">HD</span></div>
        <p className="hero-description">{video.subtitle} {video.description}</p>
        <div className="hero-buttons"><Link className="button button-accent" to={`/video/${video.id}`}><Play size={19} fill="currentColor" /> Assistir agora</Link><Link className="button button-glass" to="/categorias?categoria=Viagens">Explorar viagens <ArrowUpRight size={19} /></Link></div>
        <p className="hero-caption">EM DESTAQUE <span>{video.title}</span></p>
      </div>
      <div className="hero-index" aria-hidden="true"><strong>01</strong><span>/ 08</span><i /></div>
    </section>
  )
}
```

### `frontend/src/components/VideoCard.jsx`

Arquivo de aplicação completo.

```jsx
import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDuration } from '../utils/format'

export default function VideoCard({ video, showProgress = false }) {
  return (
    <Link to={`/video/${video.id}`} className="video-card group" aria-label={`Assistir ${video.title}`}>
      <div className="thumbnail">
        <img src={video.thumbnail} alt="" loading="lazy" width="640" height="360" />
        <span className="card-play"><Play size={23} fill="currentColor" aria-hidden="true" /></span>
        <span className="duration">{formatDuration(video.duration)}</span>
        {showProgress && <div className="progress-track" role="progressbar" aria-label={`Progresso em ${video.title}`} aria-valuenow={video.progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${video.progress}%` }} /></div>}
      </div>
      <div className="card-info"><h3>{video.title}</h3><p>{video.category}{showProgress ? ` · ${video.progress}% assistido` : ' · 2026'}</p></div>
    </Link>
  )
}
```

### `frontend/src/components/VideoRow.jsx`

Arquivo de aplicação completo.

```jsx
import { useId, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import VideoCard from './VideoCard'

export default function VideoRow({ title, subtitle, videos, showProgress = false }) {
  const track = useRef(null)
  const id = useId()
  if (!videos.length) return null
  function scroll(direction) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.current.scrollBy({ left: direction * track.current.clientWidth * 0.85, behavior: reducedMotion ? 'instant' : 'smooth' })
  }
  return (
    <section className="video-section" aria-labelledby={id}>
      <div className="row-heading"><div><h2 id={id}>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
        <div className="row-controls"><button className="icon-button" onClick={() => scroll(-1)} aria-label={`Voltar em ${title}`}><ChevronLeft size={20} /></button><button className="icon-button" onClick={() => scroll(1)} aria-label={`Avançar em ${title}`}><ChevronRight size={20} /></button></div>
      </div>
      <div ref={track} className="video-track">{videos.map((video) => <VideoCard key={video.id} video={video} showProgress={showProgress} />)}</div>
    </section>
  )
}
```

### `frontend/src/pages/Catalog.jsx`

Arquivo de aplicação completo.

```jsx
import { Link, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import VideoCard from '../components/VideoCard'
import { getCategories, getVideos, searchVideos } from '../services/catalog'

export default function Catalog({ mode }) {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const category = params.get('categoria') || ''
  const isFavorites = mode === 'favorites'
  const isSearch = mode === 'search'
  const videos = isFavorites ? getVideos().filter((video) => video.favorite) : searchVideos(query, category)
  const title = isFavorites ? 'Minha lista' : isSearch ? 'Encontre seu próximo play.' : 'Cada momento, um universo.'

  function search(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setParams({ q: form.get('q') || '' })
  }

  return (
    <div className="page-width catalog-page">
      <p className="eyebrow">SEU ACERVO</p><h1>{title}</h1>
      {isFavorites && <p className="muted mb-8">Seleção fictícia desta primeira versão. Salvar e remover favoritos chega na Etapa 7.</p>}
      {isSearch && <form className="catalog-search" onSubmit={search}><Search aria-hidden="true" /><input name="q" key={query} defaultValue={query} aria-label="Termo da busca" placeholder="Título, descrição ou categoria" type="search" /><button className="button button-accent">Buscar</button></form>}
      {!isFavorites && !isSearch && <nav aria-label="Filtrar por categoria" className="category-chips"><button className={`chip ${!category ? 'selected' : ''}`} onClick={() => setParams({})}>Todos</button>{getCategories().map((item) => <button aria-pressed={category === item} key={item} className={`chip ${category === item ? 'selected' : ''}`} onClick={() => setParams({ categoria: item })}>{item}</button>)}</nav>}
      <p className="result-count" role="status">{videos.length} {videos.length === 1 ? 'vídeo' : 'vídeos'}{query ? ` para “${query}”` : ''}</p>
      {videos.length ? <div className="video-grid">{videos.map((video) => <VideoCard key={video.id} video={video} />)}</div> : <div className="empty-state"><h2>Nenhum vídeo por aqui.</h2><p>Tente outro título ou categoria.</p><Link className="button button-glass" to="/categorias">Ver todo o acervo</Link></div>}
    </div>
  )
}
```

### `frontend/src/pages/Home.jsx`

Arquivo de aplicação completo.

```jsx
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import VideoRow from '../components/VideoRow'
import { getCategories, getVideos } from '../services/catalog'

export default function Home() {
  const videos = getVideos()
  const featured = videos.find((video) => video.featured)
  return (
    <>
      <Hero video={featured} />
      <div className="page-width home-content">
        <nav className="category-chips" aria-label="Explorar categorias"><span className="chip selected">Para você</span>{getCategories().map((category) => <Link className="chip" key={category} to={`/categorias?categoria=${encodeURIComponent(category)}`}>{category}</Link>)}</nav>
        <VideoRow title="Continue de onde parou" subtitle="Sua próxima pausa pode esperar." videos={videos.filter((video) => video.progress > 0)} showProgress />
        <VideoRow title="Novos no seu acervo" videos={[...videos].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))} />
        <VideoRow title="Os mais assistidos" videos={[...videos].sort((a, b) => b.views - a.views)} />
        {getCategories().map((category) => <VideoRow key={category} title={category} videos={videos.filter((video) => video.category === category)} />)}
      </div>
    </>
  )
}
```

### `frontend/src/pages/NotFound.jsx`

Arquivo de aplicação completo.

```jsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return <div className="page-width empty-state not-found"><p className="eyebrow">404</p><h1>Essa cena não está no acervo.</h1><p>O vídeo ou endereço solicitado não foi encontrado.</p><Link to="/" className="button button-accent">Voltar ao início</Link></div>
}
```

### `frontend/src/pages/Video.jsx`

Arquivo de aplicação completo.

```jsx
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getVideo, getVideos } from '../services/catalog'
import { formatDate, formatDuration } from '../utils/format'
import VideoRow from '../components/VideoRow'
import NotFound from './NotFound'

export default function Video() {
  const { id } = useParams()
  const video = getVideo(id)
  // O App remonta esta página ao trocar a URL, limpando erros do vídeo anterior.
  const [failed, setFailed] = useState(false)
  if (!video) return <NotFound />
  const related = getVideos().filter((item) => item.category === video.category && item.id !== id)

  return (
    <div className="page-width watch-page">
      <Link to="/" className="back-link"><ArrowLeft size={18} /> Voltar ao início</Link>
      <div className="player-frame">
        <video key={video.id} controls playsInline preload="metadata" poster={video.thumbnail} onError={() => setFailed(true)} aria-label={`Player de ${video.title}`}>
          <source src={video.source} type="video/mp4" onError={() => setFailed(true)} />
          Seu navegador não suporta vídeo HTML5.
        </video>
      </div>
      {failed && <p role="alert" className="error-message">Não foi possível carregar o MP4. Confira se o arquivo existe em frontend/public/media/demo.mp4 e recarregue a página.</p>}
      <p className="demo-notice">PRÉVIA · Este player reproduz um clipe de flores de demonstração. Os títulos, imagens e durações do catálogo são fictícios.</p>
      <div className="video-detail"><div><p className="eyebrow">{video.category}</p><h1>{video.title}</h1><p className="video-description">{video.description}</p></div><dl><div><dt>Publicado em</dt><dd>{formatDate(video.publishedAt)}</dd></div><div><dt>Duração do catálogo</dt><dd>{formatDuration(video.duration)} · demonstrativa</dd></div><div><dt>Visualizações fictícias</dt><dd>{video.views}</dd></div></dl></div>
      <VideoRow title="Mais desse universo" videos={related} />
    </div>
  )
}
```

### `frontend/src/data/videos.js`

Arquivo de aplicação completo.

```javascript
// Somente demonstração da Etapa 1. A API substituirá este arquivo na Etapa 2.
// Títulos, duração, datas, visualizações e progresso são fictícios.
// Todos os cards reproduzem o mesmo pequeno MP4 de teste (flores, CC0).
export const categories = ['Viagens', 'Projetos', 'Jogos']

export const videos = [
  { id: 'costa', title: 'Entre dunas e lagoas', subtitle: 'Um dia inteiro para não fazer planos.', description: 'Estradas de areia, vento no rosto e água doce como destino. Um diário visual de uma viagem sem pressa pelos Lençóis Maranhenses.', category: 'Viagens', duration: 754, publishedAt: '2026-09-20', thumbnail: '/images/coast.jpg', source: '/media/demo.mp4', progress: 0, views: 128, favorite: true, featured: true },
  { id: 'montanhas', title: 'Acima das nuvens', description: 'Uma trilha, alguns amigos e a vista que fez cada passo valer a pena.', category: 'Viagens', duration: 1080, publishedAt: '2026-09-18', thumbnail: '/images/mountains.jpg', source: '/media/demo.mp4', progress: 42, views: 87, favorite: false },
  { id: 'laboratorio', title: 'Ideias que saem do papel', description: 'Bastidores de um projeto no laboratório: primeiros testes, ajustes e pequenas descobertas.', category: 'Projetos', duration: 920, publishedAt: '2026-09-16', thumbnail: '/images/project.jpg', source: '/media/demo.mp4', progress: 65, views: 104, favorite: true },
  { id: 'partida', title: 'Só mais uma partida', description: 'Uma noite de jogos com os amigos e os melhores momentos da sessão.', category: 'Jogos', duration: 1425, publishedAt: '2026-09-14', thumbnail: '/images/gaming.jpg', source: '/media/demo.mp4', progress: 23, views: 210, favorite: true },
  { id: 'oceano', title: 'O tempo das ondas', description: 'Águas transparentes e um barco que virou parte da paisagem. Memórias de uma viagem ao oceano.', category: 'Viagens', duration: 485, publishedAt: '2026-09-12', thumbnail: '/images/ocean.jpg', source: '/media/demo.mp4', progress: 0, views: 64, favorite: false },
  { id: 'codigo', title: 'Por trás do código', description: 'Do primeiro componente à primeira tela: um pequeno registro do processo de criar algo novo.', category: 'Projetos', duration: 1180, publishedAt: '2026-09-10', thumbnail: '/images/project.jpg', source: '/media/demo.mp4', progress: 0, views: 92, favorite: false },
  { id: 'estrada', title: 'O caminho também conta', description: 'Paradas inesperadas e paisagens guardadas pelo caminho.', category: 'Viagens', duration: 835, publishedAt: '2026-09-08', thumbnail: '/images/mountains.jpg', source: '/media/demo.mp4', progress: 0, views: 76, favorite: true },
  { id: 'highlights', title: 'Aquela jogada', description: 'Uma seleção dos momentos mais divertidos da semana.', category: 'Jogos', duration: 360, publishedAt: '2026-09-06', thumbnail: '/images/gaming.jpg', source: '/media/demo.mp4', progress: 0, views: 156, favorite: false },
]
```

### `frontend/src/services/catalog.js`

Arquivo de aplicação completo.

```javascript
import { categories, videos } from '../data/videos.js'

// Os componentes consultam este serviço, não importam o mock diretamente.
// Na Etapa 2, estes métodos passam a consultar nossa API Fastify.
export function getVideos() {
  return [...videos]
}

export function getVideo(id) {
  return videos.find((video) => video.id === id)
}

export function getCategories() {
  return [...categories]
}

export function searchVideos(query = '', category = '') {
  const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const term = normalize(query.trim())
  return videos.filter((video) => (
    (!category || video.category === category) &&
    normalize(`${video.title} ${video.description} ${video.category}`).includes(term)
  ))
}
```

### `frontend/src/utils/format.js`

Arquivo de aplicação completo.

```javascript
export function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date(`${value}T12:00:00`))
}
```

## 7. Teste antes de seguir

Na pasta `frontend/`, execute `npm run dev` e teste:

1. Home e rolagem horizontal dos cards.
2. Assistir agora → play no MP4 de flores (aproximadamente 5 segundos).
3. Categorias → Jogos → dois resultados.
4. Busca `codigo` → Por trás do código; busca `laboratorio` → Ideias que saem do papel.
5. Busca inexistente → estado vazio; `/video/inexistente` → 404.
6. Minha lista → aviso de dados fictícios.
7. Janela estreita ou celular → navegação utilizável e linhas com gesto de arrastar.
8. Tecla Tab → foco visível em links e controles.

O tempo real do player é de aproximadamente 5 segundos; os tempos e progressos do catálogo são fictícios. O progresso não é salvo nesta etapa. Não há seleção de qualidade, HLS, login ou painel administrativo.

Para conferir o build:

```bash
npm run build
npm run preview
```

A compilação e a busca foram verificadas nesta entrega. O teste visual no navegador e em celulares ainda precisa ser feito. Veja todos os detalhes e o roteiro de Git no README.md da raiz.

Quando algo falhar, copie o comando executado, o caminho em que o terminal estava e a mensagem completa de erro. Vamos corrigir antes da Etapa 2.
