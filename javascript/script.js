document.addEventListener("DOMContentLoaded", () => {

    /* ── References ──────────────────────────────────── */
    const htmlEl           = document.documentElement;
    const header           = document.getElementById("header");
    const mobileBtn        = document.getElementById("mobile_btn");
    const mobileMenu       = document.getElementById("mobile_menu");
    const mobileIcon       = mobileBtn?.querySelector("i");
    const desktopLinks     = document.querySelectorAll("#nav_list a");
    const mobileLinks      = document.querySelectorAll("#mobile_nav_list a");
    const allNavLinks      = document.querySelectorAll("#nav_list a, #mobile_nav_list a");
    const sections         = document.querySelectorAll("main section[id]");
    const revealEls        = document.querySelectorAll(".reveal");
    const langButtons      = document.querySelectorAll(".lang-btn");
    const themeToggle      = document.getElementById("theme-toggle");
    const themeToggleMobile= document.getElementById("theme-toggle-mobile");
    const themeIcon        = document.getElementById("theme-icon");
    const themeIconMobile  = document.getElementById("theme-icon-mobile");
    const metricEls        = document.querySelectorAll(".metric-value[data-target]");
    const diagTabs         = document.querySelectorAll(".diag-tab");
    const diagPanels       = document.querySelectorAll(".diag-panel");


    /* ══════════════════════════════════════════════════
       DARK MODE
       Priority: 1. localStorage  2. OS preference  3. light
    ══════════════════════════════════════════════════ */
    const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    const getSaved = () => { try { return localStorage.getItem("mbsTheme"); } catch { return null; } };

    const applyTheme = (theme) => {
        htmlEl.setAttribute("data-theme", theme);
        const isDark = theme === "dark";
        const add    = isDark ? "fa-sun"  : "fa-moon";
        const remove = isDark ? "fa-moon" : "fa-sun";
        [themeIcon, themeIconMobile].forEach(el => {
            if (!el) return;
            el.classList.remove(remove);
            el.classList.add(add);
        });
        try { localStorage.setItem("mbsTheme", theme); } catch {}
    };

    const toggleTheme = () => {
        const current = htmlEl.getAttribute("data-theme") || "light";
        applyTheme(current === "dark" ? "light" : "dark");
    };

    // Respect OS changes if user has no saved preference
    window.matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", e => { if (!getSaved()) applyTheme(e.matches ? "dark" : "light"); });

    themeToggle?.addEventListener("click", toggleTheme);
    themeToggleMobile?.addEventListener("click", toggleTheme);

    // Init: light by default as required, but respect saved/OS if present
    applyTheme(getSaved() || "light");


    /* ══════════════════════════════════════════════════
       TRANSLATIONS
    ══════════════════════════════════════════════════ */
    const T = {
        en: {
            brand_subtitle: "Sales & Transformation Consulting",
            nav_home:       "Home",
            nav_results:    "Results",
            nav_expertise:  "Expertise",
            nav_diagnostic: "Diagnostic",
            nav_approach:   "Approach",
            nav_contact:    "Contact",
            nav_cta:        "Schedule a Call",

            hero_eyebrow:       "Premium Executive Advisory · Europe",
            hero_title:         "Your next stage of growth deserves a sharper execution engine.",
            hero_description:   "We work with senior leadership teams to strengthen revenue, transform financial operations, and build the execution discipline that separates high-performing organisations from the rest.",
            hero_btn_primary:   "Schedule a Consultation",
            hero_btn_secondary: "Explore Expertise",
            trust_1_title: "Revenue-First",
            trust_1_text:  "Commercial improvement with strategic rigour",
            trust_2_title: "Finance + Operations",
            trust_2_text:  "Integrated performance view for leadership",
            trust_3_title: "Execution-Led",
            trust_3_text:  "Practical transformation, not slide-only consulting",
            floating_1_label: "Strategic Sales Advisory",
            floating_1_text:  "Growth with structure",
            floating_2_label: "Automation & Dashboards",
            floating_2_text:  "Visibility for faster decisions",

            bar_1: "Executive Advisory",
            bar_2: "Sales Transformation",
            bar_3: "Finance Excellence",
            bar_4: "Automation Strategy",
            bar_5: "Performance Dashboards",
            bar_6: "Operational Discipline",

            results_tag:    "CLIENT RESULTS",
            results_title:  "Outcomes that speak for themselves",
            results_subtitle: "Selected results from client engagements across Europe and the Americas.",
            metric_1:       "Reduction in reporting cycle time",
            metric_1_ctx:   "Finance transformation · Automotive sector",
            metric_2:       "Hours saved annually through automation",
            metric_2_ctx:   "RPA deployment · Multi-entity European operations",
            metric_3:       "European jurisdictions managed",
            metric_3_ctx:   "VAT compliance · Zero material audit findings",
            metric_4:       "Leaders receiving weekly dashboards",
            metric_4_ctx:   "Power BI deployment · Replaced manual reporting",

            case_1_sector:  "Finance Transformation · Automotive",
            case_1_title:   "From manual reporting to real-time executive visibility",
            case_before:    "Before",
            case_after:     "After",
            case_1_before:  "Finance teams spending 3+ days per month compiling reports manually across multiple European entities, with no consistent format or real-time view.",
            case_1_after:   "Automated Power BI dashboards deployed across entities. Weekly reports now distributed to 70+ leaders in minutes, replacing the entire manual cycle.",
            case_1_result:  "Reporting cycle reduced by ~40% · Zero manual compilation",
            case_2_sector:  "Process Automation · Finance Operations",
            case_2_title:   "Eliminating thousands of hours of manual finance work",
            case_2_before:  "R2R, P2P and OTC processes heavily reliant on manual data entry, reconciliation, and cross-system transfers — consuming analyst time with zero strategic value.",
            case_2_after:   "RPA bots and Power Automate flows deployed across the highest-volume tasks. SAP S/4HANA integration enabled end-to-end automation with full audit trail.",
            case_2_result:  "4,000+ hours saved annually · Teams refocused on analysis",
            case_3_sector:  "VAT Compliance · 30+ Jurisdictions",
            case_3_title:   "Audit-ready compliance at scale across Europe",
            case_3_before:  "Multinational VAT compliance managed manually across 30+ EU jurisdictions with inconsistent validation, high error risk, and slow audit response times.",
            case_3_after:   "Automated validation tools built per jurisdiction. Continuous improvement methodology applied to submission accuracy. Full audit documentation maintained.",
            case_3_result:  "Zero material audit findings · Significant reduction in review time",

            expertise_tag:  "EXPERTISE",
            expertise_title:"Advisory capabilities designed to improve growth, control and performance",
            expertise_description: "A premium consulting model for companies that want stronger commercial execution, smarter reporting, leaner operations, and better leadership visibility.",
            expertise_card_1_title: "Sales & Revenue Performance",
            expertise_card_1_text:  "Improve commercial discipline, pipeline visibility, decision frameworks and the routines that drive stronger sales execution.",
            expertise_card_2_title: "Automation & Productivity",
            expertise_card_2_text:  "Reduce manual effort, increase speed and create more scalable operations through intelligent automation and workflow redesign.",
            expertise_card_3_title: "Dashboards & Executive Visibility",
            expertise_card_3_text:  "Turn business data into high-impact executive dashboards that support better prioritization and faster decisions.",
            expertise_card_4_title: "Process Redesign",
            expertise_card_4_text:  "Map the current reality, identify bottlenecks and redesign operating flows for higher efficiency and better governance.",
            expertise_card_5_title: "Governance & Control",
            expertise_card_5_text:  "Support leadership teams with stronger accountability, process ownership, reporting discipline and operational consistency.",
            expertise_card_6_title: "Transformation Execution",
            expertise_card_6_text:  "Move from diagnosis to implementation with practical delivery, stakeholder alignment and business-oriented prioritization.",

            diagnostic_tag:  "BUSINESS DIAGNOSTIC",
            diagnostic_title:"Where is your biggest opportunity right now?",
            diagnostic_description: "Select the area where your business needs the most impact. We'll show you exactly how MBS Advisory addresses it.",
            diag_tab_1: "Finance & Control",
            diag_tab_2: "Sales & Revenue",
            diag_tab_3: "Governance",
            diag_tab_4: "People & HR",
            diag_tab_5: "Logistics",
            diag_tab_6: "Service & Ops",
            diag_tab_7: "Customer Experience",
            metric_src: "From a 2024 client engagement",

            diag_finance_title: "Is your financial data driving decisions — or just recording them?",
            diag_finance_text:  "Many organisations have financial reports without financial intelligence. We redesign your reporting structure, strengthen budget control, and build dashboards that give leadership a real-time view of business health.",
            diag_finance_b1: "Budget management and cost control",
            diag_finance_b2: "Executive financial dashboards",
            diag_finance_b3: "Cash flow and variance analysis",
            diag_finance_b4: "SOX / IFRS compliance frameworks",
            diag_cta: "Talk to us about Finance",
            diag_metric_finance:   "Reporting cycle reduction",
            diag_metric_finance_2: "Leadership KPI visibility",

            diag_sales_title: "Is your sales team executing with structure — or just reacting?",
            diag_sales_text:  "Revenue growth requires more than motivation. We bring commercial discipline: clear pipeline management, structured decision frameworks, and the routines that separate high-performing teams from average ones.",
            diag_sales_b1: "Pipeline visibility and forecasting",
            diag_sales_b2: "Commercial discipline and routines",
            diag_sales_b3: "Sales performance frameworks",
            diag_sales_b4: "Revenue reporting and KPI design",
            diag_cta_sales: "Talk to us about Sales",
            diag_metric_sales:   "Revenue improvement",
            diag_metric_sales_2: "Pipeline visibility",

            diag_gov_title: "Do your processes have clear ownership — or do things fall through the cracks?",
            diag_gov_text:  "Governance is not bureaucracy — it is clarity. We help you define who owns what, how decisions are made, and how accountability flows across the organisation.",
            diag_gov_b1: "Process ownership and accountability",
            diag_gov_b2: "Decision-making frameworks",
            diag_gov_b3: "Internal controls and compliance",
            diag_gov_b4: "Reporting discipline and cadence",
            diag_cta_gov: "Talk to us about Governance",
            diag_metric_gov:   "Process escalations",
            diag_metric_gov_2: "Process ownership defined",

            diag_hr_title: "Are your people processes enabling performance — or creating friction?",
            diag_hr_text:  "People operations are often the silent bottleneck. We help structure onboarding, performance tracking, and internal communication flows so your team spends less time on administration.",
            diag_hr_b1: "Performance management frameworks",
            diag_hr_b2: "Onboarding and process standardisation",
            diag_hr_b3: "HR reporting and analytics",
            diag_hr_b4: "Team efficiency and workload design",
            diag_cta_hr: "Talk to us about People",
            diag_metric_hr:   "Admin time per person",
            diag_metric_hr_2: "Team productivity",

            diag_log_title: "Is your supply chain delivering speed — or absorbing cost?",
            diag_log_text:  "Logistics inefficiencies compound silently. We map your current flow, identify waste at every handoff, and redesign the process to deliver speed, cost reduction, and visibility.",
            diag_log_b1: "Supply chain process mapping",
            diag_log_b2: "Lead time and cost reduction",
            diag_log_b3: "Inventory and flow optimisation",
            diag_log_b4: "Logistics KPI design",
            diag_cta_log: "Talk to us about Logistics",
            diag_metric_log:   "Logistics cost",
            diag_metric_log_2: "Lead time",

            diag_svc_title: "Are your operations running efficiently — or just running?",
            diag_svc_text:  "Operational excellence is not about doing more — it is about eliminating what should not exist. We redesign service delivery processes, automate repetitive tasks, and build the management routines that make operations consistent and scalable.",
            diag_svc_b1: "Service delivery redesign",
            diag_svc_b2: "Automation of repetitive workflows",
            diag_svc_b3: "Operational KPI frameworks",
            diag_svc_b4: "Standard operating procedures",
            diag_cta_svc: "Talk to us about Operations",
            diag_metric_svc:   "Manual task volume",
            diag_metric_svc_2: "Delivery speed",

            diag_cx_title: "Is your customer journey building loyalty — or losing it quietly?",
            diag_cx_text:  "Customer experience is a business outcome, not a department. We help you map touchpoints, identify friction, and redesign the interactions that determine whether clients return, refer, or leave.",
            diag_cx_b1: "Customer journey mapping",
            diag_cx_b2: "Touchpoint friction analysis",
            diag_cx_b3: "NPS and satisfaction framework design",
            diag_cx_b4: "Retention and loyalty process design",
            diag_cta_cx: "Talk to us about CX",
            diag_metric_cx:   "Customer satisfaction",
            diag_metric_cx_2: "Churn rate",

            approach_tag:   "APPROACH",
            approach_title: "A consulting approach built around clarity, speed and measurable value",
            step_1_title: "Diagnose",
            step_1_text:  "We assess your sales, finance, reporting and process landscape to identify what is slowing growth or execution.",
            step_2_title: "Prioritise",
            step_2_text:  "We define what matters most first: visibility, process redesign, automation, governance or leadership reporting.",
            step_3_title: "Implement",
            step_3_text:  "We execute with business realism, stakeholder alignment and a sharp focus on outcomes that leaders can actually feel.",
            step_4_title: "Scale",
            step_4_text:  "We embed routines, dashboards and operating discipline so improvements are sustained and expanded over time.",
            approach_panel_label: "Advisory Philosophy",
            approach_panel_title: "Elegant strategy. Serious execution.",
            approach_panel_text:  "We combine executive perspective with hands-on delivery, creating a consulting experience that feels premium, focused and deeply practical.",

            insights_tag:   "WHY MBS",
            insights_title: "What clients value in our consulting style",
            result_1_title: "Commercial Lens",
            result_1_text:  "We do not treat process and reporting as isolated functions — they exist to support better growth decisions and stronger execution.",
            result_2_title: "Premium Positioning",
            result_2_text:  "Our approach is structured, polished and executive-ready, helping your business present itself with greater clarity and confidence.",
            result_3_title: "Cross-Functional Strength",
            result_3_text:  "We connect finance, sales, operations and systems to solve the real causes of inefficiency rather than only the symptoms.",
            result_4_title: "Hands-on Transformation",
            result_4_text:  "We stay close to implementation so change becomes operational reality, not just a strategic recommendation.",

            contact_tag:   "CONTACT",
            contact_title: "Let's talk about your next stage of growth",
            contact_description: "Whether you want to improve sales effectiveness, redesign processes, build better dashboards, or increase operating efficiency — we can structure the next move with clarity and executive-level focus.",
            contact_point_1: "Premium positioning for ambitious organisations",
            contact_point_2: "Sales, finance and operations in one advisory lens",
            contact_point_3: "Practical transformation with measurable results",
            micro_cta_title: "Start with a 30-minute diagnostic call",
            micro_cta_text:  "No obligation. We'll identify your single biggest opportunity together.",
            form_name_label:    "Full Name",
            form_email_label:   "Business Email",
            form_company_label: "Company",
            form_message_label: "Your Challenge",
            form_name:    "Full name",
            form_email:   "Business email",
            form_company: "Company",
            form_message: "Tell us about your challenge, goals, or project scope",
            form_button:  "Request Consultation",
            form_note:    "We respond within one business day.",

            footer_text_1: "Sales, Finance & Business Transformation Consulting",
            footer_text_2: "© 2026 MBS Advisory",
            footer_text_3: "Elegant strategy. Serious execution."
        },

        pt: {
            brand_subtitle: "Consultoria em Vendas e Transformação",
            nav_home:       "Início",
            nav_results:    "Resultados",
            nav_expertise:  "Especialidades",
            nav_diagnostic: "Diagnóstico",
            nav_approach:   "Abordagem",
            nav_contact:    "Contacto",
            nav_cta:        "Agendar Consulta",

            hero_eyebrow:       "Consultoria Executiva Premium · Europa",
            hero_title:         "A próxima etapa do seu crescimento merece um motor de execução mais preciso.",
            hero_description:   "Trabalhamos com equipas de liderança sénior para fortalecer a receita, transformar operações financeiras e construir a disciplina de execução que diferencia as organizações de alta performance.",
            hero_btn_primary:   "Agendar Consulta",
            hero_btn_secondary: "Explorar Especialidades",
            trust_1_title: "Foco em Receita",
            trust_1_text:  "Evolução comercial com rigor estratégico",
            trust_2_title: "Finanças + Operações",
            trust_2_text:  "Visão integrada de performance para a liderança",
            trust_3_title: "Execução na Prática",
            trust_3_text:  "Transformação real, não apenas consultoria de slides",
            floating_1_label: "Consultoria Estratégica em Vendas",
            floating_1_text:  "Crescimento com estrutura",
            floating_2_label: "Automação & Dashboards",
            floating_2_text:  "Visibilidade para decisões mais rápidas",

            bar_1: "Consultoria Executiva",
            bar_2: "Transformação Comercial",
            bar_3: "Excelência Financeira",
            bar_4: "Estratégia de Automação",
            bar_5: "Dashboards de Performance",
            bar_6: "Disciplina Operacional",

            results_tag:    "RESULTADOS DE CLIENTES",
            results_title:  "Resultados que falam por si",
            results_subtitle: "Resultados selecionados de projetos na Europa e nas Américas.",
            metric_1:     "Redução no ciclo de reporte",
            metric_1_ctx: "Transformação financeira · Setor automóvel",
            metric_2:     "Horas poupadas anualmente com automação",
            metric_2_ctx: "Implementação RPA · Operações europeias multi-entidade",
            metric_3:     "Jurisdições europeias geridas",
            metric_3_ctx: "Compliance IVA · Zero ocorrências materiais em auditoria",
            metric_4:     "Líderes que recebem dashboards semanais",
            metric_4_ctx: "Implementação Power BI · Substituiu reporting manual",

            case_1_sector:  "Transformação Financeira · Automóvel",
            case_1_title:   "Do reporting manual à visibilidade executiva em tempo real",
            case_before:    "Antes",
            case_after:     "Depois",
            case_1_before:  "Equipas financeiras a gastar 3+ dias por mês a compilar relatórios manualmente em múltiplas entidades europeias, sem formato consistente nem visão em tempo real.",
            case_1_after:   "Dashboards Power BI automatizados implementados nas entidades. Relatórios semanais distribuídos a 70+ líderes em minutos, substituindo todo o ciclo manual.",
            case_1_result:  "Ciclo de reporte reduzido em ~40% · Zero compilação manual",
            case_2_sector:  "Automação de Processos · Operações Financeiras",
            case_2_title:   "Eliminar milhares de horas de trabalho financeiro manual",
            case_2_before:  "Processos R2R, P2P e OTC fortemente dependentes de entrada manual de dados, reconciliação e transferências entre sistemas — consumindo tempo de analistas sem valor estratégico.",
            case_2_after:   "Bots RPA e fluxos Power Automate implementados nas tarefas de maior volume. Integração com SAP S/4HANA permitiu automação end-to-end com trilha de auditoria completa.",
            case_2_result:  "4.000+ horas poupadas anualmente · Equipas focadas em análise",
            case_3_sector:  "Compliance IVA · 30+ Jurisdições",
            case_3_title:   "Compliance pronto para auditoria em escala na Europa",
            case_3_before:  "Compliance IVA multinacional gerido manualmente em 30+ jurisdições da UE com validação inconsistente, alto risco de erros e tempos de resposta lentos em auditoria.",
            case_3_after:   "Ferramentas de validação automatizadas por jurisdição. Melhoria contínua aplicada à precisão das submissões. Documentação completa de auditoria mantida.",
            case_3_result:  "Zero ocorrências materiais em auditoria · Redução significativa no tempo de revisão",

            expertise_tag:  "ESPECIALIDADES",
            expertise_title:"Capacidades de consultoria para melhorar crescimento, controlo e performance",
            expertise_description: "Um modelo premium de consultoria para empresas que buscam execução comercial mais forte, reporting mais inteligente e operações mais eficientes.",
            expertise_card_1_title: "Performance de Vendas & Receita",
            expertise_card_1_text:  "Melhore a disciplina comercial, visibilidade do pipeline e as rotinas que impulsionam uma execução comercial mais forte.",
            expertise_card_2_title: "Automação & Produtividade",
            expertise_card_2_text:  "Reduza esforço manual e crie operações mais escaláveis através de automação inteligente e redesenho de fluxos de trabalho.",
            expertise_card_3_title: "Dashboards & Visibilidade Executiva",
            expertise_card_3_text:  "Transforme dados de negócio em dashboards executivos de alto impacto que apoiam melhor priorização e decisões mais rápidas.",
            expertise_card_4_title: "Redesenho de Processos",
            expertise_card_4_text:  "Mapeie a realidade atual, identifique gargalos e redesenhe fluxos operacionais para maior eficiência e melhor governança.",
            expertise_card_5_title: "Governança & Controlo",
            expertise_card_5_text:  "Apoie equipas de liderança com maior accountability, ownership de processos e disciplina de reporte.",
            expertise_card_6_title: "Execução da Transformação",
            expertise_card_6_text:  "Passe do diagnóstico à implementação com entrega prática, alinhamento de stakeholders e priorização orientada ao negócio.",

            diagnostic_tag:  "DIAGNÓSTICO DE NEGÓCIO",
            diagnostic_title:"Qual é a sua maior oportunidade agora?",
            diagnostic_description: "Selecione a área onde o seu negócio precisa de mais impacto. Vamos mostrar como a MBS Advisory atua.",
            diag_tab_1: "Finanças & Controlo",
            diag_tab_2: "Vendas & Receita",
            diag_tab_3: "Governança",
            diag_tab_4: "Pessoas & RH",
            diag_tab_5: "Logística",
            diag_tab_6: "Serviços & Ops",
            diag_tab_7: "Experiência do Cliente",
            metric_src: "De um projeto de 2024",

            diag_finance_title: "Os seus dados financeiros estão a guiar decisões — ou apenas a registá-las?",
            diag_finance_text:  "Muitas organizações têm relatórios financeiros sem inteligência financeira. Redesenhamos a estrutura de reporte, fortalecemos o controlo orçamental e construímos dashboards que dão à liderança uma visão em tempo real.",
            diag_finance_b1: "Gestão orçamental e controlo de custos",
            diag_finance_b2: "Dashboards financeiros executivos",
            diag_finance_b3: "Análise de fluxo de caixa e variações",
            diag_finance_b4: "Frameworks de compliance SOX / IFRS",
            diag_cta: "Fale connosco sobre Finanças",
            diag_metric_finance:   "Redução no ciclo de reporte",
            diag_metric_finance_2: "Visibilidade de KPIs da liderança",

            diag_sales_title: "A sua equipa de vendas executa com estrutura — ou apenas reage?",
            diag_sales_text:  "O crescimento de receita exige mais do que motivação. Trazemos disciplina comercial: gestão clara do pipeline, frameworks de decisão estruturados e as rotinas que separam equipas de alta performance.",
            diag_sales_b1: "Visibilidade do pipeline e previsão",
            diag_sales_b2: "Disciplina comercial e rotinas",
            diag_sales_b3: "Frameworks de performance de vendas",
            diag_sales_b4: "Reporting de receita e design de KPIs",
            diag_cta_sales: "Fale connosco sobre Vendas",
            diag_metric_sales:   "Melhoria de receita",
            diag_metric_sales_2: "Visibilidade do pipeline",

            diag_gov_title: "Os seus processos têm responsáveis claros — ou as coisas ficam pelo caminho?",
            diag_gov_text:  "Governança não é burocracia — é clareza. Ajudamos a definir quem é responsável por quê, como as decisões são tomadas e como a accountability flui pela organização.",
            diag_gov_b1: "Ownership de processos e accountability",
            diag_gov_b2: "Frameworks de tomada de decisão",
            diag_gov_b3: "Controlos internos e compliance",
            diag_gov_b4: "Disciplina de reporte e cadência",
            diag_cta_gov: "Fale connosco sobre Governança",
            diag_metric_gov:   "Escalações de processo",
            diag_metric_gov_2: "Ownership de processos definido",

            diag_hr_title: "Os seus processos de pessoas estão a impulsionar performance — ou a criar fricção?",
            diag_hr_text:  "As operações de pessoas são frequentemente o gargalo silencioso. Ajudamos a estruturar onboarding, acompanhamento de performance e fluxos de comunicação interna.",
            diag_hr_b1: "Frameworks de gestão de performance",
            diag_hr_b2: "Onboarding e padronização de processos",
            diag_hr_b3: "Reporting e analytics de RH",
            diag_hr_b4: "Eficiência da equipa e design de carga de trabalho",
            diag_cta_hr: "Fale connosco sobre Pessoas",
            diag_metric_hr:   "Tempo administrativo por pessoa",
            diag_metric_hr_2: "Produtividade da equipa",

            diag_log_title: "A sua cadeia de abastecimento entrega velocidade — ou absorve custos?",
            diag_log_text:  "As ineficiências logísticas acumulam-se silenciosamente. Mapeamos o fluxo atual, identificamos desperdícios e redesenhamos o processo para entregar velocidade, redução de custo e visibilidade.",
            diag_log_b1: "Mapeamento da cadeia de abastecimento",
            diag_log_b2: "Redução de lead time e custos",
            diag_log_b3: "Otimização de inventário e fluxo",
            diag_log_b4: "Design de KPIs logísticos",
            diag_cta_log: "Fale connosco sobre Logística",
            diag_metric_log:   "Custo logístico",
            diag_metric_log_2: "Lead time",

            diag_svc_title: "As suas operações estão a funcionar com eficiência — ou apenas a funcionar?",
            diag_svc_text:  "Excelência operacional não é sobre fazer mais — é sobre eliminar o que não deveria existir. Redesenhamos processos de entrega de serviços, automatizamos tarefas repetitivas e construímos rotinas de gestão que tornam as operações consistentes.",
            diag_svc_b1: "Redesenho de entrega de serviços",
            diag_svc_b2: "Automação de fluxos repetitivos",
            diag_svc_b3: "Frameworks de KPIs operacionais",
            diag_svc_b4: "Procedimentos operacionais padrão",
            diag_cta_svc: "Fale connosco sobre Operações",
            diag_metric_svc:   "Volume de tarefas manuais",
            diag_metric_svc_2: "Velocidade de entrega",

            diag_cx_title: "A jornada do cliente está a construir fidelização — ou a perdê-la silenciosamente?",
            diag_cx_text:  "Experiência do cliente é um resultado de negócio, não um departamento. Ajudamos a mapear pontos de contacto, identificar fricções e redesenhar as interações que determinam se os clientes voltam ou partem.",
            diag_cx_b1: "Mapeamento da jornada do cliente",
            diag_cx_b2: "Análise de fricção nos touchpoints",
            diag_cx_b3: "Design de frameworks de NPS e satisfação",
            diag_cx_b4: "Design de processos de retenção e fidelização",
            diag_cta_cx: "Fale connosco sobre CX",
            diag_metric_cx:   "Satisfação do cliente",
            diag_metric_cx_2: "Taxa de churn",

            approach_tag:   "ABORDAGEM",
            approach_title: "Uma abordagem de consultoria construída em torno de clareza, velocidade e valor mensurável",
            step_1_title: "Diagnosticar",
            step_1_text:  "Avaliamos o seu cenário de vendas, finanças, reporting e processos para identificar o que está a desacelerar o crescimento ou a execução.",
            step_2_title: "Priorizar",
            step_2_text:  "Definimos primeiro o que mais importa: visibilidade, redesenho de processos, automação, governança ou reporting para a liderança.",
            step_3_title: "Implementar",
            step_3_text:  "Executamos com realismo de negócio, alinhamento de stakeholders e foco claro em resultados que a liderança realmente percebe.",
            step_4_title: "Escalar",
            step_4_text:  "Incorporamos rotinas, dashboards e disciplina operacional para que as melhorias sejam sustentadas e ampliadas ao longo do tempo.",
            approach_panel_label: "Filosofia de Consultoria",
            approach_panel_title: "Estratégia elegante. Execução séria.",
            approach_panel_text:  "Combinamos visão executiva com entrega prática, criando uma experiência de consultoria que transmite sofisticação, foco e profunda aplicabilidade.",

            insights_tag:   "PORQUÊ MBS",
            insights_title: "O que os clientes valorizam no nosso estilo de consultoria",
            result_1_title: "Visão Comercial",
            result_1_text:  "Não tratamos processos e reporting como funções isoladas — existem para apoiar melhores decisões de crescimento e execução mais forte.",
            result_2_title: "Posicionamento Premium",
            result_2_text:  "A nossa abordagem é estruturada, refinada e pronta para o nível executivo, ajudando o seu negócio a apresentar-se com maior clareza e confiança.",
            result_3_title: "Força Multifuncional",
            result_3_text:  "Conectamos finanças, vendas, operações e sistemas para resolver as causas reais da ineficiência, e não apenas os sintomas.",
            result_4_title: "Transformação na Prática",
            result_4_text:  "Permanecemos próximos da implementação para que a mudança se torne realidade operacional, e não apenas uma recomendação estratégica.",

            contact_tag:   "CONTACTO",
            contact_title: "Vamos conversar sobre a próxima etapa do seu crescimento",
            contact_description: "Se pretende melhorar a efetividade comercial, redesenhar processos, construir dashboards melhores ou aumentar a eficiência operacional — podemos estruturar o próximo passo com clareza e foco executivo.",
            contact_point_1: "Posicionamento premium para organizações ambiciosas",
            contact_point_2: "Vendas, finanças e operações numa única lente consultiva",
            contact_point_3: "Transformação prática com resultados mensuráveis",
            micro_cta_title: "Comece com uma chamada de diagnóstico de 30 minutos",
            micro_cta_text:  "Sem compromisso. Identificamos juntos a sua maior oportunidade.",
            form_name_label:    "Nome Completo",
            form_email_label:   "E-mail Profissional",
            form_company_label: "Empresa",
            form_message_label: "O Seu Desafio",
            form_name:    "Nome completo",
            form_email:   "E-mail profissional",
            form_company: "Empresa",
            form_message: "Fale-nos do seu desafio, objetivos ou âmbito do projeto",
            form_button:  "Solicitar Consultoria",
            form_note:    "Respondemos num prazo de um dia útil.",

            footer_text_1: "Consultoria em Vendas, Finanças e Transformação de Negócios",
            footer_text_2: "© 2026 MBS Advisory",
            footer_text_3: "Estratégia elegante. Execução séria."
        }
    };

    const applyTranslations = (lang) => {
        const dict = T[lang] || T.en;
        htmlEl.lang = lang;

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const v = dict[el.dataset.i18n];
            if (v !== undefined) el.textContent = v;
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const v = dict[el.dataset.i18nPlaceholder];
            if (v !== undefined) el.setAttribute("placeholder", v);
        });

        langButtons.forEach(btn =>
            btn.classList.toggle("active", btn.dataset.lang === lang)
        );

        try { localStorage.setItem("mbsLang", lang); } catch {}
    };

    langButtons.forEach(btn =>
        btn.addEventListener("click", () => applyTranslations(btn.dataset.lang))
    );


    /* ══════════════════════════════════════════════════
       ANIMATED COUNTERS
    ══════════════════════════════════════════════════ */
    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

    const animateCounter = (el) => {
        const target   = parseInt(el.dataset.target, 10);
        const suffix   = el.dataset.suffix || "";
        const prefix   = el.dataset.prefix || "";
        const reduced  = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const duration = 1800;

        if (reduced) { el.textContent = prefix + target.toLocaleString() + suffix; return; }

        const start = performance.now();
        const tick  = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const value    = Math.round(easeOutQuart(progress) * target);
            el.textContent = prefix + value.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const resultsSection = document.getElementById("results");
    let countersRun = false;

    if (resultsSection && "IntersectionObserver" in window) {
        const co = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !countersRun) {
                countersRun = true;
                metricEls.forEach(el => animateCounter(el));
                co.disconnect();
            }
        }, { threshold: 0.25 });
        co.observe(resultsSection);
    } else {
        metricEls.forEach(el => animateCounter(el));
    }


    /* ══════════════════════════════════════════════════
       DIAGNOSTIC TABS
    ══════════════════════════════════════════════════ */
    diagTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.target;
            diagTabs.forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
            diagPanels.forEach(p => p.classList.remove("active"));
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            const panel = document.getElementById(target);
            if (panel) panel.classList.add("active");
        });
    });


    /* ══════════════════════════════════════════════════
       MOBILE MENU
    ══════════════════════════════════════════════════ */
    const openMenu = () => {
        if (!mobileMenu || !mobileBtn) return;
        mobileMenu.classList.add("active");
        mobileBtn.setAttribute("aria-expanded", "true");
        mobileBtn.setAttribute("aria-label", "Close menu");
        mobileIcon?.classList.replace("fa-bars", "fa-xmark");
        document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
        if (!mobileMenu || !mobileBtn) return;
        mobileMenu.classList.remove("active");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileBtn.setAttribute("aria-label", "Open menu");
        mobileIcon?.classList.replace("fa-xmark", "fa-bars");
        document.body.classList.remove("menu-open");
    };

    mobileBtn?.addEventListener("click", () =>
        mobileMenu?.classList.contains("active") ? closeMenu() : openMenu()
    );
    allNavLinks.forEach(l => l.addEventListener("click", closeMenu));
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && mobileMenu?.classList.contains("active")) closeMenu();
    });
    window.addEventListener("resize", () => { if (window.innerWidth > 1170) closeMenu(); });


    /* ══════════════════════════════════════════════════
       HEADER SCROLL
    ══════════════════════════════════════════════════ */
    const syncHeader = () =>
        header?.classList.toggle("scrolled", window.scrollY > 24);


    /* ══════════════════════════════════════════════════
       ACTIVE NAV
    ══════════════════════════════════════════════════ */
    const syncActive = () => {
        const pos = window.scrollY + 180;
        let current = sections[0]?.getAttribute("id") || "";
        sections.forEach(sec => {
            if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight)
                current = sec.getAttribute("id");
        });
        [desktopLinks, mobileLinks].forEach(list =>
            list.forEach(a => {
                const active = a.getAttribute("href") === `#${current}`;
                a.classList.toggle("active", active);
                a.setAttribute("aria-current", active ? "page" : "false");
            })
        );
    };

    window.addEventListener("scroll", () => { syncHeader(); syncActive(); }, { passive: true });


    /* ══════════════════════════════════════════════════
       REVEAL ON SCROLL with stagger
    ══════════════════════════════════════════════════ */
    if ("IntersectionObserver" in window) {
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const siblings = [...(entry.target.parentElement?.querySelectorAll(".reveal:not(.show)") || [])];
                const idx   = siblings.indexOf(entry.target);
                const delay = Math.max(0, Math.min(idx * 90, 360));
                setTimeout(() => entry.target.classList.add("show"), delay);
                o.unobserve(entry.target);
            });
        }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
        revealEls.forEach(el => obs.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add("show"));
    }


    /* ══════════════════════════════════════════════════
       IMAGE FALLBACK
    ══════════════════════════════════════════════════ */
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", () => {
            img.style.opacity = "0";
            img.setAttribute("aria-hidden", "true");
        });
    });


    /* ══════════════════════════════════════════════════
       INIT
    ══════════════════════════════════════════════════ */
    let savedLang = "en";
    try { savedLang = localStorage.getItem("mbsLang") || "en"; } catch {}
    applyTranslations(savedLang in T ? savedLang : "en");
    syncHeader();
    syncActive();

});
