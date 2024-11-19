import type { Barbershop } from '@prisma/client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface IBarberShopProps {
  barbershop: Barbershop
}

export const BarbershopItem = ({ barbershop }: IBarberShopProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        <div className="relative h-[159px] w-full">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="rounded-2xl object-cover"
          />
          <Badge
            className="absolute top-2 left-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="font-semibold text-xs">5.0</p>
          </Badge>
        </div>
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold" title={barbershop.name}>
            {barbershop.name}
          </h3>
          <p
            className="truncate text-gray-400 text-sm"
            title={barbershop.address}
          >
            {barbershop.address}
          </p>
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/barbershop/${barbershop.id}`} title="Reservar">
              Reservar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
