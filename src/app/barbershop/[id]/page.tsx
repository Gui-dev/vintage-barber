import { Button } from '@/components/ui/button'
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

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4"
        >
          <MenuIcon />
        </Button>
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
        <h2 className="font-bold text-gray-400 uppercase">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>
    </>
  )
}

export default Barbershop
