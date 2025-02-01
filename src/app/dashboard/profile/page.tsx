import { UpdateProfileForm } from './components/form'
import { ProfileTabs } from './components/profile-tabs'
import { Container } from '@/components/interface/container'

export default function ProfilePage() {
  return (
    <Container.Content>
      <Container.Header>
        <Container.Title>Meu perfil</Container.Title>
        <Container.Description>Edite aqui as suas informações de perfil</Container.Description>
      </Container.Header>
      <div className="!mt-10 flex flex-wrap justify-between gap-10">
        <ProfileTabs />
        <UpdateProfileForm />
      </div>
    </Container.Content>
  )
}
