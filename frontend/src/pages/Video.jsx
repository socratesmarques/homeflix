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
