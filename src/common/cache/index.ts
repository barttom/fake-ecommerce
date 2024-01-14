import {MMKV} from 'react-native-mmkv';
import {CartState} from '../../feature/Cart';
import {SettingsState} from '../../feature/Settings';
import {User} from '../api/apiTypes';

const mmkv = new MMKV();
export type CacheItem = CartState | SettingsState | User;
export type CacheKey = 'settings' | 'cart' | 'user';

export const setCacheItem = (key: CacheKey, item: CacheItem) => {
  mmkv.set(key, JSON.stringify(item));
};

export const getCacheItem = (key: CacheKey) => {
  const currentItem = mmkv.getString(key);

  return currentItem ? JSON.parse(currentItem) : null;
};

export const deleteCacheItem = (key: CacheKey) => {
  mmkv.delete(key);
};
