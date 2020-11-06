import React from "react";
import "./ProfilePic.scss";

const ProfilePic = ({ firstName, lastName, size }) => {
   const randomColors = [
      {
         backgroundColor: "#0FBF84",
         color: "#fff",
      },
   ];
   const style = {
      borderRadius: "50%",
      width: size ? size : "40px",
      height: size ? size : "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWidth: "700",
      fontSize: size ? parseInt(size, 10) / 2.5 : "16px",
   };
   let item = randomColors[Math.floor(Math.random() * randomColors.length)];
   const newStyle = { ...style, ...item };
   return (
      <div style={newStyle} className='profilePic'>
         {firstName.slice(0, 1).toUpperCase()}
         {lastName && lastName.slice(0, 1).toUpperCase()}
      </div>
   );
};

export default ProfilePic;
