function QuoteFromDad() {
  const FOUNDING_YEAR = 2003;
  const CURRENT_YEAR = new Date().getFullYear();
  const yearsInBusiness = CURRENT_YEAR - FOUNDING_YEAR;

  return (
    <div className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
      <h1 className="md:text-left font-bold pb-5 text-lg md:text-xl">
        A word from our founder, Jonathan Stirman:
      </h1>
      <div className="flex md:flex-row flex-col items-center gap-4">
        <img
          src="jonathan-stirman.jpg"
          alt="Jonathan Stirman, founder of Modern Arborist"
          className="w-34 md:w-44 h-auto aspect-square rounded-full object-cover flex-shrink-0"
        />
        <blockquote className="border-l-4 border-green-500 pl-4 md:max-w-3xl max-w-md italic text-left md:text-lg text-sm">
          I started this tree service in <b>{FOUNDING_YEAR}</b> with a simple
          vision: to honor God by providing for my family through honest, hard
          work. Over the years, the business has grown, but the heart behind it
          has remained the same—faith, integrity, and service.
          <br />
          <br />
          Now, {yearsInBusiness} years later, as my children have grown, my
          focus has expanded. What began as a way to provide for my family has
          become a mission to empower the next generation of modern arborists.
          Working side by side with my son—who brings a fresh, tech-savvy
          perspective—we’re combining experience with innovation to shape the
          future of tree care.
        </blockquote>
      </div>
    </div>
  );
}

export function MissionStatement() {
  return (
    <div className="prose prose-lg mx-auto text-center pt-10 pb-10 pl-5 pr-5">
      <h2 className="text-4xl font-bold text-green-800 dark:text-green-300 pb-5">
        What is our mission?
      </h2>
      <QuoteFromDad />
    </div>
  );
}
