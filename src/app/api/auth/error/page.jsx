export default function AuthErrorPage({ searchParams }) {
  return (
    <div className="text-center text-red-600 p-8">
      <h1 className="text-2xl font-bold">Authentication Error</h1>
      <p>{searchParams?.error || 'An unknown error occurred.'}</p>
    </div>
  );
}
