import { Entity } from '@core/entity'

export type Task = Entity & {
  name: string
  done: boolean
}
