/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect } from 'react';

import PropTypes from 'prop-types';

import DefaultButton from '../DefaultButton';

import classNames from 'classnames/bind';
import styles from './styles.scss';
const cx = classNames.bind(styles);

const Popup = (props) => {
  const {
    children, onClose, className, isOpen,
  } = props;
  const onContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (isOpen) document.body.classList.add('fix-scroll');

    return () => document.body.classList.remove('fix-scroll');
  }, [isOpen]);

  return (
    <DefaultButton onClick={onClose} className={cx('popup', { opened: isOpen })}>
      <div onClick={onContentClick} className={cx('popup-content', className)}>
        <DefaultButton onClick={onClose} className={cx('popup-close-btn')}>
          <span dangerouslySetInnerHTML={{ __html: '&times;' }} />
        </DefaultButton>
        <div>
          {children}
        </div>
      </div>
    </DefaultButton>
  );
};

Popup.defaultProps = {
  isOpen: true,
};
Popup.propTypes = {

};

export default Popup;
