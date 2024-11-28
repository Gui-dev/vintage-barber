'use server'

import { prisma } from '@/lib/prisma'
import { endOfDay, startOfDay } from 'date-fns'

interface IGetBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = async ({ serviceId, date }: IGetBookingsProps) => {
  const bookings = await prisma.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })

  return bookings
}
