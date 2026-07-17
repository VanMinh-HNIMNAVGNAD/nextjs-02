export default function VideoPlayer({ url }: { url: string }) {
  return (
    <video
      src={url}
      controls
      className="aspect-video w-full rounded-lg bg-slate-950"
    />
  );
}

