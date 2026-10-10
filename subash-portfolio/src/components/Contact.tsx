import { contact } from "../data";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <h2>{contact.heading}</h2>
        <p>{contact.text}</p>
        <div className="links">
          {contact.links.map((l) => {
            const external = l.href.startsWith("http");
            return (
              <a
                key={l.label}
                className={l.main ? "main" : undefined}
                href={l.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {l.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
