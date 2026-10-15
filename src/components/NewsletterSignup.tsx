import SignupForm from "./SignupForm";

const NewsletterSignup = () => (
  <section className="border-b border-line bg-night-2" aria-labelledby="newsletter-title">
    <div className="container-site grid items-center gap-8 py-14 lg:grid-cols-2">
      <div>
        <p className="eyebrow">Stay in the game</p>
        <h2 id="newsletter-title" className="mt-2 text-4xl font-black text-ice-white sm:text-5xl">
          Get the news first
        </h2>
        <p className="mt-3 max-w-md text-lg text-muted-text">
          Schedule announcements, roster news and ticket drops, straight to your inbox.
        </p>
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
