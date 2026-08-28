import { createEvent, createStore } from 'effector';
import type { TElement } from '@/widgets/periodic-table/model/types.ts';

export const setElementHover = createEvent<TElement>();
export const $elementHover = createStore<TElement | null>(null).on(
  setElementHover,
  (_, payload) => payload
);

export const setElementSelected = createEvent<TElement>();
export const $elementSelected = createStore<TElement | null>(null).on(
  setElementSelected,
  (_, payload) => payload
);
