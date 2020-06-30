import React, { useCallback, useState } from 'react';

import { documnetsService } from '@/services/documentsService';

import classNames from 'classnames/bind';
import styles from './styles.scss';
import SearchResultItem from './components/SearchResultItem';
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
          <SearchResultItem key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};

export default DocsSearchPage;
