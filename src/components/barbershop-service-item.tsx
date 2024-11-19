import { formatCurrency } from '@/lib/format-currency'
import type { BarbershopService } from '@prisma/client'
import Image from 'next/image'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface IBarbershopItemProps {
  service: BarbershopService
}

export const BarbershopServiceItem = ({ service }: IBarbershopItemProps) => {
  const price = formatCurrency(Number(service.price))

  return (
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
            <Button variant="secondary" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
