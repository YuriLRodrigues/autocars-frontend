import { CarCarousel } from './components/car-carousel'
import { CarDetails } from './components/car-details'
import { Container } from '@/components/interface/container'
import { Button } from '@/components/ui/button'
import { CustomBreadCrumb } from '@/components/ui/custom-breadcrumb'

import { findAdById } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'

type CarsPageProps = {
  params: Promise<{ id: string }>
}

export default async function CarsPage({ params }: CarsPageProps) {
  const { id } = await params

  const adDetails = await findAdById(id)

  return (
    <Container.Content className="space-y-4 pt-16">
      <CustomBreadCrumb />
      <section className="grid gap-x-8 gap-y-5 lg:grid-cols-2">
        {/* todo: criar a suspense com deduplicata e isloading com o react quwery */}
        <CarDetails adDetails={adDetails} advertisementId={id} />
        <CarCarousel images={adDetails.images} />
        <div className="flex flex-wrap items-center justify-center gap-3 lg:hidden">
          <Button effect="shine">Comprar agora</Button>
          <Button variant="secondary" effect="ringHover">
            Adicionar ao carrinho
          </Button>
        </div>
      </section>
      <section>
        <h4 className="text-3xl font-bold tracking-tight">Comentários</h4>
        {/* Comment section */}
      </section>
    </Container.Content>
  )
}
