export function getRandomActivities(activityArray, count) {
    const shuffledActivities = activityArray.sort(() => 0.5 - Math.random());
    return shuffledActivities.slice(0, count);
  }
  