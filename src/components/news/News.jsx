import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound.jsx';

import s from './News.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

News.propTypes = {
  title: PropTypes.string.isRequired,
  allNews: PropTypes.bool.isRequired,
};

export function News({ title, allNews }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      let json;

      const url = `${apiUrl}${title}`;

      try {
        const result = await fetch(url);

        if (result.status === 404) {
          setStatus(404);
        }

        if (!result.ok) {
          throw new Error('result not ok');
        }
        json = await result.json();
      } catch (e) {
        setError('Gat ekki sótt fréttir.');
      } finally {
        setLoading(false);
      }

      setData(json);
    }
    fetchData();
  }, [title]);

  if (status) {
    return (
      <Route component={NotFound} />
    );
  }

  if (error) {
    return (
      <p className={s.news__error}>Villa kom upp: {error}</p>
    );
  }

  if (loading) {
    return (
      <p className={s.news__loading}>Sæki gögn...</p>
    );
  }

  const news = data.items || [];
  let link;
  if (allNews) {
    link = <Link to='/' className={s.news__link}>Til baka</Link>;
  } else {
    link = <Link to={`/${title}`} className={s.news__link}>Allar fréttir</Link>;
  }

  return (
    <div className={s.news}>
      <h3 className={s.news__category}>{data.title}</h3>
      <ul className={s.news__list}>
        {news.length === 0 && (
          <li className={s.news__article}>Engar fréttir</li>
        )}
        {news.length > 0 &&
          (allNews
            ? (news.map((article, i) => {
              return (
                <li className={s.news__article} key={i}><a className={s.news__text} href={article.link}>{article.title}</a></li>
              )}))
            : (news.splice(0, 5).map((article, i) => {
              return (
                <li className={s.news__article} key={i}><a className={s.news__text} href={article.link}>{article.title}</a></li>
              )}))
          )
        }
      </ul>
      {link}
    </div>
  );
}
