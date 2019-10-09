import React from 'react';
import {Route, Redirect} from 'react-router-dom';


const IcRoute = (props) => {
  let {
    freeLogin = false,
    noHeader,
    noFooter,
    title,
    component: Component,
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={(props) => {
        const isLogin = !!window.ACCOUNT;
        const location = props.location;
        noHeader = noHeader === true;
        noFooter = noFooter === true;
        // !!GlobalStore.noHeader !== noHeader &&
        // GlobalStore.toggleHeader(noHeader);
        // !!GlobalStore.noFooter !== noFooter &&
        // GlobalStore.toggleFooter(noFooter);

        if (title) {
          document.title = title;
          // return <LoadingBar/>
        }
        if (freeLogin || isLogin) {
          return <Component {...props}/>
        }
        return (
          <Redirect
            to={{
              pathname: '/',
              search: `?referer=${location.pathname}${location.search}`
            }}
          />
        )
      }}
    />
  )
};

export default IcRoute;

