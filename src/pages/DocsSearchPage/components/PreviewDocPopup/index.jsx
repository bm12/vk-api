import React from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './styles.scss';
import Popup from '@/components/Popup';
const cx = classNames.bind(styles);

const PreviewDocPopup = ({ onClose, doc }) => {
  const {
    preview,
    url,
    title,
    owner_id: ownerID,
  } = doc;

  return (
    <Popup onClose={onClose}>
      <div>
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
      </div>
      <div>
        <a
          href={`https://vk.com/id${ownerID}`}
          target="_blank"
          rel="noreferrer"
        >
          Владелец документа
        </a>
      </div>
    </Popup>
  );
};

PreviewDocPopup.propTypes = {
  onClose: PropTypes.func,
  doc: PropTypes.shape({
    preview: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    owner_id: PropTypes.number,
  }),
};

export default PreviewDocPopup;
