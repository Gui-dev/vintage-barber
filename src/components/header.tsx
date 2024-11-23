import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SidebarSheet } from './sidebar-sheet'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Sheet, SheetTrigger } from './ui/sheet'

export const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <Link href="/" title="Vintage barber">
          <Image src="/logo.png" alt="Barber Logo" height={18} width={120} />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}
