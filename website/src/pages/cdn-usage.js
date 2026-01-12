import React from "react";
import Layout from "@theme/Layout";

export default function CdnUsagePage() {
  return (
    <Layout title="CDN Usage" description="Use Englang in HTML/CSS/JS websites via CDN">
      <main style={{ padding: "2rem", maxWidth: "860px", margin: "0 auto" }}>
        <h1>Use Englang in Websites</h1>
        <p>
          You can load Englang from a single minified file hosted from your GitHub repository release
          or static path.
        </p>
        <pre>{`<script src="https://your-cdn-or-github-link/englang.min.js"></script>
<script>
  const result = Englang.runEnglang(\`
start
print "Hello from CDN".
\`);
  console.log(result.output);
</script>`}</pre>
        <p>
          Current local CDN file path in this repository: <code>website/static/cdn/englang.min.js</code>
        </p>
      </main>
    </Layout>
  );
}
