import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Button} from 'antd';

import classnames from 'classnames';

import styles from './src/scss/index.scss';

export default class IcButton extends Component {
  constructor(props){
    super(props)
    
  }

  render(){
    let props = this.props;
    let {
      children,
      className,
      style,
      size,
      fixedWidth,
      type,
      ...others
    } = props;

    let btnClassNames = {
      [className]: className
    }
    let btnStyles = style || {};
    if(fixedWidth){
      btnStyles.width = fixedWidth
    }
    
    
    return (
      <Button 
        {...others} 
        className={btnClassNames} 
        style={btnStyles}
        type={type}
      >
        {children}
      </Button>
    )
  }
}

IcButton.PropTypes = {
  
}
