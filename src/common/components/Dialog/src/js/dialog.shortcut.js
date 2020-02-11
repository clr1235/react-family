import React from 'react';
import {render, unmountComponentAtNode as unmount} from 'react-dom';

import { merge, isFunction } from 'lodash';
import Icon from '@global-components/Icon';
import Button from '@w-desktop-common/components/Button';
import Checkbox from '@w-desktop-common/components/Checkbox';

import Dialog from '../../index';
import styles from '../scss/index.scss';

export default function shortcut(type, props) {
  let container = document.createElement('div');

  props = merge(
    {
      padding: '30px 50px 20px',
      width: 360
    },
    props,
    {
      closable: false,
      maskClosable: false,
      visible: true
    },
    { closable: props.closable }
  );

  let {
    content,
    title,
    notAgain,
    button,
    footer,
    ...other
  } = props;

  if (notAgain && localStorage.getItem(notAgain) * 1) {
    return false;
  }

  return render(
    <Dialog
      {...other}
      footer={
        type !== 'confirm' ? (
          <Button
            type="primary"
            {...button}
            onClick={() => {
              if (typeof props.onOk !== 'function' || props.onOk() !== false) {
                return setTimeout(() => {
                  isFunction(props.onClose) && props.onClose()
                  unmount(container);
                });
              }

              return false;
            }}
          >
            {props.okText || '确定'}
          </Button>
        ) : footer
      }
      onOk={() => {
        if (typeof props.onOk !== 'function' || props.onOk() !== false) {
          return setTimeout(() => {
            unmount(container);
          });
        }

        return false;
      }}
      onCancel={() => {
        if (typeof props.onCancel !== 'function' || props.onCancel() !== false) {
          return setTimeout(() => {
            unmount(container);
          });
        }

        return false;
      }}
    >
      <div className={styles['shortcut-box']}>
        <Icon
          type={{
            info: 'info',
            success: 'done',
            warning: 'warning',
            error: 'warning',
            confirm: 'info_round'
          }[props.type || type]}
          className={
            `${styles['shortcut-icon']} ${styles[`shortcut-${type}-icon`]}`
          }
        />
        <div className={styles['shortcut-inner']}>
          {
            title ? (
              <div
                className={
                  `${styles['shortcut-title']} ${styles[`shortcut-${type}-title`]}`
                }
              >
                {title}
              </div>
            ) : null
          }
          {
            notAgain ? (
              <div>
                {content}
                <div className={styles['shortcut-notagain-checkbox']}>
                  <Checkbox onChange={(e) => {
                    let checked = e.target.checked;

                    checked
                      ? localStorage.setItem(notAgain, '1')
                      : localStorage.removeItem(notAgain);
                  }}>下次不再显示</Checkbox>
                </div>
              </div>
            ) : (
              content
            )
          }
        </div>
      </div>
    </Dialog>,
    container
  );
}
