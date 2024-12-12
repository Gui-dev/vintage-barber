'use server'

import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import type { Booking } from '@prisma/client'
import { getServerSession } from 'next-auth'

export const getConfirmedBookings = async (): Promise<Booking[] | []> => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return []
  }

  return await prisma.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  })
}
