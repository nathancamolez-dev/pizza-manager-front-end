import { Link, useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError() as Error

  if (error)
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">Ops, algo acaonteceu....</h1>
        <p className="text-accent-foreground">Um erro aconteceu:</p>
        <pre>{error.message || JSON.stringify(error)}</pre>
        <p className="text-accent-foreground">
          Votlar para o{' '}
          <Link to="/" className="text-sky-600 dark:text-sky-500">
            Dashboard
          </Link>
        </p>
      </div>
    )
}
