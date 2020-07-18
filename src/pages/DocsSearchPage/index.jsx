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
    const query = e.target.elements['documents-search'].value;
    documentsStore.fetchDocs({ query });

    const type = parseInt(e.target.elements.type.value, 10);

    if (Number.isNaN(type)) {
      setDocsTypes();
    } else {
      setDocsTypes([type]);
    }
  }, []);

  const onIntersect = useCallback(() => {
    documentsStore.fetchNextDocs();
  }, []);
  const onPopupOpen = (id) => {
    const doc = documentsStore.docs.find((d) => d.id === id);
    setPreviewDoc(doc);
  };
  const onPopupClose = () => setPreviewDoc(null);

  console.log(documentsStore.docs);
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
          <label htmlFor="documentTypeSelect">
            Тип документа:
            <select name="type" id="documentTypeSelect">
              <option value="">Любой</option>
              <option value="1">текстовые документы</option>
              <option value="2">архивы</option>
              <option value="3">gif</option>
              <option value="4">изображения</option>
              <option value="5">аудио</option>
              <option value="6">видео</option>
              <option value="7">электронные книги</option>
              <option value="8">остальные</option>
            </select>
          </label>
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
