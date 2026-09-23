// Loading and error states shared by every page that reads from the API.
export default function Status({ error, what }) {
  if (error) {
    return (
      <p className="status status--error" role="alert">
        Couldn't load {what}. Check that the API server is running on port 3001, then refresh the page.
      </p>
    );
  }
  return <p className="status" aria-live="polite">Loading {what}…</p>;
}
