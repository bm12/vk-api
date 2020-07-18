import React, { useCallback, useState } from 'react';

import { documentsStore } from '@/stores/Documents';
import { observer } from 'mobx-react';

import IntersectionListener from '@/components/IntersectionListener';
import Preloader from '@/components/Preloader';
import SearchResultItem from './components/SearchResultItem';
import PreviewDocPopup from './components/PreviewDocPopup';

import classNames from 'classnames/bind';
import styles from './styles.scss';
const cx = classNames.bind(styles);

const DocsSearchPage = observer(() => {
  const [previewDoc, setPreviewDoc] = useState(null);
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const query = e.target.elements['documents-search'].value;
    documentsStore.fetchDocs({ query });
  }, []);

  const onIntersect = useCallback(() => {
    documentsStore.fetchNextDocs();
  }, []);
  const onPopupOpen = (id) => {
    const doc = documentsStore.docs.find((d) => d.id === id);
    setPreviewDoc(doc);
  };
  const onPopupClose = () => setPreviewDoc(null);

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
          <SearchResultItem
            key={result.id}
            result={result}
            onClick={onPopupOpen}
          />
        ))}
      </div>
      {documentsStore.count > 0 && (
        <>
          <IntersectionListener onIntersect={onIntersect} />
          <div className={cx('preloader-wrap')}>
            <Preloader />
          </div>
        </>
      )}
      {previewDoc && (
        <PreviewDocPopup onClose={onPopupClose} doc={previewDoc} />
      )}
    </div>
  );
});

export default DocsSearchPage;
