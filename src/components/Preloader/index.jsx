import React from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './styles.scss';
const cx = classNames.bind(styles);

const Preloader = ({ size = 40 }) => (
  <div className={cx('wrapper')} style={{ '--size': `${size}px` }} />
);

Preloader.propTypes = {
  size: PropTypes.number,
};

export default Preloader;
