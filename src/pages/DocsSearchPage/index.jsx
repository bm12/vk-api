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
  const [docsTypes, setDocsTypes] = useState();
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const formElements = e.target.elements;
    const query = formElements['documents-search'].value;
    documentsStore.fetchDocs({ query });

    const types = [...formElements['file-type']]
      .filter((checkbox) => checkbox.checked && !Number.isNaN(parseInt(checkbox.value, 10)))
      .map((checkbox) => Number(checkbox.value));

    setDocsTypes(types.length ? types : undefined);
  }, []);

  const onIntersect = useCallback(() => {
    documentsStore.fetchNextDocs();
  }, []);
  const onPopupOpen = (id) => {
    const doc = documentsStore.docs.find((d) => d.id === id);
    setPreviewDoc(doc);
  };
  const onPopupClose = () => setPreviewDoc(null);

  const results = documentsStore.getFiltredDocs({ types: docsTypes });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="search" name="documents-search" />
          <button type="submit">Search</button>
        </div>
        <div>
          <p>
            Фильтры (применяются после запроса):
          </p>
          <div>
            Тип документа:
            <label className={cx('file-type-label')} htmlFor="file-type-1">
              <input type="checkbox" name="file-type" id="file-type-1" value="1" />
              текстовые документы
            </label>
            <label className={cx('file-type-label')} htmlFor="file-type-2">
              <input type="checkbox" name="file-type" id="file-type-2" value="2" />
              архивы
            </label>
            <label className={cx('file-type-label')} htmlFor="file-type-3">
              <input type="checkbox" name="file-type" id="file-type-3" value="3" />
              gif
            </label>
            <label className={cx('file-type-label')} htmlFor="file-type-4">
              <input type="checkbox" name="file-type" id="file-type-4" value="4" />
              изображения
            </label>
            <label className={cx('file-type-label')} htmlFor="file-type-5">
              <input type="checkbox" name="file-type" id="file-type-5" value="5" />
              аудио
            </label>
            <label className={cx('file-type-label')} htmlFor="file-type-6">
              <input type="checkbox" name="file-type" id="file-type-6" value="6" />
              видео
            </label>
            <label className={cx('file-type-label')} htmlFor="file-type-7">
              <input type="checkbox" name="file-type" id="file-type-7" value="7" />
              электронные книги
            </label>
            <label className={cx('file-type-label')} htmlFor="file-type-8">
              <input type="checkbox" name="file-type" id="file-type-8" value="8" />
              остальные
            </label>
          </div>
        </div>
      </form>
      {documentsStore.count > 0 && !docsTypes && (
        <div>
          Кол-во: {documentsStore.count}
        </div>
      )}
      <div className={cx('results')}>
        {results.map((result) => (
          <SearchResultItem
            key={result.id}
            result={result}
            onClick={onPopupOpen}
          />
        ))}
      </div>
      {documentsStore.count > 0 && (
        <IntersectionListener onIntersect={onIntersect} />
      )}
      {documentsStore.isPending && (
        <div className={cx('preloader-wrap')}>
          <Preloader />
        </div>
      )}
      {previewDoc && (
        <PreviewDocPopup onClose={onPopupClose} doc={previewDoc} />
      )}
    </div>
  );
});

export default DocsSearchPage;
