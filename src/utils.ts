export function validateAmount(arr: string[]) {
  for (let i = 0; i < arr.length; i++) {
    let amount = arr[i].split(" ")[1];
    if (isNaN(Number(amount))) {
      return { isValid: false, index: i };
    }
  }
  return { isValid: true, index: -1 };
}

export function sumOfArray(arr: string[]): number {
  return arr.reduce((acc, currentValue) => {
    return acc + parseInt(currentValue);
  }, 0);
}
