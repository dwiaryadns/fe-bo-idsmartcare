export default function Loading({ type, size, w, h }) {
  return (
    <span
      className={`loading loading-${type} loading-${size} ${w} ${h}`}
    ></span>
  );
}
