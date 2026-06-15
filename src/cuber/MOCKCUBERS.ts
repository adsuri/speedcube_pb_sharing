import { Cuber } from "./Cuber";

export const ADITYA = new Cuber({
  name: "Aditya Suri",
  email: "adityasuri@testemail.com",
  pictureURL: "https://test.com/image.png",
  puzzles: {
    "222": {
      name: "222",
      records: {
        "single": {
          score: 1.37
        },
        "ao5": {
          score: 4.61,
          setInComp: true,
          setOn: new Date()
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
          score: 10.952,
          setInComp: false
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
          score: 19.67
        }
      }
    },
    "mbld": {
      name: "mbld",
      currMain: "test",
      records: {
        "single": {
          score: [[14, 25], 3700.51],
          setOn: new Date()
        }
      }
    },
    "fmc": {
      name: "fmc",
      currMain: "testing",
      records: {
        "single": {
          score: 25,
          setOn: new Date(),
          setInComp: true
        },
        "mo3": {
          score: 30,
          setOn: new Date(),
          setInComp: true
        }
      }
    }
  }
});