import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix'
import { Meta, Links, Scripts, LiveReload, useCatch, Outlet } from 'remix'

import tailwindCss from '~/styles/tailwind.css'

export let meta: MetaFunction = () => {
  return {
    title: 'Remix Express Auth Example',
  }
}

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindCss }]
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export function CatchBoundary() {
  let caught = useCatch()

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Document>
      )

    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`,
      )
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.stack}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  )
}

export function RemixLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 800 800" fill="none">
      <rect width="800" height="800" fill="#212121" />
      <g filter="url(#filter0_dd_126_53)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M587.947 527.768C592.201 582.418 592.201 608.036 592.201 636H465.756C465.756 629.909 465.865 624.337 465.975 618.687C466.317 601.123 466.674 582.807 463.828 545.819C460.067 491.667 436.748 479.634 393.871 479.634H355.883H195V381.109H399.889C454.049 381.109 481.13 364.633 481.13 321.011C481.13 282.654 454.049 259.41 399.889 259.41H195V163H422.456C545.069 163 606 220.912 606 313.42C606 382.613 563.123 427.739 505.201 435.26C554.096 445.037 582.681 472.865 587.947 527.768Z"
          fill="#E8F2FF"
        />
        <path
          d="M195 636V562.553H328.697C351.029 562.553 355.878 579.116 355.878 588.994V636H195Z"
          fill="#E8F2FF"
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_126_53"
          x="131"
          y="99"
          width="539"
          height="601"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="28" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.223529 0 0 0 0 0.572549 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_126_53"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="32" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.223529 0 0 0 0 0.572549 0 0 0 0 1 0 0 0 0.9 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_126_53"
            result="effect2_dropShadow_126_53"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_126_53"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
