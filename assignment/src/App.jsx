import React, { useEffect, useState } from "react";

const starterEvents = [
  {
    id: "birthday",
    name: "Birthdays",
    category: "The birthday edit",
    description: "A little more magic for their once-a-year kind of day.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1100&q=85",
    icon: "✳",
    color: "#f7e6d8",
    packages: [
      { name: "The Little Moment", price: "₹18,000", detail: "Styled tablescape · 15 guests" },
      { name: "The Big Day", price: "₹42,000", detail: "Full venue styling · 40 guests" },
    ],
  },
  {
    id: "haldi",
    name: "Haldi ceremonies",
    category: "The haldi edit",
    description: "Sun-drenched marigolds, joyful rituals, all your people.",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1100&q=85",
    icon: "❋",
    color: "#f4edcf",
    packages: [
      { name: "The Intimate Ritual", price: "₹32,000", detail: "Ceremony setup · 25 guests" },
      { name: "The Haldi House", price: "₹68,000", detail: "Full-day celebration · 60 guests" },
    ],
  },
  {
    id: "marriage",
    name: "Marriages",
    category: "The wedding edit",
    description: "The beginning of your forever, beautifully considered.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1100&q=85",
    icon: "♡",
    color: "#f3dfdc",
    packages: [
      { name: "The Ceremony", price: "₹1,25,000", detail: "Ceremony styling · 100 guests" },
      { name: "The Whole Story", price: "₹3,80,000", detail: "Ceremony + reception · 250 guests" },
    ],
  },
  {
    id: "baby-shower",
    name: "Baby showers",
    category: "The little-one edit",
    description: "A sweet, storybook welcome for the newest little love.",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1100&q=85",
    icon: "✿",
    color: "#e5ece5",
    packages: [
      { name: "A Little Gathering", price: "₹24,000", detail: "Styled shower · 20 guests" },
      { name: "A Lovely Welcome", price: "₹52,000", detail: "Full celebration · 50 guests" },
    ],
  },
];

const navItems = [
  { label: "Home", path: "/" },
  { label: "Celebrations", path: "/events" },
  { label: "Our story", path: "/#story" },
];

function routeFromLocation() {
  const path = window.location.pathname;
  return ["/events", "/book", "/create"].includes(path) ? path : "/";
}

function App() {
  const [route, setRoute] = useState(routeFromLocation);
  const [customEvents, setCustomEvents] = useState([]);
  const [bookingChoice, setBookingChoice] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => setRoute(routeFromLocation());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(path, options = {}) {
    if (path === "/book" && options.choice) setBookingChoice(options.choice);
    if (path !== "/book") setBookingChoice(null);
    const destination = path;
    window.history.pushState({}, "", destination);
    setRoute(routeFromLocation());
    setMobileMenuOpen(false);
    if (path.startsWith("/#")) {
      window.setTimeout(() => document.getElementById(path.slice(2))?.scrollIntoView({ behavior: "smooth" }), 20);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function addCustomEvent(event) {
    setCustomEvents((current) => [...current, event]);
    navigate("/events");
  }

  const events = [...starterEvents, ...customEvents];
  const sharedProps = { events, navigate };

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" onClick={(event) => { event.preventDefault(); navigate("/"); }}>
          <span className="brand-mark" aria-hidden="true">c.</span>
          <span>celebrationcraft</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav className={mobileMenuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              className={route === item.path ? "nav-link active" : "nav-link"}
              href={item.path}
              key={item.label}
              onClick={(event) => { event.preventDefault(); navigate(item.path); }}
            >
              {item.label}
            </a>
          ))}
          <button className="button button-dark nav-cta" onClick={() => navigate("/book")}>Plan your event <span>↗</span></button>
        </nav>
      </header>

      <main>
        {route === "/events" && <EventsPage {...sharedProps} />}
        {route === "/book" && (
          <BookingPage
            events={events}
            navigate={navigate}
            bookingChoice={bookingChoice}
          />
        )}
        {route === "/create" && <CreatePage onCreate={addCustomEvent} navigate={navigate} />}
        {route === "/" && <HomePage {...sharedProps} />}
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}

