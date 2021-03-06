import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import { routes } from '@/modules/routes';

import DocsSearchPage from '@/pages/DocsSearchPage';
import PrivateRoute from '@/components/PrivateRoute';

import classNames from 'classnames/bind';
import styles from './styles.scss';
const cx = classNames.bind(styles);

const Main = () => (
  <Router>
    <div className={cx('wrapper')}>
      <nav>
        <ul className={cx('nav-list')}>
          <li className={cx('nav-item')}>
            <Link to={routes.docsPage}>
              Docs
            </Link>
          </li>
          <li className={cx('nav-item')}>
            <Link to={routes.videosPage}>
              Video
            </Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <PrivateRoute path={routes.docsPage}>
          <DocsSearchPage />
        </PrivateRoute>
        <Route path="/">
          <h2>
            Choose page
          </h2>
        </Route>
      </Switch>
    </div>

  </Router>
);

export default Main;
