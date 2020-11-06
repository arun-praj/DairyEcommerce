import React, { useEffect, useState } from "react"
import styled from "styled-components"
const SearchField = styled.div`
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   max-width: 630px;
   padding: 0 24px;
   @media (max-width: 768px) {
      display: none;
   }
`
const SearchInput = styled.input`
   width: 100%;
   border: 1px solid transparent;
   border-radius: 2px;
   background-color: #f2f3f5;
   outline: none;
   height: 44px;
   padding: 10px 12px;
   &:focus {
      background-color: #fff;
      border-color: #dedfe0;
      //  border-right-color: transparent;
      box-shadow: none;
   }
`
const SearchIcon = styled.i`
   position: absolute;
   top: 50%;
   right: 40px;
   height: 10px;
   width: 10px;
   transform: translateY(-85%);
   fill: #000000;
   font-weight: 700;
`
const Searchbox = ({ history }) => {
   const [searchKeyword, setSearchKeyword] = useState("")

   const submitHandler = (e) => {
      // e.preventDefault()
      if (searchKeyword.trim()) {
         history.push(`/search/${searchKeyword}`)
      }
      // else {
      //    history.push(`/`)
      // }
   }
   useEffect(() => {
      submitHandler()
   }, [searchKeyword])

   return (
      <>
         <SearchField>
            <SearchInput
               placeholder='Search for products'
               value={searchKeyword}
               onChange={(e) => {
                  setSearchKeyword(e.target.value)
               }}
            />
            <SearchIcon>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-search'
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='#2c3e50'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <circle cx='10' cy='10' r='7' />
                  <line x1='21' y1='21' x2='15' y2='15' />
               </svg>
            </SearchIcon>
         </SearchField>
      </>
   )
}

export default Searchbox
