/* eslint-disable no-underscore-dangle */
import { observable, action } from 'mobx';
import { documnetsService } from '@/services/documentsService';
import { uniqBy } from 'lodash';

class DocumentsStore {
  @observable.shallow docs = [];
  @observable count = 0;

  _fetchOptions = null;
  _isPending = false;

  @action async fetchDocs(options) {
    this._fetchOptions = { ...options, offset: 0 };
    if (this._isPending) return;
    this._isPending = true;

    const { items, count } = await documnetsService.search(this._fetchOptions);
    this._isPending = false;

    this.count = count;
    this.docs = items;
  }

  @action async fetchNextDocs() {
    if (this._isPending) return;
    this._isPending = true;

    const { items } = await documnetsService.search({ ...this._fetchOptions, offset: this.docs.length });
    this._isPending = false;

    const uniqItems = uniqBy([...this.docs, ...items], (doc) => doc.id);

    this.docs = uniqItems;
  }
}

export const documentsStore = new DocumentsStore();
