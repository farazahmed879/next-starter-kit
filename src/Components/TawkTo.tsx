import Script from "next/script";
import React from "react";

const ChatPage = () => {
  return (
    <div style={styles.container}>
      {/* <h1 style={styles.header}>Welcome to Our Support Chat</h1> */}
      {/* <div id="tawk-chat-widget" style={styles.chatBox}></div>

      <Script id="tawk-init" strategy="beforeInteractive">
        {`
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        `}
      </Script> */}

      {/* Tawk.to Embed Script */}
      {/* <Script
        // src="https://embed.tawk.to/6761991a49e2fd8dfef9795f/1ifajs48e"
        src="https://tawk.to/chat/6761991a49e2fd8dfef9795f/1ifcprqui"
        strategy="lazyOnload"
        async
       
      
      /> */}
      <Script
        src="//code.tidio.co/fn3so3licfq7c98lnghqv8e5dppt9vb5.js"
        async
      ></Script>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  chatBox: {
    width: "100%",
    maxWidth: "600px",
    height: "500px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
};

export default ChatPage;
