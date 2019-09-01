import mermaid from 'mermaid'

const MermaidParser = (options) => {
  Mermaid.initialize(Object.assign(MermaidPlugIn.default, options));

  MermaidParser.default={
    startOnLoad: false,
    theme: "default",
    flowchart:{
      htmlLabels: false,
      useMaxWidth: true,
    }
  }

  options = options || {}

  const mermaidChart = (code) => {
    try {
      var needsUniqueId = "render" + (Math.floor(Math.random() * 10000)).toString();
      Mermaid.mermaidAPI.render(needsUniqueId, code, sc => {code=sc})
      return `<div class="mermaid">${code}</div>`
    } catch ({ str, hash }) {
      return `<pre>${str}</pre>`
    }
  }
}

export default MermaidParser
