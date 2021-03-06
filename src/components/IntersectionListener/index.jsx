import React, { useRef, useEffect } from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './styles.scss';
const cx = classNames.bind(styles);

const IntersectionListener = ({ onChange }) => {
  const elemRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => onChange(e.isIntersecting));
    });

    observer.observe(elemRef.current);
    return () => observer.disconnect();
  }, [onChange]);

  return (
    <div ref={elemRef} className={cx('visuallyHidden')} />
  );
};

IntersectionListener.defaultProps = {
  onChange: () => {},
};
IntersectionListener.propTypes = {
  onChange: PropTypes.func,
};

export default IntersectionListener;
