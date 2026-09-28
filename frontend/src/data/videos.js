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
