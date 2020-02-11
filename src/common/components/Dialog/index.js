import styles from "./src/scss/index.scss";
import React, { Component } from "react";
import { Modal } from "antd";
import classNames from "classnames";
import Icon from "@global-components/Icon";
import { throttle } from "lodash";
import { isFunction, hiddenScroll, showScroll } from "@global-js/utils";

import DialogDefaultFooter from "./src/js/dialog.default.footer";
export default class IcDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: !!this.props.visible
    };
  }
  componentWillUnmount() {
    isFunction(showScroll) && showScroll();
    window.removeEventListener("resize", this.calcContentHeight, false);
  }
  componentDidMount() {
    this.calcContentHeight();
    window.addEventListener("resize", this.calcContentHeight, false);
  }
  componentDidUpdate() {
    this.calcContentHeight();
  }
  calcContentHeight = throttle(() => {
    if(!this.props.caclHeight){
      return;
    }
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    let icContentBody = this.icbody; //document.querySelector(".ic-dialog-body");
    if (icContentBody) {
      let hasCustomizeFooter = !!icContentBody.querySelector(".ic-dialog-content-footer");
      if (hasCustomizeFooter) {
        icContentBody.style.maxHeight = windowHeight - 188 + "px";
        icContentBody.style.marginBottom = "88px";
      } else {
        icContentBody.style.maxHeight = windowHeight - 180 + "px";
      }
    }
  }, 400);
  onOk = e => {
    let { loading, onOk } = this.props;
    if (loading) {
      return false;
    }
    if (typeof onOk !== "function" || onOk(e) !== false) {
      this.hide("ok");
    }
  };
  onCancel = e => {
    let { onCancel } = this.props;
    if (typeof onCancel !== "function" || onCancel(e) !== false) {
      this.hide("cancel");
    }
  };
  onClose = e => {
    this.hide("close");
  };
  hide = e => {
    let { postMessage } = this.props;
    postMessage && window.parent.postMessage("SHOWRESUMEDIALOGTITLE", "*");
    isFunction(showScroll) && showScroll();
    if (!this.state.visible) {
      return false;
    }
    let { onClose } = this.props;
    if (isFunction(onClose) && onClose(e) === false) {
      return false;
    }
    this.setState({
      visible: false
    });
  };
  show = () => {
    let { postMessage } = this.props;
    postMessage && window.parent.postMessage("HIDERESUMEDIALOGTITLE", "*");
    if (this.state.visible) {
      return false;
    }
    let props = this.props;
    let onBeforeShow = props.onBeforeShow;
    let visible = isFunction(onBeforeShow) ? onBeforeShow() !== false : true;

    visible &&
      this.setState({
        visible: visible
      });
    isFunction(hiddenScroll) && hiddenScroll();
  };

  resetScroll() {}

  render() {
    let {
      children,
      className,
      footerAlign,
      okText,
      cancelText,
      confirmLoading,
      loading,
      verticallyCentered,
      padding,
      disabledConfirm = false,
      onCancel,
      onOk,
      ...otherProps
    } = this.props;

    const wrapClassName = classNames([
      styles.wrapper,
      className,
      verticallyCentered !== false && styles["vertically-centered"]
    ]);

    const footer = otherProps.footer !== null && (
      <div className={styles.footer} style={{ textAlign: footerAlign }}>
        {otherProps.footer ||
          React.cloneElement(<DialogDefaultFooter />, {
            onOk: this.onOk,
            onCancel: this.onCancel,
            okText: okText,
            cancelText: cancelText,
            confirmLoading: confirmLoading,
            disabledConfirm,
            ...otherProps
          })}
      </div>
    );

    return (
      <Modal
        {...otherProps}
        visible={this.state.visible}
        transitionName={null}
        maskTransitionName={null}
        onCancel={this.onCancel}
        onOk={this.onOk}
        onClose={this.onClose}
        wrapClassName={wrapClassName}
        footer={footer || null}
      >
        {loading ? (
          <div className={styles.loading}>
            <Icon type="loading" />
            <div className={styles["loading-content"]}>{loading}</div>
          </div>
        ) : (
          <div
            className={classNames("ic-dialog-body", styles.body)}
            style={{ padding: padding }}
            ref={icbody => {
              this.icbody = icbody;
              this.calcContentHeight();
            }}
          >
            {children}
          </div>
        )}
      </Modal>
    );
  }
}
// 默认参数
IcDialog.defaultProps = {
  verticallyCentered: true, // 是否垂直居中
  confirmLoading: false, // 确定按钮是否loading
  footerAlign: "center", // 底部内容对齐方式
  okText: "确定", // 确定按钮文字
  cancelText: "取消", // 取消按钮的文字
  className: "", // 自定义className
  width: 500, // 弹窗默认宽度
  maskClosable: false,
  postMessage: true, // 需要iframe交互
  caclHeight: true
};
// 添加快捷方法
let shortcut = require("./src/js/dialog.shortcut");
["info", "success", "error", "warning", "confirm"].forEach(v => {
  IcDialog[v] = props => {
    return shortcut(v, props);
  };
});
