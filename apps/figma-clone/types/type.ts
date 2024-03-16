import { type BaseUserMeta, type User } from '@liveblocks/client'
import { type Gradient, type Pattern } from 'fabric/fabric-impl'

export enum CursorMode {
  Hidden,
  Chat,
  ReactionSelector,
  Reaction,
}

export type CursorState =
  | {
    mode: CursorMode.Hidden
  }
  | {
    mode: CursorMode.Chat
    message: string
    previousMessage: string | null
  }
  | {
    mode: CursorMode.ReactionSelector
  }
  | {
    mode: CursorMode.Reaction
    reaction: string
    isPressed: boolean
  }

export interface Reaction {
  value: string
  timestamp: number
  point: { x: number, y: number }
}

export interface ReactionEvent {
  x: number
  y: number
  value: string
}

export interface ShapeData {
  type: string
  width: number
  height: number
  fill: string | Pattern | Gradient
  left: number
  top: number
  objectId: string | undefined
}

export interface Attributes {
  width: string
  height: string
  fontSize: string
  fontFamily: string
  fontWeight: string
  fill: string
  stroke: string
}

export type ActiveElement = {
  name: string
  value: string
  icon: string
} | null

export interface CustomFabricObject<T extends fabric.Object>
  extends fabric.Object {
  objectId?: string
}

export interface ModifyShape {
  canvas: fabric.Canvas
  property: string
  value: any
  activeObjectRef: React.MutableRefObject<fabric.Object | null>
  syncShapeInStorage: (shape: fabric.Object) => void
}

export interface ElementDirection {
  canvas: fabric.Canvas
  direction: string
  syncShapeInStorage: (shape: fabric.Object) => void
}

export interface ImageUpload {
  file: File
  canvas: React.MutableRefObject<fabric.Canvas>
  shapeRef: React.MutableRefObject<fabric.Object | null>
  syncShapeInStorage: (shape: fabric.Object) => void
}

export interface RightSidebarProps {
  elementAttributes: Attributes
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>
  fabricRef: React.RefObject<fabric.Canvas | null>
  activeObjectRef: React.RefObject<fabric.Object | null>
  isEditingRef: React.MutableRefObject<boolean>
  syncShapeInStorage: (obj: any) => void
}

export interface NavbarProps {
  activeElement: ActiveElement
  imageInputRef: React.MutableRefObject<HTMLInputElement | null>
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleActiveElement: (element: ActiveElement) => void
}

export interface ShapesMenuProps {
  item: {
    name: string
    icon: string
    value: ActiveElement[]
  }
  activeElement: any
  handleActiveElement: any
  handleImageUpload: any
  imageInputRef: any
}

export type Presence = any

export interface LiveCursorProps {
  others: ReadonlyArray<User<Presence, BaseUserMeta>>
}

export interface CanvasMouseDown {
  options: fabric.IEvent
  canvas: fabric.Canvas
  selectedShapeRef: any
  isDrawing: React.MutableRefObject<boolean>
  shapeRef: React.MutableRefObject<fabric.Object | null>
}

export interface CanvasMouseMove {
  options: fabric.IEvent
  canvas: fabric.Canvas
  isDrawing: React.MutableRefObject<boolean>
  selectedShapeRef: any
  shapeRef: any
  syncShapeInStorage: (shape: fabric.Object) => void
}

export interface CanvasMouseUp {
  canvas: fabric.Canvas
  isDrawing: React.MutableRefObject<boolean>
  shapeRef: any
  activeObjectRef: React.MutableRefObject<fabric.Object | null>
  selectedShapeRef: any
  syncShapeInStorage: (shape: fabric.Object) => void
  setActiveElement: any
}

export interface CanvasObjectModified {
  options: fabric.IEvent
  syncShapeInStorage: (shape: fabric.Object) => void
}

export interface CanvasPathCreated {
  options: (fabric.IEvent & { path: CustomFabricObject<fabric.Path> }) | any
  syncShapeInStorage: (shape: fabric.Object) => void
}

export interface CanvasSelectionCreated {
  options: fabric.IEvent
  isEditingRef: React.MutableRefObject<boolean>
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>
}

export interface CanvasObjectScaling {
  options: fabric.IEvent
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>
}

export interface RenderCanvas {
  fabricRef: React.MutableRefObject<fabric.Canvas | null>
  canvasObjects: any
  activeObjectRef: any
}

export interface CursorChatProps {
  cursor: { x: number, y: number }
  cursorState: CursorState
  setCursorState: (cursorState: CursorState) => void
  updateMyPresence: (
    presence: Partial<{
      cursor: { x: number, y: number }
      cursorColor: string
      message: string
    }>
  ) => void
}
