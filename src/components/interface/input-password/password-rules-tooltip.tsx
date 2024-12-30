import { BorderBeam } from '@/components/ui/border-beam'
import { Icon } from '@/components/ui/icon'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'

type PasswordRulesTooltipProps = {
  password: string
}

const passwordRules = [
  { regex: /(?=.*\d)/, label: 'Pelo menos um número' },
  { regex: /(?=.*[a-z])/, label: 'Pelo menos uma letra minúscula' },
  { regex: /(?=.*[A-Z])/, label: 'Pelo menos uma letra maiúscula' },
  { regex: /(?=.*[\W_])/, label: 'Pelo menos um caractere especial' },
  { regex: /.{6,}/, label: 'No mínimo 6 caracteres' },
]

export const PasswordRulesTooltip = ({ password }: PasswordRulesTooltipProps) => {
  const fulfilledRules = passwordRules.filter((rule) => rule.regex.test(password))

  const progressValue = Math.round((fulfilledRules.length / passwordRules.length) * 100)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger type="button">
          <Icon name="Info" className="size-4 text-primary" />
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-popover shadow-md dark:shadow-sm dark:shadow-gray-600">
          <div className="space-y-2">
            <Progress value={progressValue} className="w-full" />
            <p className="mt-2 text-sm text-gray-500">
              {fulfilledRules.length} de {passwordRules.length} requisitos atendidos
            </p>
            <ul className="space-y-1 text-sm">
              {passwordRules.map((rule) => (
                <li
                  key={rule.label}
                  className={cn(
                    'flex items-center',
                    `${fulfilledRules.includes(rule) ? 'text-green-600' : 'text-gray-400'}`,
                  )}
                >
                  <span className="mr-2">
                    {fulfilledRules.includes(rule) ? (
                      <Icon name="Check" className="size-3" />
                    ) : (
                      <Icon name="X" className="size-3" />
                    )}
                  </span>
                  {rule.label}
                </li>
              ))}
            </ul>
          </div>
          <BorderBeam size={210} duration={12} delay={9} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
