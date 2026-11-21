import React from 'react';

export default function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <h2 id="about-heading">About TextUtils</h2>
      <p>
        TextUtils is a simple tool for editing and understanding text. Enter
        text above to transform its capitalization, clean up extra spaces, and
        view a quick summary.
      </p>
      <ul>
        <li>Convert text to uppercase or lowercase.</li>
        <li>Remove extra spaces with one click.</li>
        <li>See word count, character count, and estimated reading time.</li>
        <li>Copy your text and preview changes as you work.</li>
      </ul>
    </section>
  );
}