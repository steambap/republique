export default function useImage(url: string) {
  const image = new window.Image();
  image.src = url;

  return [image];
}
