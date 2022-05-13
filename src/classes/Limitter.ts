/*
Limit calls to a function
*/

interface CallObject {
  fn: Function;
  blockingTime: number;
}

export default class Limitter {

  blocked: boolean = false

  call(obj:CallObject) {
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
