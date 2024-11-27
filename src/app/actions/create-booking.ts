'use server'

import { prisma } from '@/lib/prisma'

interface ICreateBookingProps {
  userId: string
  serviceId: string
  date: Date
}

export const createBooking = async ({
  userId,
  serviceId,
  date,
}: ICreateBookingProps) => {
  await prisma.booking.create({
    data: {
      userId,
      serviceId,
      date,
    },
  })
}
