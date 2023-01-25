import { EventEmitter } from 'events'

class TypedEventEmitter<TEvents extends Record<string, any>> {
  private emitter = new EventEmitter()

  emit<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    ...eventArg: TEvents[TEventName]
  ) {
    this.emitter.emit(eventName, ...(eventArg as []))
  }

  on<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (...eventArg: TEvents[TEventName]) => void
  ) {
    this.emitter.on(eventName, handler as any)
  }

  off<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (...eventArg: TEvents[TEventName]) => void
  ) {
    this.emitter.off(eventName, handler as any)
  }
}

/**
 * A map of event names to argument tuples
 */
type LocalEventTypes = {
  'event-1': []
  'event-2': [arg1: number, arg2: string]
}

const eventBroker = new TypedEventEmitter<LocalEventTypes>()

eventBroker.on('event-1', () => {
  console.log('event-1')
})
eventBroker.on('event-2', (arg1: number, arg2: string) => {
  console.log('event-2', arg1, arg2)
})

eventBroker.emit('event-2', 4, 'test')
eventBroker.emit('event-1')
