import React, { useState } from "react"
import ReactMapboxGl, { Layer, Feature, Popup, Marker } from "react-mapbox-gl"
// import Body from "../../HOCs/Body";
// import Button from "../../ui/Button/Button";
import Icon from "./icons8-marker-48.png"
import * as data from "./store_data.json"

const Maps = () => {
   const [selectedUser, setSelectedUser] = useState(null)
   const Map = ReactMapboxGl({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      // "pk.eyJ1IjoiYXJ1bmtwMTEyMiIsImEiOiJja2NyYjU5YzMwOHM3MzBvZTJzdDAwcHV0In0.QIXyccHR_ZX9umVzA2XUUQ",
   })
   // data.features.map((user) => {
   //    console.log(user._id)
   // })
   const image = new Image(30, 30)
   image.src = Icon
   const images = ["myImage", image]

   return (
      <Map
         // style='mapbox://styles/arunkp1122/ckejmw4vn5w5j19pt8wbddq8a'
         style='mapbox://styles/mapbox/streets-v9'
         center={[85.44021465132647, 27.67536081275729]}
         zoom={[15]}
         layout={{ "icon-image": "myImage", "icon-allow-overlap": true }}
         containerStyle={{
            height: "100%",
            width: "100%",
            borderRadius: "4px",
         }}
      >
         {data.features.map((user) => {
            return (
               <Marker key={user._id} coordinates={user.geometry.coordinates}>
                  <div
                     style={{
                        display: "flex",
                        flexDirection: "column",
                     }}
                  >
                     <span
                        style={{ color: "black", backgroundColor: "yellow" }}
                     >
                        {user.name}
                     </span>
                     <img src={Icon} alt='user' height='40px' width='40px' />
                  </div>
               </Marker>
            )
         })}
      </Map>
   )
}

export default Maps

// import React, { Component, Fragment } from "react"
// import { Layer, Feature } from "react-mapbox-gl"

// import Icon from "./icons8-marker-48.png"
// import { MapBoxToken } from "./accessToken"
// import * as StoreDate from "./store_data.json"

// const Map = MapBoxToken

// class Maps extends Component {
//    state = {
//       zoom: [12],
//       center: [85.38181979091183, 27.68366488536074],
//    }
//    render() {
//       const { zoom, center } = this.state
//       const image = new Image(50, 50)

//       image.src = Icon
//       const images = ["myImage", image]
//       return (
//          <Fragment>
//             <Map
//                zoom={zoom}
//                center={center}
//                // eslint-disable-next-line
//                style='mapbox://styles/mapbox/streets-v9'
//                layout={{ "icon-image": "myImage", "icon-allow-overlap": true }}
//                images={images}
//                containerStyle={{
//                   height: this.props.height ? this.props.height : "30vh",
//                   width: this.props.width ? this.props.width : "35vw",
//                   borderRadius: "4px",
//                }}
//             >
//                <Layer
//                   type='symbol'
//                   id='marker'
//                   layout={{
//                      "icon-image": "myImage",
//                      "icon-allow-overlap": true,
//                   }}
//                   images={images}
//                >
//                   {StoreDate.features.map((el) => (
//                      <Feature
//                         key={el.properties.STORE_ID}
//                         id={el.properties.STORE_ID}
//                         coordinates={el.geometry.coordinates}
//                      />
//                   ))}
//                </Layer>
//                {/*
//                <Layer
//                   type='symbol'
//                   id='marker'
//                   layout={{
//                      "icon-image": "myImage",
//                      "icon-allow-overlap": true,
//                   }}
//                   images={images}
//                >
//                   <Feature coordinates={this.props.center} />
//                </Layer> */}
//             </Map>
//             {/* <img src={Icon} /> */}
//          </Fragment>
//       )
//    }
// }
// export default Maps
