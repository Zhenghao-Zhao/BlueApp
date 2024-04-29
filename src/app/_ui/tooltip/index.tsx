import withTooltip from '@/app/_hocs/WithTooltip'
import React from 'react'

function TooltipWrapper({children}: {children: React.ReactNode}) {
  return (
    children
  )
}

export default withTooltip(TooltipWrapper);