function HomePage({ events, navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> A little wonder, for every reason</div>
          <h1>Make a<br /><em>moment</em> of it.</h1>
          <p>Life's best days deserve more than a date on the calendar. Let's make something worth remembering.</p>
          <div className="hero-actions">
            <button className="button button-dark" onClick={() => navigate("/events")}>Explore celebrations <span>↗</span></button>
            <button className="text-link" onClick={() => navigate("/create")}>Dream up your own <span>↗</span></button>
          </div>
          <div className="hero-note"><span className="avatar-stack"><i>J</i><i>A</i><i>M</i></span><span>Made with love, for <strong>2,400+</strong> happy hosts</span></div>
        </div>
        <div className="hero-art">
          <div className="hero-photo">
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=90" alt="Warm candlelit celebration table dressed with flowers" />
          </div>
          <div className="hero-sticker"><span>good<br />things<br />gather</span><b>✳</b></div>
          <div className="photo-caption"><span>01 / 04</span><span>Every detail, a little more you.</span></div>
          <span className="hero-sparkle sparkle-one">✳</span>
          <span className="hero-sparkle sparkle-two">✴</span>
        </div>
        <div className="hero-bottom">Thoughtfully planned. Beautifully personal.</div>
      </section>

      <section className="home-intro content-width">
        <div className="eyebrow"><span className="eyebrow-line" /> The good stuff starts here</div>
        <div className="intro-row">
          <h2>For the days<br />you'll <em>talk about.</em></h2>
          <div className="intro-aside">
            <p>From the first invite to the last dance, we bring your big-feeling ideas to life with thoughtful details and the people who make it happen.</p>
            <button className="text-link" onClick={() => navigate("/events")}>Find your kind of celebration <span>↗</span></button>
          </div>
        </div>
        <div className="home-event-grid">
          {events.slice(0, 3).map((event, index) => (
            <button className={`home-event-card home-event-${index + 1}`} key={event.id} onClick={() => navigate("/events")}>
              <span className="home-event-image">
                {event.image ? <img src={event.image} alt="" /> : <span className="custom-event-visual" style={{ backgroundColor: event.color }}>{event.icon}</span>}
                <span className="card-arrow">↗</span>
              </span>
              <span className="home-event-label">{event.category}</span>
              <span className="home-event-name">{event.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="story" className="story-strip">
        <div className="story-inner">
          <span className="story-asterisk">✳</span>
          <div>
            <div className="eyebrow">Good people. Great parties.</div>
            <h2>More heart in<br />every <em>hello.</em></h2>
          </div>
          <p>We believe the best celebrations feel like you. So we pair a curious eye for detail with a warm, human touch—and make the planning part feel pretty lovely, too.</p>
          <button className="button button-outline" onClick={() => navigate("/create")}>Make it your own <span>↗</span></button>
        </div>
      </section>
    </>
  );
}

function EventsPage({ events, navigate }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter((event) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;

    const haystack = [
      event.name,
      event.category,
      event.description,
      ...(event.packages || []).map((plan) => `${plan.name} ${plan.detail}`),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  return (
    <section className="page-section content-width">
      <div className="page-heading">
        <div className="eyebrow"><span className="eyebrow-line" /> Find your reason</div>
        <div className="heading-row">
          <div><h1>Every day<br />has its <em>moment.</em></h1></div>
          <p>Pick a feeling, a milestone, or just a day that deserves something special. We'll take it from there.</p>
        </div>
        <div className="catalog-meta"><span>{filteredEvents.length.toString().padStart(2, "0")} ways to celebrate</span><span>Made for your kind of people <b>✳</b></span></div>
      </div>

      <div className="catalog-toolbar">
        <label className="search-field" htmlFor="event-search">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            id="event-search"
            type="search"
            value={searchTerm}
            placeholder="Search celebrations"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="empty-state">
          <p>No celebrations match “{searchTerm}”.</p>
          <button className="button button-dark" onClick={() => setSearchTerm("")}>Clear search <span>↗</span></button>
        </div>
      ) : (
        <div className="catalog-grid">
          {filteredEvents.map((event, index) => (
            <article className="event-card" key={event.id}>
              <div className="event-image-wrap">
                {event.image ? (
                  <img src={event.image} alt={`${event.name} celebration`} loading={index > 1 ? "lazy" : "eager"} />
                ) : (
                  <div className="event-custom-visual" style={{ backgroundColor: event.color }}><span>{event.icon}</span></div>
                )}
                <span className="event-number">0{index + 1}</span>
                <span className="event-icon" style={{ backgroundColor: event.color }}>{event.icon}</span>
              </div>
              <div className="event-info">
                <div className="event-category">{event.category}</div>
                <h2>{event.name}</h2>
                <p>{event.description}</p>
                <div className="package-list">
                  {event.packages ? event.packages.map((plan) => (
                    <button
                      className="package-row"
                      key={plan.name}
                      onClick={() => navigate("/book", { choice: { eventId: event.id, packageName: plan.name } })}
                    >
                      <span><strong>{plan.name}</strong><small>{plan.detail}</small></span>
                      <span className="package-price">{plan.price}<b>↗</b></span>
                    </button>
                  )) : (
                    <button
                      className="package-row custom-package-row"
                      onClick={() => navigate("/book", { choice: { eventId: event.id, packageName: "Let's make a plan" } })}
                    >
                      <span><strong>Let's make a plan</strong><small>We'll create a package together</small></span>
                      <span className="package-price">Enquire <b>↗</b></span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
          <button className="create-card" onClick={() => navigate("/create")}>
            <span className="create-card-mark">+</span>
            <span className="eyebrow">Your idea, your way</span>
            <strong>Have a reason<br />of your own?</strong>
            <span className="create-card-link">Create a celebration <b>↗</b></span>
          </button>
        </div>
      )}
    </section>
  );
}

function BookingPage({ events, navigate, bookingChoice }) {
  const selectedEvent = events.find((event) => event.id === bookingChoice?.eventId);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const eventDate = new FormData(form).get("date");
    if (eventDate && new Date(`${eventDate}T00:00:00`) < new Date(new Date().toDateString())) {
      setFormError("Choose a date in the future so we can make it happen.");
      return;
    }
    setFormError("");
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <section className="confirmation content-width">
        <span className="confirmation-flower">✳</span>
        <div className="eyebrow">The lovely part starts now</div>
        <h1>Your moment<br />is <em>in motion.</em></h1>
        <p>Thanks for letting us in on your big day. Our celebration team will be in touch within two working days to start dreaming up the details.</p>
        <button className="button button-dark" onClick={() => navigate("/events")}>Back to celebrations <span>↗</span></button>
      </section>
    );
  }

  return (
    <section className="booking-layout content-width">
      <div className="booking-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> Tell us the lovely details</div>
        <h1>Let's make<br />it <em>happen.</em></h1>
        <p>Every great celebration starts with a little conversation. Tell us what you're dreaming up and we'll take it from here.</p>
        <div className="booking-note"><span>✳</span><div><strong>Just a first hello</strong><small>No commitment, no pressure. Just good ideas.</small></div></div>
        <div className="booking-contact"><span>Prefer a proper chat?</span><a href="mailto:hello@celebrationcraft.in">hello@celebrationcraft.in ↗</a></div>
      </div>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-topline"><span>YOUR CELEBRATION, YOUR WAY</span><span>01 — 03</span></div>
        <h2>A few little details</h2>
        <div className="form-grid">
          <label className="field"><span>Your name <b>*</b></span><input name="name" type="text" placeholder="The name we should know" autoComplete="name" required minLength="2" /></label>
          <label className="field"><span>Email address <b>*</b></span><input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label>
          <label className="field"><span>Phone number <b>*</b></span><input name="phone" type="tel" placeholder="+91 98765 43210" autoComplete="tel" required pattern="[+0-9() -]{8,18}" title="Enter a valid phone number" /></label>
          <label className="field"><span>What are we celebrating? <b>*</b></span>
            <select name="celebration" required defaultValue={selectedEvent?.id || ""}>
              <option value="" disabled>Choose your moment</option>
              {events.map((event) => <option value={event.id} key={event.id}>{event.name}</option>)}
            </select>
          </label>
          <label className="field"><span>When's the big day? <b>*</b></span><input name="date" type="date" min={new Date().toISOString().split("T")[0]} required /></label>
          <label className="field"><span>How many lovely people?</span>
            <select name="guests" defaultValue="">
              <option value="" disabled>Approximate guest count</option>
              <option>Under 20</option><option>20 – 50</option><option>50 – 100</option><option>100 – 250</option><option>250+</option>
            </select>
          </label>
          <label className="field field-full"><span>Where should the magic happen?</span><input name="location" type="text" placeholder="City, venue, or still deciding?" autoComplete="address-level2" /></label>
          <label className="field field-full"><span>Anything else we should know?</span><textarea name="notes" rows="3" placeholder="A little about what you're imagining..." /></label>
        </div>
        {bookingChoice?.packageName && <p className="selected-package"><span>Selected package</span><strong>{bookingChoice.packageName}</strong></p>}
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <div className="form-submit-row"><span><b>*</b> The must-knows</span><button type="submit" className="button button-dark">Send the details <span>↗</span></button></div>
        <p className="form-privacy">By sending this, you're happy for us to get in touch about your celebration.</p>
      </form>
    </section>
  );
}

function CreatePage({ onCreate, navigate }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("✳");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#f7e6d8");
  const colors = ["#f7e6d8", "#f4edcf", "#f3dfdc", "#e5ece5", "#e6e1f1", "#dce9ec"];

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    if (!trimmedName || !trimmedDescription) return;
    const id = `custom-${Date.now()}`;
    onCreate({
      id,
      name: trimmedName,
      category: "Made just for you",
      description: trimmedDescription,
      icon,
      color,
      packages: null,
    });
  }

  return (
    <section className="create-layout content-width">
      <div className="create-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> A blank canvas, a big idea</div>
        <h1>What are we<br /><em>celebrating?</em></h1>
        <p>New traditions, old friends, small wins, big news. If it matters to you, it matters to us. Let's give it a name.</p>
        <button className="text-link back-link" onClick={() => navigate("/events")}>← Browse all celebrations</button>
      </div>
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="custom-preview" style={{ backgroundColor: color }}>
          <span className="preview-icon">{icon}</span>
          <div><small>YOUR NEW CELEBRATION</small><strong>{name.trim() || "A little something special"}</strong></div>
          <span className="preview-spark">✳</span>
        </div>
        <label className="field"><span>Give your celebration a name <b>*</b></span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Our new home party" maxLength="36" required /></label>
        <label className="field"><span>What's the feeling? <b>*</b></span><textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Tell us what makes this moment yours..." rows="3" maxLength="150" required /></label>
        <div className="field">
          <span>Choose a little symbol</span>
          <div className="icon-options" role="group" aria-label="Choose a celebration symbol">
            {["✳", "♡", "✿", "☼", "☆", "❋"].map((item) => (
              <button type="button" className={icon === item ? "icon-option selected" : "icon-option"} key={item} onClick={() => setIcon(item)} aria-label={`Use ${item}`} aria-pressed={icon === item}>{item}</button>
            ))}
          </div>
        </div>
        <div className="field">
          <span>Pick your palette</span>
          <div className="color-options" role="group" aria-label="Choose a celebration color">
            {colors.map((item) => <button type="button" key={item} className={color === item ? "color-option selected" : "color-option"} style={{ backgroundColor: item }} onClick={() => setColor(item)} aria-label={`Choose ${item} palette`} aria-pressed={color === item} />)}
          </div>
        </div>
        <button className="button button-dark create-submit" type="submit">Add your celebration <span>↗</span></button>
        <p className="create-footnote">Your new celebration will be added to the catalog, ready for its first guests.</p>
      </form>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a className="brand footer-brand" href="/" onClick={(event) => { event.preventDefault(); navigate("/"); }}>
          <span className="brand-mark" aria-hidden="true">c.</span><span>celebrationcraft</span>
        </a>
        <p>For all the little things<br />that are actually the big things.</p>
        <button className="footer-link" onClick={() => navigate("/book")}>Let's plan something <span>↗</span></button>
      </div>
      <div className="footer-bottom"><span>© 2025 CelebrationCraft</span><span>Made with a little extra love <b>♡</b></span><button onClick={() => navigate("/create")}>Create your own celebration ↗</button></div>
    </footer>
  );
}

export default App;
