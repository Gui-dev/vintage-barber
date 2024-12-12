import { BarbershopItem } from '@/components/barbershop-item'
import { BookingItem } from '@/components/booking-item'
import { Header } from '@/components/header'
import { QuickSearch } from '@/components/quick-search'
import { Search } from '@/components/search'
import { Subtitle } from '@/components/subtitle'
import { quickSearchOptions } from '@/constants/quick-search'
import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { getConfirmedBookings } from './data/get-confirmed-bookings'

const Home = async () => {
  const data = await getServerSession(authOptions)
  const babershops = await prisma.barbershop.findMany({})
  const popularBabershops = await prisma.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  })
  const bookings = await getConfirmedBookings()

  const today = format(new Date(), "EEEE', 'dd' de 'MMMM", {
    locale: ptBR,
  })

  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="font-bold text-xl">
          Olá,{' '}
          <span className="capitalize">
            {data?.user ? data?.user.name : 'bem vindo'}
          </span>
        </h2>
        <p>{today}</p>

        <div className="mt-6">
          <Search />
        </div>

        <div className="scrollbar-hidden mt-6 flex gap-3 overflow-auto">
          {quickSearchOptions.map(option => {
            return <QuickSearch option={option} key={option.title} />
          })}
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Uma ilustração de um barbeiro cortando o cabelo de um homem"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {bookings.length > 0 && (
          <>
            <Subtitle>Agendamentos</Subtitle>

            <div className="scrollbar-hidden flex gap-4 overflow-x-auto">
              {bookings.map(booking => {
                return (
                  <BookingItem
                    key={booking.id}
                    booking={JSON.parse(JSON.stringify(booking))}
                  />
                )
              })}
            </div>
          </>
        )}

        <Subtitle>Recomendados</Subtitle>

        <div className="scrollbar-hidden flex gap-4 overflow-auto">
          {babershops.map(barbershop => {
            return (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            )
          })}
        </div>

        <Subtitle>Populares</Subtitle>

        <div className="scrollbar-hidden flex gap-4 overflow-auto">
          {popularBabershops.map(barbershop => {
            return (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Home
