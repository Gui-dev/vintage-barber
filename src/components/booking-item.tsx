'use client'

import { cancelBooking } from '@/app/actions/cancel-booking'
import { formatCurrency } from '@/lib/format-currency'
import type { Prisma } from '@prisma/client'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { PhoneItem } from './phone-item'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

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

export const BookingItem = ({ booking }: IBookingItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data } = useSession()
  const isConfirmed = isFuture(booking?.date!)
  const month = format(booking?.date!, 'MMMM', { locale: ptBR })
  const day = format(booking?.date!, 'dd', { locale: ptBR })
  const hour = format(booking?.date!, 'HH:mm', { locale: ptBR })
  const price = formatCurrency(Number(booking?.service.price))
  const formattedDay = format(booking?.date!, "d' de 'MMMM", {
    locale: ptBR,
  })

  const handleCancelBooking = async () => {
    try {
      await cancelBooking({
        userId: data?.user.id,
        bookingId: booking?.id!,
      })
      setIsMenuOpen(false)
      toast.info('Reserva cancelada com sucesso')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao tentar cancelar a reserva. Tente novamente!')
    }
  }

  const handleOpenMenu = (isOpen: boolean) => {
    setIsMenuOpen(isOpen)
  }

  return (
    <Sheet open={isMenuOpen} onOpenChange={handleOpenMenu}>
      <SheetTrigger className="w-full min-w-[90%] cursor-pointer" asChild>
        <Card className=" min-w-[90%]">
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
      </SheetTrigger>

      <SheetContent className="w-[90%] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            src="/map.png"
            alt="Imagem de um mapa onde está localizado a barbearia"
            fill
            className="rounded-xl object-cover"
          />

          <Card className="z-10 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage
                  src={booking?.service.barbershop.imageUrl}
                  alt={booking?.service.barbershop.name}
                  title={booking?.service.barbershop.name}
                />
              </Avatar>
              <div className="text-center">
                <h3 className="font-bold text-sm">
                  {booking?.service.barbershop.name}
                </h3>
                <p className="text-xs">{booking?.service.barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? 'default' : 'secondary'}
          >
            {isConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>

          <Card className="mt-3 mb-6">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking?.service.name}</h2>
                <p className="font-bold text-sm">{price}</p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-gray-400 text-sm">Data</h2>
                <p className="text-sm">{formattedDay}</p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-gray-400 text-sm">Horário</h2>
                <p className="text-sm">{hour}h</p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-gray-400 text-sm">Barbearia</h2>
                <p className="text-sm">{booking?.service.barbershop.name}</p>
              </div>
            </CardContent>
          </Card>

          {booking?.service.barbershop.phones.map((phone, index) => {
            return <PhoneItem key={String(index)} phone={phone} />
          })}
        </div>

        <SheetFooter className="mt-6">
          <div className="flex items-center justify-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full"
                  disabled={!isConfirmed}
                >
                  Cancelar reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Você quer mesmo cancelar sua reserva ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja realizar o cancelamento ? Essa ação é
                    irreversível.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row items-center justify-center gap-3">
                  <AlertDialogCancel className="m-0 w-full appearance-none">
                    Não
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="m-0 w-full appearance-none bg-red-400 hover:bg-red-500"
                    onClick={handleCancelBooking}
                  >
                    Sim
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
