import { formatCurrency } from '@/lib/format-currency'
import type { Barbershop, BarbershopService } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Card, CardContent } from './ui/card'

interface IBookingSummaryProps {
  service: Pick<BarbershopService, 'name' | 'price'>
  barbershop: Pick<Barbershop, 'name'>
  selectedDay: Date
}

export const BookingSummary = ({
  service,
  barbershop,
  selectedDay,
}: IBookingSummaryProps) => {
  const price = formatCurrency(Number(service.price))
  const day = format(selectedDay, "d' de 'MMMM", {
    locale: ptBR,
  })
  const hours = format(selectedDay, 'HH:mm', {
    locale: ptBR,
  })

  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <p className="font-bold text-sm">{price}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-gray-400 text-sm">Data</h2>
          <p className="text-sm">{day}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-gray-400 text-sm">Horário</h2>
          <p className="text-sm">{hours}h</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-gray-400 text-sm">Barbearia</h2>
          <p className="text-sm">{barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}
