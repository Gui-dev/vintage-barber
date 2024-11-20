import { BarbershopItem } from '@/components/barbershop-item'
import { BookingItem } from '@/components/booking-item'
import { Header } from '@/components/header'
import { QuickSearch } from '@/components/quick-search'
import { Subtitle } from '@/components/subtitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { quickSearchOptions } from '@/constants/quick-search'
import { prisma } from '@/lib/prisma'
import { Search } from 'lucide-react'
import Image from 'next/image'

const Home = async () => {
  const babershops = await prisma.barbershop.findMany({})
  const popularBabershops = await prisma.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  })

  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="font-bold text-xl">Olá, Bruce Wayne</h2>
        <p>Quinta-feira, 14 de novembro</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca" />
          <Button>
            <Search />
          </Button>
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

        <Subtitle>Agendamentos</Subtitle>

        <BookingItem />

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
