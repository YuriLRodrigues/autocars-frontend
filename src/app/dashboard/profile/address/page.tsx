import { ProfileTabs } from '../components/profile-tabs'
import { UpdateAddressForm } from './components/form'
import { Container } from '@/components/interface/container'

export default function AddressPage() {
  return (
    <Container.Content>
      <Container.Header>
        <Container.Title>Endereço</Container.Title>
        <Container.Description>Edite aqui as suas informações de endereço</Container.Description>
      </Container.Header>
      <div className="!mt-10 flex flex-wrap justify-between gap-10">
        <ProfileTabs />
        <UpdateAddressForm />
      </div>
    </Container.Content>
  )
}
