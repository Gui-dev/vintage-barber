import { quickSearchOptions } from '@/constants/quick-search'
import { CalendarIcon, DoorClosedIcon, HomeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'

export const SidebarSheet = () => {
  return (
    <SheetContent className="scrollbar-hidden overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 border-b border-solid py-5">
        <Avatar>
          <AvatarImage src="https://github.com/Gui-dev.png" />
        </Avatar>
        <div className="flex flex-col">
          <h2 className="font-base font-bold">Bruce Wayne</h2>
          <p className="text-xs">bruce@email.com</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Home
            </Link>
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <CalendarIcon size={18} />
              Agendamentos
            </Link>
          </Button>
        </SheetClose>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map(option => {
          return (
            <SheetClose key={option.title} asChild>
              <Button className="justify-start gap-2" variant="ghost" asChild>
                <Link href={`/search?s=${option.title}`} title={option.title}>
                  <Image
                    src={option.imageUrl}
                    alt={option.title}
                    title={option.title}
                    height={18}
                    width={18}
                  />
                  {option.title}
                </Link>
              </Button>
            </SheetClose>
          )
        })}
      </div>

      <div className="flex flex-col gap-2 py-5">
        <Button className="justify-start gap-2" variant="ghost">
          <DoorClosedIcon size={18} />
          Sair do app
        </Button>
      </div>
    </SheetContent>
  )
}
