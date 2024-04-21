/*
  * File: 
    *Expenses.js

  * Description: 
    * This file is a component for the layout editor functionality.
    * It uses the useSortable hook from the @dnd-kit/sortable package to create a sortable item.
  * 
*/

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableItem = ({ id, children, className }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={className}>
      {children}
    </div>
  );
};
