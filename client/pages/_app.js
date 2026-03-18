import "../styles/globals.css";
import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import toast, { Toaster } from "react-hot-toast";
import { StateContextProvider } from "../context/index";
import Head from "next/head";

export default function App  ({ Component, pageProps }) {
  return (
    
    <>
    <Head>
      <title>BlockEstate</title>
      <meta name="application-name" content="BlockEstate" />
      <link rel="icon" href="/logo/favicon-house.svg?v=3" type="image/svg+xml" />
      <link rel="shortcut icon" href="/logo/favicon-house.svg?v=3" />
      <link rel="apple-touch-icon" href="/logo/favicon-house.svg?v=3" />
    </Head>
    <ThirdwebProvider
      activeChain={11155111}
      clientId="c6dc381f4771f42ffda40be78874355c"
      autoConnect={false}
    >
      <StateContextProvider>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </StateContextProvider>
    </ThirdwebProvider>

   {/* JavaScript */}

<script src="/js/vendor/jquery.js"></script>
<script src="/js/vendor/jquery.nice-select.min.js"></script>
<script src="/js/vendor/jquery-ui.js"></script>
<script src="/js/vendor/modernizer.min.js"></script>
<script src="/js/vendor/feather.min.js"></script>
<script src="/js/vendor/slick.js"></script> 
<script src="/js/vendor/bootstrap.min.js"></script>
<script src="/js/vendor/sal.min.js"></script>
<script src="/js/vendor/particles.js"></script>
<script src="/js/vendor/jquery.style.js"></script>
<script src="/js/vendor/js.cookie.js"></script>
<script src="/js/vendor/count-down.js"></script>
<script src="/js/vendor/isotop.js"></script>
<script src="/js/vendor/imageloaded.js"></script>
<script src="/js/vendor/odometer.js"></script>
<script src="/js/vendor/jquery-appear.js"></script>
<script src="/js/vendor/scrolltrigger.js"></script>
<script src="/js/vendor/jquery.custom-file-input.js"></script>
<script src="/js/vendor/savePopup.js"></script>
<script src="/js/vendor/vanilla.tilt.js"></script>
<script src="/js/main.js"></script>

    </>
  );
}
