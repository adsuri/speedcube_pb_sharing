import { Cuber } from "./Cuber";

export const ADITYA = new Cuber({
  id: 100,
  name: "Aditya Suri",
  email: "adityasuri@testemail.com",
  pictureURL: "https://test.com/image.png",
  puzzles: {
    "222": {
      name: "222",
      currMain: "Moyu Weilong 2M",
      records: {
        "single": {
          score: 1.37
        },
        "ao5": {
          score: 4.61
        },
        "ao12": {
          score: 5.38
        },
        "ao25": {
          score: 5.76
        },
        "ao50": {
          score: 5.95
        },
        "ao100": {
          score: 6.22
        }
      }
    },
    "333": {
      name: "333",
      currMain: "Dayan Guhong Pro+ M",
      records: {
        "single": {
          score: 10.95
        },
        "ao5": {
          score: 15.63
        },
        "ao12": {
          score: 17.62
        },
        "ao25": {
          score: 18.69
        },
        "ao50": {
          score: 19.22
        },
        "ao100": {
          score: 19.40
        }
      }
    },
    "mbld": {
      name: "mbld",
      currMain: "test",
      records: {
        "single": {
          score: [[14, 25], 3700]
        }
      }
    }
  }
});