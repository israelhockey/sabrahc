import SignupForm from "./SignupForm";

const NewsletterSignup = () => (
  <section className="bg-night" aria-labelledby="newsletter-title">
    <div className="container-site grid items-center gap-8 py-14 lg:grid-cols-2">
      <div>
        <p className="label text-xs text-sand">
          Tour alerts · <span lang="he">עדכונים</span>
        </p>
        <h2 id="newsletter-title" className="mt-2 text-4xl font-black leading-[0.95] sm:text-5xl">
          Never miss a stop
        </h2>
        <p className="mt-3 max-w-md text-lg text-muted-text">New tour cities, results, signings and ticket drops, straight to your inbox.</p>
      </div>
      <SignupForm
        source="newsletter"
        idPrefix="newsletter"
        fields={[
          { name: "name", label: "Name" },
          { name: "email", label: "Email", type: "email", required: true },
        ]}
        submitLabel="Sign me up"
        successTitle="You're on the list"
        successBody="We'll email you when the tour is coming near you."
      />
    </div>
  </section>
);

export default NewsletterSignup;
