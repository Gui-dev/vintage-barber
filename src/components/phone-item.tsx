'use client'

import { SmartphoneIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'

interface IPhoneItemProps {
  phone: string
}

export const PhoneItem = ({ phone }: IPhoneItemProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyPhone = (value: string) => {
    try {
      navigator.clipboard.writeText(value)
      toast.success('Copiado com sucesso')
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 1000)
    } catch (error) {
      toast.error('Erro ao copiar')
      setIsCopied(false)
    }
  }

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCopyPhone(phone)}
        >
          {isCopied ? 'Copiando...' : 'Copiar'}
        </Button>
      </div>
    </div>
  )
}
