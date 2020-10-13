import ContentLoader from "react-content-loader";
import { useMediaQuery } from "react-responsive";
import React from "react";

const Loader = () => {
   const isDesktopOrLaptop = useMediaQuery(
      { minDeviceWidth: 900 },
      { deviceWidth: 1600 } // `device` prop
   );
   // const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });

   const isMobile = useMediaQuery({ maxWidth: 480 });
   return (
      <>
         {!isMobile && isDesktopOrLaptop && (
            <ContentLoader viewBox='0 0 1360 900' height={900} width={1200}>
               <rect x='30' y='20' rx='8' ry='8' width='200' height='200' />
               <rect x='30' y='250' rx='0' ry='0' width='200' height='18' />
               <rect x='30' y='275' rx='0' ry='0' width='120' height='20' />
               <rect x='250' y='20' rx='8' ry='8' width='200' height='200' />
               <rect x='250' y='250' rx='0' ry='0' width='200' height='18' />
               <rect x='250' y='275' rx='0' ry='0' width='120' height='20' />
               <rect x='470' y='20' rx='8' ry='8' width='200' height='200' />
               <rect x='470' y='250' rx='0' ry='0' width='200' height='18' />
               <rect x='470' y='275' rx='0' ry='0' width='120' height='20' />
               <rect x='690' y='20' rx='8' ry='8' width='200' height='200' />
               <rect x='690' y='250' rx='0' ry='0' width='200' height='18' />
               <rect x='690' y='275' rx='0' ry='0' width='120' height='20' />
               <rect x='910' y='20' rx='8' ry='8' width='200' height='200' />
               <rect x='910' y='250' rx='0' ry='0' width='200' height='18' />
               <rect x='910' y='275' rx='0' ry='0' width='120' height='20' />
               <rect x='1130' y='20' rx='8' ry='8' width='200' height='200' />
               <rect x='1130' y='250' rx='0' ry='0' width='200' height='18' />
               <rect x='1130' y='275' rx='0' ry='0' width='120' height='20' />
               <rect x='30' y='340' rx='8' ry='8' width='200' height='200' />
               <rect x='30' y='570' rx='0' ry='0' width='200' height='18' />
               <rect x='30' y='595' rx='0' ry='0' width='120' height='20' />
               <rect x='250' y='340' rx='8' ry='8' width='200' height='200' />
               <rect x='250' y='570' rx='0' ry='0' width='200' height='18' />
               <rect x='250' y='595' rx='0' ry='0' width='120' height='20' />
               <rect x='470' y='340' rx='8' ry='8' width='200' height='200' />
               <rect x='470' y='570' rx='0' ry='0' width='200' height='18' />
               <rect x='470' y='595' rx='0' ry='0' width='120' height='20' />
               <rect x='690' y='340' rx='8' ry='8' width='200' height='200' />
               <rect x='690' y='570' rx='0' ry='0' width='200' height='18' />
               <rect x='690' y='595' rx='0' ry='0' width='120' height='20' />
               <rect x='910' y='340' rx='8' ry='8' width='200' height='200' />
               <rect x='910' y='570' rx='0' ry='0' width='200' height='18' />
               <rect x='910' y='595' rx='0' ry='0' width='120' height='20' />
               <rect x='1130' y='340' rx='8' ry='8' width='200' height='200' />
               <rect x='1130' y='570' rx='0' ry='0' width='200' height='18' />
               <rect x='1130' y='595' rx='0' ry='0' width='120' height='20' />
            </ContentLoader>
         )}
         {isMobile && (
            <ContentLoader viewBox='0 0 400 800' width={400} height={800} title='Loading news...'>
               <rect x='22.84' y='9.93' rx='5' ry='5' width='143.55' height='86.59' />
               <rect x='172.84' y='9.67' rx='0' ry='0' width='200' height='12.12' />
               <rect x='172.84' y='25.67' rx='0' ry='0' width='89' height='9' />

               <rect x='22.84' y='107' rx='5' ry='5' width='143.55' height='86.59' />
               <rect x='172.84' y='107' rx='0' ry='0' width='200' height='12.12' />
               <rect x='172.84' y='123' rx='0' ry='0' width='89' height='9' />

               <rect x='22.84' y='205' rx='5' ry='5' width='143.55' height='86.59' />
               <rect x='172.84' y='205' rx='0' ry='0' width='200' height='12.12' />
               <rect x='172.84' y='221' rx='0' ry='0' width='89' height='9' />

               <rect x='22.84' y='303' rx='5' ry='5' width='143.55' height='86.59' />
               <rect x='172.84' y='303' rx='0' ry='0' width='200' height='12.12' />
               <rect x='172.84' y='319' rx='0' ry='0' width='89' height='9' />

               <rect x='22.84' y='401' rx='5' ry='5' width='143.55' height='86.59' />
               <rect x='172.84' y='401' rx='0' ry='0' width='200' height='12.12' />
               <rect x='172.84' y='417' rx='0' ry='0' width='89' height='9' />
            </ContentLoader>
         )}
      </>
   );
};

const Spinner = (props) => {
   return <h1>Spinner</h1>;
};

export { Loader, Spinner };
