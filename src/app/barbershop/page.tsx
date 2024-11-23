import { BarbershopItem } from '@/components/barbershop-item'
import { Header } from '@/components/header'
import { Search } from '@/components/search'
import { prisma } from '@/lib/prisma'

interface IBarbershopParams {
  searchParams: Promise<{
    title?: string
    services?: string
  }>
}

const Barbershop = async ({ searchParams }: IBarbershopParams) => {
  const { title, services } = await searchParams
  const barbershops = await prisma.barbershop.findMany({
    where: {
      OR: [
        title
          ? {
              name: {
                contains: title,
                mode: 'insensitive',
              },
            }
          : {},
        services
          ? {
              services: {
                some: {
                  name: {
                    contains: services,
                    mode: 'insensitive',
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  return (
    <>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mt-6 mb-3 font-bold text-gray-400 text-xs uppercase">
          Resultados para &quot;
          <span className="font-bold text-primary">{title || services}</span>
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map(barbershop => {
            return (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Barbershop
