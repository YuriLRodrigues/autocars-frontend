import React from 'react'

import { Icon } from '@/components/ui/icon'

import { cn } from '@/lib/utils'
import { mappingStepsLabel } from '@/utils/mappings'

type StepsProps = {
  currentStep: 'SIGNUP' | 'ADDRESS' | 'SEND-IMAGES' | 'AD-DATA' | 'AD-DETAILS'
  progress: Record<string, number> // Alterado de progressByStep para progress
  steps?: ('SIGNUP' | 'ADDRESS' | 'SEND-IMAGES' | 'AD-DATA' | 'AD-DETAILS')[]
}

export const Steps = ({
  currentStep,
  steps = ['SIGNUP', 'ADDRESS', 'SEND-IMAGES', 'AD-DATA', 'AD-DETAILS'],
  progress,
}: StepsProps) => {
  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = progress[step] === 100
          const isActive = step === currentStep
          const barProgress = progress[step] ?? 0

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2',
                    isCompleted && 'border-primary bg-primary text-white',
                    isActive && !isCompleted && 'border-primary text-primary',
                    !isCompleted && !isActive && 'border-gray-300 text-gray-300',
                  )}
                >
                  {isCompleted ? <Icon name="Check" className="h-5 w-5" /> : <span>{index + 1}</span>}
                </div>
                <span
                  className={cn(
                    'mx-2 mt-2 w-20 text-wrap text-center text-sm',
                    isCompleted && 'text-primary',
                    isActive && !isCompleted && 'font-semibold text-primary',
                    !isCompleted && !isActive && 'text-gray-300',
                  )}
                >
                  {mappingStepsLabel[step]}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="relative h-[2px] flex-1 bg-gray-300">
                  <div className="absolute h-[2px] bg-primary transition-all" style={{ width: `${barProgress}%` }} />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
