'use client'

import LeftSidebar from '@/components/left-sidebar'
import Live from '@/components/live'
import Navbar from '@/components/navbar'
import RightSidebar from '@/components/right-sidebar'
import { useEffect, useRef, useState } from 'react'
import { type fabric } from 'fabric'
import { handleCanvasMouseDown, handleResize, initializeFabric } from '@/lib/canvas'
import { ActiveElement } from '@/types/type'

export default function Home () {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const isDrawing = useRef<boolean>(false)
  const shapeRef = useRef<fabric.Object | null>(null)
  const selectedShapeRef = useRef<string | null>('rectangle')

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: '',
    value: '',
    icon: ''
  })

  const handleActiveElement = (item: ActiveElement) => {
    setActiveElement(item)
    selectedShapeRef.current = item?.value as string
  }

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef })
    canvas.on('mouse:down', (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef
      })
    })
    window.addEventListener('resize', () => {
      handleResize({ canvas: fabricRef.current })
    })
  }, [])

  return (
    <main className='h-screen overflow-hidden'>
      <Navbar activeElement={activeElement} handleActiveElement={handleActiveElement}/>
      <section className='flex h-full flex-row'>
        <LeftSidebar />
        <Live canvasRef={canvasRef}/>
        <RightSidebar />
      </section>
    </main>
  )
}
