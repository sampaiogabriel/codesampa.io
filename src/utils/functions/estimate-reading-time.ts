export function estimateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const textLength = content.length;
  const estimatedWords = textLength / 10;
  const minutes = Math.ceil(estimatedWords / wordsPerMinute);
  return minutes || 1;
}