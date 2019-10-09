import React from 'react';
import Loadable from 'react-loadable';

const Null = () => {
  return null;
};

const IcLoadable = (props) => {
  let {
    loading = Null,
    delay = 0,
    ...rest
  } = props;
  return (
    Loadable({
      ...rest,
      delay,
      loading: function({error}) {
        if (error) {
          console.log(error)
        }
        return null
      }
    })
  )
};

export default IcLoadable;