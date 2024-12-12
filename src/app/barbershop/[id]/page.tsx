import { BarbershopServiceItem } from '@/components/barbershop-service-item'
import { PhoneItem } from '@/components/phone-item'
import { SidebarSheet } from '@/components/sidebar-sheet'
import { Subtitle } from '@/components/subtitle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { prisma } from '@/lib/prisma'
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface IBarbershopProps {
  params: Promise<{
    id: string
  }>
}

const Barbershop = async ({ params }: IBarbershopProps) => {
  const { id } = await params
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <>
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 left-4"
          asChild
        >
          <Link href="/" title="Voltar">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 right-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SidebarSheet />
        </Sheet>
      </div>

      <div className="flex flex-col border-b border-solid p-5">
        <h1 className="mb-3 font-bold text-xl">{barbershop.name}</h1>
        <div className="mb-2 flex gap-1">
          <MapPinIcon className="text-primary" />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex gap-1">
          <StarIcon className="fill-primary text-primary" />
          <p className="text-sm">5,0 (389 avaliações)</p>
        </div>
      </div>

      <div className="space-y-2 border-b border-solid p-5">
        <Subtitle>Sobre nós</Subtitle>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>

      <div className="p-5">
        <Subtitle>Serviços</Subtitle>
        <div className="flex flex-col space-y-3 border-b border-solid lg:grid lg:grid-cols-3 lg:gap-3">
          {barbershop.services.map(service => {
            return (
              <BarbershopServiceItem
                key={service.id}
                service={JSON.parse(JSON.stringify(service))}
                barbershop={barbershop}
              />
            )
          })}
        </div>
      </div>

      <div className="p-5">
        <Subtitle>Contato</Subtitle>
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-4">
          {barbershop.phones.map((phone, index) => {
            return <PhoneItem key={String(index)} phone={phone} />
          })}
        </div>
      </div>
    </>
  )
}

export default Barbershop
