export default function getYoutubeVideoId(videoUrl: string):string {
    const videoIdRegex = /(?:\/|%3D|v=)([A-Za-z0-9_-]{11})(?:[%#?&]|$)/;
  const match = videoUrl.match(videoIdRegex);
  return match ? match[1] : '';
}