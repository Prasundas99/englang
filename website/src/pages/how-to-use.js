import React from "react";
import Layout from "@theme/Layout";

export default function HowToUsePage() {
  return (
    <Layout title="How To Use" description="How to use Englang locally with Node.js">
      <main style={{ padding: "2rem", maxWidth: "860px", margin: "0 auto" }}>
        <h1>How To Use Locally</h1>
        <p>Install Node.js, then run these commands:</p>
        <pre>{`npm install\nnpm test\nnpm start`}</pre>

        <h2>Download CDN Bundle</h2>
        <p>Use this button to download the latest minified browser file.</p>
        <a href="/cdn/englang.min.js" download>
          Download englang.min.js
        </a>
      </main>
    </Layout>
  );
}
