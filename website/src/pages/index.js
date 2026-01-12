import React, { useState } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const initialCode = `start
set x to 10.
set y to (x plus 2) times 3.
print "Value of y is", y.`;

export default function HomePage() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const languageMetadata = customFields.languageMetadata || {};

  const [sourceCode, setSourceCode] = useState(initialCode);
  const [outputText, setOutputText] = useState("");

  function runDemoCode() {
    const englangRuntime = window.Englang;

    if (!englangRuntime || typeof englangRuntime.runEnglang !== "function") {
      setOutputText("CDN runtime not loaded yet. Build CDN bundle first.");
      return;
    }

    const capturedLines = [];
    const logger = {
      log(...values) {
        capturedLines.push(values.join(" "));
      },
    };

    try {
      const result = englangRuntime.runEnglang(sourceCode, logger, {
        ask() {
          return "Demo User";
        },
      });

      const combinedOutput = result.output.join("\n");
      setOutputText(combinedOutput || "(no output)");
    } catch (error) {
      setOutputText(`Error: ${error.message}`);
    }
  }

  return (
    <Layout title="Home" description="Englang home page with runnable demo">
      <main className="englang-home">
        <section className="englang-hero">
          <h1>What is Englang?</h1>
          <p className="englang-hero-lead">{languageMetadata.whatIsEnglang}</p>
          <p className="englang-hero-slogan">{languageMetadata.shortSlogan}</p>
        </section>

        <section className="englang-tutorial">
          <h2>Quick Tutorial</h2>
          <p className="englang-tutorial-intro">
            Learn the basics in 5 small steps, then run the demo below.
          </p>
          <ol>
            <li>
              Start every program with <code>start</code>.
            </li>
            <li>
              Use <code>set</code> to store values.
            </li>
            <li>
              Use <code>print</code> to display values.
            </li>
            <li>
              Use <code>if / else</code> for decisions.
            </li>
            <li>
              Use loops like <code>while</code> or <code>for each</code> to repeat logic.
            </li>
          </ol>
          <h3>Example Program</h3>
          <pre>{`start
set x to 10.
if x is greater than 5 then begin
  print "big".
else begin
  print "small".
end`}</pre>
          <p className="englang-tutorial-output">
            Output: <strong>big</strong>
          </p>
        </section>

        <section className="englang-demo">
          <h2>Demo</h2>
          <p>Edit and run the pre-filled program.</p>
          <textarea
            value={sourceCode}
            onChange={(event) => setSourceCode(event.target.value)}
            rows={12}
          />
          <div className="englang-demo-actions">
            <button type="button" onClick={runDemoCode}>
              Run Code
            </button>
          </div>
          <pre>{outputText}</pre>
        </section>
      </main>
    </Layout>
  );
}
