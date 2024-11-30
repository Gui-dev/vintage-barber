'use client'

import { createBooking } from '@/app/actions/create-booking'
import { getBookings } from '@/app/actions/get-bookings'
import { formatCurrency } from '@/lib/format-currency'
import { getTimeList } from '@/lib/get-time-list'
import { queryClient } from '@/lib/query-client'
import type { Barbershop, BarbershopService } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { format, set } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { SignInDialog } from './sign-in-dialog'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Card, CardContent } from './ui/card'
import { Dialog, DialogContent } from './ui/dialog'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

interface IBarbershopItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, 'name'>
}

export const BarbershopServiceItem = ({
  service,
  barbershop,
}: IBarbershopItemProps) => {
  const { data, status } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedHour, setSelectedHour] = useState<string | undefined>(
    undefined,
  )
  const price = formatCurrency(Number(service.price))
  const query = useQuery({
    queryKey: ['get-bookings', service.id, selectedDay],
    queryFn: () =>
      getBookings({
        serviceId: service.id,
        date: selectedDay ?? new Date(),
      }),
    enabled: !!selectedDay,
  })

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleSelectHour = (hour: string | undefined) => {
    setSelectedHour(hour)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedHour || !selectedDay) {
        toast.error('Selecione uma data e um horário')
        return
      }
      const minutes = Number(selectedHour.split(':')[1])
      const hours = Number(selectedHour.split(':')[0])
      const date = set(selectedDay, {
        minutes,
        hours,
      })
      await createBooking({
        userId: 'cm3se9joi0000eokgbko6efrs',
        serviceId: service.id,
        date,
      })
      queryClient.invalidateQueries({ queryKey: ['get-bookings'] })
      setSelectedDay(undefined)
      setSelectedHour(undefined)
      toast.success('Reserva criada com sucesso')
    } catch (error) {
      console.log('ERROR: ', error)
      toast.error('Erro ao tentar criar reserva')
    }
  }

  if (!data?.user) {
    return (
      <>
        <Dialog open={status === 'unauthenticated'}>
          <DialogContent className="w-[90%] rounded-md">
            <SignInDialog />

            <Button variant="link" asChild>
              <Link href="/">Voltar pra Home</Link>
            </Button>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px] rounded-lg">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="space-y-2">
            <h1 className="font-semibold">{service.name}</h1>
            <p className="text-gray-400 text-sm">{service.description}</p>
            <div className="flex items-center justify-between">
              <p className="font-bold text-primary text-sm">{price}</p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" size="sm">
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="scrollbar-hidden overflow-y-auto px-0">
                  <SheetHeader>
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>

                  <div className="border-b border-solid py-5">
                    <Calendar
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      mode="single"
                      fromDate={new Date()}
                      locale={ptBR}
                      styles={{
                        head_cell: {
                          width: '100%',
                          textTransform: 'capitalize',
                        },
                        cell: {
                          width: '100%',
                        },
                        button: {
                          width: '100%',
                        },
                        nav_button_previous: {
                          width: '32px',
                          height: '32px',
                        },
                        nav_button_next: {
                          width: '32px',
                          height: '32px',
                        },
                        caption: {
                          textTransform: 'capitalize',
                        },
                      }}
                    />
                  </div>

                  {selectedDay && query.data && (
                    <div className="scrollbar-hidden flex items-center gap-3 overflow-y-auto border-b border-solid p-5">
                      {getTimeList(query.data).map(time => {
                        return (
                          <Button
                            key={time}
                            variant={
                              selectedHour === time ? 'default' : 'outline'
                            }
                            className=" rounded-full"
                            onClick={() => handleSelectHour(time)}
                          >
                            {time}
                          </Button>
                        )
                      })}
                    </div>
                  )}
                  {selectedHour && selectedDay && (
                    <div className="p-5">
                      <Card>
                        <CardContent className="space-y-3 p-3">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="font-bold text-sm">{price}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-gray-400 text-sm">Data</h2>
                            <p className="text-sm">
                              {format(selectedDay, "d' de 'MMMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-gray-400 text-sm">Horário</h2>
                            <p className="text-sm">{selectedHour}h</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-gray-400 text-sm">Barbearia</h2>
                            <p className="text-sm">{barbershop.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  <SheetFooter className="mt-6 px-5">
                    <SheetClose asChild>
                      <Button
                        onClick={handleCreateBooking}
                        disabled={!selectedDay || !selectedHour}
                      >
                        Confirmar
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
