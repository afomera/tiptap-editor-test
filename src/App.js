import './App.css';
import TextEditor from "./TextEditor.jsx";

const App = () => {
  const content = `<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>How about an <strong>Ordered List</strong>?</p>
<ol>
  <li>One</li>
  <li>Two</li>
</ol>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, girl! 👏
  <br />
  — Mom
</blockquote>`

  return (
    <div className="App">
      <h1>TipTap Editor</h1>
      <p>Try it out! If you manually add `dark` to the HTML tag's class attributes you'll see it styled for dark mode (mostly).</p>
      <TextEditor content={content} />
    </div>
  );
};

export default App;
