'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { UserRoles } from '@/@types/user'

import { useFilterUsersForm } from './use-filter-users'

export const FilterUsersForm = () => {
  const { form, handleSubmit, clear } = useFilterUsersForm()

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-3 px-1">
        <span className="hidden font-semibold sm:block">Filtrar usuários</span>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a permissão do usuário" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={UserRoles.Manager}>Administradores</SelectItem>
                  <SelectItem value={UserRoles.Seller}>Vendedores</SelectItem>
                  <SelectItem value={UserRoles.Customer}>Compradores/Usuários Comum</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status do usuário" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ACTIVE">Ativo</SelectItem>
                  <SelectItem value="INACTIVE">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="createdAt"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Ordem de exibição por data" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="asc">Crescente</SelectItem>
                  <SelectItem value="desc">Decrescente</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Ordem de exibição por nome" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="asc">Crescente</SelectItem>
                  <SelectItem value="desc">Decrescente</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="!mt-6 grid grid-cols-2 gap-3">
          <Button size="sm" variant="outline" type="button" onClick={clear}>
            <Icon name="X" className="mr-2 flex-none" />
            Limpar filtros
          </Button>
          <Button size="sm" type="submit">
            <Icon name="Search" className="mr-2" />
            Filtrar resultados
          </Button>
        </div>
      </form>
    </Form>
  )
}
