import { createEvent, createStore } from 'effector';
import type { TElement, TViewMode } from '@/widgets/periodic-table/model/types.ts';

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

export const setViewMode = createEvent<TViewMode>();
export const $viewMode = createStore<TViewMode>('heatmaps').on(
  setViewMode,
  (_, payload) => payload
);
