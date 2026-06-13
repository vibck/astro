import Script from "next/script";

/**
 * Pinterest Tag (Conversion Pixel)
 * Tag-ID muss als ENV-Var `NEXT_PUBLIC_PINTEREST_TAG_ID` gesetzt sein.
 * Wird nur gerendert wenn die Tag-ID vorhanden ist.
 *
 * Custom Events via window.pintrk("track", "checkout", { ... }) später möglich.
 */
export function PinterestTag() {
  const tagId = process.env.NEXT_PUBLIC_PINTEREST_TAG_ID;

  if (!tagId) return null;

  return (
    <>
      <Script id="pinterest-tag" strategy="afterInteractive">
        {`
          !function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(
          Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";
          var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];
          r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
          pintrk('load', '${tagId}', { em: '<user_email_address>' });
          pintrk('page');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://ct.pinterest.com/v3/?event=init&tid=${tagId}&noscript=1`}
        />
      </noscript>
    </>
  );
}
