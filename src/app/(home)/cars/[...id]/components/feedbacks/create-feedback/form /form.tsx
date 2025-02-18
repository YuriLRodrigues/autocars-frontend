'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useCreateFeedbackForm } from './use-create-feedback'

export const CreateFeedbackForm = () => {
  const { form, isSubmitting, handleSubmit, isAnyFieldFilled, hoveredStar, setHoveredStar } = useCreateFeedbackForm()

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="w-full space-y-3 p-1">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Título" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Comentário" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stars"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.onChange(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="p-1"
                    >
                      <Icon
                        name="Star"
                        fill="currentColor"
                        className={`size-6 ${
                          star <= (hoveredStar || field.value) ? 'text-yellow-500' : 'text-gray-300'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="!mb-6 flex flex-wrap items-center justify-end gap-4 md:col-span-2">
          <Button
            type="submit"
            icon={<Icon name="Check" />}
            iconPlacement="right"
            effect="shine"
            className="h-8"
            disabled={!isAnyFieldFilled || isSubmitting}
          >
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  )
}
