import { BookingItem } from '@/components/booking-item'
import { Header } from '@/components/header'
import { Subtitle } from '@/components/subtitle'
import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { getConcludedBookings } from '../data/get-concluded-bookings'
import { getConfirmedBookings } from '../data/get-confirmed-bookings'

const Bookings = async () => {
  const data = await getServerSession(authOptions)

  if (!data?.user) {
    return NextResponse.redirect('/', {
      status: 401,
      statusText: 'User unauthorized',
    })
  }

  const [confirmedBookings, concluedBookings] = await Promise.all([
    getConfirmedBookings(),
    getConcludedBookings(),
  ])

  return (
    <>
      <Header />
      <div className="p-5">
        <Subtitle>Agendamentos</Subtitle>

        {confirmedBookings.length < 1 && concluedBookings.length < 1 && (
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-gray-400 text-lg">
              Ainda não foram realizados nenhum agendamento
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <Subtitle>Confirmados</Subtitle>
          {confirmedBookings.map(booking => {
            return (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            )
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Subtitle>Finalizados</Subtitle>
          {concluedBookings.map(booking => {
            return (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Bookings
