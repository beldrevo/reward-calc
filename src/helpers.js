const calculateReward = (num) => {
  let sum = 0;
  if (num >= 100) {
    sum = (num - 100) * 2 + 50;
  }
  if (num < 100 && num > 50) {
    sum = num - 50;
  }
  return sum;
};

const month = (num) => {
  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthArr[num];
};

export { calculateReward, month };
