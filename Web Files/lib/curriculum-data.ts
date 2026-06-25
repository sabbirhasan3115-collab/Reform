// Parsed from "Social Mass Philosophy & Reform Methodologies"
// A Complete 15-Book Synthesis Using Backward Design & Conceptual Discrimination

export type TabId = "syllabus" | "phases" | "tracker"

export const META = {
  title: "Social Mass Philosophy & Reform Methodologies",
  subtitle: "A Complete 15-Book Synthesis Using Backward Design & Conceptual Discrimination",
  intro:
    "The definitive 4-Phase architecture. It integrates every text — philosophy, activism, history, fiction — into a frictionless, high-efficiency pathway. Execute each phase in sequence; the Cognitive Checkpoints are non-negotiable active-recall engines that force true synthesis.",
}

export type Category = "Philosophy" | "Activism" | "History" | "Fiction" | "Strategy"

// A single ordered reading within a phase. `order` is the numerical
// reading sequence inside that phase (books repeat across phases on purpose).
export interface PhaseBook {
  order: number
  title: string
  author: string
  category: Category
  note: string
}

export interface PhaseObjective {
  verb: string
  text: string
}

export interface Phase {
  id: string
  number: number
  title: string
  tagline: string
  objectives: PhaseObjective[]
  // numerical order of reading the books for this phase
  reading: PhaseBook[]
  // numbered "do this, then this" execution steps (serial)
  steps: string[]
  task: string
  checkpoint: string
}

