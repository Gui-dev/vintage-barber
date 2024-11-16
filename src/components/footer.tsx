import Link from 'next/link'
import { Card, CardContent } from './ui/card'

export const Footer = () => {
  return (
    <footer>
      <Card className="flex items-center justify-center">
        <CardContent className="px-5 py-6">
          <p className="text-sm">
            &copy; 2024 Copyright{' '}
            <Link
              href="/"
              title="Vintage Barber"
              className="font-bold text-purple-500"
            >
              Vintage Barber
            </Link>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}
