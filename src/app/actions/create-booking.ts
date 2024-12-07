'use server'

import { authOptions } from '@/lib/auth-options'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

interface ICreateBookingProps {
  serviceId: string
  date: Date
}

export const createBooking = async ({
  serviceId,
  date,
}: ICreateBookingProps) => {
  const data = await getServerSession(authOptions)

  if (!data?.user) {
    return NextResponse.redirect('/', {
      status: 401,
      statusText: 'User unauthorized',
    })
  }

  await prisma.booking.create({
    data: {
      userId: data.user.id,
      serviceId,
      date,
    },
  })
  revalidatePath('/barbershop/[id]')
  revalidatePath('/bookings')
}
