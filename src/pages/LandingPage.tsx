import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Shield, Brain, AlertTriangle, MessageSquare, Users, Activity,
  Upload, Cpu, BarChart3, ChevronRight, Check, Star,
  FileText, Zap, Lock, Globe
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── HERO ───
function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-mono text-primary tracking-wide">AI-POWERED CONTRACT INTELLIGENCE</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold text-foreground leading-tight mb-6">
            Autonomous Contract
            <br />
            <span className="text-primary">Risk Analysis</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Upload any contract and let AI identify hidden risks, flag dangerous clauses, and provide actionable intelligence — in seconds, not hours.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="font-mono text-sm btn-glow px-8 h-12">
                START FREE ANALYSIS
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/#how-it-works">
              <Button variant="outline" size="lg" className="font-mono text-sm px-8 h-12">
                SEE HOW IT WORKS
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '10K+', label: 'Contracts Analyzed' },
              { value: '99.2%', label: 'Risk Detection Rate' },
              { value: '<30s', label: 'Average Analysis Time' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── TRUSTED BY ───
function TrustedBySection() {
  const brands = ['Acme Corp', 'Globex', 'Initech', 'Stark Industries', 'Wayne Enterprises', 'Umbrella Corp'];
  return (
    <section className="py-12 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-mono text-muted-foreground tracking-widest mb-8 uppercase">
          Trusted by Legal Teams Worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {brands.map((brand) => (
            <span key={brand} className="font-mono text-sm text-muted-foreground/50 hover:text-muted-foreground transition-colors">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES ───
const features = [
  { icon: Brain, title: 'AI Risk Scoring', desc: 'Every contract gets an intelligent risk score from 0-100 using advanced language models that understand legal context.' },
  { icon: AlertTriangle, title: 'Clause Detection', desc: 'Automatically identify and categorize every clause. Flag high-risk terms, unfavorable conditions, and hidden obligations.' },
  { icon: MessageSquare, title: 'Contract Chat', desc: 'Ask questions about any contract in natural language. Get instant answers backed by the actual document text.' },
  { icon: Users, title: 'Multi-Workspace', desc: 'Organize contracts by team, client, or project. Manage access with granular role-based permissions.' },
  { icon: Activity, title: 'Threat Feed', desc: 'Real-time dashboard tracking risk trends across your entire contract portfolio. Spot emerging threats early.' },
  { icon: Lock, title: 'Enterprise Security', desc: 'Bank-grade encryption, SOC 2 compliance, and complete audit trails. Your sensitive data stays protected.' },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-mono text-primary tracking-widest mb-3 uppercase">CAPABILITIES</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-mono font-bold text-foreground mb-4">
            Everything You Need to Analyze Risk
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            From upload to insight in seconds. Sentinel AI covers the entire contract analysis workflow.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="glow-card rounded-lg p-6 bg-card group hover:bg-secondary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-mono text-base font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ───
const steps = [
  { icon: Upload, num: '01', title: 'Upload Contract', desc: 'Drag and drop any PDF, DOCX, or plain text contract. Supports batch uploads for large portfolios.' },
  { icon: Cpu, num: '02', title: 'AI Analyzes', desc: 'Our AI engine reads every clause, identifies risks, scores severity, and extracts key obligations in under 30 seconds.' },
  { icon: BarChart3, num: '03', title: 'Get Insights', desc: 'Review the risk dashboard, explore flagged clauses, and chat with your contract to understand every detail.' },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-mono text-accent tracking-widest mb-3 uppercase">PROCESS</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-mono font-bold text-foreground mb-4">
            Three Steps to Risk Intelligence
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step) => (
            <motion.div key={step.num} variants={fadeUp} className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="font-mono text-xs text-primary/60 tracking-widest">{step.num}</span>
              <h3 className="font-mono text-lg font-semibold text-foreground mt-1 mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── DASHBOARD PREVIEW ───
function DashboardPreviewSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="text-xs font-mono text-primary tracking-widest mb-3 uppercase">DASHBOARD</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-mono font-bold text-foreground mb-4">
            Your Risk Command Center
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            A real-time view of your entire contract portfolio's risk posture.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-xl overflow-hidden border border-border/50 glass p-1"
        >
          {/* Mock dashboard */}
          <div className="rounded-lg bg-background p-6 md:p-8">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Contracts', value: '847', color: 'text-foreground' },
                { label: 'High Risk', value: '23', color: 'text-risk-high' },
                { label: 'Avg Risk Score', value: '34', color: 'text-risk-medium' },
                { label: 'Analyzed Today', value: '12', color: 'text-primary' },
              ].map((s) => (
                <div key={s.label} className="bg-card rounded-md p-4 border border-border">
                  <p className="text-xs text-muted-foreground font-mono mb-1">{s.label}</p>
                  <p className={`text-2xl font-mono font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-card rounded-md p-4 border border-border h-32">
                  <div className="h-3 w-24 skeleton-cyber rounded mb-3" />
                  <div className="h-2 w-full skeleton-cyber rounded mb-2" />
                  <div className="h-2 w-3/4 skeleton-cyber rounded mb-2" />
                  <div className="h-2 w-1/2 skeleton-cyber rounded" />
                </div>
              ))}
            </div>
          </div>
          {/* Glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── PRICING ───
const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    desc: 'For individuals exploring contract analysis.',
    features: ['5 contracts/month', 'Basic risk scoring', 'Clause detection', 'Email support', '1 workspace'],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    desc: 'For growing teams that need full intelligence.',
    features: ['Unlimited contracts', 'Advanced AI analysis', 'Contract chat (AI Q&A)', 'Priority support', '5 workspaces', 'Custom risk rules', 'Export reports'],
    cta: 'Start Pro Trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For organizations with complex compliance needs.',
    features: ['Everything in Pro', 'Unlimited workspaces', 'SSO & SAML', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'On-premise option'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-mono text-primary tracking-widest mb-3 uppercase">PRICING</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-mono font-bold text-foreground mb-4">
            Plans for Every Team Size
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            Start free. Scale as your contract analysis needs grow.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={`rounded-xl p-6 border ${
                plan.highlight
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10 relative'
                  : 'border-border bg-card'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary rounded-full">
                  <span className="text-xs font-mono font-semibold text-primary-foreground">MOST POPULAR</span>
                </div>
              )}
              <h3 className="font-mono text-lg font-bold text-foreground mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-mono font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to={plan.name === 'Enterprise' ? '/contact' : '/signup'}>
                <Button
                  className={`w-full font-mono text-xs ${plan.highlight ? 'btn-glow' : ''}`}
                  variant={plan.highlight ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ───
const testimonials = [
  {
    quote: "Sentinel AI cut our contract review time by 80%. We now catch risks our legal team used to miss.",
    name: 'Sarah Chen',
    role: 'General Counsel, TechVentures',
    stars: 5,
  },
  {
    quote: "The AI chat feature is a game-changer. I can ask complex questions about any clause and get instant, accurate answers.",
    name: 'Marcus Rodriguez',
    role: 'VP Legal, GrowthCo',
    stars: 5,
  },
  {
    quote: "We evaluated 6 contract analysis tools. Sentinel AI was the only one that correctly identified our exposure to auto-renewal traps.",
    name: 'Aisha Patel',
    role: 'Head of Procurement, Meridian',
    stars: 5,
  },
];

function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-mono text-accent tracking-widest mb-3 uppercase">TESTIMONIALS</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-mono font-bold text-foreground mb-4">
            Trusted by Legal Professionals
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="glow-card rounded-lg p-6 bg-card"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div>
                <p className="font-mono text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ───
const faqs = [
  { q: 'What types of contracts can Sentinel AI analyze?', a: 'Sentinel AI supports any text-based contract format including PDF, DOCX, and plain text. This includes NDAs, service agreements, employment contracts, lease agreements, vendor contracts, and more.' },
  { q: 'How accurate is the AI risk analysis?', a: 'Our AI achieves a 99.2% detection rate for high-risk clauses based on independent testing. The system is continuously trained on legal precedents and updated contract law.' },
  { q: 'Is my data secure?', a: 'Absolutely. All contracts are encrypted at rest and in transit using AES-256 encryption. We are SOC 2 Type II certified and GDPR compliant. Your data is never used to train our models.' },
  { q: 'Can I try it before committing?', a: 'Yes! Our Starter plan is completely free and lets you analyze up to 5 contracts per month. No credit card required.' },
  { q: 'How does the contract chat feature work?', a: 'After analysis, you can ask questions about any contract in natural language. The AI references the actual document text to provide accurate, contextual answers with source citations.' },
  { q: 'Do you support team collaboration?', a: 'Yes. Workspaces allow you to organize contracts by team, department, or client. You can invite members with different roles (owner, admin, member) for granular access control.' },
];

function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-card/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="text-xs font-mono text-primary tracking-widest mb-3 uppercase">FAQ</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-mono font-bold text-foreground mb-4">
            Frequently Asked Questions
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4 bg-card">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ───
function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-8">
            <Shield className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-mono font-bold text-foreground mb-6">
            Stop Guessing.<br />Start Knowing.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Join thousands of legal professionals who trust Sentinel AI to protect their organizations from contract risk.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="font-mono text-sm btn-glow px-10 h-12">
                START FREE TODAY
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="font-mono text-sm px-10 h-12">
                TALK TO SALES
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── MAIN PAGE ───
export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <HowItWorksSection />
      <DashboardPreviewSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
