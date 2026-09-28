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
