import Head from "next/head";
import Script from 'next/script';

function MetaDataCustom(props) {
    return (
        <>
            <Head>
                <link rel="icon" href="https://d1irpg7po1rqdm.cloudfront.net/images/favicon.ico" />
                <meta name="google-site-verification" content="pA5ku0A6pxiLstYqB69pqqvrjqAPaHWzNLlmQhqytfM" />
                <meta name="facebook-domain-verification" content="qspc6x8god9gcww7i76g4qyq7qy312" />
                <meta http-equiv="Cross-Origin-Opener-Policy" content="cross-origin" />
                <meta http-equiv="Cross-Origin-Embedder-Policy" content="require-corp" />
                <meta property="og:type" content="website" />
                <meta property="twitter:card" content="summary_large_image" />
                <link rel="apple-touch-icon" href="/" />
                <link rel="stylesheet" href="" />
                <script crossorigin="anonymous" src="https://cdn.usefathom.com/script.js" data-site="MEBUZTEJ" defer />
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TZRF33D" height={0} width={0} style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
                <script type="text/html" crossorigin="anonymous" src="../../public/js/tiktok.js" defer />
                <script id="gtm" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-TZRF33D');
                    `}
                </script>
                <script id="metricool-loader" strategy="afterInteractive">
                    {`
                    function loadScript(a){
                        var b = document.getElementsByTagName("head")[0],
                            c = document.createElement("script");
                        c.type = "text/javascript";
                        c.src = "https://tracker.metricool.com/resources/be.js";
                        c.onreadystatechange = a;
                        c.onload = a;
                        b.appendChild(c);
                    }
                    loadScript(function(){
                        beTracker.t({hash:"6c3586297975859406de7dc0aeaa3e7b"});
                    });
                    `}
                </script>
                <script type="application/ld+json" src="../../public/json/meriSehatSchema.json" defer />
                <script type="application/ld+json" src="../../public/json/searchAction.json" defer />
                <script type="text/html" src="../../public/js/hotjar.js" defer />
                <title>{props?.metaData?.meta_name}</title>
                <meta name="title" content={props?.metaData?.meta_name} />
                <meta property="og:title" content={props?.metaData?.canonical_title} key="og-title" />
                <meta property="og:description" content={props?.metaData?.canonical_description} key="og-desc" />
                <meta property="og:image" content={props?.metaData?.seo_image} key="og-image" />
                <meta name="twitter:title" content={props?.metaData?.canonical_title} key="tw-title" />
                <meta name="twitter:description" content={props?.metaData?.canonical_description} key="tw-desc" />
                <meta name="twitter:image" content={props?.metaData?.seo_image} key="tw-image" />
                <meta name="keywords" content={props?.metaData?.keywords} />
                <meta name="description" content={props?.metaData?.meta_description} />
                <link rel="canonical" href={props?.metaData?.canonical_link} />
            </Head>
            
        </>
    );
}

export default MetaDataCustom;
