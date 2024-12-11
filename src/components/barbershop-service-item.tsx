'use client'

import { createBooking } from '@/app/actions/create-booking'
import { getBookings } from '@/app/actions/get-bookings'
import { formatCurrency } from '@/lib/format-currency'
import { getTimeList } from '@/lib/get-time-list'
import { queryClient } from '@/lib/query-client'
import type { Barbershop, BarbershopService } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { set } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { BookingSummary } from './booking-summary'
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
  const router = useRouter()
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

  const timeList = useMemo(() => {
    if (!selectedDay) {
      return []
    }

    return getTimeList({
      bookings: query.data ?? [],
      selectedDay,
    })
  }, [query.data, selectedDay])

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedHour) return

    return set(selectedDay, {
      hours: Number(selectedHour.split(':')[0]),
      minutes: Number(selectedHour.split(':')[1]),
    })
  }, [selectedDay, selectedHour])

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleSelectHour = (hour: string | undefined) => {
    setSelectedHour(hour)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate) {
        toast.error('Selecione uma data e um horário')
        return
      }

      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      })
      queryClient.invalidateQueries({ queryKey: ['get-bookings'] })
      setSelectedDay(undefined)
      setSelectedHour(undefined)
      toast.success('Reserva criada com sucesso', {
        action: {
          label: 'Ver agendamento',
          onClick: () => router.push('/bookings'),
        },
      })
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
                      {timeList.map(time => {
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
                      {timeList.length < 1 && (
                        <p className="text-xs">
                          Não há horários disponíveis para este dia
                        </p>
                      )}
                    </div>
                  )}
                  {selectedDate && (
                    <div className="p-5">
                      <BookingSummary
                        barbershop={barbershop}
                        service={service}
                        selectedDay={selectedDate}
                      />
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
