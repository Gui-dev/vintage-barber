import { TIME_LIST } from '@/constants/time-list'
import type { Booking } from '@prisma/client'
import { isPast, isToday, set } from 'date-fns'

interface IGetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}
export const getTimeList = ({ bookings, selectedDay }: IGetTimeListProps) => {
  const timeList = TIME_LIST.filter(time => {
    const hours = Number(time.split(':')[0])
    const minutes = Number(time.split(':')[1])
    const timeIsOnThePast = isPast(set(new Date(), { hours, minutes }))

    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

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
