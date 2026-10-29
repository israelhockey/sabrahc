import { useSearchParams } from "react-router-dom";
import { Phone, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SignupForm from "@/components/SignupForm";
import { src, thumb } from "@/data/gallery";

const moments = [
  { id: "p093", title: "Families in the stands", he: "משפחות ביציע" },
  { id: "p094", title: "Kids meet the players", he: "ילדים פוגשים את השחקנים" },
  { id: "p023", title: "Shabbat with the team", he: "שבת עם הקבוצה" },
  { id: "p106", title: "Flags up", he: "הדגלים למעלה" },
];

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
      {/* hero over a real community photo */}
      <section aria-labelledby="host-title" className="relative overflow-hidden bg-night-deep">
        <img src={src("p009")} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-night-deep via-night-deep/85 to-night-deep/30" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night-deep via-transparent to-transparent" />
        <div className="container-site relative flex min-h-[520px] flex-col justify-end pb-14 pt-24 lg:min-h-[600px]">
          <p className="label text-sm text-sand">
            Bring the tour to you · <span lang="he">הביאו אותנו לעיר שלכם</span>
          </p>
          <h1 id="host-title" className="mt-3 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.92] sm:text-7xl">
            Bring Sabra HC <span className="text-sand">to your city</span>
          </h1>
          <p className="mt-5 max-w-xl text-xl leading-relaxed text-[#D9E3DC]">
            A weekend of Israeli hockey that brings your whole community together. Leave your details and we'll call you. That's it.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#host-form" className="btn-primary">
              Call me back
            </a>
            <Link to="/gallery?c=community" className="btn-ghost bg-night-deep/40 backdrop-blur">
              See the community nights
            </Link>
          </div>
        </div>
      </section>

      {/* what the weekend brings */}
      <section className="border-b border-line bg-night-deep pb-16 pt-4" aria-labelledby="moments-title">
        <div className="container-site">
          <h2 id="moments-title" className="label mb-4 text-xs text-sand">
            What a weekend brings to your community
          </h2>
          <ul className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {moments.map((m) => (
              <li key={m.id} className="relative overflow-hidden rounded">
                <img src={thumb(m.id)} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover sm:aspect-[4/3]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-deep via-night-deep/70 to-transparent p-4 pt-12">
                  <p className="font-display text-lg font-bold uppercase leading-tight sm:text-xl">{m.title}</p>
                  <p lang="he" className="text-sm font-bold text-sand">
                    {m.he}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted-text">Photos from Israel Selects tour weekends, the team that is now Sabra HC.</p>
        </div>
      </section>

      <section id="host-form" className="scroll-mt-28 bg-night py-16 lg:py-20" aria-labelledby="host-form-title">
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
