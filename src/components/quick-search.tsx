import type { IQuickSearchOptions } from '@/constants/quick-search'
import Image from 'next/image'
import { Button } from './ui/button'

interface IQuickSearchProps {
  option: IQuickSearchOptions
}

export const QuickSearch = ({ option }: IQuickSearchProps) => {
  return (
    <Button variant="secondary" className="gap-2" key={option.title}>
      <Image
        src={option.imageUrl}
        alt={`Serviços de ${option.title}`}
        height={16}
        width={16}
      />
      {option.title}
    </Button>
  )
}
