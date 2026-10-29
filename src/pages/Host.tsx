import { useSearchParams } from "react-router-dom";
import { Phone, MapPin, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import SignupForm from "@/components/SignupForm";

const steps = [
  { icon: MapPin, title: "Tell us your city", body: "Leave your details below. It takes 30 seconds." },
  { icon: Phone, title: "We call you", body: "Someone from the club calls you within a few days to talk it through." },
  { icon: Users, title: "We plan it together", body: "We find the rink and the local team, and build the weekend with your community." },
];

/** "Bring us to your city": the shortest possible form. We only need a way to call you back. */
const Host = () => {
  const [params] = useSearchParams();
  const city = params.get("city") ?? "";

  return (
    <>
      <PageHero
        he="הביאו אותנו לעיר שלכם"
        eyebrow="Bring the tour to you"
        title="Bring Sabra HC to your city"
        intro="Want Israel's team to play in your town? Leave your details and we'll call you. That's it."
      />

      <section className="bg-night py-16 lg:py-20" aria-labelledby="host-form-title">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 id="host-form-title" className="font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
              How it works
            </h2>
            <ol className="mt-8 space-y-6">
              {steps.map(({ icon: Icon, title, body }, i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-night">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="label text-xs text-sand">Step {i + 1}</p>
                    <p className="font-display text-xl font-black uppercase">{title}</p>
                    <p className="mt-1 text-[#D9E3DC]">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 border-t border-line pt-6 text-sm text-muted-text">
              It can start with anyone: a synagogue, a JCC, a school, a Hillel, a local business or just a few families. You don't need to have it all figured
              out, only the wish to make it happen.
            </p>
          </div>

          <div className="rounded border-2 border-sand bg-night-2 p-6 sm:p-8">
            <p className="label text-xs text-sand">
              We'll call you · <span lang="he">ניצור קשר</span>
            </p>
            <p className="mb-6 mt-1 font-display text-2xl font-black uppercase">Your details</p>
            <SignupForm
              source="partner"
              idPrefix="host"
              details={{ form: "Bring us to your city" }}
              initial={city ? { city } : undefined}
              fields={[
                { name: "name", label: "Your name", required: true },
                { name: "phone", label: "Phone", type: "tel", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "city", label: "Your city", required: true, placeholder: "e.g. Santa Rosa, CA" },
                { name: "company", label: "Organisation (optional)", placeholder: "Synagogue, JCC, school, business…", full: true },
              ]}
              submitLabel="Call me"
              successTitle="Thanks, we'll call you"
              successBody="Someone from Sabra HC will be in touch within a few days."
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Host;
