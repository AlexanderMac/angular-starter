import { Entity } from '@core/base-repo.service'

export type User = Entity & {
  name: string
  email: string
}
