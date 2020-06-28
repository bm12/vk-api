import React, { useCallback, useState } from 'react';

import { documnetsService } from '@/services/documentsService';

import classNames from 'classnames/bind';
import styles from './styles.scss';
const cx = classNames.bind(styles);

const DocsSearchPage = () => {
  const [results, setResults] = useState([]);
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const query = e.target.elements['documents-search'].value;
    const { items } = await documnetsService.search({ query });

    setResults(items);
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="search" name="documents-search" />
        <button type="submit">Search</button>
      </form>
      <div className={cx('results')}>
        {results.map((result) => (
          <div className={cx('result')} key={result.id}>
            {result.type === 4 ? (
              <img className={cx('result-img')} src={result.url} alt="" />
            ) : (
              <div>
                other type (ext is: {result.ext})
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocsSearchPage;
