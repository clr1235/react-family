import { observable, action } from 'mobx';

export default class GlobalModel {
    @observable username = '小明';

    @action
    changeUserName = (name) => {
        this.username = name;
    }

}