export const PHASES: Phase[] = [
  {
    id: "phase-1",
    number: 1,
    title: "Foundational Premises & Epistemology",
    tagline: "What the masses are and why they move — six irreconcilable axioms",
    objectives: [
      {
        verb: "Discriminate",
        text: "between the six foundational epistemologies of mass behaviour present across the corpus.",
      },
      {
        verb: "Analyse",
        text: "how each axiom pre-determines what a reformer can expect from “the people.”",
      },
      {
        verb: "Unlearn",
        text: "the deep assumption that mass psychology is homogeneous or universal.",
      },
    ],
    reading: [
      {
        order: 1,
        title: "Lokayata Darshan",
        author: "Debiprasad Chattopadhyay",
        category: "Philosophy",
        note: "Material, sensory-based rationality inheres in labouring classes; superstition is an elite imposition.",
      },
      {
        order: 2,
        title: "The Crowd",
        author: "Gustave Le Bon",
        category: "Philosophy",
        note: "In a crowd the individual loses conscious personality; the unconscious, impulsive herd-mind takes over.",
      },
      {
        order: 3,
        title: "Poor People’s Movements",
        author: "Piven & Cloward",
        category: "Activism",
        note: "Default is fatalistic acquiescence; only a visible system-crack awakens demand and capability.",
      },
      {
        order: 4,
        title: "Bangladeshe Darshon",
        author: "Harun",
        category: "Philosophy",
        note: "Mass consciousness forms through a distinct territorial and liberation struggle; philosophy is bounded by land and blood.",
      },
      {
        order: 5,
        title: "Khowabnama",
        author: "Akhtaruzzaman Elias",
        category: "Fiction",
        note: "Consciousness broken by bourgeois hegemony; collective dreams of liberation remain collapsed and elegiac.",
      },
      {
        order: 6,
        title: "A History of Bangladesh",
        author: "Willem van Schendel",
        category: "History",
        note: "Mass identity is the sedimentary product of ecological disaster, colonialism, partition, and war.",
      },
    ],
    steps: [
      "Read the six foundational texts in order (1 → 6), extracting each author’s single core axiom of mass subjectivity.",
      "Construct the comparative matrix across the six axes below.",
      "Add the sixth column — role of historical trauma — using van Schendel, Harun, and Elias.",
      "Complete the Cognitive Checkpoint to lock in conceptual discrimination.",
    ],
    task: "Construct a comparative matrix with six axes: (1) primary driver of mass action, (2) inherent rationality of the collective, (3) role of material conditions, (4) attitude toward leadership/elites, (5) trigger that breaks quiescence, (6) role of historical trauma in identity formation (add this column using van Schendel, Harun, and Elias).",
    checkpoint:
      "Imagine a sudden, devastating cyclone followed by a food-price spike. Chattopadhyay predicts anti-superstitious rational awakening; Le Bon predicts a savage, unreasoning mob; Piven/Cloward predict a brief window for disruptive protest; van Schendel sees the activation of a deep historical identity of resilience-and-disaster; Elias sees the momentary shattering of false consciousness that will again collapse into elegy. What single, different philosophical axiom generates this divergence? State that axiom for each author in one sentence, then identify which two are most incompatible and why.",
  },
  {
    id: "phase-2",
    number: 2,
    title: "Structural Friction & Dialectics",
    tagline: "The exact point where philosophies collide — mapped through seven dyads",
    objectives: [
      { verb: "Diagnose", text: "the fundamental fractures that prevent an easy “toolkit” synthesis." },
      {
        verb: "Contrast",
        text: "paired positions to force cognitive dissonance, then resolve it by pinpointing the diverging premise.",
      },
      {
        verb: "Apply",
        text: "the same dialectical scrutiny to fictional narratives of liberation and competing organisational histories.",
      },
    ],
    reading: [
      {
        order: 1,
        title: "Poor People’s Movements",
        author: "Piven & Cloward",
        category: "Activism",
        note: "Dyad 1 & 7 — pure disruption, no permanent structure.",
      },
      {
        order: 2,
        title: "This Is an Uprising",
        author: "Engler & Engler",
        category: "Strategy",
        note: "Dyad 1 — oscillation between structure-building and movement moments.",
      },
      {
        order: 3,
        title: "The Crowd",
        author: "Gustave Le Bon",
        category: "Philosophy",
        note: "Dyad 2 — elite manipulation through prestige and repetition.",
      },
      {
        order: 4,
        title: "Blueprint for Revolution",
        author: "Srdja Popović",
        category: "Strategy",
        note: "Dyad 2 & 7 — distributed, humorous, inclusive leadership; laughtivism.",
      },
      {
        order: 5,
        title: "Bangladeshe Darshon",
        author: "Harun",
        category: "Philosophy",
        note: "Dyad 3 — territorial-nationalist epistemology.",
      },
      {
        order: 6,
        title: "Lokayata Darshan",
        author: "Debiprasad Chattopadhyay",
        category: "Philosophy",
        note: "Dyad 3 — transnational, class-based materialist epistemology.",
      },
      {
        order: 7,
        title: "Thieves of State",
        author: "Sarah Chayes",
        category: "Activism",
        note: "Dyad 4 — anti-corruption governance reform.",
      },
      {
        order: 8,
        title: "Khowabnama",
        author: "Akhtaruzzaman Elias",
        category: "Fiction",
        note: "Dyad 4 — total revolutionary rupture of bourgeois hegemony.",
      },
      {
        order: 9,
        title: "Chakra",
        author: "Mukhopadhyay",
        category: "Fiction",
        note: "Dyad 5 — private, interior, decades-long psychological trauma.",
      },
      {
        order: 10,
        title: "Hangor Nodi Grenade",
        author: "Selina Hossain",
        category: "Fiction",
        note: "Dyad 5 — public, immediate, sacrificial martyrdom.",
      },
      {
        order: 11,
        title: "Bangladesher Chhatro Andoloner Itihash",
        author: "Hannan",
        category: "History",
        note: "Dyad 6 — amorphous, multi-class, issue-cyclical student movements.",
      },
      {
        order: 12,
        title: "Jashoder Utthan Poton",
        author: "Ahmad",
        category: "History",
        note: "Dyad 6 — organised communist party and its internal collapse.",
      },
    ],
    steps: [
      "Read each dyad pair together (books 1–2, 3–4, 5–6, 7–8, 9–10, 11–12), hunting for the one sentence where each pair could never agree.",
      "Run the “Precise Divergence” drill on Dyad 1 — draw the T+2-week uprising timeline.",
      "Map Dyad 5 — trace how private trauma (Chakra) generates action without public articulation, then contrast with weaponised sacrifice (Hangor Nodi Grenade).",
      "Resolve the Cognitive Checkpoint on the post-resignation movement.",
    ],
    task: "Active Recall — the “Precise Divergence” Drill. For Dyad 1, draw a timeline of a hypothetical uprising. At T+2 weeks, mark the exact moment where Piven/Cloward see formal organisation as a betrayal and Engler sees it as essential. Write the assumption about institutional longevity and popular fatigue each side makes. For Dyad 5, describe the mechanism by which private trauma (Chakra) could generate collective action without public articulation, then contrast with the weaponised sacrifice of Hangor Nodi Grenade.",
    checkpoint:
      "A movement has just forced a corrupt minister to resign. Piven/Cloward say: press the next accessible institution now, no permanent body. Engler says: build the organisation to sustain pressure. Popović says: use ‘laughtivism’ and a manageable next battle. Hannan’s history suggests student movements erupt without permanent structure but fade; Ahmad’s JASAD shows a structured party can collapse from internal contradictions. State the one indispensable minimum a movement must retain from its first disruptive moment to avoid irrelevance — or argue no such minimum exists.",
  },
  {
    id: "phase-3",
    number: 3,
    title: "Applied Reform Mechanisms",
    tagline: "Systemic execution — the integrated tactical arsenal",
    objectives: [
      { verb: "Catalogue", text: "every actionable reform mechanism from the corpus into four tactical families." },
      {
        verb: "Design",
        text: "a multi-week campaign drawing from all families, using historical and fictional precedents as evidence.",
      },
      { verb: "Evaluate", text: "each tactic for backlash, co-optation, and psychological sustainability." },
    ],
    reading: [
      {
        order: 1,
        title: "Poor People’s Movements",
        author: "Piven & Cloward",
        category: "Activism",
        note: "Family 1 — Disruption & Escalation: target accessible institutions.",
      },
      {
        order: 2,
        title: "This Is an Uprising",
        author: "Engler & Engler",
        category: "Strategy",
        note: "Family 1 & 4 — momentum tactics and nonviolent discipline.",
      },
      {
        order: 3,
        title: "Bangladesher Chhatro Andoloner Itihash",
        author: "Hannan",
        category: "History",
        note: "Family 1 & 4 — anchor: 1952 Language Movement’s defiance of Section 144.",
      },
      {
        order: 4,
        title: "Expert Secrets",
        author: "Russell Brunson",
        category: "Strategy",
        note: "Family 2 — Epiphany Bridge storytelling, the ‘Big Domino’, tribe-building.",
      },
      {
        order: 5,
        title: "Blueprint for Revolution",
        author: "Srdja Popović",
        category: "Strategy",
        note: "Family 2 & 4 — laughtivism and manageable battles.",
      },
      {
        order: 6,
        title: "Hangor Nodi Grenade",
        author: "Selina Hossain",
        category: "Fiction",
        note: "Family 2 — the weaponisation of maternal sacrifice.",
      },
      {
        order: 7,
        title: "Chakra",
        author: "Mukhopadhyay",
        category: "Fiction",
        note: "Family 2 — slow, private transformation through introspection.",
      },
      {
        order: 8,
        title: "Bangladeshe Darshon",
        author: "Harun",
        category: "Philosophy",
        note: "Family 2 & 3 — tribe identity and institutionalising philosophical research.",
      },
      {
        order: 9,
        title: "Thieves of State",
        author: "Sarah Chayes",
        category: "Activism",
        note: "Family 3 — anti-corruption sequencing; end support for kleptocrats.",
      },
      {
        order: 10,
        title: "Social Transformation in Bangladesh",
        author: "(collective volume)",
        category: "History",
        note: "Family 3 — public social spending, transparency, accountability mechanisms.",
      },
      {
        order: 11,
        title: "Lokayata Darshan",
        author: "Debiprasad Chattopadhyay",
        category: "Philosophy",
        note: "Family 3 — embed materialist philosophy in education curricula.",
      },
    ],
    steps: [
      "Read the toolkit texts in order, tagging each mechanism to one of the four tactical families.",
      "Design the 6-week Dhaka anti-slum-clearance campaign drawing from all four families.",
      "Write the side-note explaining how you avoid Piven/Cloward’s ‘organizer failure’.",
      "Redesign the rice-pudding laughtivist action to satisfy all four constraints in the Checkpoint.",
    ],
    task: "Design a 6-week campaign against a hypothetical corrupt slum-clearance project in Dhaka. Use: a disruption tactic from Piven/Cloward (an accessible institution), a narrative tactic from Brunson or the fiction, an institutional demand from Chayes and Social Transformation in Bangladesh, a nonviolent inclusivity mechanism from Popović, and a historical precedent from Hannan (e.g., the 1969 mass upsurge’s coalition logic). In a side note, explain exactly how you avoid the ‘organizer failure’ (dues cards during strikes, constitutions during looting).",
    checkpoint:
      "The Dhaka youth collective launches a laughtivist action: hundreds of children throw rice pudding at the bulldozers while singing a mother’s lament from Hangor Nodi Grenade. Piven/Cloward warn it targets a bulldozer, not an accessible institution. Popović applauds the creativity but demands a next ‘manageable battle’. Chayes asks whether the corrupt network simply changes tactics. Redesign the action so it simultaneously: (a) targets an accessible institution, (b) uses laughtivism, (c) builds toward a policy demand, and (d) minimises working-class backlash. Justify each adjustment with specific source-book logic.",
  },
  {
    id: "phase-4",
    number: 4,
    title: "Synthesis & Critical Evaluation",
    tagline: "Mastery through ruthless limitation-mapping",
    objectives: [
      {
        verb: "Synthesize",
        text: "a meta-framework that explains when and why mass-movement strategies fail.",
      },
      {
        verb: "Critique",
        text: "the synthesized toolkit using five ‘stress-test’ lenses drawn from the blindspots of the source texts.",
      },
      {
        verb: "Construct",
        text: "a predictive failure model for any social reform movement, validated against the entire corpus.",
      },
    ],
    reading: [
      {
        order: 1,
        title: "The Crowd",
        author: "Gustave Le Bon",
        category: "Philosophy",
        note: "Lens 1 — The Irrational Core: does your strategy assume rational actors?",
      },
      {
        order: 2,
        title: "A History of Bangladesh",
        author: "Willem van Schendel",
        category: "History",
        note: "Lens 2 — Weight of History & Ecology: colonial legacy, climate, partition trauma.",
      },
      {
        order: 3,
        title: "Chakra",
        author: "Mukhopadhyay",
        category: "Fiction",
        note: "Lens 3 — Unassimilable Traumas: private paralysis that resists ‘campaign win’.",
      },
      {
        order: 4,
        title: "Hangor Nodi Grenade",
        author: "Selina Hossain",
        category: "Fiction",
        note: "Lens 3 — irrecoverable personal loss that cannot be narrativised.",
      },
      {
        order: 5,
        title: "Jashoder Utthan Poton",
        author: "Ahmad",
        category: "History",
        note: "Lens 4 — Organisational Mortality: communist parties implode.",
      },
      {
        order: 6,
        title: "Bangladesher Chhatro Andoloner Itihash",
        author: "Hannan",
        category: "History",
        note: "Lens 4 — student movements evaporate; the half-life of organisational form.",
      },
      {
        order: 7,
        title: "Khowabnama",
        author: "Akhtaruzzaman Elias",
        category: "Fiction",
        note: "Lens 4 — left politics betrays its own dreams.",
      },
      {
        order: 8,
        title: "Thieves of State",
        author: "Sarah Chayes",
        category: "Activism",
        note: "Lens 5 — Co-optation & Corruption: elite networks absorb mechanisms.",
      },
      {
        order: 9,
        title: "Social Transformation in Bangladesh",
        author: "(collective volume)",
        category: "History",
        note: "Lens 5 — can reform ever outrun kleptocratic adaptation?",
      },
    ],
    steps: [
      "Re-read the five-lens texts in order, extracting each book’s identified blindspot.",
      "Write the 700-word ‘Diagnosis of Vulnerability’ integrating at least seven authors.",
      "Apply the five lenses to identify three failure points your own design overlooks.",
      "Complete the Final Synthesis Prompt and generate one original stress-test question.",
    ],
    task: "Write a 700-word ‘Diagnosis of Vulnerability’ for a hypothetical people’s movement for transparency in Bangladesh. Integrate at least seven authors from across all four phases. Then, using the five lenses, identify three specific failure points your own design overlooks. Use the critical reception passages from the book profiles to support each identified blindspot.",
    checkpoint:
      "Final Synthesis Prompt: Piven & Cloward reject permanent organisation; JASAD’s history shows a communist mass party collapsed anyway. Le Bon would say both ignore the irrational crowd-core; Chayes adds that corrupt networks absorb disruption; van Schendel reminds us deeper historical-ecological identity will resurface; Chakra whispers some traumas disable collective action entirely. Reconcile these critiques by identifying the minimal structural kernel a movement must have to survive both external subversion and internal psychological collapse — or argue no such kernel exists. Then generate one original stress-test question answerable only with reference to at least two books, one of which is fiction.",
  },
]

