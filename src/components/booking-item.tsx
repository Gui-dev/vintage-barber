import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

// TODO: receber agendamento como propriedades
export const BookingItem = () => {
  return (
    <Card>
      <CardContent className="flex justify-between p-0">
        <div className="flex flex-col gap-2 py-5 pl-5">
          <Badge className="w-fit">Confirmado</Badge>
          <h3 className="font-semibold">Corte de cabelo</h3>
          <div className="flex items-center">
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/Gui-dev.png" />
            </Avatar>
            <p className="text-sm">Your Barber Here</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
          <p className="text-sm">Novembro</p>
          <p className="text-2xl">15</p>
          <p className="text-sm">20:00</p>
        </div>
      </CardContent>
    </Card>
  )
}
