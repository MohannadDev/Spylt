import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-red-brown text-milk inset-0 w-screen h-screen">
      <div className="abs-center text-xl text-center">
        <h1>Sorry, Not Found</h1>
        <Link href="/" className='underline m-8'>Return Home</Link>
      </div>
    </section>
  );
}
