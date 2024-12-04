import type { Prisma } from '@prisma/client'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

interface IBookingItemProps {
  booking?: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

// TODO: receber agendamento como propriedades
export const BookingItem = ({ booking }: IBookingItemProps) => {
  const isConfirmed = isFuture(booking?.date!)
  const month = format(booking?.date!, 'MMMM', { locale: ptBR })
  const day = format(booking?.date!, 'dd', { locale: ptBR })
  const hour = format(booking?.date!, 'HH:mm', { locale: ptBR })

  return (
    <Card className="min-w-full">
      <CardContent className="flex justify-between p-0">
        <div className="flex flex-col gap-2 py-5 pl-5">
          <Badge
            className="w-fit"
            variant={isConfirmed ? 'default' : 'secondary'}
          >
            {isConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>
          <h3 className="font-semibold">{booking?.service.name}</h3>
          <div className="flex items-center">
            <Avatar className="size-6">
              <AvatarImage src={booking?.service.imageUrl} />
            </Avatar>
            <p className="text-sm">{booking?.service.name}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
          <p className="text-sm capitalize">{month}</p>
          <p className="text-2xl">{day}</p>
          <p className="text-sm">{hour}</p>
        </div>
      </CardContent>
    </Card>
  )
}
