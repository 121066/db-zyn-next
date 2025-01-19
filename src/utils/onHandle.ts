class UpdateSide {
    constructor() {

        this.updateObj = {}
    }
    on(key, fn) {
        // if (this.updateObj[key]) {
        //     this.updateObj[key].push(fn)
        // } else {
        //     this.updateObj[key] = [fn]
        // }
        this.updateObj[key] = [fn]
    }
    emit(key, data) {
        const itemKey = this.updateObj[key]
        if (itemKey) {
            itemKey.forEach(fn => fn(data))
        }
    }

}
const onHandle = new UpdateSide()

export default onHandle