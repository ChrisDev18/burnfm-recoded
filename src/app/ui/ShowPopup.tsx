import Rodal from 'rodal';
import Image from "next/image";


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
           customStyles={matchMedia("only screen and (max-width: 600px)").matches ?
             {height: "70%", width: "80%"} :
             {height: "300px", width: "600px"}}
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