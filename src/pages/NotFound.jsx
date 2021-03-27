import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <p>404 villa, síða finnst ekki.</p>
      <Link to="/">Til baka</Link>
    </div>
  );
}
