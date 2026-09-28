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
