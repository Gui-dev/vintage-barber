import { Header } from '@/components/header'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="font-bold text-xl">Olá, Bruce Wayne</h2>
        <p>Quinta-feira, 14 de novembro</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca" />
          <Button>
            <Search />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Uma ilustração de um barbeiro cortando o cabelo de um homem"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <Card className="mt-6">
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
      </div>
    </>
  )
}
