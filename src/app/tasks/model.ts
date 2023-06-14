import { Entity } from '@core/base-repo.service'

export type Task = Entity & {
  name: string
  done: boolean
}
