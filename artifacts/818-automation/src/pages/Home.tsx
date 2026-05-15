import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import logo818 from "/logo.png";
import { AuroraBackground } from '@/components/ui/aurora-background';

// Variants for scroll animations
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

function LeadForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Lead from 818 Automation — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:alexander@818automation.io?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="lead-form" className="py-24 px-6 border-t border-border">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 metallic-text">Get in Touch</h2>
          <p className="text-muted-foreground text-lg">
            Tell us about your business and we'll reach out within 24 hours.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 px-8 rounded-3xl bg-card border border-card-border"
          >
            <p className="text-2xl font-semibold text-white mb-2">Your email client is opening...</p>
            <p className="text-muted-foreground">Send the email and we'll get back to you within 24 hours.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 text-sm text-muted-foreground underline underline-offset-4 hover:text-white transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            onSubmit={handleSubmit}
            className="space-y-5"
            data-testid="lead-form"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  data-testid="input-name"
                  className="h-12 rounded-xl bg-card border border-card-border px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  data-testid="input-email"
                  className="h-12 rounded-xl bg-card border border-card-border px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your business and what you're looking to automate..."
                data-testid="input-message"
                className="rounded-xl bg-card border border-card-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              data-testid="button-submit"
              className="w-full h-14 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow-lg transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Send Message &rarr;
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <img src={logo818} alt="818 Automation" className="h-[90px] w-auto" />
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
          </div>
          <div>
            <a 
              href="https://calendly.com/spiritledtech/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Book Free Audit &rarr;
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-20">

        {/* 2. HERO SECTION — wrapped in AuroraBackground */}
        <AuroraBackground
          className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 min-h-[80vh]"
          showRadialGradient={true}
        >
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8 text-center max-w-4xl mx-auto relative z-10">
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tight leading-tight metallic-text">
              Scale Your Service Business <br className="hidden md:inline" />
              with AI Automations
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Save Hours Weekly, Fill Calendars Automatically. No-code workflows for leads, onboarding, content, and ops.
            </motion.p>
            
            <motion.div variants={fadeUp} className="pt-4">
              <a 
                href="https://calendly.com/spiritledtech/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Book Free Audit
              </a>
            </motion.div>
          </motion.div>
        </AuroraBackground>

        {/* 3. "SOUND FAMILIAR?" SECTION */}
        <section id="about" className="py-24 px-6 bg-card/30 border-y border-border">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-center mb-16 metallic-text"
            >
              Sound Familiar?
            </motion.h2>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                "Manual lead entry eats hours weekly and loses inquiries.",
                "Client onboarding takes days per new signup.",
                "Reporting dashboards built from scratch monthly—no time saved.",
                "Social/content creation stalls growth without consistent output."
              ].map((text, i) => (
                <motion.div key={i} variants={fadeUp} className="p-8 rounded-2xl bg-card border border-card-border shadow-sm flex items-center h-full">
                  <p className="text-muted-foreground text-lg">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. "PLUG-AND-PLAY" SECTION */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="max-w-3xl"
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight metallic-text">
                Plug-and-play AI systems deployed fast, no coding needed.
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground">
                We build the infrastructure so you can focus on the work that matters.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 5. SERVICES SECTION */}
        <section id="services" className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { title: "Lead Gen & Booking", desc: "Automated workflows that capture leads and schedule meetings without lifting a finger." },
                { title: "Client Onboarding", desc: "Instantly generate SOWs, collect payments, and set up client portals." },
                { title: "AI Content Tools", desc: "Ghostwriting systems trained on your voice for LinkedIn, Twitter, and ad copy." },
                { title: "Dashboards", desc: "Real-time analytics pulling directly from your CRM and payment gateways." },
                { title: "Custom Integrations", desc: "Connect your disjointed software stack to talk to each other seamlessly." },
                { title: "Retainers", desc: "Ongoing support, optimization, and new automations as your business grows." }
              ].map((service, i) => (
                <motion.div key={i} variants={fadeUp} className="p-8 rounded-2xl border border-card-border bg-transparent hover:bg-card/50 transition-colors flex flex-col h-full">
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. "WHY AUTOMATION WINS" SECTION */}
        <section className="py-32 px-6 bg-card/20">
          <div className="max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight metallic-text">
                Why Automation Wins
              </h2>
            </motion.div>

            <div className="space-y-4">
              {[
                { title: "Qualified leads on autopilot", desc: "Form-to-CRM + AI qualification fills calendars faster.", active: false },
                { title: "Onboarding in minutes", desc: "Auto-SOWs, payments, portals — slash admin time.", active: false },
                { title: "Content at scale", desc: "AI ghostwriting for LinkedIn/ads, personalized per client.", active: false },
                { title: "Real-time insights", desc: "Dashboards pull CRM/payments data, predict churn.", active: true },
                { title: "Agency-ready stacks", desc: "White-label for your clients, unlimited tweaks.", active: false },
              ].map((row, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-6 md:p-8 rounded-2xl border ${row.active ? 'bg-card border-border' : 'border-transparent border-t-card-border rounded-none'} items-center`}>
                    <div className="text-lg md:text-xl font-bold text-white">
                      {row.title}
                    </div>
                    <div className="text-muted-foreground md:text-lg">
                      {row.desc}
                    </div>
                  </div>
                  {!row.active && i !== 4 && <div className="h-px w-full bg-border/50"></div>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CTA SECTION (BOTTOM) */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="p-12 md:p-16 rounded-3xl bg-card border border-card-border shadow-2xl text-center flex flex-col items-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 metallic-text">
                Ready to automate growth?
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Book your free audit now.
              </p>
              <a 
                href="https://calendly.com/spiritledtech/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Book Free Audit &rarr;
              </a>
            </motion.div>
          </div>
        </section>

        {/* 8. LEAD CAPTURE FORM */}
        <LeadForm />
      </main>

      {/* 9. FOOTER */}
      <footer className="py-12 px-6 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={logo818} alt="818 Automation" className="h-8 w-auto opacity-70 grayscale" />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
            <a href="mailto:alexander@818automation.io" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
              alexander@818automation.io
            </a>
            <p className="text-sm text-muted-foreground/70">
              © 2025 818 Automation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
