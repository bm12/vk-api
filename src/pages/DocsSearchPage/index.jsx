import React from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './styles.scss';
const cx = classNames.bind(styles);

const DocsSearchPage = () => (
  <div>
    <form>
      <input type="search" />
      <button type="submit">Search</button>
    </form>
    <div className={cx('result-list')}>

    </div>
  </div>
);

DocsSearchPage.defaultProps = {

};
DocsSearchPage.propTypes = {

};

export default DocsSearchPage;
