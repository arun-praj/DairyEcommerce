const addresses = [
   {
      region: "Bagmati",
      cities: [
         {
            bhaktapur: ["Sallaghari", "Suryabinayak", "Kamalbinayak"],
         },
         {
            kathmandu: ["New Road", "Ason", "Kwoteshowr"],
         },
      ],
   },
   {
      region: "Gandaki",
      cities: [
         {
            bhaktapur: ["Sallaghari", "Suryabinayak", "Kamalbinayak"],
         },
         {
            kathmandu: ["New Road", "Ason", "Kwoteshowr"],
         },
      ],
   },
]
const found = addresses.find((address) => {
   return address.region === "Bagmati"
})
// console.log(found.cities)

const arrayCityOfFoundRegion = found.cities.map((city) => {
   return city
})

// console.log(arrayCityOfFoundRegion)

const city = "bhaktapur"
const r = arrayCityOfFoundRegion.find((a) => {
   return Object.keys(a)[0] === city
})
console.log(Object.values(r)[0])

const q = found.cities.find((ct) => {
   return Object.keys(ct)[0] === city
})
// console.log(q.map(key, value))
console.log(Object.values(q)[0])
// console.log(r.bhaktapur)
// r.city.map((p) => {
//    return p
// })
// console.log(r.city)
// console.log(
//    r.map((p) => {
//       p
//    })
// )

// console.log(arrayCityOfFoundRegion)
// const a = found.cities.map((city) => {
//    return Object.values(city)
// console.log(addresses[0].cities[0].bhaktapur)
// const str = addresses.cities.city.map((c) => {
//    return c
// })

// console.log(str)
// addresses.find((address) => {
//         return address.region === "bagmati"
//      }).map(foundAddress => {

//      })