// ---------------------------------------------------------------------------
// TASK TRACKER — actionable deliverables from each phase
// ---------------------------------------------------------------------------

export interface TaskItem {
  id: string
  phase: number
  text: string
  type: "matrix" | "drill" | "campaign" | "essay" | "checkpoint"
}

export const TASKS: TaskItem[] = [
  { id: "t1", phase: 1, type: "matrix", text: "Build the six-axis comparative matrix of mass subjectivity." },
  { id: "t2", phase: 1, type: "checkpoint", text: "Answer the cyclone + food-price divergence checkpoint." },
  { id: "t3", phase: 1, type: "matrix", text: "Add the ‘historical trauma’ column (van Schendel, Harun, Elias)." },
  { id: "t4", phase: 2, type: "drill", text: "Run the ‘Precise Divergence’ drill on Dyad 1 (T+2 weeks timeline)." },
  { id: "t5", phase: 2, type: "drill", text: "Map Dyad 5: private trauma vs. weaponised public sacrifice." },
  { id: "t6", phase: 2, type: "checkpoint", text: "Resolve the ‘indispensable minimum’ post-resignation checkpoint." },
  { id: "t7", phase: 3, type: "campaign", text: "Design the 6-week Dhaka anti-slum-clearance campaign." },
  { id: "t8", phase: 3, type: "campaign", text: "Write the side-note avoiding ‘organizer failure’." },
  { id: "t9", phase: 3, type: "checkpoint", text: "Redesign the rice-pudding laughtivist action (a–d constraints)." },
  { id: "t10", phase: 4, type: "essay", text: "Write the 700-word ‘Diagnosis of Vulnerability’ (7+ authors)." },
  { id: "t11", phase: 4, type: "essay", text: "Identify three failure points your design overlooks." },
  { id: "t12", phase: 4, type: "checkpoint", text: "Final synthesis: the ‘minimal structural kernel’ + original stress-test question." },
]

export const TACTICAL_FAMILIES = [
  { name: "Disruption & Escalation", count: 3, sources: "Piven/Cloward · Engler · Hannan" },
  { name: "Narrative & Identity", count: 5, sources: "Brunson · Popović · Hossain · Mukhopadhyay · Harun" },
  { name: "Institutional & Policy", count: 4, sources: "Chayes · Social Transformation · Chattopadhyay · Harun" },
  { name: "Nonviolent Discipline", count: 3, sources: "Popović · Engler · Hannan" },
]
