'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface ICancelBookingRequest {
  userId: string
  bookingId: string
}

export const cancelBooking = async ({
  userId,
  bookingId,
}: ICancelBookingRequest) => {
  await prisma.booking.delete({
    where: {
      userId,
      id: bookingId,
    },
  })

  revalidatePath('/bookings')
}
