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
