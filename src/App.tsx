function App() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-1">
        <h1 className="text-5xl font-bold text-primary">Emre Can Çorapçı</h1>
        <p className="text-secondary ps-2">Full-Stack Software Developer | TypeScript - Rust</p>
      </div>
      <div>
        <h2 className="text-3xl font-semibold text-primary">Contacts</h2>
        <div className="grid gap-1 ps-1">
          <ContactLink href="https://linkedin.com/in/emrecancorapci">
            linkedin.com/in/emrecancorapci
          </ContactLink>
          <ContactLink href="https://github.com/emrecancorapci">
            github.com/emrecancorapci
          </ContactLink>
          <ContactLink href="mailto:emrecancorapci@gmail.com">emrecancorapci@gmail.com</ContactLink>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-semibold text-primary">Packages</h2>
        <div className="grid gap-1 ps-2">
          <p className="text-secondary">
            <a className="text-primary hover:text-tertiary" href="https://crates.io/crates/krustie">krustie</a> - An easy to use back-end
            framework for Rust
          </p>
          <p className="text-secondary">
            <a className="text-primary hover:text-tertiary" href="https://crates.io/crates/radyx">radyx</a> - A Radix Tree implementation in
            Rust.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

function ContactLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="border-s-4 border-primary ps-1 text-secondary hover:text-tertiary transition-all hover:border-l-6 duration-100"
    >
      {children}
    </a>
  );
}
