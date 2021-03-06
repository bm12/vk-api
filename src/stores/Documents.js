/* eslint-disable no-underscore-dangle */
import {
  observable, action, runInAction, computed,
} from 'mobx';
import { documnetsService } from '@/services/documentsService';
import { uniqBy } from 'lodash';

class DocumentsStore {
  @observable.shallow docs = [];
  @observable count = 0;
  @observable isPending = false;

  _fetchOptions = null;
  _filterOptions = {};

  @action async fetchDocs(options, filters) {
    this._fetchOptions = { ...options, offset: 0 };
    this._filterOptions = filters;
    if (this.isPending) return;
    this.isPending = true;

    const { items, count } = await documnetsService.search(this._fetchOptions);
    runInAction(() => {
      this.isPending = false;
      this.count = count;
      this.docs = items;
    });
  }

  @action async fetchNextDocs() {
    if (this.isPending) return;
    this.isPending = true;

    this._fetchOptions = { ...this._fetchOptions, offset: this._fetchOptions.offset + 20 };
    const { items } = await documnetsService.search({ ...this._fetchOptions, offset: this.docs.length });

    const uniqItems = uniqBy([...this.docs, ...items], (doc) => doc.id);
    runInAction(() => {
      this.isPending = false;
      this.docs = uniqItems;
    });
  }

  @computed get filtredDocs() {
    const { types, ext } = this._filterOptions;
    return this.docs.filter((doc) => {
      if (types && !types.includes(doc.type)) return false;
      if (ext && ext !== doc.ext) return false;

      return true;
    });
  }
}

export const documentsStore = new DocumentsStore();
