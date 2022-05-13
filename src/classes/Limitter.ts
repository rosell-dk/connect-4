/*
Limit calls to a function
*/

interface LimitterCallObject {
  fn: Function;
  blockingTime: number;
}

export default class Limitter {

  blocked: boolean = false

  call(obj:LimitterCallObject) {
    if (this.blocked) {
      return
    }
    this.blocked = true
    obj.fn()
    window.setTimeout(() => {
        this.blocked = false
      },
      obj.blockingTime
    )
  }

}
