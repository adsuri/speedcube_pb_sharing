function HomePage() {
  return (
    <main className="container">
      <section className="section">
        <h1>Speedcube PBs</h1>

        <p className="lead">
          A simple way to track your speedcubing personal bests and share them
          with anyone using a public profile.
        </p>

        <p>
          Whether you're just learning 3x3 or competing in every WCA event,
          keep your best times organized in one place instead of scattered
          across screenshots, notes, or messages.
        </p>
      </section>

      <div className="row">

        <div className="col-sm-12 col-md-6">
          <div className="card fluid">
            <div className="section">
              <h3>What is this?</h3>

              <p style={{ textAlign: "left" }}>
                Speedcube PBs lets you build a public profile containing
                your personal bests across all of your favorite puzzles.
              </p>

              <p style={{ textAlign: "left" }}>
                Each profile has its own unique link that you can send to
                friends, cubing clubs, or anyone interested in your progress.
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-6">
          <div className="card fluid">
            <div className="section">
              <h3>Features</h3>

              <ul style={{ textAlign: "left" }}>
                <li>Secure Google sign-in</li>
                <li>Public profile page</li>
                <li>Multiple puzzles supported</li>
                <li>Store singles and averages</li>
                <li>Works on desktop and mobile</li>
                <li>Update your PBs anytime</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <div className="card fluid">
        <div className="section">
          <h2>Getting Started</h2>

          <ol style={{ textAlign: "left" }}>
            <li>Sign in using your Google account.</li>
            <li>Create your profile.</li>
            <li>Add your current personal bests.</li>
            <li>Share your public profile with friends.</li>
            <li>Come back whenever you set a new PB!</li>
          </ol>
        </div>
      </div>

      <div className="row">

        <div className="col-sm-12 col-md-6">
          <div className="card fluid">
            <div className="section">
              <h3>Why use it?</h3>

              <p style={{ textAlign: "left" }}>
                Instead of digging through screenshots or old messages, your
                best solves are always available in one organized place.
              </p>

              <p style={{ textAlign: "left" }}>
                Your profile grows with you as your times improve.
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-6">
          <div className="card fluid">
            <div className="section">
              <h3>Supported Puzzles</h3>

              <p>
                Store PBs for popular WCA puzzles, including:
              </p>

              <ul style={{ textAlign: "left" }}>
                <li>2x2</li>
                <li>3x3</li>
                <li>4x4-7x7</li>
                <li>One-Handed</li>
                <li>Clock</li>
                <li>Megaminx</li>
                <li>Pyraminx</li>
                <li>Skewb</li>
                <li>Square-1</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <section className="section">
        <blockquote>
          <p>
            "A clean, simple place to keep track of your cubing achievements and
            share your progress."
          </p>
        </blockquote>
      </section>

    </main>
  );
}

export default HomePage;