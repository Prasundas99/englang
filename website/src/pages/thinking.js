import React from "react";
import Layout from "@theme/Layout";

export default function ThinkingPage() {
  return (
    <Layout title="Thinking" description="How to think while building your own language">
      <main style={{ padding: "2rem", maxWidth: "860px", margin: "0 auto" }}>
        <h1>Thinking</h1>
        <p>
          This section explains non-technical thinking that helps when building a language from
          scratch.
        </p>
        <ul>
          <li>Define who the language is for.</li>
          <li>Choose what the first version must solve.</li>
          <li>Keep syntax readable before making it short.</li>
          <li>Introduce complexity in stages.</li>
          <li>Validate with real beginner programs.</li>
        </ul>
      </main>
    </Layout>
  );
}
