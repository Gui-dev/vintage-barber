'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

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
  revalidatePath('/barbershop/[id]')
}
