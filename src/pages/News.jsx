import { News } from '../components/news/News.jsx';

export function NewsPage( props ) {
  return (
    <News title={props.match.params.id} allNews={true} />
  );
}