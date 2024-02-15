import Rodal from 'rodal';
import Image from "next/image";

// your-dialog.jsx
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';


// include styles
import 'rodal/lib/rodal.css';
import './ShowPopup.css';
import fallback from "../../../public/Radio-Microphone.png";
import {PopupState} from "@/app/lib/types";

export default function ShowPopup({popup, hide}: { popup: PopupState, hide: () => void }) {

  return (
    <Rodal className={"Modal"}
           visible={popup.visible}
           onClose={hide}
           customStyles={
            // (window.matchMedia("only screen and (min-width: 600px)").matches) ?
              {height: "300px", width: "600px"}
             // :
//               {height: "70%", width: "80%"}
           }
           closeMaskOnClick closeOnEsc >

      <div className={"Popup"}>
        <Image className={"Image"}
               src={popup.img === null ? fallback.src : popup.img}
               alt={"Cover image for the show: " + popup.title}
               height={120}
               width={120}
        />

        <div className={"PopupDetails"}>
          <h2>{popup.title}</h2>
          <p>{popup.excerpt === "" ? "This show has no excerpt" : popup.excerpt}</p>
        </div>
      </div>
    </Rodal>
  )
}

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