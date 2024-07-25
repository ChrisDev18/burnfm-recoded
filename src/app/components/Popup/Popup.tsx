import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import 'rodal/lib/rodal.css';
import styles from './Popup.module.css';

// type security - adding children to the interface of Radix UI's Dialog.Content
interface DialogContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  children: React.ReactNode;
}

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogContent({ children, ...props }: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.DialogOverlay}/>
      <DialogPrimitive.Content {...props} className={styles.DialogContent}>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}