import { useState } from "react";
import "./App.css";

const initialEvents = [
  {
    id: 1,
    name: "Royal Birthday Bash",
    category: "Birthday",
    price: 15000,
    image: "https://loremflickr.com/600/400/birthday,party?lock=1",
  },
  {
    id: 2,
    name: "Yellow Haldi Glow",
    category: "Haldi",
    price: 20000,
    image: "https://loremflickr.com/600/400/haldi,turmeric?lock=2",
  },
  {
    id: 3,
    name: "Grand Wedding Package",
    category: "Marriage",
    price: 250000,
    image: "https://loremflickr.com/600/400/wedding,indian?lock=3",
  },
  {
    id: 4,
    name: "Little Angel Baby Shower",
    category: "Baby Shower",
    price: 18000,
    image: "https://loremflickr.com/600/400/baby,shower?lock=4",
  },
];

const categories = [
  { name: "Birthday", icon: "🎂" },
  { name: "Haldi", icon: "🌼" },
  { name: "Marriage", icon: "💍" },
  { name: "Baby Shower", icon: "🍼" },
];

const getIcon = (categoryName) => {
  const found = categories.find(
    (c) => c.name.toLowerCase() === categoryName.toLowerCase()
  );
  return found ? found.icon : "🎉";
};

/* ---------- Event Card (uses props) ---------- */
function EventCard({ event, onBook }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="card">
      {imgFailed || !event.image ? (
        <div className="card-img img-fallback">{getIcon(event.category)}</div>
      ) : (
        <img
          className="card-img"
          src={event.image}
          alt={event.name}
          onError={() => setImgFailed(true)}
        />
      )}
      <h3>{event.name}</h3>
      <p className="tag">{event.category}</p>
      <p className="price">₹{event.price}</p>
      <button onClick={() => onBook(event)}>Book Now</button>
    </div>
  );
}

/* ---------- Home Page ---------- */
function Home({ onCategoryClick }) {
  return (
    <div>
      <div className="hero">
        <h1>Welcome to CelebrationCraft</h1>
        <p>
          We make your special moments unforgettable. Browse our packages for
          birthdays, haldi ceremonies, weddings and baby showers.
        </p>
      </div>

      <h2>Choose a Celebration</h2>
      <div className="grid">
        {categories.map((c) => (
          <div
            key={c.name}
            className="card clickable"
            onClick={() => onCategoryClick(c.name)}
          >
            <div className="icon">{c.icon}</div>
            <h3>{c.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Event Catalog Page ---------- */
function Catalog({ events, search, setSearch, onBook }) {
  const filtered = events.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Event Catalog</h2>
      <input
        type="text"
        placeholder="Search by name or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid">
        {filtered.map((e) => (
          <EventCard key={e.id} event={e} onBook={onBook} />
        ))}
      </div>
      {filtered.length === 0 && <p>No events found.</p>}
    </div>
  );
}

/* ---------- Booking Form Page ---------- */
function Booking({ events, selected }) {
  const [form, setForm] = useState({
    name: "",
    date: "",
    guests: "",
    event: selected || "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.date) newErrors.date = "Event date is required";
    if (!form.guests || form.guests <= 0)
      newErrors.guests = "Enter a valid guest count";
    if (!form.event) newErrors.event = "Select a celebration type";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
      setForm({ name: "", date: "", guests: "", event: "" });
    }
  };

  return (
    <div>
      <h2>Book Your Celebration</h2>
      {success && (
        <p className="success">
          ✅ Booking request submitted successfully! We will contact you soon.
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label>Your Name</label>
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}

        <label>Event Date</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        {errors.date && <span className="error">{errors.date}</span>}

        <label>Guest Count</label>
        <input
          type="number"
          name="guests"
          value={form.guests}
          onChange={handleChange}
        />
        {errors.guests && <span className="error">{errors.guests}</span>}

        <label>Celebration Type</label>
        <select name="event" value={form.event} onChange={handleChange}>
          <option value="">-- Select --</option>
          {events.map((e) => (
            <option key={e.id} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
        {errors.event && <span className="error">{errors.event}</span>}

        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
}

/* ---------- Add Custom Event Page ---------- */
function CreateEvent({ onAdd }) {
  const [form, setForm] = useState({ name: "", category: "", price: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim() || !form.price) {
      setMessage("❌ Please fill all fields.");
      return;
    }
    onAdd({
      id: Date.now(),
      ...form,
      price: Number(form.price),
      image:
        "https://loremflickr.com/600/400/" +
        encodeURIComponent(form.category.trim()) +
        ",party",
    });
    setForm({ name: "", category: "", price: "" });
    setMessage("✅ New celebration theme added! Check the Events page.");
  };

  return (
    <div>
      <h2>Add Custom Celebration</h2>
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Theme Name</label>
        <input name="name" value={form.name} onChange={handleChange} />

        <label>Category</label>
        <input name="category" value={form.category} onChange={handleChange} />

        <label>Base Price (₹)</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

/* ---------- Main App ---------- */
function App() {
  const [page, setPage] = useState("home");
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  const handleCategoryClick = (category) => {
    setSearch(category);
    setPage("events");
  };

  const handleBook = (event) => {
    setSelected(event.name);
    setPage("book");
  };

  const addEvent = (newEvent) => setEvents([...events, newEvent]);

  return (
    <div className="app">
      <nav>
        <h2 className="logo">🎉 CelebrationCraft</h2>
        <div>
          <button onClick={() => setPage("home")}>Home</button>
          <button
            onClick={() => {
              setSearch("");
              setPage("events");
            }}
          >
            Events
          </button>
          <button
            onClick={() => {
              setSelected("");
              setPage("book");
            }}
          >
            Book
          </button>
          <button onClick={() => setPage("create")}>Create</button>
        </div>
      </nav>

      <main>
        {page === "home" && <Home onCategoryClick={handleCategoryClick} />}
        {page === "events" && (
          <Catalog
            events={events}
            search={search}
            setSearch={setSearch}
            onBook={handleBook}
          />
        )}
        {page === "book" && (
          <Booking key={selected} events={events} selected={selected} />
        )}
        {page === "create" && <CreateEvent onAdd={addEvent} />}
      </main>
    </div>
  );
}

export default App;