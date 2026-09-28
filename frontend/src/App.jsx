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
