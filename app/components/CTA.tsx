export function CTA() {
  return (
    <section id="contact" className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="md:text-3xl text-2xl font-bold tracking-tight sm:text-4xl">
            Ready to protect and enhance your trees?
          </h2>
          <p className="mt-4 text-base md:text-lg leading-8 text-gray-600 dark:text-gray-300">
            Request a consultation and get a tailored tree care plan from a
            certified professional.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:stirmantrees@gmail.com"
              className="rounded-md bg-green-600 px-8 py-4 text-sm font-semibold text-white shadow hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Email Us
            </a>
            <a
              href="tel:+14077978063"
              className="rounded-md bg-white dark:bg-gray-900 px-8 py-4 text-sm font-semibold text-green-700 dark:text-green-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Call (407) 797-8063
            </a>
          </div>
          <p className="mt-6 text-xs text-gray-500 dark:text-gray-500">
            Same-day response for urgent storm damage requests.
          </p>
        </div>
      </div>
    </section>
  );
}
