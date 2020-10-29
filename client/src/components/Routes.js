import React from "react"

import { Switch, Route } from "react-router-dom"
import Login from "components/Pages/Login"
import Home from "components/Pages/Home"
import Cart from "components/Pages/Cart"
import ProductDetails from "components/Pages/ProductDetails"
const Routes = () => {
   return (
      <Switch>
         <Route exact path='/login' component={Login} />
         <Route exact path='/cart' component={Cart} />
         <Route
            exact
            path={["/product/:id", "/search/product/:id"]}
            component={ProductDetails}
         />
         <Route exact path='/search/:keyword' component={Home} />
         <Route exact path='/' component={Home} />
      </Switch>
   )
}

export default Routes
