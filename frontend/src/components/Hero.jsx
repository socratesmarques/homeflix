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
