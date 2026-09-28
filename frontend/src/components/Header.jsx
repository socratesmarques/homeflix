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
