import { useEffect } from "react";

export default function InstagramEmbedding() {
  useEffect(() => {
    // Load Instagram embed script when component mounts
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
      <div className="igwrapper relative ">
        {/* Instagram embed */}
        <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/burn_fm/"
            data-instgrm-version="14"
            style={{
              // background: "#FFF",
              // border: 0,
              // borderRadius: "3px",
              // boxShadow:
              //     "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
              // margin: "1px",
              maxWidth: "1000px",
              // minWidth: "326px",
              padding: 0,
              width: "calc(100% - 2px)",
            }}
        ></blockquote>
      </div>
  );
}