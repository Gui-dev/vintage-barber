'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'

const searchSchema = z.object({
  search: z.string().trim().min(1, { message: 'Digite algo para buscar' }),
})

type SearchSchemaData = z.infer<typeof searchSchema>

export const Search = () => {
  const route = useRouter()
  const form = useForm<SearchSchemaData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
  })

  const handleSearchSubmit = ({ search }: SearchSchemaData) => {
    route.push(`/barbershop?title=${search}`)
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-row gap-2"
        onSubmit={form.handleSubmit(handleSearchSubmit)}
      >
        <FormField
          name="search"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Faça sua busca" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  )
}
