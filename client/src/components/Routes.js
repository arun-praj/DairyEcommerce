import React from "react"

import { Switch, Route } from "react-router-dom"
import Login from "components/Pages/Login"
import Signup from "components/Pages/Signup"

import Home from "components/Pages/Home/Home"
import Cart from "components/Pages/Cart/Cart"
import Error from "components/Pages/Error/Error"
import UserProfile from "components/Pages/UserProfile/UserProfile"
import ProductDetails from "components/Pages/ProductDetails/ProductDetails"
import Shipping from "components/Pages/Shipping/Shipping"
import Order from "components/Pages/order/Order"
import Category from "components/Pages/Category/Category"
import Special from "components/Pages/Decorate/Decorate"
import Delivery from "components/Pages/Delivery/Delivery"
import ContactUs from "components/Pages/ContactUs/ContactUs"
// import Admin from "components/admin/Admin"

const Routes = () => {
   return (
      <Switch>
         <Route exact path='/cart' component={Cart} />
         <Route
            exact
            path={["/profile", "/order/profile"]}
            component={UserProfile}
         />
         <Route
            exact
            path={["/product/:id", "/search/product/:id"]}
            component={ProductDetails}
         />
         <Route exact path='/login' component={Login} />
         <Route exact path='/register' component={Signup} />
         <Route exact path='/search/:keyword' component={Home} />
         <Route exact path='/shipping' component={Shipping} />
         <Route exact path='/order/complete' component={Order} />
         <Route exact path='/categories' component={Category} />
         <Route exact path='/product/decorate/:id' component={Special} />
         <Route exact path='/contact-us' component={ContactUs} />

         <Route exact path='/delivery' component={Delivery} />

         {/* <Route exact path='/admin' component={Admin} /> */}
         <Route exact path='/' component={Home} />

         <Route component={Error} />
      </Switch>
   )
}

export default Routes
