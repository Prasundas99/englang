import React, { useMemo, useState } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const initialCode = `start

print "Hello from Englang!".

function greet(name):
  print "Hello", name.
end

greet("World").

if 1 is greater than 2 then begin
  print "1 is greater than 2.".
else begin
  print "1 is not greater than 2.".
end

set x to 10.
set y to (x plus 2) times 3.
print "Value of y is", y.

`;

const keywordPattern =
  /\b(start|set|print|function|if|else|then|begin|end|while|for|each|from|to|repeat|times|break|ask|is|greater|less|equal|not|divisible|and|or|even|odd|plus|minus|divided|by)\b/;

function highlightLine(lineText) {
  const tokenPattern = /"[^"\n]*"|\d+(\.\d+)?|\b(start|set|print|function|if|else|then|begin|end|while|for|each|from|to|repeat|times|break|ask|is|greater|less|equal|not|divisible|and|or|even|odd|plus|minus|times|divided|by)\b|[():.,]/g;
  const highlightedParts = [];
  let previousIndex = 0;
  let patternMatch = tokenPattern.exec(lineText);

  while (patternMatch) {
    const matchedToken = patternMatch[0];
    const tokenStartIndex = patternMatch.index;
    const tokenEndIndex = tokenStartIndex + matchedToken.length;

    if (tokenStartIndex > previousIndex) {
      highlightedParts.push(
        <span key={`plain-${previousIndex}`}>{lineText.slice(previousIndex, tokenStartIndex)}</span>
      );
    }

    let tokenClassName = "token-plain";
    if (matchedToken.startsWith("\"")) {
      tokenClassName = "token-string";
    } else if (/^\d/.test(matchedToken)) {
      tokenClassName = "token-number";
    } else if (keywordPattern.test(matchedToken)) {
      tokenClassName = "token-keyword";
    } else if (/^[():.,]$/.test(matchedToken)) {
      tokenClassName = "token-punctuation";
    }

    highlightedParts.push(
      <span key={`tok-${tokenStartIndex}`} className={tokenClassName}>
        {matchedToken}
      </span>
    );

    previousIndex = tokenEndIndex;
    patternMatch = tokenPattern.exec(lineText);
  }

  if (previousIndex < lineText.length) {
    highlightedParts.push(<span key={`tail-${previousIndex}`}>{lineText.slice(previousIndex)}</span>);
  }

  return highlightedParts;
}

export default function HomePage() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const languageMetadata = customFields.languageMetadata || {};

  const [sourceCode, setSourceCode] = useState(initialCode);
  const [outputText, setOutputText] = useState("");
  const editorRows = useMemo(() => Math.max(16, sourceCode.split("\n").length + 1), [sourceCode]);

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
          <div className="englang-editor-shell">
            <div className="englang-editor-topbar">
              <div className="englang-editor-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span className="englang-editor-title">program.eng</span>
              <span className="englang-editor-lang">Englang V1</span>
            </div>
            <div className="englang-editor-body">
              <pre className="englang-editor-highlight" aria-hidden="true">
                {sourceCode.split("\n").map((lineText, lineIndex) => (
                  <React.Fragment key={`line-${lineIndex}`}>
                    {highlightLine(lineText)}
                    {"\n"}
                  </React.Fragment>
                ))}
              </pre>
            <textarea
              className="englang-editor-textarea"
              value={sourceCode}
              onChange={(event) => setSourceCode(event.target.value)}
              rows={editorRows}
              spellCheck={false}
            />
            </div>
          </div>
          <div className="englang-demo-actions">
            <button type="button" onClick={runDemoCode}>
              Run Code
            </button>
          </div>
          <div className="englang-output-shell">
            <div className="englang-output-topbar">Output</div>
            <pre>{outputText}</pre>
          </div>
        </section>
      </main>
    </Layout>
  );
}
