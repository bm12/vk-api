/* eslint-disable no-underscore-dangle */
import { observable, action, computed } from 'mobx';
import { documnetsService } from '@/services/documentsService';

class DocumentsStore {
  @observable _docs = [];
  @observable count = 0;
  _fetchOptions = null;

  @computed get docs() {
    return this._docs;
  }

  @action async fetchDocs(options) {
    this._fetchOptions = { ...options, offset: 0 };
    const { items, count } = await documnetsService.search(this._fetchOptions);

    this.count = count;
    this._docs = items;
  }

  @action async fetchNextDocs() {
    const { items } = await documnetsService.search({ ...this._fetchOptions, offset: this._docs.length });

    this._docs.push(...items);
  }
}

export const documentsStore = new DocumentsStore();
