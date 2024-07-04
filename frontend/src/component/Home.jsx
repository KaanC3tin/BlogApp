import React from "react";

export const Home = () => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      {" "}
      {/* Dışındaki boşluğu sıfırlıyoruz */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingTop: "56.2225%",
          paddingBottom: 0,
          boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
          overflow: "hidden",
          borderRadius: "8px",
          willChange: "transform",
        }}
      >
        <iframe
          title="Canva Design"
          loading="lazy"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            border: "none",
            padding: 0,
            margin: 0,
          }}
          src="https://www.canva.com/design/DAGJ7g3K4sc/ZAuOKkKK72AMRBiH4GcV_g/view?embed"
          allowFullScreen
          allow="fullscreen"
        ></iframe>
      </div>
      <a
        href="https://www.canva.com/design/DAGJ7g3K4sc/ZAuOKkKK72AMRBiH4GcV_g/view?utm_content=DAGJ7g3K4sc&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  );
};

export default Home;
