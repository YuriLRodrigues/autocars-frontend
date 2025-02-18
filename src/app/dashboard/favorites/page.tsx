import { FavoritesList } from './components/favorites-list'
import { Container } from '@/components/interface/container'

export default function FavoritesPage() {
  return (
    <Container.Content>
      <Container.Header>
        <Container.Title>Favoritos</Container.Title>
        <Container.Description>
          Aqui você pode visualizar os veículos adicionados à sua lista de favoritos. Clique na &quot;estrela&quot; para
          remover um favorito.
        </Container.Description>
      </Container.Header>
      <section className="min-h-[calc(100vh-330px)]">
        <FavoritesList />
      </section>
    </Container.Content>
  )
}
