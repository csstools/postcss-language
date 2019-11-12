# PostCSS Language Support [<img src="https://github.com/csstools/postcss-language/raw/master/icon.png" alt="PostCSS" width="90" height="90" align="right">][PostCSS Language Support]

[<img height="20" alt="Installs" src="https://img.shields.io/visual-studio-marketplace/i/csstools.postcss">](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)
[<img height="20" alt="Rating" src="https://img.shields.io/visual-studio-marketplace/stars/csstools.postcss">](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)
[<img height="20" alt="Support Chat" src="https://img.shields.io/badge/support-chat-blue.svg">](https://gitter.im/postcss/postcss)

[PostCSS Language Support] adds support for modern and experimental CSS within **Visual Studio Code**.

<p align="center"><img src="https://raw.githubusercontent.com/csstools/postcss-language/master/preview/custom-rules.png" alt="" width="610"></p>

This extension is applied to `.css`, `.pcss` and `.postcss` files. It also applies to the following contexts:

- HTML `<style>` elements.
- Markdown `css` and `pcss` code blocks.
- Marko `style` blocks when paired with the [Marko Syntax Highlighting] extension.

## Installation

1. Open the command palette and select **Extensions: Install Extensions**
2. Search for **PostCSS Language Support**
3. Click **Install**

### Adding Support for Emmet

1. Open the command palette and select **Preferences: Open Settings (JSON)**
2. Add the following configuration:

```json
{
  "emmet.includeLanguages": {
    "postcss": "css"
  }
}
```

## Differences from CSS Language Support

**PostCSS Language Support** is derived from the native **CSS Language Support** built into **Visual Studio Code**, which is itself derived from the native **CSS Language Support** for **Atom**. This extension includes the following changes:

### Modern CSS Features

- Support is added for nesting rules, including the nesting selector (`&`), the nesting at-rule (`@nest`), and `@media` and `@supports` at-rules.
- Support is added for the `:blank` pseudo-class, as well as the `:is()` and `:where` functional pseudo-classes.
- Support is added for `prefers-color-scheme` and `prefers-reduced-motion` within media queries.
- Support is added for the `place-self` property.
- Support is added for the `env()` function, as well as the `hwb()`, `lab()`, and `lch()` color functions.
- Support is added for the `emoji`, `fangsong`, and `system-ui` font families.
- Support is added for the `border-block`, `border-inline`, `margin-block`, `margin-inline`, `padding-block`, and `padding-inline` logical properties.
- Support is added for `@custom-media` and `@custom-selector` at-rules.

<p align="center"><img src="https://raw.githubusercontent.com/csstools/postcss-language/master/preview/nesting.png" alt="" width="278"></p>
<p align="center"><img src="https://raw.githubusercontent.com/csstools/postcss-language/master/preview/variables.png" alt="" width="402"></p>

### Syntactical Looseness

- Support is added for nesting `@extend` and `@extends` at-rules.
- Support is added for functional selectors (`%placeholder`).
- Support is added for the CSS Modules `:global` rule, as well as the `composes` declaration, and also `@value` declarations.
- Support is added for sass `$variables`.
- Support is added for single-line comments (`//`).
- Support is added for `@custom-env` at-rules.
- Support is added for unknown nesting at-rules, as well as unknown `@custom-` prefixed at-rules.

<p align="center"><img src="https://raw.githubusercontent.com/csstools/postcss-language/master/preview/modules.png" alt="" width="518"></p>
<p align="center"><img src="https://raw.githubusercontent.com/csstools/postcss-language/master/preview/sassy.png" alt="" width="333"></p>

[PostCSS Language Support]: https://github.com/csstools/postcss-language
[Marko Syntax Highlighting]: https://marketplace.visualstudio.com/items?itemName=pcanella.marko
