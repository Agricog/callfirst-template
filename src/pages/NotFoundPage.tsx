import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { CLIENT } from '@/data/clientConfig'

export default function NotFoundPage(): JSX.Element {
  return (
    <section className="py-20 px-4 text-center">
      <div className="mx-auto max-w-md">
        <div className="font-heading text-6xl text-slate-200 mb-4">404</div>
        <h1 className="font-heading text-2xl text-slate-800 mb-3">Page not found</h1>
        <p className="text-slate-500 mb-8">
          {"Sorry, the page you're looking for doesn't exist. Let's get you back on track."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">
            <Home size={17} />
            Back to Home
          </Link>
          <a href={'tel:' + CLIENT.phone.replace(/\s/g, '')} className="btn-secondary">
            {'Call ' + CLIENT.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
