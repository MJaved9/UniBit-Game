/* Problem Statement:- Given an array of integers and a target value, you must determine which two integers' sum
equals the target and return a 2D array. Then merge the array into a single array with sorting (
ascending ) order, in the next step double the target value and find again the combination of
digits (can be multiple digits ) that are equal to the double targeted value and returned into a 2D
array.
Sample Input : [1, 3, 2, 2, -4, -6, -2, 8];
Target Value = 4,
Output: First Combination For “4” : [ [1,3],[2,2],[-4,8],[-6,2] ];
Merge Into a single Array : [-6,-4,1,2,2,2,3,8];
Second Combination For “8” : [ [ 1,3,2,2], [8,-4,2,2],....,[n,n,n,n] ] */


// Part-1:-  First Combination For “4”
   // Approach -1 :-  Two Pointer Method 

   console.log(findCombinations(input,target))
function findCombinations(arr, target) {
  const combinations = [];
  const mergedArray = [];

  // Find combinations that sum up to the target value
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        combinations.push([arr[i], arr[j]]);
      }
    }
  }

  // Merge the array and sort it in ascending order
  mergedArray.push(...arr);
  mergedArray.sort((a, b) => a - b);

  // Double the target value and find combinations
  const doubleTarget = target * 2;
  const doubleCombinations = [];

  for (let i = 0; i < mergedArray.length; i++) {
    for (let j = i + 1; j < mergedArray.length; j++) {
      if (mergedArray[i] + mergedArray[j] === doubleTarget) {
        doubleCombinations.push([...mergedArray.slice(i, j + 1)]);
      }
    }
  }

  return {
    firstCombination: combinations,
    mergedArray,
    secondCombination: doubleCombinations,
  };
}  




// Time Complexity:

// The first nested loop has a complexity of O(n^2) because it iterates over the arr array twice, where n is the length of the array.
// The mergedArray.sort() operation has a complexity of O(n log n), where n is the length of the arr array. This is because it uses a comparison-based sorting algorithm, such as quicksort or mergesort.
// The second nested loop also has a complexity of O(n^2) because it iterates over the mergedArray array twice, where n is the length of the array.
// Therefore, the overall time complexity of your code is O(n^2) + O(n log n) + O(n^2), which simplifies to O(n^2 + n log n).

// Space Complexity:

// The combinations array stores the combinations that sum up to the target value. Its size depends on the number of valid combinations, but in the worst case, it could store O(n^2) combinations.
// The mergedArray array stores the merged and sorted version of the input array. Its size is equal to the size of the input array, so it takes O(n) space.
// The doubleCombinations array stores the combinations that sum up to double the target value. Its size also depends on the number of valid combinations, but in the worst case, it could store O(n^2) combinations.
// Therefore, the overall space complexity of your code is O(n^2) because the space usage is dominated by the combinations and doubleCombinations arrays.




//Part-2 for Optimization
function findCombinations(arr, target) {
    const combinations = [];
    const sortedArray = arr.slice().sort((a, b) => a - b);
  
    for (let i = 0; i < sortedArray.length - 1; i++) {
      let left = i + 1;
      let right = sortedArray.length - 1;
  
      while (left < right) {
        const sum = sortedArray[i] + sortedArray[left] + sortedArray[right];
  
        if (sum === target) {
          combinations.push([sortedArray[i], sortedArray[left], sortedArray[right]]);
          left++;
          right--;
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  
    return combinations;
  }


  
//   Instead of finding combinations that sum up to the target value in two separate loops, we can use a two-pointer technique. We sort the array first, and then use two pointers (left and right) to find combinations. This reduces the time complexity to O(n log n) since the sorting step dominates the time complexity.
//   The merged array and double combinations are no longer required, so they are removed.
//   The space complexity remains the same as the previous analysis, O(n^2), since we still need to store the combinations that sum up to the target value  