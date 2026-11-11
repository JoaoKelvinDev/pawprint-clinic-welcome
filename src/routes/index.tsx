import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PawPrint, Mail, Lock, Eye, EyeOff, Loader2, CalendarDays, Stethoscope, Syringe, Phone } from "lucide-react";
import hero from "@/assets/vet-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Entrar | Clínica Veterinária" },
      { name: "description", content: "Acesso da equipe à agenda, tutores e prontuários da clínica veterinária." },
      { property: "og:title", content: "Entrar | Clínica Veterinária" },
      { property: "og:description", content: "Acesso da equipe à agenda, tutores e prontuários da clínica." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
}

const features = [
  { icon: CalendarDays, label: "Agenda do dia" },
  { icon: Stethoscope, label: "Prontuário do pet" },
  { icon: Syringe, label: "Lembretes de vacina" },
];

function Login() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setError("");
    if (!f.get("email") || !f.get("password")) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError("E-mail ou senha incorretos.");
    }, 1200);
  };

  const field =
    "h-12 w-full rounded-xl border border-input bg-card pl-11 pr-4 text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-ring focus:ring-4 focus:ring-ring/15";

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col px-6 py-8 sm:px-12 lg:px-16">
        <header className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <PawPrint className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-semibold">Clínica Patas & Cia</span>
        </header>

        <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12 animate-rise">
          <p className="mb-2 text-sm font-medium text-accent">{greeting()}, equipe! 🐾</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Entre na sua clínica</h1>
          <p className="mt-3 text-muted-foreground">Agenda, tutores e pacientes em um só lugar.</p>

          <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">E-mail</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input id="email" name="email" type="email" autoComplete="email" placeholder="seuemail@clinica.com" className={field} />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">Senha</label>
                <a href="#" className="text-sm font-medium text-primary hover:underline">Esqueci minha senha</a>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input id="password" name="password" type={show ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" className={`${field} pr-12`} />
                <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Esconder senha" : "Mostrar senha"} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="h-4 w-4 rounded accent-primary" /> Lembrar de mim
            </label>
            {error && (
              <p role="alert" className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
            )}
            <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-medium text-primary-foreground shadow-soft transition hover:bg-primary/90 active:scale-[0.99] disabled:opacity-70">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">Acesso exclusivo à equipe da clínica.</p>
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-success" /> Sistema online</span>
          <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> Suporte (11) 0000-0000 · v1.0</span>
        </footer>
      </div>

      <aside className="relative m-4 hidden overflow-hidden rounded-3xl lg:block">
        <img src={hero} alt="Veterinária sorrindo com um filhote e um gato" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-overlay" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-primary-foreground">
          <h2 className="max-w-md text-4xl font-semibold leading-tight">Cuidar de quem cuida dos pets.</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {features.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 text-sm backdrop-blur-md">
                <Icon className="h-4 w-4" /> {label}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
