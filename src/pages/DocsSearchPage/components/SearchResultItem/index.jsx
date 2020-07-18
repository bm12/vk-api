import React from 'react';

import PropTypes from 'prop-types';

import DefaultButton from '@/components/DefaultButton';

import classNames from 'classnames/bind';
import styles from './styles.scss';
const cx = classNames.bind(styles);

const SearchResultItem = ({ result, onClick: onClickProp }) => {
  const {
    id,
    url,
    ext,
    preview,
    title,
  } = result;

  const WrapComp = preview ? DefaultButton : 'a';
  const onClick = () => onClickProp(id);

  return (
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
  );
};

SearchResultItem.propTypes = {
  onClick: PropTypes.func,
  result: PropTypes.shape({
    id: PropTypes.number,
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
