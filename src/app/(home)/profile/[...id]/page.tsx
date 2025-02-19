import { Suspense } from 'react'

import { UserAdvertisements, UserAdvertisementsSkeleton } from './components/user-advertisements'
import { Container } from '@/components/interface/container'

type UserprofileProps = {
  params: Promise<{
    id: string
  }>
}

export default async function UserProfilePage({ params }: UserprofileProps) {
  const { id } = await params

  return (
    <Container.Content className="min-h-[90vh] pt-16">
      <Container.Header>
        <Container.Title>Anúncios do usuário</Container.Title>
        <Container.Description>Aqui você pode visualizar todos os anúncios do usuário buscado.</Container.Description>
      </Container.Header>
      <div className="!mt-10 flex flex-wrap justify-between gap-10">
        <Suspense fallback={<UserAdvertisementsSkeleton />}>
          <UserAdvertisements userId={id} />
        </Suspense>
      </div>
    </Container.Content>
  )
}
