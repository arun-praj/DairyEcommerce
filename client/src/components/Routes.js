import React from "react";

import { Switch, Route } from "react-router-dom";
import Login from "components/Pages/Login";
import Home from "components/Pages/Home";
import Cart from "components/Pages/Cart";
const Routes = () => {
   return (
      <Switch>
         <Route exact path='/login' component={Login} />
         <Route exact path='/cart' component={Cart} />

         <Route exact path='/' component={Home} />
      </Switch>
   );
};

export default Routes;
