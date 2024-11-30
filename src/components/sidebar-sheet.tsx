'use client'

import { quickSearchOptions } from '@/constants/quick-search'
import { CalendarIcon, DoorClosedIcon, HomeIcon, LogInIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { SignInDialog } from './sign-in-dialog'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'

export const SidebarSheet = () => {
  const { data, status } = useSession()

  const handleLogout = async () => {
    await signOut()
  }

  if (status === 'loading') {
    return
  }

  return (
    <SheetContent className="scrollbar-hidden overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 border-b border-solid py-5">
        {status === 'unauthenticated' && (
          <>
            <h2 className="font-bold">Olá, faça seu login</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] rounded-md">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}

        {status === 'authenticated' && (
          <>
            <Avatar>
              <AvatarImage src={data.user?.image ?? ''} />
            </Avatar>
            <div className="flex flex-col">
              <h2 className="font-base font-bold">{data.user?.name}</h2>
              <p className="text-xs">{data.user?.email}</p>
            </div>
          </>
        )}
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
                <Link
                  href={`/barbershop?services=${option.title}`}
                  title={option.title}
                >
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
        <Button
          className="justify-start gap-2"
          variant="ghost"
          onClick={handleLogout}
        >
          <DoorClosedIcon size={18} />
          Sair do app
        </Button>
      </div>
    </SheetContent>
  )
}
