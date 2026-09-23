import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro.jsx';

export default function NotFound() {
  return (
    <PageIntro title="Page not found">
      That address doesn't match any page. <Link to="/">Go to the home page</Link>.
    </PageIntro>
  );
}
