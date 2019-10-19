import { observable, action } from 'mobx';

class Store {
    @observable username1 = "小明";  // let username = observable("小明")

    @action
    changeUserName1 = (name1) => {
        this.username1 = name1;
    }

}


export default new Store();