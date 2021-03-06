/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect } from 'react';

import PropTypes from 'prop-types';

import DefaultButton from '../DefaultButton';

import classNames from 'classnames/bind';
import styles from './styles.scss';
import { isEscapePressed } from '@/utils/eventKeys';
const cx = classNames.bind(styles);

const Popup = (props) => {
  const {
    children,
    onClose,
    className,
    isOpen,
  } = props;

  const onContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (isEscapePressed(e)) onClose();
    };

    if (isOpen) {
      document.body.classList.add('fix-scroll');
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.body.classList.remove('fix-scroll');
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <div onClick={onClose} className={cx('popup', { opened: isOpen })}>
      <div onClick={onContentClick} className={cx('popup-content', className)}>
        <DefaultButton onClick={onClose} className={cx('popup-close-btn')}>
          <span dangerouslySetInnerHTML={{ __html: '&times;' }} />
        </DefaultButton>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

Popup.defaultProps = {
  isOpen: true,
};
Popup.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
  className: PropTypes.any,
  isOpen: PropTypes.bool,
};

export default Popup;
