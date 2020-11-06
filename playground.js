const address = [
   {
      region: "Bagmati",
      cities: [
         {
            name: "Bhaktapur",
            areas: [
               {
                  area: "Kamalbinayak Area",
                  deliveryPrice: "40",
               },
               {
                  area: "Suryabinayak Area",
                  deliveryPrice: "50",
               },
               {
                  area: "Sano thimi Area",
                  deliveryPrice: "60",
               },
               {
                  area: "Sallaghari Area",
                  deliveryPrice: "60",
               },
               {
                  area: "Gathtnaghar Area",
                  deliveryPrice: "70",
               },
               {
                  area: "Jagati Area",
                  deliveryPrice: "50",
               },
               {
                  area: "Lohakantnali Area",
                  deliveryPrice: "50",
               },
            ],
         },
         {
            name: "Kathmandu",
            areas: [
               {
                  area: "Kwoteshowr Area",
                  deliveryPrice: "70",
               },
               {
                  area: "New Baneswor Area",
                  deliveryPrice: "80",
               },
               {
                  area: "Maitighar",
                  deliveryPrice: "80",
               },
               {
                  area: "Ringroad Area",
                  deliveryPrice: "80",
               },
               {
                  area: "Ason Area",
                  deliveryPrice: "80",
               },
               {
                  area: "Putalisadak Area",
                  deliveryPrice: "80",
               },
            ],
         },
         {
            name: "Lalitpur",
            areas: [
               {
                  area: "Nakhipot Area Ward 10",
                  deliveryPrice: "70",
               },
               {
                  area: " BanglamukhiArea Ward 12",
                  deliveryPrice: "80",
               },
               {
                  area: " Thaina Area Ward 14 ",
                  deliveryPrice: "80",
               },
               {
                  area: "Kusunti Area Ward 15 ",
                  deliveryPrice: "80",
               },
               {
                  area: "Lagankhel Area Ward 15",
                  deliveryPrice: "80",
               },
               {
                  area: "Satdoöato Area Ward 16",
                  deliveryPrice: "80",
               },
               {
                  area: "Gwarko Area",
                  deliveryPrice: "80",
               },
            ],
         },
      ],
   },
   {
      region: "Gandaki",
      cities: [
         {
            name: "Pokhara",
            areas: [
               {
                  area: " Airport Area",
                  deliveryPrice: "120",
               },
               {
                  area: "Amarsingh Chowk Area",
                  deliveryPrice: "120",
               },
               {
                  area: "Bagar Area",
                  deliveryPrice: "120",
               },
               {
                  area: "Baglung auspark Area",
                  deliveryPrice: "120",
               },
               {
                  area: "Baidam Area",
                  deliveryPrice: "120",
               },
               {
                  area: "Barpatan Area",
                  deliveryPrice: "120",
               },
               {
                  area: "Barpatan Area",
                  deliveryPrice: "120",
               },
            ],
         },
      ],
   },
]

const regions = address.map((add) => {
   return add.region
})

const regionToSearch = "Bagmati"

const { cities } = address.find((add) => {
   return add.region === regionToSearch
})

const namesOfCities = cities.map((city) => {
   return city.name
})
const cityToSearch = "Bhaktapur"

const areas = cities.find((city) => {
   return city.name === cityToSearch
})

const listOfAreas = areas.areas.map((area) => {
   return area.area
})

const priceToSearch = "Kamalbinayak Area"

const b = areas.areas.find((loc) => {
   return loc.area === priceToSearch
})
console.log(b.deliveryPrice)
// const addresses = [
//    {
//       region: "Bagmati",
//       cities: [
//          {

//             bhaktapur: ["Sallaghari", "Suryabinayak", "Kamalbinayak"],
//          },
//          {
//             kathmandu: ["New Road", "Ason", "Kwoteshowr"],
//          },
//       ],
//       deliveryPrice: [
//          {
//             bhaktapur: 200,
//          },
//       ],
//    },
//    {
//       region: "Gandaki",
//       cities: [
//          {
//             bhaktapur: ["Sallaghari", "Suryabinayak", "Kamalbinayak"],
//             deliveryPrice: 100,
//          },
//          {
//             kathmandu: ["New Road", "Ason", "Kwoteshowr"],
//          },
//       ],
//    },
// ]
// const found = addresses.find((address) => {
//    return address.region === "Bagmati"
// })
// // console.log(found.cities)

// const arrayCityOfFoundRegion = found.cities.map((city) => {
//    return city
// })

// console.log(arrayCityOfFoundRegion)

// const city = "bhaktapur"
// const r = arrayCityOfFoundRegion.find((a) => {
//    return Object.keys(a)[0] === city
// })
// console.log(Object.values(r)[0])

// // const q = found.cities.find((ct) => {
// //    return Object.keys(ct)[0] === city
// // })
// // // console.log(q.map(key, value))
// // console.log(Object.values(q)[0])
// // console.log(r.bhaktapur)
// // r.city.map((p) => {
// //    return p
// // })
// // console.log(r.city)
// // console.log(
// //    r.map((p) => {
// //       p
// //    })
// // )

// // console.log(arrayCityOfFoundRegion)
// // const a = found.cities.map((city) => {
// //    return Object.values(city)
// // console.log(addresses[0].cities[0].bhaktapur)
// // const str = addresses.cities.city.map((c) => {
// //    return c
// // })

// // console.log(str)
// // addresses.find((address) => {
// //         return address.region === "bagmati"
// //      }).map(foundAddress => {

// //      })
