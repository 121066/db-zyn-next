class UpdateSide {
    constructor() {

        this.updateObj = {}
    }
    on(key, fn) {
        if (this.updateObj[key]) {
            this.updateObj[key].push(fn)
        } else {
            this.updateObj[key] = [fn]
        }
    }
    emit(key) {
        const itemKey = this.updateObj[key]
        if (itemKey) {
            itemKey.forEach(fn => fn(this.val))
        }
    }

}
export default new UpdateSide()