import Rodal from 'rodal';
import Image from "next/image";

// your-dialog.jsx
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';


// include styles
import 'rodal/lib/rodal.css';
import './Popup.css';

// type security - adding children to the interface of Radix UI's Dialog.Content
interface DialogContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  children: React.ReactNode;
}

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogContent({ children, ...props }: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={"DialogOverlay"}/>
      <DialogPrimitive.Content {...props} className={"DialogContent"}>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}