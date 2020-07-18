import React, { useCallback } from 'react';

import { documentsStore } from '@/stores/Documents';
import { observer } from 'mobx-react';

import SearchResultItem from './components/SearchResultItem';

import classNames from 'classnames/bind';
import styles from './styles.scss';
import IntersectionListener from '@/components/IntersectionListener';
const cx = classNames.bind(styles);

const DocsSearchPage = observer(() => {
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const query = e.target.elements['documents-search'].value;
    documentsStore.fetchDocs({ query });
  }, []);

  const onIntersect = useCallback(() => {
    documentsStore.fetchNextDocs();
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="search" name="documents-search" />
        <button type="submit">Search</button>
      </form>
      <div>
        Кол-во: {documentsStore.count}
      </div>
      <div className={cx('results')}>
        {documentsStore.docs.map((result) => (
          <SearchResultItem key={result.id} result={result} />
        ))}
      </div>
      {documentsStore.count > 0 && (
        <IntersectionListener onIntersect={onIntersect} />
      )}
    </div>
  );
});

export default DocsSearchPage;
