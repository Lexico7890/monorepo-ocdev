import { useBroadcastEvent, useEventListener, useMyPresence, useOthers } from '@/liveblocks.config'
import React, { useCallback, useEffect, useState } from 'react'
import LiveCursors from './cursor/live-cursors'
import CursorChat from './cursor/cursor-chat'
import { CursorMode, type Reaction, type CursorState, type ReactionEvent } from '@/types/type'
import ReactionSelector from './reaction/reaction-button'
import FlyingReaction from './reaction/flying-reaction'
import useInterval from '@/hooks/useInterval'

const Live = () => {
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden
  })
  const [reaction, setReaction] = useState<Reaction[]>([])

  const others = useOthers()
  const broadcast = useBroadcastEvent()
  const [{ cursor }, updateMyPresence] = useMyPresence() as any

  useInterval(() => {
    setReaction((reactions) => reactions.filter((r) => r.timestamp > Date.now() - 4000))
  }, 1000)

  useInterval(() => {
    if (cursorState.mode === CursorMode.Reaction && cursorState.isPressed && cursor) {
      setReaction((reactions) => reactions.concat([{
        point: { x: cursor.x, y: cursor.y },
        value: cursorState.reaction,
        timestamp: Date.now()
      }]))
      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction
      })
    }
  }, 100)

  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent
    setReaction((reactions) => reactions.concat([{
      point: { x: event.x, y: event.y },
      value: event.value,
      timestamp: Date.now()
    }]))
  })

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    if (cursor === null || cursorState.mode !== CursorMode.ReactionSelector) {
      event.preventDefault()
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y
      updateMyPresence({ cursor: { x, y } })
    }
  }, [])

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden })
    updateMyPresence({ cursor: null, message: null })
  }, [])

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y
    updateMyPresence({ cursor: { x, y } })
    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: true } : state
    )
  }, [cursorState.mode, setCursorState])

  const handlePointerUp = useCallback((event: React.PointerEvent) => {
    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: false } : state
    )
  }, [cursorState.mode, setCursorState])

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === '/') {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: ''
        })
      } else if (e.key === 'Escape') {
        updateMyPresence({
          message: ''
        })
        setCursorState({
          mode: CursorMode.Hidden
        })
      } else if (e.key === 'e') {
        setCursorState({
          mode: CursorMode.ReactionSelector
        })
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [updateMyPresence])

  const setReactions = useCallback((reaction: string) => {
    setCursorState({
      mode: CursorMode.Reaction,
      reaction,
      isPressed: false
    })
  }, [])

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className='h-[100vh] w-full flex justify-center items-center text-center'
    >
      <p className='text-2xl text-white'>Liveblocks collaboration Figma</p>
      {reaction.map((r) => (
        <FlyingReaction
          timestamp={r.timestamp}
          value={r.value}
          x={r.point.x}
          y={r.point.y}
          key={r.timestamp.toString()}
        />
      ))}
      {cursor && (
        <CursorChat
        cursor={cursor}
        cursorState={cursorState}
        setCursorState={setCursorState}
        updateMyPresence={updateMyPresence}
        />
      )}
      {
        cursorState.mode === CursorMode.ReactionSelector && (
          <ReactionSelector
            setReaction={setReactions}
          />
        )
      }
      <LiveCursors others={others}/>
    </div>
  )
}

export default Live
