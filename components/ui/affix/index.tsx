import React, { useEffect } from 'react'
import { VStack } from '../vstack'
import { cn } from '@/lib/cn';

interface AffixProps {
  children?: React.ReactNode;
  className?: string;
  offsetTop?: number;
}

const Affix = ({children, className}: AffixProps) => {
  return (
    <VStack className={cn('sticky top-0 z-10 bg-white w-full', className)}>
      {children}
    </VStack>
  )
}

export default Affix