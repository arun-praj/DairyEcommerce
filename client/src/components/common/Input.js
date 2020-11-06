import React from "react"
import styled from "styled-components"

const InputGroup = styled.div`
   position: relative;
`

const InputIcon = styled.i`
   position: absolute;
   top: 50%;
   transform: translateY(-50%);
   left: 3%;
`

const StyledInput = styled.input`
   width: 100%;
   padding: 15px 50px;
   font-size: 15px;
   border: ${(p) => p.theme.cardBorder};
   border-radius: 2px;
   display: block;
   outline: none;
   margin-bottom: 8px;

   &::-webkit-input-placeholder {
      color: #3b3b3b85;
   }
`

const Input = (props) => {
   return (
      <InputGroup>
         <InputIcon>{props.icon}</InputIcon>
         <StyledInput
            placeholder={props.placeholder}
            name={props.name}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
         />
      </InputGroup>
   )
}

export { Input }

// const Form = ({...props}) => {
//     return (
//         <form>

//         </form>
//     )
// }
