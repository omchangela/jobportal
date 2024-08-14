const getTimePassed = (date) => {
  // Convert the given date string to a Date object
  const givenDate = new Date(date);

  // Current date
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - givenDate;

  // Calculate the time passed in hours or days
  const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Determine whether to print hours or days
  if (hoursPassed < 24) {
    return `${hoursPassed < 1 ? 'Just now' : hoursPassed + 'hrs'}`;
  } else {
    return `${daysPassed} ${daysPassed === 1 ? 'day' : 'days'}.`;
  }
};

getTimePassed('2023-12-23T14:32:16.991Z');

export default getTimePassed;
