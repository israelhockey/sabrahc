import SignupForm from "./SignupForm";

const NewsletterSignup = () => (
  <section className="border-t border-line bg-night" aria-labelledby="newsletter-title">
    <div className="container-site grid items-center gap-8 py-14 lg:grid-cols-2">
      <div>
        <span className="tag-ice">Stay tuned</span>
        <h2 id="newsletter-title" className="mt-2 text-5xl font-black leading-[0.9] sm:text-6xl">
          Never miss a first
        </h2>
        <p className="mt-3 max-w-md text-lg text-muted-text">New tour stops, results, signings and ticket drops, straight to your inbox.</p>
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
        successBody="We'll be in touch with the big news."
      />
    </div>
  </section>
);

export default NewsletterSignup;
