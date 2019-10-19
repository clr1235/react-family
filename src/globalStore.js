import { observable, action } from 'mobx';

class GlobalStore {
    @observable username = "小明";  // let username = observable("小明")

    @action
    changeUserName2 = (name2) => {
        this.username = name2;
    }

}


export default new GlobalStore();