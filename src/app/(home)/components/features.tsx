import { Container } from '@/components/interface/container'
import { Card, CardContent } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'

export function Features() {
  return (
    <Container.Content className="bg-foreground/5">
      <Container.Header className="*:mx-auto *:text-center">
        <Container.Title>O que oferecemos</Container.Title>
        <Container.Description className="max-w-[500px]">
          Auto cars oferece uma variedade de benefícios para você encontrar o seu carro ideal.
        </Container.Description>
      </Container.Header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="dark:shadow-stone-800">
          <CardContent className="flex flex-col items-center space-y-2 p-6 text-center">
            <Icon name="Shield" className="h-12 w-12 text-primary" />
            <h3 className="font-bold">Certificados com mecânicos</h3>
            <p className="text-sm text-gray-500 dark:text-gray-200">
              Auto cars dará todas as garantias que você precisa
            </p>
          </CardContent>
        </Card>
        <Card className="dark:shadow-stone-800">
          <CardContent className="flex flex-col items-center space-y-2 p-6 text-center">
            <Icon name="Clock" className="h-12 w-12 text-primary" />
            <h3 className="font-bold">Fale com o vendedor</h3>
            <p className="text-sm text-gray-500 dark:text-gray-200">
              Entre em contato diretamente para negociar e tirar todas as suas dúvidas.
            </p>
          </CardContent>
        </Card>
        <Card className="dark:shadow-stone-800">
          <CardContent className="flex flex-col items-center space-y-2 p-6 text-center">
            <Icon name="CreditCard" className="h-12 w-12 text-primary" />
            <h3 className="font-bold">Custo benefício</h3>
            <p className="text-sm text-gray-500 dark:text-gray-200">
              Ofertas selecionadas com a melhor qualidade e preços imbatíveis.
            </p>
          </CardContent>
        </Card>
      </div>
    </Container.Content>
  )
}
