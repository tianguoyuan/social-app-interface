import type { Emitter } from 'mitt'
import mitt from 'mitt'

// eslint-disable-next-line ts/consistent-type-definitions
type Events = {
  /** emitType */
  onFunction: void
}

const emitter: Emitter<Events> = mitt<Events>()
export default emitter
