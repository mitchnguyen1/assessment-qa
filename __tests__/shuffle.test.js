const shuffle = require("../src/shuffle");

describe("shuffle should shuffle the provided array", () => {

    //testing the return type of 
    test('shuffle should return an array', ()=>{
      //temp array to 
      let testArr = [1,2,3]
      //testing if the return of shuffle is the same type as the testArr(array obj)
      expect(typeof shuffle(testArr)).toBe(typeof testArr)
    })

    //testing the return array length
    test('shuffle returns the same amount of element if received', ()=>{
      //create a test array
      let testArr = [0,1,2,3,4,5,6]
      //define the length of the test array and return of shuffle
      let testArrLen = testArr.length
      let shuffleLen = shuffle(testArr).length
      expect(shuffleLen).toBe(testArrLen)
    })

    //check if all elements are similar 
    test("check if all the items are the same",()=>{
      //define test array
      let testArr = [0,1,2,3,4,5,6]
      //sort the return of shuffle to compare to original
      let sortedResult = shuffle(testArr).sort()
      //.toStrictEqual for checking objects
      expect(sortedResult).toStrictEqual(testArr)
    })

    //check if all items are shuffled
    test("shuffle should return array not in the same order",()=>{
      //define test array
      let testArr = [1,3,4,5,7]
      //define shuffle result
      let shuffleResult = shuffle(testArr)
      //compare and check if it's NOT the same
      expect(shuffleResult).not.toStrictEqual(testArr)
    })
});
