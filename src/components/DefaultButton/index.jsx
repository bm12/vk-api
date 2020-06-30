import React from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './styles.scss';
const cx = classNames.bind(styles);

const DefaultButton = ({ children, className, ...props }) => (
  <button type="button" className={cx('button', className)} {...props}>
    {children}
  </button>
);

DefaultButton.propTypes = {
  children: PropTypes.element,
  className: PropTypes.any,
};

export default DefaultButton;
