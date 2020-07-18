import React, { useRef, useEffect } from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './styles.pcss';
const cx = classNames.bind(styles);

const IntersectionListener = ({ onIntersect, onLeave }) => {
  const elemRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries.find((e) => e.isIntersecting)) onIntersect();
      if (entries.find((e) => !e.isIntersecting)) onLeave();
    });

    observer.observe(elemRef.current);
    return () => observer.disconnect();
  }, [onIntersect, onLeave]);

  return (
    <div ref={elemRef} className={cx('visuallyHidden')} />
  );
};

IntersectionListener.defaultProps = {
  onIntersect: () => {},
  onLeave: () => {},
};
IntersectionListener.propTypes = {
  onIntersect: PropTypes.func,
  onLeave: PropTypes.func,
};

export default IntersectionListener;
