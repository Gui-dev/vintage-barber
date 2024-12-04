import { TIME_LIST } from '@/constants/time-list'
import type { Booking } from '@prisma/client'

// TODO: Não exibir horarios no passado
export const getTimeList = (bookings: Booking[]) => {
  const timeList = TIME_LIST.filter(time => {
    const hours = Number(time.split(':')[0])
    const minutes = Number(time.split(':')[1])
    const hasBookingOnCurrentTime = bookings.some(
      booking =>
        booking.date.getHours() === hours &&
        booking.date.getMinutes() === minutes,
    )

    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })

  return timeList
}
