import { Container } from '@/components/interface/container'
import { Icon } from '@/components/ui/icon'
import { MagicCard } from '@/components/ui/magic-card'

export function Features() {
  return (
    <Container.Content>
      <Container.Header className="*:mx-auto *:text-center">
        <Container.Title>O que oferecemos</Container.Title>
        <Container.Description className="max-w-[500px]">
          Auto cars oferece uma variedade de benefícios para você encontrar o seu carro ideal.
        </Container.Description>
      </Container.Header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MagicCard className="cursor-pointer flex-col items-center justify-center whitespace-nowrap px-2 py-6 text-center shadow-2xl">
          <Icon name="Shield" className="mx-auto h-12 w-12 text-primary" />
          <h3 className="font-bold">Certificados com mecânicos</h3>
          <p className="text-wrap text-sm text-gray-500 dark:text-gray-200">
            Auto cars dará todas as garantias que você precisa
          </p>
        </MagicCard>

        <MagicCard className="cursor-pointer flex-col items-center justify-center whitespace-nowrap px-2 py-6 text-center shadow-2xl">
          <Icon name="Clock" className="mx-auto h-12 w-12 text-primary" />
          <h3 className="font-bold">Fale com o vendedor</h3>
          <p className="text-wrap text-sm text-gray-500 dark:text-gray-200">
            Entre em contato diretamente para negociar e tirar todas as suas dúvidas.
          </p>
        </MagicCard>
        <MagicCard className="cursor-pointer flex-col items-center justify-center whitespace-nowrap px-2 py-6 text-center shadow-2xl">
          <Icon name="CreditCard" className="mx-auto h-12 w-12 text-primary" />
          <h3 className="font-bold">Custo benefício</h3>
          <p className="text-wrap text-sm text-gray-500 dark:text-gray-200">
            Ofertas selecionadas com a melhor qualidade e preços imbatíveis.
          </p>
        </MagicCard>
      </div>
    </Container.Content>
  )
}
