# markdown-it-textual-uml

1. [markdown-it-textual-uml](#markdown-it-textual-uml)
   1. [Overview](#overview)
      1. [Metadata](#metadata)
      2. [Continuous Integration](#continuous-integration)
   2. [UML examples](#uml-examples)
      1. [PlantUML](#plantuml)
      2. [DOT](#dot)
      3. [ditaa](#ditaa)
      4. [mermaid](#mermaid)
   3. [Installation](#installation)
   4. [Usage](#usage)
      1. [Additional steps for mermaid](#additional-steps-for-mermaid)
   5. [Development](#development)
   6. [References](#references)
   7. [License](#license)

## Overview

This is a `markdown-it` markdown parser plugin to create uml diagrams from text, based on plantuml, mermaid, etc.

At this point the following textual uml offerings are supported:

| UML Offering                                                | Markdown fence identifier |
| ----------------------------------------------------------- | ------------------------- |
| [PlantUML](http://plantuml.com/)                            | `plantuml`                |
| [DOT](https://graphviz.gitlab.io/_pages/doc/info/lang.html) | `dot`                     |
| [ditaa](http://ditaa.sourceforge.net/)                      | `ditaa`                   |
| [mermaid](https://github.com/knsv/mermaid)                  | `mermaid`                 |

### Metadata

| Provider                                                               | Data                                | Status                                                                                                                 |
| ---------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [npm](https://www.npmjs.com/package/markdown-it-textual-uml)           | Version                             | ![npm](https://img.shields.io/npm/v/markdown-it-textual-uml)                                                           |
| npm                                                                    | License                             | ![NPM](https://img.shields.io/npm/l/markdown-it-textual-uml)                                                           |
| npm                                                                    | Downloads                           | ![npm](https://img.shields.io/npm/dw/markdown-it-textual-uml)                                                          |
| BundlePhobia                                                           | Bundle size                         | ![npm bundle size](https://img.shields.io/bundlephobia/min/markdown-it-textual-uml)                                    |
| GitHub                                                                 | Version (package.json)              | ![GitHub package.json version](https://img.shields.io/github/package-json/v/manastalukdar/markdown-it-textual-uml)     |
| GitHub                                                                 | Repo Size                           | ![GitHub repo size](https://img.shields.io/github/repo-size/manastalukdar/markdown-it-textual-uml)                     |
| GitHub                                                                 | Code Size                           | ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/manastalukdar/markdown-it-textual-uml)  |
| GitHub                                                                 | Commit Activity                     | ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/manastalukdar/markdown-it-textual-uml)       |
| GitHub                                                                 | Last Commit                         | ![GitHub last commit (branch)](https://img.shields.io/github/last-commit/manastalukdar/markdown-it-textual-uml/master) |
| GitHub                                                                 | Open Issues                         | ![GitHub issues](https://img.shields.io/github/issues-raw/manastalukdar/markdown-it-textual-uml)                       |
| GitHub                                                                 | Closed Issues                       | ![GitHub issues](https://img.shields.io/github/issues-closed/manastalukdar/markdown-it-textual-uml)                    |
| GitHub                                                                 | Language Count                      | ![GitHub language count](https://img.shields.io/github/languages/count/manastalukdar/markdown-it-textual-uml)          |
| GitHub                                                                 | License                             | ![GitHub](https://img.shields.io/github/license/manastalukdar/markdown-it-textual-uml)                                 |
| [david-dm](https://david-dm.org/manastalukdar/markdown-it-textual-uml) | Check node.js dependency status     | ![David (path)](https://img.shields.io/david/manastalukdar/markdown-it-textual-uml)                                    |
| david-dm                                                               | Check node.js dev dependency status | ![David (path)](https://img.shields.io/david/manastalukdar/markdown-it-textual-uml?type=dev)                           |

### Continuous Integration

| Platform | Provider | Operations | Status |
| -------- | -------- | ---------- | ------ |

## UML examples

### PlantUML

````markdown
```plantuml
Bob -> Alice : hello
```
````

### DOT

````markdown
```dot
digraph example1 {
    1 -> 2 -> { 4, 5 };
    1 -> 3 -> { 6, 7 };
}
```
````

### ditaa

````markdown
```ditaa
+--------+   +-------+    +-------+
|        +---+ ditaa +--> |       |
|  Text  |   +-------+    |diagram|
|Document|   |!magic!|    |       |
|     {d}|   |       |    |       |
+---+----+   +-------+    +-------+
	:                         ^
	|       Lots of work      |
	+-------------------------+
```
````

### mermaid

````markdown
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

## Installation

node.js, browser:

```text
npm install markdown-it-textual-uml --save
```

## Usage

```javascript
const md = require('markdown-it')()
           .use(require('markdown-it-textual-uml'));
```

Or,

```javascript
import 'markdownItTextualUml from 'markdown-it-textual-uml'
const md = require('markdown-it')()
           .use(markdownItTextualUml);
```

### Additional steps for mermaid

For mermaid, you have to include the `mermaid js` file in your application and initialize it **_after_** the window has loaded. Just using this plugin is not enough to ensure that the diagram is rendered correctly.

**Note:** mermaid js has a dependency on the browser window being loaded before it can initialize. Related GitHub [issue](https://github.com/knsv/mermaid/issues/485).

So you should have the following in your html page in order for the mermaid text definitions to be translated into svg.

```html
<script src="mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad:true});</script>
```

Details [here](https://mermaidjs.github.io/#/usage?id=simple-usage-on-a-web-page).

When using some sort of framework, be aware that `mermaid.initialize` would have to be called after the page has loaded. For example, with vue.js, this could look like:

```javascript
<script>
let mermaid = null
export default {
    mounted() {
        if (mermaid == null) {
        mermaid = require('mermaid')
        }
        mermaid.initialize({
        startOnLoad: true,
        theme: 'forest'
        })
    }
}
</script>
```

## Development

It is highly recommended to use [VS Code](https://code.visualstudio.com/).

## References

Here are some alternative npm packages:

- [GitHub - gmunguia/markdown-it-plantuml: plantuml diagrams in your markdown](https://github.com/gmunguia/markdown-it-plantuml)
- [GitHub - tylingsoft/markdown-it-mermaid: Mermaid plugin for markdown-it](https://github.com/tylingsoft/markdown-it-mermaid)
- [GitHub - liradb2000/markdown-it-mermaid: Mermaid plugin for markdown-it](https://github.com/liradb2000/markdown-it-mermaid)

## License

[MIT](https://github.com/manastalukdar/markdown-it-textual-uml/blob/master/LICENSE)
