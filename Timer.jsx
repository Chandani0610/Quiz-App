export default function Timer({ time }) {
  return (
    <div className="alert alert-info text-center fw-bold">
      ⏳ Time Left: {time}s
    </div>
  );
}
