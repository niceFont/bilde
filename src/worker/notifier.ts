export type Notification = {
    progress : number,
    status : string,
    jobId : string,
    workerId: string,
}

export type NotificationListener = (notification : Notification) => any

export default class Notifier {
    private listeners : Array<NotificationListener>

    private subscribers: Array<string>

    private static instance : Notifier

    private constructor() {
      this.listeners = [];
      this.subscribers = [];
    }

    public static getNotifier() : Notifier {
      if (!Notifier.instance) {
        Notifier.instance = new Notifier();
      }
      return Notifier.instance;
    }

    public notify(notification : Notification) {
      // eslint-disable-next-line no-restricted-syntax
      for (const listener of this.listeners) {
        listener.call(this, notification);
      }
    }

    public subscribe(identifier : string, callback : NotificationListener) {
      if (!this.subscribers.includes(identifier)) {
        console.log('Added new Listener');
        this.listeners.push(callback);
        this.subscribers.push(identifier);
      }
    }
}
