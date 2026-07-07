import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Shippori_Mincho } from "next/font/google";
import Script from "next/script";
import "./globals.css";

/**
 * Inline script that runs before React hydration (beforeInteractive).
 * Strips attributes injected by browser extensions (Bitdefender, Norton, etc.)
 * which cause false hydration mismatches between server-rendered HTML and client DOM.
 */
const EXTENSION_CLEANUP_SCRIPT = `
(function(){
  try{
    var blocklist=['bis_skin_checked','bis_register'];
    var o=new MutationObserver(function(ms){
      for(var i=0;i<ms.length;i++){
        var n=ms[i].attributeName;
        if(n&&(blocklist.indexOf(n)>-1||n.indexOf('__processed_')===0)){
          ms[i].target.removeAttribute(n);
        }
      }
    });
    o.observe(document.documentElement,{attributes:true,subtree:true});
    window.addEventListener('load',function(){setTimeout(function(){o.disconnect()},10000)});
  }catch(e){}
})();
`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "fallback",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "fallback",
});

const shippori = Shippori_Mincho({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"], // Shippori Mincho supports Japanese internally, we subset latin for loading
  variable: "--font-shippori",
  display: "fallback",
});

export const metadata: Metadata = {
  title: {
    default: "Hinode Nepal | ヒマラヤ旅行の専門家",
    template: "%s | Hinode Nepal",
  },
  description:
    "ヒノデネパールは日本人旅行者のためのネパール高級旅行を専門とします。エベレストトレッキング、文化ツアー、野生動物サファリ。",
  metadataBase: new URL("https://hinodenepal.jp"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className={`${inter.variable} ${cormorant.variable} ${shippori.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-screen bg-[#FAF9F6] text-[#2C2C2C] font-sans antialiased selection:bg-[#8B2C24] selection:text-white">
        <Script
          id="ext-attr-cleanup"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: EXTENSION_CLEANUP_SCRIPT }}
        />
        {children}
      </body>
    </html>
  );
}
