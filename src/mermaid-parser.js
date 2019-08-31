import mermaid from 'mermaid'

const mermaidChart = (code) => {
  try {
    var needsUniqueId = "render" + (Math.floor(Math.random() * 10000)).toString();
    Mermaid.mermaidAPI.render(needsUniqueId, code, sc => {code=sc})
    return `<div class="mermaid">${code}</div>`
  } catch ({ str, hash }) {
    return `<pre>${str}</pre>`
  }
}

const MermaidParser = (opts) => {
  Mermaid.initialize(Object.assign(MermaidPlugIn.default, opts));

  MermaidParser.default={
    startOnLoad: false,
    theme: "default",
    flowchart:{
      htmlLabels: false,
      useMaxWidth: true,
    }
  }
}

export default MermaidParser
