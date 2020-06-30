import React, { useState } from 'react';

import PropTypes from 'prop-types';

import DefaultButton from '@/components/DefaultButton';
import Popup from '@/components/Popup';

import classNames from 'classnames/bind';
import styles from './styles.scss';
const cx = classNames.bind(styles);

const SearchResultItem = ({ result }) => {
  const {
    url,
    ext,
    preview,
    title,
  } = result;
  const [showPopup, setShowPopup] = useState(false);

  const WrapComp = preview ? DefaultButton : 'a';
  const onClick = () => setShowPopup(true);
  const onPopupClose = () => setShowPopup(false);

  return (
    <>
      <WrapComp
        href={preview ? undefined : url}
        onClick={preview ? onClick : undefined}
        className={cx('result-wrap')}
      >
        <div className={cx('result')}>
          {preview ? (
            <img className={cx('preview')} src={preview.photo.sizes[0].src} alt="" />
          ) : (
            <div className={cx('preview-placeholder')}>
              {ext}
            </div>
          )}
          <div className={cx('result-title')}>
            {title}
          </div>
        </div>
      </WrapComp>
      {showPopup && (
        <Popup onClose={onPopupClose}>
          {preview.video ? (
            <video
              className={cx('video')}
              src={preview.video.src}
              muted
              controls
              autoPlay
            />
          ) : (
            <img
              src={url}
              className={cx('img-src')}
              alt={title}
            />
          )}
        </Popup>
      )}
    </>
  );
};

SearchResultItem.propTypes = {
  result: PropTypes.shape({
    url: PropTypes.string,
    ext: PropTypes.string,
    preview: PropTypes.shape({
      video: PropTypes.object,
      photo: PropTypes.shape({
        sizes: PropTypes.array,
      }),
    }),
    title: PropTypes.string,
  }),
};

export default SearchResultItem;
