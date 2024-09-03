export default function Loading({ type, size }) {
  return <span className={`loading loading-${type} loading-${size}`}></span>;
}
