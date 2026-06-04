import { Cuber, type CuberInit } from "./Cuber";

export const ADITYA = new Cuber({
  id: 100,
  name: "Aditya Suri",
  email: "adityasuri@testemail.com",
  pictureURL: "https://test.com/image.png",
  puzzles: {
    "222": {
      currMain: "Moyu Weilong 2M",
      records: {
        "single": {
          score: 1.37,
          cubeUsed: "Moyu Weilong 2M"
        },
        "ao5": {
          score: 4.61,
          cubeUsed: "Moyu Weilong 2M"
        },
        "ao12": {
          score: 5.38,
          cubeUsed: "Moyu Weilong 2M"
        },
        "ao25": {
          score: 5.76,
          cubeUsed: "Moyu Weilong 2M"
        },
        "ao50": {
          score: 5.95,
          cubeUsed: "Moyu Weilong 2M"
        },
        "ao100": {
          score: 6.22,
          cubeUsed: "Moyu Weilong 2M"
        }
      }
    },
    "333": {
      currMain: "Dayan Guhong Pro+ M",
      records: {
        "single": {
          score: 10.95,
          cubeUsed: "Dayan Guhong Pro+ M"
        },
        "ao5": {
          score: 15.63,
          cubeUsed: "Dayan Guhong Pro+ M"
        },
        "ao12": {
          score: 17.62,
          cubeUsed: "GAN 354 M"
        },
        "ao25": {
          score: 18.69,
          cubeUsed: "GAN 354 M"
        },
        "ao50": {
          score: 19.22,
          cubeUsed: "GAN 354 M"
        },
        "ao100": {
          score: 19.40,
          cubeUsed: "GAN 354 M"
        }
      }
    }
  }
});