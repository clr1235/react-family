import React, { Component } from 'react';
import Button from '@w-desktop-common/components/Button';

export default class DialogDefaultFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {showCancel = true, showConfirm = true} = this.props;
    let props = this.props;
    const { disabledConfirm } = props
    return (
      <div>
        {
          showCancel && (
            <Button
              onClick={props.onCancel}
            >
              {props.cancelText}
            </Button>
          )
        }
        {
          showConfirm &&
          (
            <Button
              type="primary"
              onClick={props.onOk}
              loading={props.confirmLoading}
              disabled={disabledConfirm}
            >
              {props.okText}
            </Button>
          )
        }
      </div>
    );
  }
}
