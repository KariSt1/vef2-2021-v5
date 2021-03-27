import React, { useEffect, useState } from 'react';
import { News } from '../news/News.jsx';

import s from './NewsList.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      let json;

      try {
        const result = await fetch(apiUrl);

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
  }, []);

  if (error) {
    return (
      <p>Villa kom upp: {error}</p>
    );
  }

  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }

  const newsGroups = data || [];

  return (
    <div className={s.newslist}>
      {newsGroups.map((newsGroup, i) => {
        return (
          <div key={i} className={s.newslist__group}>
            <News title={newsGroup.id} allNews={false}/>
          </div>
        )
      })}
    </div>
  );
}
